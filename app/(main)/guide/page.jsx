
// 'use client';

// import { useEffect, useState, useCallback, useRef } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { format, isValid } from 'date-fns';
// import { Loader2, MapPin, Calendar, Landmark, Utensils, Hotel, Plus, Trash2, Sparkles, User, Heart, Star, ChevronDown, ChevronUp, Download, Clock, Sun } from 'lucide-react';
// import { GoogleMap, Marker, useLoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { toast } from 'sonner';
// import DatePicker from 'react-datepicker';
// import { motion, AnimatePresence } from 'framer-motion';
// import useFetch from '@/hooks/useFetch';
// import { getTrips, createTrip, updateTripItinerary } from '@/actions/trips';
// import { generateAIItenary } from '@/actions/ai-suggestions';
// import "react-datepicker/dist/react-datepicker.css";

// const libraries = ['places', 'geometry'];
// const mapContainerStyle = { width: '100%', height: '500px', borderRadius: '0.5rem' };
// const pandharpurCenter = { lat: 17.6792, lng: 75.3319 };

// const pandharpurLocations = {
//   temples: [
//     { id: 'vitthal', name: 'Shri Vitthal Rukmini Temple', description: 'The main temple for Lord Vitthal', location: { lat: 17.6792, lng: 75.3319 } },
//     { id: 'tukaram', name: 'Sant Tukaram Maharaj Temple', description: 'Dedicated to the Bhakti saint', location: { lat: 17.6815, lng: 75.3289 } }
//   ],
// };

// export default function TripPlanner() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     libraries,
//   });

//   const { isLoaded: isUserLoaded, user } = useUser();
//   const userId = user?.id;

//   const [activeTab, setActiveTab] = useState('itinerary');
//   const [events, setEvents] = useState([]);
//   const [trip, setTrip] = useState(null);
//   const [directions, setDirections] = useState(null);
//   const [newEvent, setNewEvent] = useState({ name: '', type: 'temple', date: new Date(), time: '09:00', description: '', location: null });
//   const [autocomplete, setAutocomplete] = useState(null);
//   const mapRef = useRef(null);

//   const { data: tripsData, loading: tripsLoading, error: tripsError, fn: fetchTrips } = useFetch(getTrips);
//   const { fn: createTripFn, loading: isCreatingTrip } = useFetch(createTrip);
//   const { fn: updateTripFn, loading: isUpdatingTrip } = useFetch(updateTripItinerary);
//   const { fn: generateItineraryFn, loading: isGeneratingAI } = useFetch(generateAIItenary);

//   const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
//   const slideUp = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.3 } } };

//   useEffect(() => {
//     if (isUserLoaded && userId) {
//       fetchTrips();
//     }
//   }, [isUserLoaded, userId]);

//   useEffect(() => {
//     if (tripsData) {
//       const mainTrip = tripsData.length > 0 ? tripsData[0] : null;
//       setTrip(mainTrip);
//       setEvents(mainTrip?.itinerary?.map(event => ({ ...event, date: new Date(event.date) })) || []);
//     }
//   }, [tripsData]);

//   const updateItineraryOnServer = async (tripId, newItinerary) => {
//     try {
//       const updatedTrip = await updateTripFn(tripId, newItinerary);
//       setTrip(updatedTrip);
//       setEvents(updatedTrip.itinerary?.map(event => ({ ...event, date: new Date(event.date) })) || []);
//       return true;
//     } catch (error) {
//       toast.error("Failed to update itinerary.");
//       fetchTrips();
//       return false;
//     }
//   };
  
//   const ensureTripExists = async () => {
//     if (trip) return trip;
//     const newTrip = await createTripFn({
//       destination: 'Pandharpur',
//       itinerary: [],
//       coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
//     });
//     setTrip(newTrip);
//     toast.success('Your trip has been created!');
//     return newTrip;
//   };

//   const addEvent = async () => {
//     if (!newEvent.name || !newEvent.location) {
//       toast.error('Please provide an activity name and location.');
//       return;
//     }
//     const currentTrip = await ensureTripExists();
//     if (!currentTrip) return;

//     const eventToAdd = { ...newEvent, id: Date.now().toString(), isCustom: true };
//     const updatedEvents = [...events, eventToAdd].sort((a, b) => new Date(a.date) - new Date(b.date) || a.time.localeCompare(b.time));
    
//     const success = await updateItineraryOnServer(currentTrip.id, updatedEvents);
//     if (success) {
//       toast.success('Activity added!');
//       setNewEvent({ name: '', type: 'temple', date: new Date(), time: '09:00', description: '', location: null });
//        const input = document.querySelector(`#autocomplete-input`);
//        if(input) input.value = "";
//     }
//   };
  
//   const removeEvent = async (eventId) => {
//     if (!trip) return;
//     const updatedEvents = events.filter(e => e.id !== eventId);
//     await updateItineraryOnServer(trip.id, updatedEvents);
//   };
  
//   const clearAllEvents = async () => {
//     if (!trip) return;
//     await updateItineraryOnServer(trip.id, []);
//   };

//   const handleGenerateAI = async () => {
//     const currentTrip = await ensureTripExists();
//     if (!currentTrip) return;

//     const defaultProfile = {
//       name: 'Spiritual Seeker',
//       preferences: {
//         focus: 'temples', pace: 'medium', includeRituals: true,
//         mealPreferences: 'vegetarian', accommodation: 'dharamshala', duration: 2
//       }
//     };

//     toast.info("Generating your AI itinerary...");
//     try {
//       const updatedTrip = await generateItineraryFn(currentTrip.id, defaultProfile);
//       setTrip(updatedTrip);
//       setEvents(updatedTrip.itinerary?.map(event => ({ ...event, date: new Date(event.date) })) || []);
//       toast.success("AI Itinerary has been created!");
//     } catch (error) {
//       // The useFetch hook already shows a toast on error
//     }
//   };
  
//   const onPlaceChanged = useCallback(() => {
//     if (autocomplete !== null) {
//       const place = autocomplete.getPlace();
//       if (!place.geometry || !place.geometry.location) {
//         toast.error("Invalid location selected.");
//         return;
//       }
//       setNewEvent(prev => ({
//         ...prev,
//         name: prev.name || place.name,
//         location: {
//           name: place.name,
//           address: place.formatted_address,
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         }
//       }));
//     }
//   }, [autocomplete]);

//   const calculateDirections = useCallback((waypoints) => {
//     if (!window.google || !mapRef.current || !waypoints) return;
//     const filteredWaypoints = waypoints.filter(event => event.location);
//     if (filteredWaypoints.length < 2) {
//       setDirections(null);
//       return;
//     }
//     const directionsService = new window.google.maps.DirectionsService();
//     const formattedWaypoints = filteredWaypoints.map(event => ({ location: new window.google.maps.LatLng(event.location.lat, event.location.lng), stopover: true }));
//     directionsService.route({
//       origin: formattedWaypoints[0].location,
//       destination: formattedWaypoints[formattedWaypoints.length - 1].location,
//       waypoints: formattedWaypoints.slice(1, -1),
//       travelMode: window.google.maps.TravelMode.DRIVING,
//       optimizeWaypoints: true,
//     }, (result, status) => { if (status === window.google.maps.DirectionsStatus.OK) setDirections(result) });
//   }, []);

//   useEffect(() => {
//     calculateDirections(events);
//   }, [events, calculateDirections]);

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded || !isUserLoaded) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12 text-amber-600" /></div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 relative overflow-hidden">
//       <div className="container mx-auto px-4 py-8 relative z-10">
//         <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
//           <div>
//             <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">Pandharpur Spiritual Journey Planner</h1>
//             <p className="text-amber-700 mt-2">Plan your divine experience with AI guidance</p>
//           </div>
//           {userId && (
//             <Button onClick={handleGenerateAI} disabled={isGeneratingAI} className="bg-amber-600 hover:bg-amber-700 transition-all">
//               {isGeneratingAI ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
//               AI Trip Planner
//             </Button>
//           )}
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-1 space-y-6">
//             <motion.div initial="hidden" animate="visible" variants={slideUp} transition={{ delay: 0.2 }}>
//               <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
//                 <CardHeader><CardTitle className="text-amber-900">Add Spiritual Activity</CardTitle><CardDescription className="text-amber-700">Plan your sacred visit</CardDescription></CardHeader>
//                 <CardContent className="space-y-4">
//                   <div><label className="block text-sm font-medium mb-1 text-amber-800">Activity Name</label><Input value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} placeholder="e.g. Vitthal Temple Morning Aarti" /></div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div><label className="block text-sm font-medium mb-1 text-amber-800">Date</label><DatePicker selected={newEvent.date} onChange={(date) => setNewEvent({ ...newEvent, date })} className="w-full p-2 border border-amber-300 rounded-md" /></div>
//                     <div><label className="block text-sm font-medium mb-1 text-amber-800">Time</label><Input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full p-2 border border-amber-300 rounded-md" /></div>
//                   </div>
                  
//                   <div>
//                     <label className="block text-sm font-medium mb-1 text-amber-800">Location</label>
//                     <Autocomplete
//                       onLoad={(ac) => setAutocomplete(ac)}
//                       onPlaceChanged={onPlaceChanged}
//                     >
//                       <Input
//                         id="autocomplete-input"
//                         type="text"
//                         placeholder="Search sacred places in Pandharpur"
//                         className="w-full"
//                       />
//                     </Autocomplete>
//                     {newEvent.location && (<p className="text-xs mt-1 text-amber-600">Selected: {newEvent.location.name}</p>)}
//                   </div>

//                   <div><label className="block text-sm font-medium mb-1 text-amber-800">Spiritual Notes</label><Textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} placeholder="Any special rituals or preparations..." /></div>
//                 </CardContent>
//                 <CardFooter><Button onClick={addEvent} className="w-full bg-amber-600 hover:bg-amber-700 transition-colors" disabled={!userId || isUpdatingTrip || isCreatingTrip}><Plus className="h-4 w-4 mr-2" /> Add to Itinerary</Button></CardFooter>
//               </Card>
//             </motion.div>
//             <motion.div initial="hidden" animate="visible" variants={slideUp} transition={{ delay: 0.4 }}>
//               <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
//                 <CardHeader><CardTitle className="text-amber-900">Sacred Locations</CardTitle><CardDescription className="text-amber-700">Click to add a must-visit place</CardDescription></CardHeader>
//                 <CardContent className="space-y-4">
//                   {pandharpurLocations.temples.map((temple) => (
//                     <motion.div key={temple.id} whileHover={{ y: -2 }} className="border border-amber-100 rounded-lg p-4 bg-white hover:shadow-sm cursor-pointer transition-all" onClick={() => { setNewEvent(prev => ({ ...prev, name: temple.name, type: 'temple', description: temple.description, location: temple.location })); toast.info(`Added ${temple.name} to form`); }}>
//                       <div className="flex items-start gap-3"><div className="p-2 bg-amber-100 rounded-full"><Landmark className="h-5 w-5 text-amber-600" /></div><div><h3 className="font-medium text-amber-800">{temple.name}</h3><p className="text-sm text-amber-600 mt-1">{temple.description}</p></div></div>
//                     </motion.div>
//                   ))}
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//           <div className="lg:col-span-2 space-y-6">
//             <Tabs defaultValue="itinerary" className="w-full" onValueChange={setActiveTab}>
//               <TabsList className="grid w-full grid-cols-2 bg-amber-100"><TabsTrigger value="map"><MapPin className="h-4 w-4 mr-2" />Sacred Map</TabsTrigger><TabsTrigger value="itinerary"><Calendar className="h-4 w-4 mr-2" />Your Itinerary</TabsTrigger></TabsList>
//               <TabsContent value="map">
//                 <Card className="bg-white/90">
//                   <CardContent className="p-2">
//                     <div style={mapContainerStyle}>
//                       <GoogleMap
//                         mapContainerStyle={{ width: '100%', height: '100%' }}
//                         zoom={14}
//                         center={newEvent.location ? { lat: newEvent.location.lat, lng: newEvent.location.lng } : pandharpurCenter}
//                         onLoad={(map) => { mapRef.current = map; }}>
//                         {newEvent.location && (
//                           <Marker
//                             position={{ lat: newEvent.location.lat, lng: newEvent.location.lng }}
//                             title={newEvent.location.name || "New Location"}
//                           />
//                         )}
//                         {events.filter(e => e.location?.lat).map((event, index) => <Marker key={event.id} position={{ lat: event.location.lat, lng: event.location.lng }} title={event.name} label={{ text: (index + 1).toString(), color: 'white' }} />)}
//                         {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
//                       </GoogleMap>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//               <TabsContent value="itinerary">
//                 <Card className="bg-white/90">
//                   <CardHeader><div className="flex justify-between items-center"><div><CardTitle>Your Spiritual Journey</CardTitle><CardDescription>{events.length} planned activities</CardDescription></div>{userId && events.length > 0 && (<Button variant="outline" onClick={clearAllEvents}><Trash2 className="h-4 w-4 mr-2" />Clear All</Button>)}</div></CardHeader>
//                   <CardContent>
//                     {tripsLoading ? (
//                       <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
//                     ) : tripsError ? (
//                       <div className="text-center py-12 text-red-600">{tripsError.message}</div>
//                     ) : events.length === 0 ? (
//                       <div className="text-center py-12"><Landmark className="h-10 w-10 mx-auto text-amber-300 mb-4" /><h3 className="text-lg font-medium text-amber-800">Your spiritual journey begins here</h3><p className="text-amber-600 mb-6">Add an activity or use the AI planner.</p></div>
//                     ) : (
//                       <div className="space-y-4">{events.map((event) => (<motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-l-4 p-4 border-amber-200 bg-amber-50/50 rounded-r-md"><div className="flex justify-between items-start"><div><h3 className="font-medium text-amber-900">{event.name}</h3><p className="text-sm text-gray-600">{isValid(new Date(event.date)) ? format(new Date(event.date), 'PPP') : 'Invalid date'} at {event.time}</p></div>{userId && <Button variant="ghost" size="sm" onClick={() => removeEvent(event.id)}><Trash2 className="h-4 w-4" /></Button>}</div></motion.div>))}</div>
//                     )}
//                   </CardContent>
//                   {events.length > 0 && userId && (<CardFooter className="flex justify-between"><Button variant="outline" onClick={() => { navigator.clipboard.writeText(JSON.stringify(events, null, 2)); toast.success('Itinerary copied'); }}><Download className="h-4 w-4 mr-2" />Export Itinerary</Button></CardFooter>)}
//                 </Card>
//               </TabsContent>
//             </Tabs>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { format, isValid } from 'date-fns';
import { Loader2, MapPin, Calendar, Landmark, Plus, Trash2, Sparkles, Download } from 'lucide-react';
import { GoogleMap, Marker, useLoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// NEW: Import Dialog components for the AI modal
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import DatePicker from 'react-datepicker';
import { motion } from 'framer-motion';
import useFetch from '@/hooks/useFetch';
import { getTrips, createTrip, updateTripItinerary } from '@/actions/trips';
import { generateAIItenary } from '@/actions/ai-suggestions';
import "react-datepicker/dist/react-datepicker.css";

const libraries = ['places', 'geometry'];
const mapContainerStyle = { width: '100%', height: '500px', borderRadius: '0.5rem' };
const pandharpurCenter = { lat: 17.6792, lng: 75.3319 };

const pandharpurLocations = {
  temples: [
    { id: 'vitthal', name: 'Shri Vitthal Rukmini Temple', description: 'The main temple for Lord Vitthal', location: { lat: 17.6792, lng: 75.3319 } },
    { id: 'tukaram', name: 'Sant Tukaram Maharaj Temple', description: 'Dedicated to the Bhakti saint', location: { lat: 17.6815, lng: 75.3289 } }
  ],
};

export default function TripPlanner() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const { isLoaded: isUserLoaded, user } = useUser();
  const userId = user?.id;

  const [events, setEvents] = useState([]);
  const [trip, setTrip] = useState(null);
  const [directions, setDirections] = useState(null);
  const [newEvent, setNewEvent] = useState({ name: '', type: 'temple', date: new Date(), time: '09:00', description: '', location: null });
  const [autocomplete, setAutocomplete] = useState(null);
  const mapRef = useRef(null);

  // NEW: State for the AI preferences modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPreferences, setAiPreferences] = useState({
    duration: 2,
    pace: 'medium',
    focus: 'temples',
    mealPreferences: 'vegetarian',
  });

  const { data: tripsData, loading: tripsLoading, error: tripsError, fn: fetchTrips } = useFetch(getTrips);
  const { fn: createTripFn, loading: isCreatingTrip } = useFetch(createTrip);
  const { fn: updateTripFn, loading: isUpdatingTrip } = useFetch(updateTripItinerary);
  const { fn: generateItineraryFn, loading: isGeneratingAI } = useFetch(generateAIItenary);

  const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
  const slideUp = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.3 } } };

  useEffect(() => {
    if (isUserLoaded && userId) {
      fetchTrips();
    }
  }, [isUserLoaded, userId, fetchTrips]);

  useEffect(() => {
    if (tripsData) {
      const mainTrip = tripsData.length > 0 ? tripsData[0] : null;
      setTrip(mainTrip);
      setEvents(mainTrip?.itinerary?.map(event => ({ ...event, date: new Date(event.date) })) || []);
    }
  }, [tripsData]);

  const ensureTripExists = async () => {
    if (trip) return trip;
    const newTrip = await createTripFn({
      destination: 'Pandharpur',
      itinerary: [],
      coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5',
    });
    setTrip(newTrip);
    toast.success('Your trip has been created!');
    return newTrip;
  };

  // FIXED: This function now correctly formats dates before sending to the server.
  // This ensures manual events are saved and the UI updates in real-time.
  const updateItineraryOnServer = async (tripId, newItinerary) => {
    const formattedItinerary = newItinerary.map(event => ({
      ...event,
      date: isValid(event.date) ? event.date.toISOString() : new Date().toISOString(),
    }));

    try {
      const updatedTrip = await updateTripFn(tripId, formattedItinerary);
      const newEvents = updatedTrip.itinerary?.map(event => ({ ...event, date: new Date(event.date) })) || [];
      setTrip(updatedTrip);
      setEvents(newEvents); // This state update triggers the real-time UI refresh
      return true;
    } catch (error) {
      toast.error("Failed to update itinerary.");
      return false;
    }
  };

  const addEvent = async () => {
    if (!newEvent.name || !newEvent.location) {
      toast.error('Please provide an activity name and location.');
      return;
    }
    const currentTrip = await ensureTripExists();
    if (!currentTrip) return;

    const eventToAdd = { ...newEvent, id: Date.now().toString(), isCustom: true };
    const updatedEvents = [...events, eventToAdd].sort((a, b) => new Date(a.date) - new Date(b.date) || a.time.localeCompare(b.time));
    
    const success = await updateItineraryOnServer(currentTrip.id, updatedEvents);
    if (success) {
      toast.success('Activity added!');
      setNewEvent({ name: '', type: 'temple', date: new Date(), time: '09:00', description: '', location: null });
      const input = document.querySelector(`#autocomplete-input`);
      if (input) input.value = "";
    }
  };
  
  const removeEvent = async (eventId) => {
    if (!trip) return;
    const updatedEvents = events.filter(e => e.id !== eventId);
    await updateItineraryOnServer(trip.id, updatedEvents);
  };
  
  const clearAllEvents = async () => {
    if (!trip) return;
    await updateItineraryOnServer(trip.id, []);
  };

  // NEW: Updated function to generate AI itinerary based on user preferences from the modal.
  const handleGenerateAI = async () => {
    const currentTrip = await ensureTripExists();
    if (!currentTrip) return;

    const profile = {
      name: 'Spiritual Seeker',
      preferences: aiPreferences
    };

    toast.info("Generating your personalized AI itinerary...");
    try {
      const updatedTrip = await generateItineraryFn(currentTrip.id, profile);
      setTrip(updatedTrip);
      setEvents(updatedTrip.itinerary?.map(event => ({ ...event, date: new Date(event.date) })) || []);
      toast.success("AI Itinerary has been created!");
      setIsAiModalOpen(false); // Close modal on success
    } catch (error) {
      // The useFetch hook already shows a toast on error
    }
  };
  
  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (!place.geometry || !place.geometry.location) {
        toast.error("Invalid location selected.");
        return;
      }
      setNewEvent(prev => ({
        ...prev,
        name: prev.name || place.name,
        location: {
          name: place.name,
          address: place.formatted_address,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        }
      }));
    }
  }, [autocomplete]);

  const calculateDirections = useCallback((waypoints) => {
    if (!window.google || !mapRef.current || !waypoints) return;
    const filteredWaypoints = waypoints.filter(event => event.location);
    if (filteredWaypoints.length < 2) {
      setDirections(null);
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const formattedWaypoints = filteredWaypoints.map(event => ({ location: new window.google.maps.LatLng(event.location.lat, event.location.lng), stopover: true }));
    directionsService.route({
      origin: formattedWaypoints[0].location,
      destination: formattedWaypoints[formattedWaypoints.length - 1].location,
      waypoints: formattedWaypoints.slice(1, -1),
      travelMode: window.google.maps.TravelMode.DRIVING,
      optimizeWaypoints: true,
    }, (result, status) => { if (status === window.google.maps.DirectionsStatus.OK) setDirections(result) });
  }, []);

  useEffect(() => {
    calculateDirections(events);
  }, [events, calculateDirections]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || !isUserLoaded) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12 text-amber-600" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">Pandharpur Spiritual Journey Planner</h1>
            <p className="text-amber-700 mt-2">Plan your divine experience with AI guidance</p>
          </div>
          {/* NEW: AI Planner button is now wrapped in a Dialog to open the preferences modal */}
          {userId && (
            <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-700 transition-all">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Trip Planner
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Personalize Your AI Itinerary</DialogTitle>
                  <DialogDescription>
                    Tell us your preferences, and we'll craft the perfect spiritual journey for you.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">Duration (Days)</Label>
                    <Input id="duration" type="number" value={aiPreferences.duration} onChange={(e) => setAiPreferences({...aiPreferences, duration: parseInt(e.target.value)})} className="col-span-3"/>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="pace" className="text-right">Pace</Label>
                     <Select value={aiPreferences.pace} onValueChange={(value) => setAiPreferences({...aiPreferences, pace: value})}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select trip pace" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="relaxed">Relaxed</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="fast-paced">Fast-Paced</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                     <Label htmlFor="focus" className="text-right">Main Focus</Label>
                     <Select value={aiPreferences.focus} onValueChange={(value) => setAiPreferences({...aiPreferences, focus: value})}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select trip focus" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="temples">Temples & Rituals</SelectItem>
                            <SelectItem value="culture">Culture & History</SelectItem>
                            <SelectItem value="food">Local Cuisine</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleGenerateAI} disabled={isGeneratingAI}>
                    {isGeneratingAI ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Sparkles className="h-4 w-4 mr-2" />}
                    Generate Itinerary
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div initial="hidden" animate="visible" variants={slideUp} transition={{ delay: 0.2 }}>
              <Card className="bg-white/90 backdrop-blur-sm border-amber-200">
                <CardHeader><CardTitle className="text-amber-900">Add Spiritual Activity</CardTitle><CardDescription className="text-amber-700">Plan your sacred visit</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  <div><Label className="block text-sm font-medium mb-1 text-amber-800">Activity Name</Label><Input value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} placeholder="e.g. Vitthal Temple Morning Aarti" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><Label className="block text-sm font-medium mb-1 text-amber-800">Date</Label><DatePicker selected={newEvent.date} onChange={(date) => setNewEvent({ ...newEvent, date })} className="w-full p-2 border border-input rounded-md" /></div>
                    <div><Label className="block text-sm font-medium mb-1 text-amber-800">Time</Label><Input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full p-2 border border-input rounded-md" /></div>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-1 text-amber-800">Location</Label>
                    <Autocomplete onLoad={(ac) => setAutocomplete(ac)} onPlaceChanged={onPlaceChanged}>
                      <Input id="autocomplete-input" type="text" placeholder="Search sacred places in Pandharpur" className="w-full"/>
                    </Autocomplete>
                    {newEvent.location && (<p className="text-xs mt-1 text-amber-600">Selected: {newEvent.location.name}</p>)}
                  </div>
                  <div><Label className="block text-sm font-medium mb-1 text-amber-800">Spiritual Notes</Label><Textarea value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} placeholder="Any special rituals or preparations..." /></div>
                </CardContent>
                <CardFooter><Button onClick={addEvent} className="w-full bg-amber-600 hover:bg-amber-700" disabled={!userId || isUpdatingTrip || isCreatingTrip}><Plus className="h-4 w-4 mr-2" /> Add to Itinerary</Button></CardFooter>
              </Card>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={slideUp} transition={{ delay: 0.4 }}>
              <Card className="border-amber-200 bg-amber-50/90 backdrop-blur-sm">
                <CardHeader><CardTitle className="text-amber-900">Sacred Locations</CardTitle><CardDescription className="text-amber-700">Click to add a must-visit place</CardDescription></CardHeader>
                <CardContent className="space-y-4">
                  {pandharpurLocations.temples.map((temple) => (
                    <motion.div key={temple.id} whileHover={{ y: -2 }} className="border border-amber-100 rounded-lg p-4 bg-white hover:shadow-sm cursor-pointer" onClick={() => { setNewEvent(prev => ({ ...prev, name: temple.name, type: 'temple', description: temple.description, location: temple.location })); toast.info(`Added ${temple.name} to form`); }}>
                      <div className="flex items-start gap-3"><div className="p-2 bg-amber-100 rounded-full"><Landmark className="h-5 w-5 text-amber-600" /></div><div><h3 className="font-medium text-amber-800">{temple.name}</h3><p className="text-sm text-amber-600 mt-1">{temple.description}</p></div></div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="itinerary" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-amber-100"><TabsTrigger value="map"><MapPin className="h-4 w-4 mr-2" />Sacred Map</TabsTrigger><TabsTrigger value="itinerary"><Calendar className="h-4 w-4 mr-2" />Your Itinerary</TabsTrigger></TabsList>
              <TabsContent value="map">
                <Card className="bg-white/90">
                  <CardContent className="p-2">
                    <div style={mapContainerStyle}>
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        zoom={14}
                        center={newEvent.location ? { lat: newEvent.location.lat, lng: newEvent.location.lng } : pandharpurCenter}
                        onLoad={(map) => { mapRef.current = map; }}>
                        {events.filter(e => e.location?.lat).map((event, index) => <Marker key={event.id} position={{ lat: event.location.lat, lng: event.location.lng }} title={event.name} label={{ text: (index + 1).toString(), color: 'white' }} />)}
                        {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
                      </GoogleMap>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="itinerary">
                <Card className="bg-white/90">
                  <CardHeader><div className="flex justify-between items-center"><div><CardTitle>Your Spiritual Journey</CardTitle><CardDescription>{events.length} planned activities</CardDescription></div>{userId && events.length > 0 && (<Button variant="outline" onClick={clearAllEvents}><Trash2 className="h-4 w-4 mr-2" />Clear All</Button>)}</div></CardHeader>
                  <CardContent>
                    {tripsLoading ? (
                      <div className="text-center py-12"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
                    ) : tripsError ? (
                      <div className="text-center py-12 text-red-600">{tripsError.message}</div>
                    ) : events.length === 0 ? (
                      <div className="text-center py-12"><Landmark className="h-10 w-10 mx-auto text-amber-300 mb-4" /><h3 className="text-lg font-medium text-amber-800">Your spiritual journey begins here</h3><p className="text-amber-600 mb-6">Add an activity or use the AI planner.</p></div>
                    ) : (
                      <div className="space-y-4">{events.map((event) => (<motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="border-l-4 p-4 border-amber-200 bg-amber-50/50 rounded-r-md"><div className="flex justify-between items-start"><div><h3 className="font-medium text-amber-900">{event.name}</h3><p className="text-sm text-gray-600">{isValid(new Date(event.date)) ? format(new Date(event.date), 'PPP') : 'Invalid date'} at {event.time}</p></div>{userId && <Button variant="ghost" size="sm" onClick={() => removeEvent(event.id)}><Trash2 className="h-4 w-4" /></Button>}</div></motion.div>))}</div>
                    )}
                  </CardContent>
                  {events.length > 0 && userId && (<CardFooter className="flex justify-between"><Button variant="outline" onClick={() => { navigator.clipboard.writeText(JSON.stringify(events, null, 2)); toast.success('Itinerary copied'); }}><Download className="h-4 w-4 mr-2" />Export Itinerary</Button></CardFooter>)}
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}