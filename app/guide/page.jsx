

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import DatePicker from 'react-datepicker';

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

export default function TripPlanner() {
  // Google Maps API Setup
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // Authentication
  const { isLoaded: isUserLoaded, user } = useUser();
  const userId = user?.id;

  // State management
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [events, setEvents] = useState([]);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [routeOptimized, setRouteOptimized] = useState(false);
  const mapRef = useRef(null);

  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'landmark',
    date: new Date(),
    time: '09:00',
    description: '',
    location: null,
    priority: 'medium',
  });

  // Initialize trip data for new users
  const initializeTrip = async () => {
    if (!userId) return;
    
    try {
      const tripRef = doc(db, 'trips', userId);
      const tripSnap = await getDoc(tripRef);
      
      if (!tripSnap.exists()) {
        await setDoc(tripRef, {
          userId,
          createdAt: new Date(),
          destination: 'Pandharpur',
          itinerary: [],
          lastUpdated: new Date(),
          coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        });
      }
    } catch (error) {
      toast.error('Error initializing trip data');
      console.error(error);
    }
  };

  // Load user's trip data
  useEffect(() => {
    if (!isUserLoaded) return;
    
    if (!userId) {
      setLoading(false);
      return;
    }

    // Initialize trip first
    initializeTrip().then(() => {
      // Then set up the listener
      const unsubscribe = onSnapshot(
        doc(db, 'trips', userId),
        (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            setTrip(data);
            setEvents(data.itinerary || []);
            
            // Sort events by date and time
            const sortedEvents = [...(data.itinerary || [])].sort((a, b) => {
              const dateA = new Date(`${a.date} ${a.time}`);
              const dateB = new Date(`${b.date} ${b.time}`);
              return dateA - dateB;
            });
            setEvents(sortedEvents);
          }
          setLoading(false);
        },
        (error) => {
          toast.error('Error loading trip data');
          console.error(error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    });

    // Load AI suggestions
    const loadAiSuggestions = async () => {
      try {
        const aiRef = doc(db, 'ai-suggestions', userId);
        const aiSnap = await getDoc(aiRef);
        if (aiSnap.exists()) {
          setAiSuggestions(aiSnap.data().suggestions || []);
        }
      } catch (error) {
        console.error('Error loading AI suggestions:', error);
      }
    };
    
    loadAiSuggestions();
  }, [isUserLoaded, userId]);

  // Handle place selection from Autocomplete
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
      
      // Pan map to selected location
      if (mapRef.current) {
        mapRef.current.panTo(place.geometry.location);
        mapRef.current.setZoom(16);
      }
    }
  }, [autocomplete]);

  // Calculate directions between points
  const calculateDirections = useCallback((waypoints) => {
    if (!window.google || !mapRef.current) return;

    const directionsService = new window.google.maps.DirectionsService();
    
    // Convert events to waypoints format
    const formattedWaypoints = waypoints
      .filter(event => event.location)
      .map(event => ({
        location: new window.google.maps.LatLng(event.location.lat, event.location.lng),
        stopover: true,
      }));

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

  // Optimize route
  const optimizeRoute = () => {
    if (events.length < 2) {
      toast.warning('You need at least 2 locations to optimize a route');
      return;
    }
    calculateDirections(events);
  };

  // Add new event to itinerary
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
      await setDoc(doc(db, 'trips', userId), {
        itinerary: [...events, eventToAdd],
        lastUpdated: new Date(),
      }, { merge: true });
      
      toast.success('Event added to itinerary');
      setNewEvent({
        name: '',
        type: 'landmark',
        date: new Date(),
        time: '09:00',
        description: '',
        location: null,
        priority: 'medium',
      });
      setSelectedPlace(null);
    } catch (error) {
      toast.error('Failed to add event');
      console.error(error);
    }
  };

  // Remove event from itinerary
  const removeEvent = async (eventId) => {
    if (!userId) return;
    
    try {
      await setDoc(doc(db, 'trips', userId), {
        itinerary: events.filter(event => event.id !== eventId),
        lastUpdated: new Date(),
      }, { merge: true });
      toast.success('Event removed');
    } catch (error) {
      toast.error('Failed to remove event');
      console.error(error);
    }
  };

  // Get AI suggestions for the trip
  const getAiSuggestions = async () => {
    if (!userId) return;
    
    setIsAiLoading(true);
    try {
      // In a real app, you would call your AI API here
      // This is a mock implementation
      const mockSuggestions = [
        {
          id: '1',
          title: 'Morning Aarti at Vitthal Temple',
          description: 'Experience the divine morning aarti at 6 AM for a spiritual start to your day',
          type: 'spiritual',
          duration: '1 hour',
          bestTime: '6:00 AM',
        },
        {
          id: '2',
          title: 'Pandharpur Prasadam',
          description: 'Try the famous Prasadam at Vitthal Temple kitchen',
          type: 'food',
          duration: '30 mins',
          bestTime: '12:00 PM',
        },
        {
          id: '3',
          title: 'Chandrabhaga River Visit',
          description: 'Take a holy dip in the Chandrabhaga river during sunset',
          type: 'landmark',
          duration: '1 hour',
          bestTime: '6:00 PM',
        },
      ];

      // Save to Firestore
      await setDoc(doc(db, 'ai-suggestions', userId), {
        suggestions: mockSuggestions,
        generatedAt: new Date(),
      });

      setAiSuggestions(mockSuggestions);
      toast.success('AI suggestions generated!');
    } catch (error) {
      toast.error('Failed to get AI suggestions');
      console.error(error);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Add AI suggestion to itinerary
  const addAiSuggestion = async (suggestion) => {
    const eventToAdd = {
      name: suggestion.title,
      type: suggestion.type === 'food' ? 'food' : 'landmark',
      date: newEvent.date, // Use the currently selected date
      time: suggestion.bestTime,
      description: suggestion.description,
      location: null, // Would be set in a real implementation
      priority: 'high',
      id: `ai-${suggestion.id}`,
      isAiGenerated: true,
    };

    try {
      await setDoc(doc(db, 'trips', userId), {
        itinerary: [...events, eventToAdd],
        lastUpdated: new Date(),
      }, { merge: true });
      
      toast.success('Suggestion added to itinerary');
    } catch (error) {
      toast.error('Failed to add suggestion');
      console.error(error);
    }
  };

  // Download itinerary as PDF
  const downloadItinerary = () => {
    toast.info('This would generate a PDF in a real implementation');
    // In a real app, implement PDF generation here
  };

  // Share trip
  const shareTrip = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Pandharpur Trip Plan',
        text: 'Check out my trip plan for Pandharpur!',
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      toast.info('Copied trip link to clipboard');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || (isUserLoaded && !user)) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12" /></div>;
  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Trip Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-amber-900">Pandharpur Trip Planner</h1>
            <p className="text-amber-700 mt-2">Plan your spiritual journey to the holy city</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={shareTrip}>
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
            <Button variant="outline" onClick={downloadItinerary}>
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        {!userId ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">Sign In to Plan Your Trip</h2>
            <p className="text-amber-700 mb-6">Create your personalized Pandharpur itinerary with our planner</p>
            <Button size="lg">Sign In</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Itinerary Form */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-amber-200 bg-amber-50">
                <CardHeader>
                  <CardTitle className="text-amber-900">Add New Event</CardTitle>
                  <CardDescription className="text-amber-700">Plan your Pandharpur visit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-amber-800">Event Name</label>
                    <Input
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}
                      placeholder="e.g. Vitthal Temple Visit"
                      className="border-amber-300 focus:ring-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-amber-800">Type</label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({...newEvent, type: value})}
                      >
                        <SelectTrigger className="border-amber-300">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="landmark">
                            <div className="flex items-center gap-2">
                              <Landmark className="h-4 w-4 text-amber-600" /> Landmark
                            </div>
                          </SelectItem>
                          <SelectItem value="food">
                            <div className="flex items-center gap-2">
                              <Utensils className="h-4 w-4 text-amber-600" /> Food
                            </div>
                          </SelectItem>
                          <SelectItem value="accommodation">
                            <div className="flex items-center gap-2">
                              <Hotel className="h-4 w-4 text-amber-600" /> Stay
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-amber-800">Priority</label>
                      <Select
                        value={newEvent.priority}
                        onValueChange={(value) => setNewEvent({...newEvent, priority: value})}
                      >
                        <SelectTrigger className="border-amber-300">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-amber-800">Date</label>
                      <DatePicker
                        selected={newEvent.date}
                        onChange={(date) => setNewEvent({...newEvent, date})}
                        className="w-full p-2 border border-amber-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-amber-800">Time</label>
                      <Input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        className="w-full p-2 border border-amber-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-amber-800">Location</label>
                    <Autocomplete
                      onLoad={(auto) => setAutocomplete(auto)}
                      onPlaceChanged={onPlaceChanged}
                      options={{
                        types: ['tourist_attraction', 'restaurant', 'lodging'],
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
                        placeholder="Search places in Pandharpur"
                        className="border-amber-300 focus:ring-amber-500"
                      />
                    </Autocomplete>
                    {newEvent.location && (
                      <p className="text-xs mt-1 text-amber-600">
                        Selected: {newEvent.location.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-amber-800">Description</label>
                    <Textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      placeholder="Any special notes or preparations..."
                      rows={3}
                      className="border-amber-300 focus:ring-amber-500"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={addEvent} className="w-full bg-amber-600 hover:bg-amber-700">
                    <Plus className="h-4 w-4 mr-2" /> Add to Itinerary
                  </Button>
                </CardFooter>
              </Card>

              {/* AI Suggestions Section */}
              <Card className="border-purple-200 bg-purple-50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-purple-900">AI Suggestions</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={getAiSuggestions}
                      disabled={isAiLoading}
                      className="border-purple-300 text-purple-700"
                    >
                      {isAiLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      {isAiLoading ? 'Generating...' : 'Get Suggestions'}
                    </Button>
                  </div>
                  <CardDescription className="text-purple-700">
                    Personalized recommendations for your trip
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiSuggestions.length === 0 ? (
                    <div className="text-center py-6">
                      <Sparkles className="h-8 w-8 mx-auto text-purple-300 mb-3" />
                      <p className="text-purple-500">Get AI-powered suggestions for your Pandharpur visit</p>
                      <Button 
                        variant="ghost" 
                        className="mt-4 text-purple-600"
                        onClick={getAiSuggestions}
                        disabled={isAiLoading}
                      >
                        Generate Suggestions
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {aiSuggestions.map((suggestion) => (
                        <div key={suggestion.id} className="border border-purple-100 rounded-lg p-4 bg-white">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-purple-900">{suggestion.title}</h3>
                              <p className="text-sm text-purple-700 mt-1">{suggestion.description}</p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant="outline" className="text-purple-600 border-purple-200">
                                  {suggestion.type}
                                </Badge>
                                <Badge variant="outline" className="text-purple-600 border-purple-200">
                                  {suggestion.duration}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addAiSuggestion(suggestion)}
                              className="text-purple-600 hover:bg-purple-100"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Map and Itinerary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs for different views */}
              <Tabs defaultValue="itinerary" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-amber-100">
                  <TabsTrigger 
                    value="itinerary" 
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                  >
                    Your Itinerary
                  </TabsTrigger>
                  <TabsTrigger 
                    value="map" 
                    className="data-[state=active]:bg-amber-500 data-[state=active]:text-white"
                  >
                    Map View
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="itinerary">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-amber-900">Your Itinerary</CardTitle>
                          <CardDescription className="text-amber-700">
                            {events.length} planned {events.length === 1 ? 'event' : 'events'}
                          </CardDescription>
                        </div>
                        {events.length > 1 && (
                          <Button 
                            variant="outline" 
                            onClick={optimizeRoute}
                            disabled={routeOptimized}
                            className="border-amber-300 text-amber-700"
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
                          <MapPin className="h-10 w-10 mx-auto text-amber-300 mb-4" />
                          <h3 className="text-lg font-medium text-amber-800 mb-2">Your itinerary is empty</h3>
                          <p className="text-amber-600 mb-6">Add events to start planning your Pandharpur trip</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {events.map((event, index) => (
                            <div key={event.id} className="border border-amber-100 rounded-lg p-4 bg-white relative">
                              <div className="flex justify-between items-start">
                                <div className="flex gap-4">
                                  <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                      ${index === 0 ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'}`}>
                                      {index + 1}
                                    </div>
                                    {index < events.length - 1 && (
                                      <div className="w-0.5 h-8 bg-amber-200 my-1"></div>
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-medium text-amber-900">{event.name}</h3>
                                      {event.priority === 'high' && (
                                        <Badge variant="destructive">High Priority</Badge>
                                      )}
                                      {event.isAiGenerated && (
                                        <Badge variant="outline" className="border-purple-200 text-purple-600">
                                          AI Suggested
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-amber-700 flex items-center gap-1 mt-1">
                                      <Calendar className="h-3 w-3" />
                                      {format(new Date(event.date), 'PPP')} at {event.time}
                                    </p>
                                    {event.location && (
                                      <p className="text-sm text-amber-700 flex items-center gap-1 mt-1">
                                        <MapPin className="h-3 w-3" />
                                        {event.location.name}
                                      </p>
                                    )}
                                    {event.description && (
                                      <p className="text-sm text-amber-600 mt-2">{event.description}</p>
                                    )}
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeEvent(event.id)}
                                  className="text-amber-600 hover:bg-amber-100"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="map">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-amber-900">Pandharpur Map</CardTitle>
                      <CardDescription className="text-amber-700">
                        Explore locations and get directions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-xl overflow-hidden">
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
                                url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                              }}
                            />
                          ))}
                          {directions && <DirectionsRenderer directions={directions} />}
                        </GoogleMap>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-amber-700">
                        {events.filter(e => e.location).length} locations plotted
                      </div>
                      {events.filter(e => e.location).length > 1 && (
                        <Button 
                          variant="outline" 
                          onClick={optimizeRoute}
                          disabled={routeOptimized}
                          className="border-amber-300 text-amber-700"
                        >
                          <Route className="h-4 w-4 mr-2" />
                          {routeOptimized ? 'Route Optimized' : 'Optimize Route'}
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Popular Pandharpur Locations */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-900">Popular Pandharpur Locations</CardTitle>
                  <CardDescription className="text-orange-700">
                    Must-visit places for first-timers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        name: 'Shri Vitthal Rukmini Temple',
                        type: 'landmark',
                        description: 'The main temple dedicated to Lord Vitthal',
                        icon: <Landmark className="h-5 w-5 text-orange-500" />,
                      },
                      {
                        name: 'Pandharpur Pilgrimage Museum',
                        type: 'landmark',
                        description: 'Learn about the history of the pilgrimage',
                        icon: <Landmark className="h-5 w-5 text-orange-500" />,
                      },
                      {
                        name: 'Chandrabhaga River',
                        type: 'landmark',
                        description: 'Take a holy dip in the sacred river',
                        icon: <Landmark className="h-5 w-5 text-orange-500" />,
                      },
                      {
                        name: 'Purohit Lunch Home',
                        type: 'food',
                        description: 'Famous for authentic Maharashtrian meals',
                        icon: <Utensils className="h-5 w-5 text-orange-500" />,
                      },
                      {
                        name: 'Vitthal Temple Prasadalaya',
                        type: 'food',
                        description: 'Experience the temple kitchen offerings',
                        icon: <Utensils className="h-5 w-5 text-orange-500" />,
                      },
                      {
                        name: 'Pandharpur Wari',
                        type: 'event',
                        description: 'Famous pilgrimage procession during Ashadi',
                        icon: <Landmark className="h-5 w-5 text-orange-500" />,
                      },
                    ].map((place, index) => (
                      <div
                        key={index}
                        className="border border-orange-100 rounded-lg p-4 bg-white hover:bg-orange-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setNewEvent(prev => ({
                            ...prev,
                            name: place.name,
                            type: place.type === 'food' ? 'food' : 'landmark',
                            description: place.description,
                          }));
                          toast.info(`Search for "${place.name}" in the location field`);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-orange-100 rounded-full">
                            {place.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-orange-900">{place.name}</h3>
                            <p className="text-sm text-orange-700 mt-1">{place.description}</p>
                            <Badge variant="outline" className="mt-2 text-orange-600 border-orange-200">
                              {place.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}