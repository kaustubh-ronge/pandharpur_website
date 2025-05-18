
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { format, isValid } from 'date-fns';
import { Loader2, MapPin, Calendar, Landmark, Utensils, Hotel, Plus, Trash2, Sparkles, Route, Share2, Download, Sun, Moon, Clock, User, Heart, Star, ChevronDown, ChevronUp } from 'lucide-react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { trips, aiSuggestions, users } from '@/lib/schema';
import { syncClerkUser } from '@/lib/user-sync';

const libraries = ['places', 'geometry'];
const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem',
};
const pandharpurCenter = { lat: 17.6792, lng: 75.3319 };

// Complete Pandharpur location data
const pandharpurLocations = {
  temples: [
    {
      id: 'vitthal',
      name: 'Shri Vitthal Rukmini Temple',
      description: 'The main temple dedicated to Lord Vitthal and Goddess Rukmini',
      location: { lat: 17.6792, lng: 75.3319 },
      importance: 'High',
      bestTime: 'Morning (5:30 AM - 12:00 PM)',
      practices: ['Darshan', 'Aarti', 'Abhishek', 'Palkhi Procession'],
      rituals: {
        morning: 'Kakad Aarti (5:30 AM)',
        afternoon: 'Madhyan Puja (12:00 PM)',
        evening: 'Dhoop Aarti (6:30 PM)',
        night: 'Shej Aarti (10:00 PM)'
      },
      dressCode: 'Traditional Indian attire preferred',
      specialNotes: 'Footwear not allowed inside temple premises'
    },
    {
      id: 'tukaram',
      name: 'Sant Tukaram Maharaj Temple',
      description: 'Dedicated to the famous Bhakti saint Sant Tukaram',
      location: { lat: 17.6815, lng: 75.3289 },
      importance: 'High',
      bestTime: 'Daytime (8:00 AM - 6:00 PM)',
      practices: ['Darshan', 'Palkhi'],
      rituals: {
        morning: 'Morning Aarti (8:00 AM)',
        evening: 'Evening Aarti (6:00 PM)'
      }
    },
    {
      id: 'pundalik',
      name: 'Pundalik Temple',
      description: 'Temple dedicated to Pundalik who brought Lord Vitthal to Pandharpur',
      location: { lat: 17.6778, lng: 75.3305 },
      importance: 'Medium',
      bestTime: 'Daytime'
    }
  ],
  food: [
    {
      id: 'prasadalaya',
      name: 'Pandharpur Prasadalaya',
      description: 'Experience divine temple food offerings',
      location: { lat: 17.6785, lng: 75.3301 },
      type: 'Vegetarian',
      bestTime: 'Meal times (8:00-10:00 AM, 12:00-2:00 PM, 7:00-9:00 PM)',
      specialties: ['Puran Poli', 'Amti', 'Shrikhand']
    },
    {
      id: 'bhog',
      name: 'Bhog Restaurant',
      description: 'Pure vegetarian restaurant near temple',
      location: { lat: 17.6802, lng: 75.3298 },
      type: 'Vegetarian',
      bestTime: '11:00 AM - 10:00 PM'
    }
  ],
  landmarks: [
    {
      id: 'chandrabhaga',
      name: 'Chandrabhaga River',
      description: 'Sacred river where devotees take holy dips',
      location: { lat: 17.6778, lng: 75.3325 },
      bestTime: 'Morning (5:00-8:00 AM)',
      significance: 'Considered as holy as the Ganges'
    },
    {
      id: 'warkari',
      name: 'Warkari Museum',
      description: 'Museum showcasing Warkari culture and traditions',
      location: { lat: 17.6821, lng: 75.3278 },
      bestTime: '10:00 AM - 5:00 PM',
      entryFee: '₹20 per person'
    }
  ],
  accommodations: [
    {
      id: 'dharamshala1',
      name: 'Vitthal Temple Dharamshala',
      description: 'Basic accommodation for pilgrims',
      location: { lat: 17.6795, lng: 75.3308 },
      type: 'Dharamshala',
      amenities: ['Basic rooms', 'Shared bathrooms'],
      price: 'Donation basis'
    },
    {
      id: 'hotel1',
      name: 'Pandharpur Heritage',
      description: 'Comfortable hotel near temple',
      location: { lat: 17.6812, lng: 75.3265 },
      type: 'Hotel',
      amenities: ['AC rooms', 'Restaurant', 'WiFi'],
      price: '₹1500-3000 per night'
    }
  ]
};

// AI Trip Planner Profiles
const aiPlannerProfiles = [
  {
    id: 'spiritual_seeker',
    name: 'Spiritual Seeker',
    description: 'Complete temple experience with all rituals',
    icon: <Heart className="h-5 w-5 text-rose-500" />,
    preferences: {
      focus: 'temples',
      pace: 'medium',
      includeRituals: true,
      mealPreferences: 'vegetarian',
      accommodation: 'dharamshala',
      duration: 2
    }
  },
  {
    id: 'cultural_explorer',
    name: 'Cultural Explorer',
    description: 'Mix of spiritual sites and local culture',
    icon: <User className="h-5 w-5 text-amber-500" />,
    preferences: {
      focus: 'temples,landmarks',
      pace: 'slow',
      includeRituals: false,
      mealPreferences: 'local_cuisine',
      accommodation: 'hotel',
      duration: 3
    }
  },
  {
    id: 'quick_pilgrim',
    name: 'Quick Pilgrim',
    description: 'Essential visits for time-pressed devotees',
    icon: <Clock className="h-5 w-5 text-emerald-500" />,
    preferences: {
      focus: 'main_temples',
      pace: 'fast',
      includeRituals: true,
      mealPreferences: 'simple',
      accommodation: 'none',
      duration: 1
    }
  },
  {
    id: 'family_trip',
    name: 'Family Trip',
    description: 'Balanced itinerary for all ages',
    icon: <Sun className="h-5 w-5 text-blue-500" />,
    preferences: {
      focus: 'temples,food,landmarks',
      pace: 'slow',
      includeRituals: false,
      mealPreferences: 'varied',
      accommodation: 'hotel',
      duration: 2
    }
  }
];

export default function TripPlanner() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { isLoaded: isUserLoaded, user } = useUser();
  const userId = user?.id;

  const [activeTab, setActiveTab] = useState('map');
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAIPlanner, setShowAIPlanner] = useState(false);
  const [events, setEvents] = useState([]);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isPlanning, setIsPlanning] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: '',
    type: 'temple',
    date: new Date(),
    time: '09:00',
    description: '',
    location: null,
  });
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  // Initialize user and trip data
  useEffect(() => {
    if (!isUserLoaded || !userId) return;

    const initializeData = async () => {
      try {
        setLoading(true);

        // Sync user with Clerk
        await syncClerkUser({
          id: userId,
          primaryEmailAddress: { emailAddress: user.primaryEmailAddress?.emailAddress || '' },
          fullName: user.fullName || ''
        });

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
        toast.error('Failed to initialize trip data');
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [isUserLoaded, userId]);

  // Fetch trip data directly from DB
  const fetchTripData = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      // Fetch trips and suggestions in parallel
      const [tripResult, suggestionsResult] = await Promise.all([
        db.select().from(trips).where(eq(trips.userId, userId)),
        db.select().from(aiSuggestions).where(eq(aiSuggestions.userId, userId))
      ]);

      if (tripResult.length > 0) {
        const data = tripResult[0];
        const sortedEvents = [...(data.itinerary || [])].sort((a, b) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA - dateB;
        });
        setEvents(sortedEvents);
      }

      if (suggestionsResult.length > 0) {
        setAiResponse(suggestionsResult[0].suggestions || null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load trip data');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Add event with direct DB update
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
      isCustom: true
    };

    try {
      // Optimistic UI update
      setEvents(prev => [...prev, eventToAdd].sort((a, b) => {
        const dateA = new Date(`${a.date} ${a.time}`);
        const dateB = new Date(`${b.date} ${b.time}`);
        return dateA - dateB;
      }));

      // Update database
      const result = await db.select().from(trips).where(eq(trips.userId, userId));
      const currentItinerary = result.length > 0 ? result[0].itinerary || [] : [];

      await db.update(trips)
        .set({
          itinerary: [...currentItinerary, eventToAdd],
          updatedAt: new Date()
        })
        .where(eq(trips.userId, userId));

      toast.success('Activity added!');
      setNewEvent({
        name: '',
        type: 'temple',
        date: new Date(),
        time: '09:00',
        description: '',
        location: null,
      });
      setSelectedPlace(null);
      setActiveTab('map');
    } catch (error) {
      // Rollback on error
      setEvents(prev => prev.filter(e => e.id !== eventToAdd.id));
      toast.error('Failed to add activity');
      console.error(error);
    }
  };

  const deleteAISuggestions = async () => {
    if (!userId) return;

    try {
      // Delete from database
      await db.delete(aiSuggestions).where(eq(aiSuggestions.userId, userId));

      // Update local state
      setAiResponse(null);
      toast.success('AI suggestions removed');
    } catch (error) {
      console.error('Error deleting AI suggestions:', error);
      toast.error('Failed to remove AI suggestions');
    }
  };

  // Remove event with direct DB update
  const removeEvent = async (eventId) => {
    if (!userId) {
      toast.error('Please sign in to remove events');
      return;
    }

    try {
      // Optimistic UI update
      setEvents(prev => prev.filter(e => e.id !== eventId));

      // Update database
      const result = await db.select().from(trips).where(eq(trips.userId, userId));
      if (result.length === 0) return;

      const currentItinerary = result[0].itinerary || [];
      const updatedItinerary = currentItinerary.filter(event => event.id !== eventId);

      await db.update(trips)
        .set({
          itinerary: updatedItinerary,
          updatedAt: new Date()
        })
        .where(eq(trips.userId, userId));

      toast.success('Activity removed');
    } catch (error) {
      // Rollback would require re-fetching data
      await fetchTripData();
      toast.error('Failed to remove activity');
      console.error(error);
    }
  };

  // Clear all events
  const clearAllEvents = async () => {
    if (!userId) {
      toast.error('Please sign in to clear events');
      return;
    }

    try {
      // Optimistic UI update
      setEvents([]);

      // Update database
      await db.update(trips)
        .set({
          itinerary: [],
          updatedAt: new Date()
        })
        .where(eq(trips.userId, userId));

      toast.success('All activities cleared');
    } catch (error) {
      // Rollback on error
      await fetchTripData();
      toast.error('Failed to clear activities');
      console.error(error);
    }
  };

  // Generate AI-powered itinerary and save to DB
  const generateAIItenary = async (profile) => {
    if (!userId) {
      toast.error('Please sign in to use AI planner');
      return;
    }

    setIsPlanning(true);
    try {
      const prompt = `
        Create a detailed ${profile.preferences.pace}-paced ${profile.name} itinerary for Pandharpur 
        spanning ${profile.preferences.duration} days with the following preferences:
        - Focus: ${profile.preferences.focus}
        - Include rituals: ${profile.preferences.includeRituals}
        - Meal preferences: ${profile.preferences.mealPreferences}
        - Accommodation: ${profile.preferences.accommodation}
        
        Use only real locations from Pandharpur including:
        Temples: ${pandharpurLocations.temples.map(t => t.name).join(', ')}
        Food: ${pandharpurLocations.food.map(f => f.name).join(', ')}
        Landmarks: ${pandharpurLocations.landmarks.map(l => l.name).join(', ')}
        Accommodations: ${pandharpurLocations.accommodations.map(a => a.name).join(', ')}
        
        Include:
        1. Temple visits with timing based on actual aarti schedules
        2. Meal breaks at appropriate locations
        3. Cultural activities if requested
        4. Travel time between locations
        5. Special notes about dress code and customs
        
        Return in this JSON format:
        {
          "itinerary": [
            {
              "day": 1,
              "date": "YYYY-MM-DD",
              "activities": [
                {
                  "name": "Activity name",
                  "type": "temple/food/cultural",
                  "time": "HH:MM",
                  "duration": "X hours",
                  "location": {"lat": 0, "lng": 0},
                  "description": "Detailed description",
                  "notes": "Special instructions"
                }
              ]
            }
          ],
          "summary": "Brief trip summary",
          "packingTips": ["List of items to pack"]
        }
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const rawResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      const parsedResponse = JSON.parse(rawResponse.replace(/^```json\n/, '').replace(/\n```$/, ''));

      setAiResponse(parsedResponse);

      // Convert AI response to events
      const generatedEvents = parsedResponse.itinerary.flatMap(day =>
        day.activities.map(activity => ({
          ...activity,
          date: new Date(day.date),
          id: `ai-${Math.random().toString(36).substr(2, 9)}`,
          isAutoPlanned: true
        }))
      );

      // Update both trips and ai_suggestions tables
      await Promise.all([
        db.update(trips)
          .set({
            itinerary: generatedEvents,
            updatedAt: new Date()
          })
          .where(eq(trips.userId, userId)),

        db.insert(aiSuggestions)
          .values({
            userId,
            suggestions: parsedResponse,
            generatedAt: new Date()
          })
          .onConflictDoUpdate({
            target: aiSuggestions.userId,
            set: {
              suggestions: parsedResponse,
              generatedAt: new Date()
            }
          })
      ]);

      // Update local state
      setEvents(generatedEvents);
      toast.success('AI-generated itinerary created and saved!');
    } catch (error) {
      console.error('AI Error:', error);
      toast.error('Failed to generate itinerary');
    } finally {
      setIsPlanning(false);
      setShowAIPlanner(false);
    }
  };

  // Calculate directions for optimized route
  const calculateDirections = useCallback((waypoints) => {
    if (!window.google || !mapRef.current) return;

    const directionsService = new window.google.maps.DirectionsService();
    const formattedWaypoints = waypoints
      .filter(event => event.location)
      .map(event => ({
        location: new window.google.maps.LatLng(event.location.lat, event.location.lng),
        stopover: true,
      }));

    if (formattedWaypoints.length < 2) return;

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
        }
      }
    );
  }, []);

  // Auto-optimize route when events change
  useEffect(() => {
    if (events.length > 1) {
      calculateDirections(events);
    }
  }, [events, calculateDirections]);

  // Handle place selection
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
  if (!isLoaded || !isUserLoaded) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-12 w-12 text-amber-600" />
    </div>
  );
  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader2 className="animate-spin h-12 w-12 text-amber-600" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -50, 20, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-72 h-72 bg-orange-100 rounded-full mix-blend-multiply filter blur-xl opacity-15"
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 40, -30, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
              Pandharpur Spiritual Journey Planner
            </h1>
            <p className="text-amber-700 mt-2">Plan your divine experience with AI guidance</p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => setShowAIPlanner(true)}
              className="bg-amber-600 hover:bg-amber-700 transition-all"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              AI Trip Planner
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowTemplates(!showTemplates)}
              className="border-amber-300 text-amber-600 hover:bg-amber-50"
            >
              {showTemplates ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-2" />
                  Hide Templates
                </>
              ) : (
                <>
                  <Star className="h-4 w-4 mr-2" />
                  View Templates
                </>
              )}
            </Button>
          </div>
        </motion.div>

        {/* AI Planner Modal */}
        <AnimatePresence>
          {showAIPlanner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowAIPlanner(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-white rounded-lg p-6 w-full max-w-md"
                onClick={e => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold text-amber-800 mb-4">AI Trip Planner</h2>
                <p className="text-amber-600 mb-6">Select your travel profile:</p>

                <div className="space-y-3">
                  {aiPlannerProfiles.map(profile => (
                    <motion.div
                      key={profile.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border border-amber-200 rounded-lg p-4 cursor-pointer hover:bg-amber-50 transition-all"
                      onClick={() => generateAIItenary(profile)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                          {profile.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-amber-900">{profile.name}</h3>
                          <p className="text-sm text-amber-600">{profile.description}</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-amber-600 border-amber-200">
                              {profile.preferences.duration} days
                            </Badge>
                            <Badge variant="outline" className="text-amber-600 border-amber-200">
                              {profile.preferences.pace} pace
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {isPlanning && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-amber-600">
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span>Generating your perfect itinerary...</span>
                  </div>
                )}

                <Button
                  variant="ghost"
                  className="mt-6 w-full text-amber-600 hover:bg-amber-100"
                  onClick={() => setShowAIPlanner(false)}
                >
                  Cancel
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Response Summary */}
        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-amber-200 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-amber-900">AI Trip Summary</h3>
                <p className="text-sm text-amber-600 mt-1">{aiResponse.summary}</p>
                <div className="mt-2">
                  <h4 className="text-xs font-medium text-amber-500">Packing Tips:</h4>
                  <ul className="list-disc list-inside text-sm text-amber-700">
                    {aiResponse.packingTips?.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={deleteAISuggestions}  // Changed from onClick={() => setAiResponse(null)}
                className="text-amber-600 hover:bg-amber-100"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Activity Form */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Add Spiritual Activity</CardTitle>
                  <CardDescription className="text-amber-700">
                    Plan your sacred visit
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-amber-800">Activity Name</label>
                    <Input
                      value={newEvent.name}
                      onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                      placeholder="e.g. Vitthal Temple Morning Aarti"
                      className="border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-amber-800">Activity Type</label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                    >
                      <SelectTrigger className="border-amber-300">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="temple">
                          <div className="flex items-center gap-2">
                            <Landmark className="h-4 w-4 text-amber-600" /> Temple
                          </div>
                        </SelectItem>
                        <SelectItem value="food">
                          <div className="flex items-center gap-2">
                            <Utensils className="h-4 w-4 text-amber-600" /> Food
                          </div>
                        </SelectItem>
                        <SelectItem value="cultural">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-amber-600" /> Cultural
                          </div>
                        </SelectItem>
                        <SelectItem value="accommodation">
                          <div className="flex items-center gap-2">
                            <Hotel className="h-4 w-4 text-amber-600" /> Accommodation
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-amber-800">Date</label>
                      <DatePicker
                        selected={newEvent.date}
                        onChange={(date) => setNewEvent({ ...newEvent, date })}
                        className="w-full p-2 border border-amber-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-amber-800">Time</label>
                      <Input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
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
                        className="border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </Autocomplete>
                    {newEvent.location && (
                      <p className="text-xs mt-1 text-amber-600">
                        Selected: {newEvent.location.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-amber-800">Spiritual Notes</label>
                    <Textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      placeholder="Any special rituals or preparations..."
                      rows={3}
                      className="border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={addEvent}
                    className="w-full bg-amber-600 hover:bg-amber-700 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add to Itinerary
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-amber-900">Sacred Locations</CardTitle>
                  </div>
                  <CardDescription className="text-amber-700">
                    Must-visit spiritual places
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {pandharpurLocations.temples.slice(0, 3).map((temple) => (
                      <motion.div
                        key={temple.id}
                        whileHover={{ y: -2 }}
                        className="border border-amber-100 rounded-lg p-4 bg-white hover:shadow-sm cursor-pointer transition-all"
                        onClick={() => {
                          setNewEvent(prev => ({
                            ...prev,
                            name: temple.name,
                            type: 'temple',
                            description: temple.description,
                            location: temple.location,
                            locationName: temple.name
                          }));
                          toast.info(`Added ${temple.name} to form`);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-amber-100 rounded-full">
                            <Landmark className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-amber-800">{temple.name}</h3>
                            <p className="text-sm text-amber-600 mt-1">{temple.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-amber-600 border-amber-200">
                                Best time: {temple.bestTime}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Tabs */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="map" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-amber-100">
                <TabsTrigger
                  value="map"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <MapPin className="h-4 w-4 mr-2" /> Sacred Map
                </TabsTrigger>
                <TabsTrigger
                  value="itinerary"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" /> Your Itinerary
                </TabsTrigger>
              </TabsList>

              <TabsContent value="map">
                <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-900">Sacred Pandharpur Map</CardTitle>
                    <CardDescription className="text-amber-700">
                      {events.filter(e => e.location).length} locations plotted
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl overflow-hidden border border-amber-200">
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
                                  : event.type === 'accommodation'
                                    ? 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
                                    : 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
                            }}
                          />
                        ))}
                        {directions && <DirectionsRenderer directions={directions} />}
                      </GoogleMap>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="itinerary">
                <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-amber-900">Your Spiritual Journey</CardTitle>
                        <CardDescription className="text-amber-700">
                          {events.length} planned {events.length === 1 ? 'activity' : 'activities'}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowAIPlanner(true)}
                        className="border-amber-300 text-amber-600 hover:bg-amber-50"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        AI Planner
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {events.length === 0 ? (
                      <div className="text-center py-12">
                        <Landmark className="h-10 w-10 mx-auto text-amber-300 mb-4" />
                        <h3 className="text-lg font-medium text-amber-800 mb-2">Your spiritual journey begins here</h3>
                        <p className="text-amber-600 mb-6">Let AI plan your trip or create your own itinerary</p>
                        <div className="flex gap-3 justify-center">
                          <Button
                            onClick={() => setShowAIPlanner(true)}
                            className="bg-amber-600 hover:bg-amber-700"
                          >
                            <Sparkles className="h-4 w-4 mr-2" />
                            AI Trip Planner
                          </Button>
                          <Button
                            onClick={() => setShowTemplates(true)}
                            variant="outline"
                            className="border-amber-300 text-amber-600 hover:bg-amber-50"
                          >
                            <Star className="h-4 w-4 mr-2" />
                            View Templates
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {events.map((event, index) => (
                          <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            className="border border-amber-100 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-amber-500 text-white' : 'bg-amber-100 text-amber-600'}`}>
                                    {index + 1}
                                  </div>
                                  {index < events.length - 1 && (
                                    <div className="w-0.5 h-8 bg-amber-200 my-1"></div>
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-amber-900">{event.name}</h3>
                                    {event.isAutoPlanned && (
                                      <Badge variant="outline" className="border-green-200 text-green-600">
                                        AI-Planned
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-amber-700 flex items-center gap-1 mt-1">
                                    <Calendar className="h-3 w-3" />
                                    {isValid(new Date(event.date)) ? format(new Date(event.date), 'PPP') : 'Invalid date'} at {event.time}
                                  </p>

                                  {event.locationName && (
                                    <p className="text-sm text-amber-700 flex items-center gap-1 mt-1">
                                      <MapPin className="h-3 w-3" />
                                      {event.locationName}
                                    </p>
                                  )}
                                  {event.description && (
                                    <p className="text-sm text-amber-600 mt-2">{event.description}</p>
                                  )}
                                  {event.notes && (
                                    <div className="mt-2 bg-amber-50 p-2 rounded">
                                      <p className="text-xs font-medium text-amber-500">Special Notes:</p>
                                      <p className="text-xs text-amber-700">{event.notes}</p>
                                    </div>
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
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  {events.length > 0 && (
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(events, null, 2));
                          toast.success('Itinerary copied to clipboard');
                        }}
                        className="border-amber-300 text-amber-600 hover:bg-amber-50"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Itinerary
                      </Button>
                      <Button
                        variant="outline"
                        onClick={clearAllEvents}
                        className="border-amber-300 text-amber-600 hover:bg-amber-50"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Templates Section */}
        <AnimatePresence>
          {showTemplates && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Quick Start Templates</CardTitle>
                  <CardDescription className="text-amber-700">
                    Choose from these pre-designed itineraries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="border border-amber-100 rounded-lg p-4 bg-white hover:shadow-sm cursor-pointer transition-all"
                      onClick={() => {
                        const events = [
                          {
                            id: 'template1-1',
                            name: 'Morning Aarti at Vitthal Temple',
                            type: 'temple',
                            date: new Date(),
                            time: '05:30',
                            duration: '1.5 hours',
                            location: pandharpurLocations.temples[0].location,
                            locationName: pandharpurLocations.temples[0].name,
                            description: 'Experience the divine morning prayers at the main temple',
                            notes: 'Wear traditional attire, no footwear allowed'
                          },
                          {
                            id: 'template1-2',
                            name: 'Breakfast at Prasadalaya',
                            type: 'food',
                            date: new Date(),
                            time: '07:30',
                            duration: '1 hour',
                            location: pandharpurLocations.food[0].location,
                            locationName: pandharpurLocations.food[0].name,
                            description: 'Traditional Maharashtrian breakfast served as prasad'
                          },
                          {
                            id: 'template1-3',
                            name: 'Visit Sant Tukaram Temple',
                            type: 'temple',
                            date: new Date(),
                            time: '09:00',
                            duration: '1 hour',
                            location: pandharpurLocations.temples[1].location,
                            locationName: pandharpurLocations.temples[1].name,
                            description: 'Pay respects at this important saint\'s temple'
                          },
                          {
                            id: 'template1-4',
                            name: 'Holy Dip in Chandrabhaga River',
                            type: 'landmark',
                            date: new Date(),
                            time: '11:00',
                            duration: '30 mins',
                            location: pandharpurLocations.landmarks[0].location,
                            locationName: pandharpurLocations.landmarks[0].name,
                            description: 'Purifying bath in the sacred river'
                          }
                        ];
                        setEvents(events);
                        // Save to database
                        db.update(trips)
                          .set({
                            itinerary: events,
                            updatedAt: new Date()
                          })
                          .where(eq(trips.userId, userId));
                        setShowTemplates(false);
                        toast.success('Spiritual Seeker itinerary applied');
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <Heart className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-amber-800">Spiritual Seeker</h3>
                          <p className="text-sm text-amber-600 mt-1">Complete temple experience with all rituals</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-amber-600 border-amber-200">
                              1 day
                            </Badge>
                            <Badge variant="outline" className="text-amber-600 border-amber-200">
                              4 activities
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -5 }}
                      className="border border-amber-100 rounded-lg p-4 bg-white hover:shadow-sm cursor-pointer transition-all"
                      onClick={() => {
                        const events = [
                          {
                            id: 'template2-1',
                            name: 'Vitthal Temple Tour',
                            type: 'temple',
                            date: new Date(),
                            time: '08:00',
                            duration: '2 hours',
                            location: pandharpurLocations.temples[0].location,
                            locationName: pandharpurLocations.temples[0].name,
                            description: 'Guided tour explaining the history and architecture'
                          },
                          {
                            id: 'template2-2',
                            name: 'Visit Warkari Museum',
                            type: 'cultural',
                            date: new Date(),
                            time: '11:00',
                            duration: '1.5 hours',
                            location: pandharpurLocations.landmarks[1].location,
                            locationName: pandharpurLocations.landmarks[1].name,
                            description: 'Learn about Warkari culture and traditions'
                          },
                          {
                            id: 'template2-3',
                            name: 'Lunch at Bhog Restaurant',
                            type: 'food',
                            date: new Date(),
                            time: '13:00',
                            duration: '1 hour',
                            location: pandharpurLocations.food[1].location,
                            locationName: pandharpurLocations.food[1].name,
                            description: 'Authentic local cuisine experience'
                          },
                          {
                            id: 'template2-4',
                            name: 'Check-in at Pandharpur Heritage',
                            type: 'accommodation',
                            date: new Date(),
                            time: '15:00',
                            duration: '',
                            location: pandharpurLocations.accommodations[1].location,
                            locationName: pandharpurLocations.accommodations[1].name,
                            description: 'Comfortable stay near temple'
                          }
                        ];
                        setEvents(events);
                        // Save to database
                        db.update(trips)
                          .set({
                            itinerary: events,
                            updatedAt: new Date()
                          })
                          .where(eq(trips.userId, userId));
                        setShowTemplates(false);
                        toast.success('Cultural Explorer itinerary applied');
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-amber-100 rounded-full">
                          <User className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-amber-800">Cultural Explorer</h3>
                          <p className="text-sm text-amber-600 mt-1">Mix of spiritual sites and local culture</p>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline" className="text-amber-600 border-amber-200">
                              1 day
                            </Badge>
                            <Badge variant="outline" className="text-amber-600 border-amber-200">
                              4 activities
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant="ghost"
                    className="text-amber-600 hover:bg-amber-50"
                    onClick={() => setShowTemplates(false)}
                  >
                    Close Templates
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}