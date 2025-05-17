'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';
import { Loader2, MapPin, Calendar, Landmark, Utensils, Hotel, Plus, Trash2, Sparkles, Route, Share2, Download } from 'lucide-react';
import { GoogleMap, Marker, useLoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import DatePicker from 'react-datepicker';
import { motion } from 'framer-motion';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { trips, aiSuggestions, users } from '@/lib/schema';

const libraries = ['places', 'geometry'];
const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem',
};
const pandharpurCenter = {
  lat: 17.6792,
  lng: 75.3319,
};

// Pandharpur-inspired color scheme
const themeColors = {
  primary: 'bg-orange-600 hover:bg-orange-700',
  primaryText: 'text-orange-600',
  primaryBorder: 'border-orange-300',
  primaryBg: 'bg-orange-50',
  secondary: 'bg-yellow-600 hover:bg-yellow-700',
  accent: 'bg-red-600 hover:bg-red-700',
  cardBorder: 'border-orange-200',
  cardBg: 'bg-orange-50/90',
  badge: 'bg-yellow-100 text-yellow-800 border-yellow-200'
};

const withRetry = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(res => setTimeout(res, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
};

export default function TripPlanner() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { isLoaded: isUserLoaded, user } = useUser();
  const userId = user?.id;

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [events, setEvents] = useState([]);
  const [aiSuggestionsList, setAiSuggestionsList] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('map'); // Default to map tab
  const [routeOptimized, setRouteOptimized] = useState(false);
  const [isGeneratingFullPlan, setIsGeneratingFullPlan] = useState(false);
  const mapRef = useRef(null);

  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'temple',
    date: new Date(),
    time: '09:00',
    description: '',
    location: null,
  });

  // Fetch trip data in real-time
  const fetchTripData = async () => {
    try {
      const [tripResult, suggestionsResult] = await Promise.all([
        db.select().from(trips).where(eq(trips.userId, userId)),
        db.select().from(aiSuggestions).where(eq(aiSuggestions.userId, userId))
      ]);

      if (tripResult.length > 0) {
        const data = tripResult[0];
        setTrip(data);
        const sortedEvents = [...(data.itinerary || [])].sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA - dateB;
        });
        setEvents(sortedEvents);
      }

      if (suggestionsResult.length > 0) {
        setAiSuggestionsList(suggestionsResult[0].suggestions || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    }
  };

  useEffect(() => {
    if (!isUserLoaded || !userId) return;

    const initializeData = async () => {
      setLoading(true);
      try {
        // Check if user exists in DB
        const existingUser = await db.select()
          .from(users)
          .where(eq(users.clerkId, userId));

        if (existingUser.length === 0) {
          await db.insert(users).values({
            clerkId: userId,
            email: user.primaryEmailAddress?.emailAddress || '',
            name: user.fullName || '',
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }

        // Check if trip exists
        const existingTrip = await db.select()
          .from(trips)
          .where(eq(trips.userId, userId));

        if (existingTrip.length === 0) {
          await db.insert(trips).values({
            userId,
            destination: 'Pandharpur',
            itinerary: [],
            coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }

        // Fetch initial data
        await fetchTripData();
      } catch (error) {
        console.error('Initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [isUserLoaded, userId]);

  // Real-time functions with immediate UI updates
  const addEvent = async () => {
    if (!userId) {
      toast.error('Please sign in to add events');
      return;
    }

    if (!newEvent.name || !newEvent.location) {
      toast.error('Please fill all required fields');
      return;
    }

    const eventToAdd = {
      ...newEvent,
      id: Date.now().toString(),
      addedAt: new Date(),
    };

    try {
      // Optimistic UI update
      setEvents(prev => [...prev, eventToAdd].sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
      }));

      await withRetry(async () => {
        const result = await db.select().from(trips).where(eq(trips.userId, userId));
        const currentItinerary = result.length > 0 ? result[0].itinerary || [] : [];

        await db.update(trips)
          .set({
            itinerary: [...currentItinerary, eventToAdd],
            updatedAt: new Date()
          })
          .where(eq(trips.userId, userId));
      });

      toast.success('Spiritual activity added!');
      setNewEvent({
        name: '',
        type: 'temple',
        date: new Date(),
        time: '09:00',
        description: '',
        location: null,
      });
      setSelectedPlace(null);
      setActiveTab('map'); // Switch to map tab after adding
    } catch (error) {
      // Rollback on error
      setEvents(prev => prev.filter(e => e.id !== eventToAdd.id));
      toast.error('Failed to add activity');
      console.error(error);
    }
  };

  const removeEvent = async (eventId) => {
    if (!userId) return;

    try {
      // Optimistic UI update
      const removedEvent = events.find(e => e.id === eventId);
      setEvents(prev => prev.filter(e => e.id !== eventId));

      await withRetry(async () => {
        const result = await db.select().from(trips).where(eq(trips.userId, userId));
        if (result.length === 0) return;

        const currentItinerary = result[0].itinerary || [];

        await db.update(trips)
          .set({
            itinerary: currentItinerary.filter(event => event.id !== eventId),
            updatedAt: new Date()
          })
          .where(eq(trips.userId, userId));
      });

      toast.success('Activity removed');
    } catch (error) {
      // Rollback on error
      if (removedEvent) {
        setEvents(prev => [...prev, removedEvent].sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA - dateB;
        }));
      }
      toast.error('Failed to remove activity');
      console.error(error);
    }
  };

  const calculateDirections = useCallback((waypoints) => {
    if (!window.google || !mapRef.current) return;

    const directionsService = new window.google.maps.DirectionsService();

    const formattedWaypoints = waypoints
      .filter(event => event.location)
      .map(event => ({
        location: new window.google.maps.LatLng(event.location.lat, event.location.lng),
        stopover: true,
      }));

    if (formattedWaypoints.length < 2) {
      toast.warning('You need at least 2 locations to optimize a route');
      return;
    }

    directionsService.route(
      {
        origin: formattedWaypoints[0].location,
        destination: formattedWaypoints[formattedWaypoints.length - 1].location,
        waypoints: formattedWaypoints.slice(1, -1),
        travelMode: window.google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setRouteOptimized(true);
          toast.success('Route optimized successfully!');
        } else {
          toast.error('Directions request failed');
        }
      }
    );
  }, []);

  const optimizeRoute = () => {
    calculateDirections(events);
  };

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (!place.geometry) {
        toast.error('No details available for this place');
        return;
      }
      setSelectedPlace(place);
      setNewEvent(prev => ({
        ...prev,
        location: {
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
      }));

      if (mapRef.current) {
        mapRef.current.panTo(place.geometry.location);
        mapRef.current.setZoom(16);
      }
    }
  }, [autocomplete]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || (isUserLoaded && !user)) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-12 w-12 text-orange-600" />
    </div>
  );
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-12 w-12 text-orange-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600">
              Pandharpur Spiritual Trip Planner
            </h1>
            <p className="text-orange-700 mt-2">Plan your divine journey to the holy city</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setIsGeneratingFullPlan(true);
                generateFullTripPlan().finally(() => setIsGeneratingFullPlan(false));
              }}
              disabled={isGeneratingFullPlan}
              className={`${themeColors.accent} transition-colors`}
            >
              {isGeneratingFullPlan ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              {isGeneratingFullPlan ? 'Generating...' : 'AI Full Plan'}
            </Button>
            <Button variant="outline" onClick={() => {
              toast.info('Copied trip link to clipboard');
              navigator.clipboard.writeText(window.location.href);
            }} className={`${themeColors.primaryBorder} hover:${themeColors.primaryBg}`}>
              <Share2 className="h-4 w-4 mr-2 text-orange-600" /> Share
            </Button>
          </div>
        </motion.div>

        {!userId ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-8 max-w-2xl mx-auto border border-orange-200"
          >
            <h2 className="text-2xl font-semibold text-orange-800 mb-4">Sign In to Plan Your Spiritual Journey</h2>
            <p className="text-orange-600 mb-6">Create your personalized Pandharpur itinerary with our AI-powered planner</p>
            <Button size="lg" className={`${themeColors.primary} transition-colors`}>
              Sign In
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className={`${themeColors.cardBorder} ${themeColors.cardBg} backdrop-blur-sm`}>
                  <CardHeader>
                    <CardTitle className="text-orange-900">Add Spiritual Activity</CardTitle>
                    <CardDescription className="text-orange-700">Plan your sacred visit</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-orange-800">Activity Name</label>
                      <Input
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        placeholder="e.g. Vitthal Temple Morning Aarti"
                        className={`${themeColors.primaryBorder} focus:ring-orange-500 focus:border-orange-500`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-orange-800">Activity Type</label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                      >
                        <SelectTrigger className={themeColors.primaryBorder}>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="temple">
                            <div className="flex items-center gap-2">
                              <Landmark className="h-4 w-4 text-orange-600" /> Temple
                            </div>
                          </SelectItem>
                          <SelectItem value="food">
                            <div className="flex items-center gap-2">
                              <Utensils className="h-4 w-4 text-orange-600" /> Food
                            </div>
                          </SelectItem>
                          <SelectItem value="accommodation">
                            <div className="flex items-center gap-2">
                              <Hotel className="h-4 w-4 text-orange-600" /> Stay
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-orange-800">Date</label>
                        <DatePicker
                          selected={newEvent.date}
                          onChange={(date) => setNewEvent({ ...newEvent, date })}
                          className={`w-full p-2 border ${themeColors.primaryBorder} rounded-md focus:ring-orange-500 focus:border-orange-500`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-orange-800">Time</label>
                        <Input
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                          className={`w-full p-2 border ${themeColors.primaryBorder} rounded-md focus:ring-orange-500 focus:border-orange-500`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-orange-800">Location</label>
                      <Autocomplete
                        onLoad={(auto) => setAutocomplete(auto)}
                        onPlaceChanged={onPlaceChanged}
                        options={{
                          types: ['place_of_worship', 'restaurant', 'lodging', 'tourist_attraction'],
                          componentRestrictions: { country: 'in' },
                          bounds: {
                            north: 17.8,
                            south: 17.5,
                            east: 75.5,
                            west: 75.2,
                          },
                        }}
                      >
                        <Input
                          type="text"
                          placeholder="Search sacred places in Pandharpur"
                          className={`${themeColors.primaryBorder} focus:ring-orange-500 focus:border-orange-500`}
                        />
                      </Autocomplete>
                      {newEvent.location && (
                        <p className="text-xs mt-1 text-orange-600">
                          Selected: {newEvent.location.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-orange-800">Spiritual Notes</label>
                      <Textarea
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Any special rituals or preparations..."
                        rows={3}
                        className={`${themeColors.primaryBorder} focus:ring-orange-500 focus:border-orange-500`}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={addEvent}
                      className={`w-full ${themeColors.primary} transition-colors`}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add to Itinerary
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Card className="border-yellow-200 bg-yellow-50/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-yellow-900">Spiritual Recommendations</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsAiLoading(true);
                          getAiSuggestions().finally(() => setIsAiLoading(false));
                        }}
                        disabled={isAiLoading}
                        className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
                      >
                        {isAiLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 mr-2" />
                        )}
                        {isAiLoading ? 'Generating...' : 'Get Suggestions'}
                      </Button>
                    </div>
                    <CardDescription className="text-yellow-700">
                      AI-powered sacred place recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiSuggestionsList.length === 0 ? (
                      <div className="text-center py-6">
                        <Sparkles className="h-8 w-8 mx-auto text-yellow-300 mb-3" />
                        <p className="text-yellow-500">Get divine suggestions for your pilgrimage</p>
                        <Button
                          variant="ghost"
                          className="mt-4 text-yellow-600 hover:bg-yellow-50"
                          onClick={() => {
                            setIsAiLoading(true);
                            getAiSuggestions().finally(() => setIsAiLoading(false));
                          }}
                          disabled={isAiLoading}
                        >
                          Generate Recommendations
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {aiSuggestionsList.map((suggestion) => (
                          <motion.div
                            key={suggestion.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border border-yellow-100 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-yellow-900">{suggestion.title}</h3>
                                <p className="text-sm text-yellow-700 mt-1">{suggestion.description}</p>
                                <div className="flex gap-2 mt-2">
                                  <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                                    {suggestion.type}
                                  </Badge>
                                  <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                                    {suggestion.duration}
                                  </Badge>
                                </div>
                                {suggestion.practices && (
                                  <p className="text-xs text-yellow-500 mt-2">
                                    <span className="font-medium">Practices:</span> {suggestion.practices.join(', ')}
                                  </p>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => addAiSuggestion(suggestion)}
                                className="text-yellow-600 hover:bg-yellow-100"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="map" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-orange-100">
                  <TabsTrigger
                    value="map"
                    className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                  >
                    <MapPin className="h-4 w-4 mr-2" /> Sacred Map
                  </TabsTrigger>
                  <TabsTrigger
                    value="itinerary"
                    className="data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                  >
                    <Calendar className="h-4 w-4 mr-2" /> Your Itinerary
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="map">
                  <Card className={`${themeColors.cardBg} backdrop-blur-sm`}>
                    <CardHeader>
                      <CardTitle className="text-orange-900">Sacred Pandharpur Map</CardTitle>
                      <CardDescription className="text-orange-700">
                        Explore divine locations and routes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-xl overflow-hidden border border-orange-200">
                        <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          zoom={14}
                          center={selectedPlace?.geometry?.location || pandharpurCenter}
                          onLoad={(map) => {
                            setMap(map);
                            mapRef.current = map;
                          }}
                          options={{
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                            styles: [
                              {
                                featureType: "poi",
                                elementType: "labels",
                                stylers: [{ visibility: "off" }]
                              }
                            ]
                          }}
                        >
                          {selectedPlace && (
                            <Marker
                              position={selectedPlace.geometry.location}
                              title={selectedPlace.name}
                              icon={{
                                url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                              }}
                            />
                          )}
                          {events.filter(e => e.location).map((event, index) => (
                            <Marker
                              key={event.id}
                              position={{ lat: event.location.lat, lng: event.location.lng }}
                              title={event.name}
                              label={{
                                text: (index + 1).toString(),
                                color: 'white',
                                fontSize: '12px',
                                fontWeight: 'bold',
                              }}
                              icon={{
                                url: event.type === 'temple'
                                  ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                                  : event.type === 'food'
                                    ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                                    : 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                              }}
                            />
                          ))}
                          {directions && <DirectionsRenderer directions={directions} />}
                        </GoogleMap>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-orange-700">
                        {events.filter(e => e.location).length} sacred locations plotted
                      </div>
                      {events.filter(e => e.location).length > 1 && (
                        <Button
                          variant="outline"
                          onClick={optimizeRoute}
                          disabled={routeOptimized}
                          className={`${themeColors.primaryBorder} ${themeColors.primaryText} hover:${themeColors.primaryBg}`}
                        >
                          <Route className="h-4 w-4 mr-2" />
                          {routeOptimized ? 'Route Optimized' : 'Optimize Route'}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="itinerary">
                  <Card className={`${themeColors.cardBg} backdrop-blur-sm`}>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-orange-900">Your Spiritual Journey</CardTitle>
                          <CardDescription className="text-orange-700">
                            {events.length} planned {events.length === 1 ? 'activity' : 'activities'}
                          </CardDescription>
                        </div>
                        {events.length > 1 && (
                          <Button
                            variant="outline"
                            onClick={optimizeRoute}
                            disabled={routeOptimized}
                            className={`${themeColors.primaryBorder} ${themeColors.primaryText} hover:${themeColors.primaryBg}`}
                          >
                            <Route className="h-4 w-4 mr-2" />
                            {routeOptimized ? 'Route Optimized' : 'Optimize Route'}
                          </Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {events.length === 0 ? (
                        <div className="text-center py-12">
                          <Landmark className="h-10 w-10 mx-auto text-orange-300 mb-4" />
                          <h3 className="text-lg font-medium text-orange-800 mb-2">Your spiritual journey begins here</h3>
                          <p className="text-orange-600 mb-6">Add activities or generate a full plan to begin</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {events.map((event, index) => (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              className="border border-orange-100 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                      ${index === 0 ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'}`}>
                                      {index + 1}
                                    </div>
                                    {index < events.length - 1 && (
                                      <div className="w-0.5 h-8 bg-orange-200 my-1"></div>
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-medium text-orange-900">{event.name}</h3>
                                      {event.isAiGenerated && (
                                        <Badge variant="outline" className="border-yellow-200 text-yellow-600">
                                          AI Suggested
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-orange-700 flex items-center gap-1 mt-1">
                                      <Calendar className="h-3 w-3" />
                                      {format(new Date(event.date), 'PPP')} at {event.time}
                                    </p>
                                    {event.location && (
                                      <p className="text-sm text-orange-700 flex items-center gap-1 mt-1">
                                        <MapPin className="h-3 w-3" />
                                        {event.location.name}
                                      </p>
                                    )}
                                    {event.description && (
                                      <p className="text-sm text-orange-600 mt-2">{event.description}</p>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeEvent(event.id)}
                                  className="text-orange-600 hover:bg-orange-100"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}