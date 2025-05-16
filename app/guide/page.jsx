

// 'use client';

// import { useEffect, useState, useCallback, useRef } from 'react';
// import { useUser } from '@clerk/nextjs';
// import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { format } from 'date-fns';
// import { Loader2, MapPin, Calendar, Landmark, Utensils, Hotel, Plus, Trash2, Sparkles, Route, Share2, Download } from 'lucide-react';
// import { GoogleMap, Marker, useLoadScript, DirectionsRenderer, Autocomplete } from '@react-google-maps/api';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
// import { Textarea } from '@/components/ui/textarea';
// import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
// import { Badge } from '@/components/ui/badge';
// import { toast } from 'sonner';
// import DatePicker from 'react-datepicker';
// import { motion } from 'framer-motion';

// const libraries = ['places', 'geometry'];
// const mapContainerStyle = {
//   width: '100%',
//   height: '500px',
//   borderRadius: '0.5rem',
// };
// const pandharpurCenter = {
//   lat: 17.6792,
//   lng: 75.3319,
// };

// export default function TripPlanner() {
//   // Google Maps API Setup
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     libraries,
//   });

//   // Authentication
//   const { isLoaded: isUserLoaded, user } = useUser();
//   const userId = user?.id;

//   // State management
//   const [trip, setTrip] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [directions, setDirections] = useState(null);
//   const [map, setMap] = useState(null);
//   const [autocomplete, setAutocomplete] = useState(null);
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [aiSuggestions, setAiSuggestions] = useState([]);
//   const [isAiLoading, setIsAiLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState('itinerary');
//   const [routeOptimized, setRouteOptimized] = useState(false);
//   const [isGeneratingFullPlan, setIsGeneratingFullPlan] = useState(false);
//   const mapRef = useRef(null);

//   const [newEvent, setNewEvent] = useState({
//     name: '',
//     type: 'temple',
//     date: new Date(),
//     time: '09:00',
//     description: '',
//     location: null,
//   });

//   // Initialize trip data for new users
//   const initializeTrip = async () => {
//     if (!userId) return;

//     try {
//       const tripRef = doc(db, 'trips', userId);
//       const tripSnap = await getDoc(tripRef);

//       if (!tripSnap.exists()) {
//         await setDoc(tripRef, {
//           userId,
//           createdAt: new Date(),
//           destination: 'Pandharpur',
//           itinerary: [],
//           lastUpdated: new Date(),
//           coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
//         });
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Error initializing trip data:', error);
//       return false;
//     }
//   };

//   // Load user's trip data
//   useEffect(() => {
//     if (!isUserLoaded) return;

//     const loadTripData = async () => {
//       if (!userId) {
//         setLoading(false);
//         return;
//       }

//       try {
//         await initializeTrip();

//         const unsubscribe = onSnapshot(
//           doc(db, 'trips', userId),
//           (doc) => {
//             if (doc.exists()) {
//               const data = doc.data();
//               setTrip(data);

//               const sortedEvents = [...(data.itinerary || [])].sort((a, b) => {
//                 const dateA = new Date(`${a.date} ${a.time}`);
//                 const dateB = new Date(`${b.date} ${b.time}`);
//                 return dateA - dateB;
//               });
//               setEvents(sortedEvents);
//             } else {
//               setEvents([]);
//             }
//             setLoading(false);
//           },
//           (error) => {
//             console.error('Error loading trip data:', error);
//             setLoading(false);
//           }
//         );

//         return () => unsubscribe();
//       } catch (error) {
//         console.error('Error in loadTripData:', error);
//         setLoading(false);
//       }
//     };

//     const loadAiSuggestions = async () => {
//       if (!userId) return;

//       try {
//         const aiRef = doc(db, 'ai-suggestions', userId);
//         const aiSnap = await getDoc(aiRef);

//         if (aiSnap.exists()) {
//           setAiSuggestions(aiSnap.data().suggestions || []);
//         } else {
//           setAiSuggestions([]);
//         }
//       } catch (error) {
//         console.error('Error loading AI suggestions:', error);
//         setAiSuggestions([]);
//       }
//     };

//     loadTripData();
//     loadAiSuggestions();
//   }, [isUserLoaded, userId]);

//   // Generate full trip plan with API call
//   const generateFullTripPlan = async () => {
//     if (!userId) {
//       toast.error('Please sign in to generate trip plans');
//       return;
//     }

//     setIsGeneratingFullPlan(true);

//     try {
//       const response = await fetch('/api/generate-plan', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           tripDuration: 3,
//           specialRequirements: 'Spiritual focus with temple visits',
//           preferredActivities: 'Morning aartis, temple darshan, local cuisine'
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate plan');
//       }

//       const plan = await response.json();

//       // Convert to our event format
//       const newEvents = plan.days.flatMap(day =>
//         day.activities.map(activity => ({
//           name: activity.name,
//           type: activity.type,
//           date: new Date(day.date),
//           time: activity.time,
//           description: activity.description,
//           location: activity.location,
//           id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
//           isAiGenerated: true
//         }))
//       );

//       // Update both trips and ai-suggestions collections
//       await Promise.all([
//         setDoc(doc(db, 'trips', userId), {
//           itinerary: newEvents,
//           lastUpdated: new Date(),
//         }, { merge: true }),

//         setDoc(doc(db, 'ai-suggestions', userId), {
//           suggestions: plan.days.flatMap(day => day.activities.map(act => ({
//             id: `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
//             title: act.name,
//             description: act.description,
//             type: act.type,
//             duration: act.duration,
//             bestTime: act.time,
//             practices: act.description.match(/special practices:(.*)/i)?.[1]?.split(',') || []
//           }))),
//           generatedAt: new Date()
//         })
//       ]);

//       toast.success('Full spiritual trip plan generated successfully!');
//     } catch (error) {
//       console.error('AI generation error:', error);
//       toast.error('Failed to generate trip plan. Please try again.');
//     } finally {
//       setIsGeneratingFullPlan(false);
//     }
//   };

//   // Handle place selection from Autocomplete
//   const onPlaceChanged = useCallback(() => {
//     if (autocomplete) {
//       const place = autocomplete.getPlace();
//       if (!place.geometry) {
//         toast.error('No details available for this place');
//         return;
//       }
//       setSelectedPlace(place);
//       setNewEvent(prev => ({
//         ...prev,
//         location: {
//           name: place.name,
//           address: place.formatted_address,
//           lat: place.geometry.location.lat(),
//           lng: place.geometry.location.lng(),
//         }
//       }));

//       if (mapRef.current) {
//         mapRef.current.panTo(place.geometry.location);
//         mapRef.current.setZoom(16);
//       }
//     }
//   }, [autocomplete]);

//   // Calculate directions between points
//   const calculateDirections = useCallback((waypoints) => {
//     if (!window.google || !mapRef.current) return;

//     const directionsService = new window.google.maps.DirectionsService();

//     const formattedWaypoints = waypoints
//       .filter(event => event.location)
//       .map(event => ({
//         location: new window.google.maps.LatLng(event.location.lat, event.location.lng),
//         stopover: true,
//       }));

//     if (formattedWaypoints.length < 2) {
//       toast.warning('You need at least 2 locations to optimize a route');
//       return;
//     }

//     directionsService.route(
//       {
//         origin: formattedWaypoints[0].location,
//         destination: formattedWaypoints[formattedWaypoints.length - 1].location,
//         waypoints: formattedWaypoints.slice(1, -1),
//         travelMode: window.google.maps.TravelMode.DRIVING,
//         optimizeWaypoints: true,
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           setDirections(result);
//           setRouteOptimized(true);
//           toast.success('Route optimized successfully!');
//         } else {
//           toast.error('Directions request failed');
//         }
//       }
//     );
//   }, []);

//   // Optimize route
//   const optimizeRoute = () => {
//     calculateDirections(events);
//   };

//   // Add new event to itinerary
//   const addEvent = async () => {
//     if (!userId) {
//       toast.error('Please sign in to add events');
//       return;
//     }

//     if (!newEvent.name || !newEvent.location) {
//       toast.error('Please fill all required fields');
//       return;
//     }

//     const eventToAdd = {
//       ...newEvent,
//       id: Date.now().toString(),
//       addedAt: new Date(),
//     };

//     try {
//       const tripRef = doc(db, 'trips', userId);
//       const tripSnap = await getDoc(tripRef);

//       const currentItinerary = tripSnap.exists() ? tripSnap.data().itinerary || [] : [];

//       await setDoc(tripRef, {
//         itinerary: [...currentItinerary, eventToAdd],
//         lastUpdated: new Date(),
//       }, { merge: true });

//       toast.success('Spiritual activity added to itinerary');
//       setNewEvent({
//         name: '',
//         type: 'temple',
//         date: new Date(),
//         time: '09:00',
//         description: '',
//         location: null,
//       });
//       setSelectedPlace(null);
//     } catch (error) {
//       toast.error('Failed to add activity');
//       console.error(error);
//     }
//   };

//   // Remove event from itinerary
//   const removeEvent = async (eventId) => {
//     if (!userId) return;

//     try {
//       const tripRef = doc(db, 'trips', userId);
//       const tripSnap = await getDoc(tripRef);

//       if (!tripSnap.exists()) return;

//       const currentItinerary = tripSnap.data().itinerary || [];

//       await setDoc(tripRef, {
//         itinerary: currentItinerary.filter(event => event.id !== eventId),
//         lastUpdated: new Date(),
//       }, { merge: true });

//       toast.success('Activity removed');
//     } catch (error) {
//       toast.error('Failed to remove activity');
//       console.error(error);
//     }
//   };

//   // Get AI suggestions via API call
//   const getAiSuggestions = async () => {
//     if (!userId) return;

//     setIsAiLoading(true);
//     try {
//       const response = await fetch('/api/get-suggestions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           currentItinerary: events
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to get suggestions');
//       }

//       const data = await response.json();

//       await setDoc(doc(db, 'ai-suggestions', userId), {
//         suggestions: data.suggestions,
//         generatedAt: new Date(),
//       });

//       setAiSuggestions(data.suggestions);
//       toast.success('Spiritual recommendations generated!');
//     } catch (error) {
//       toast.error('Failed to get suggestions');
//       console.error(error);
//     } finally {
//       setIsAiLoading(false);
//     }
//   };

//   // Add AI suggestion to itinerary
//   const addAiSuggestion = async (suggestion) => {
//     const eventToAdd = {
//       name: suggestion.title,
//       type: suggestion.type,
//       date: newEvent.date,
//       time: suggestion.bestTime,
//       description: `${suggestion.description}\n\nSpecial Practices: ${suggestion.practices?.join(', ') || 'None specified'}`,
//       location: null,
//       id: `ai-${suggestion.id}`,
//       isAiGenerated: true,
//     };

//     try {
//       const tripRef = doc(db, 'trips', userId);
//       const tripSnap = await getDoc(tripRef);

//       const currentItinerary = tripSnap.exists() ? tripSnap.data().itinerary || [] : [];

//       await setDoc(tripRef, {
//         itinerary: [...currentItinerary, eventToAdd],
//         lastUpdated: new Date(),
//       }, { merge: true });

//       toast.success('Spiritual recommendation added to itinerary');
//     } catch (error) {
//       toast.error('Failed to add recommendation');
//       console.error(error);
//     }
//   };

//   // Download itinerary as PDF
//   const downloadItinerary = () => {
//     toast.info('PDF generation would be implemented here');
//   };

//   // Share trip
//   const shareTrip = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: 'My Pandharpur Spiritual Journey',
//         text: 'Check out my spiritual trip plan for Pandharpur!',
//         url: window.location.href,
//       }).catch(err => {
//         console.error('Error sharing:', err);
//       });
//     } else {
//       toast.info('Copied trip link to clipboard');
//       navigator.clipboard.writeText(window.location.href);
//     }
//   };

//   if (loadError) return <div>Error loading maps</div>;
//   if (!isLoaded || (isUserLoaded && !user)) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12" /></div>;
//   if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12" /></div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
//           animate={{
//             x: [0, 30, -20, 0],
//             y: [0, -50, 20, 0],
//             scale: [1, 1.1, 0.9, 1],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
//           animate={{
//             x: [0, -30, 20, 0],
//             y: [0, 40, -30, 0],
//             scale: [1, 1.2, 0.8, 1],
//           }}
//           transition={{
//             duration: 12,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 2
//           }}
//         />
//         <motion.div
//           className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
//           animate={{
//             x: [0, 40, -30, 0],
//             y: [0, 30, -40, 0],
//             scale: [1, 0.9, 1.1, 1],
//           }}
//           transition={{
//             duration: 14,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 4
//           }}
//         />
//       </div>

//       <div className="container mx-auto px-4 py-8 relative z-10">
//         {/* Trip Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
//         >
//           <div>
//             <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
//               Pandharpur Spiritual Trip Planner
//             </h1>
//             <p className="text-indigo-700 mt-2">Plan your divine journey to the holy city</p>
//           </div>
//           <div className="flex gap-3">
//             <Button
//               onClick={generateFullTripPlan}
//               disabled={isGeneratingFullPlan}
//               className="bg-purple-600 hover:bg-purple-700"
//             >
//               {isGeneratingFullPlan ? (
//                 <Loader2 className="animate-spin h-4 w-4 mr-2" />
//               ) : (
//                 <Sparkles className="h-4 w-4 mr-2" />
//               )}
//               {isGeneratingFullPlan ? 'Generating...' : 'AI Full Plan'}
//             </Button>
//             <Button variant="outline" onClick={shareTrip} className="border-indigo-300 hover:bg-indigo-50">
//               <Share2 className="h-4 w-4 mr-2 text-indigo-600" /> Share
//             </Button>
//             <Button variant="outline" onClick={downloadItinerary} className="border-indigo-300 hover:bg-indigo-50">
//               <Download className="h-4 w-4 mr-2 text-indigo-600" /> Export
//             </Button>
//           </div>
//         </motion.div>

//         {!userId ? (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.3 }}
//             className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-8 max-w-2xl mx-auto border border-indigo-200"
//           >
//             <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Sign In to Plan Your Spiritual Journey</h2>
//             <p className="text-indigo-600 mb-6">Create your personalized Pandharpur itinerary with our AI-powered planner</p>
//             <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
//               Sign In
//             </Button>
//           </motion.div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left Column - Itinerary Form */}
//             <div className="lg:col-span-1 space-y-6">
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4, delay: 0.2 }}
//               >
//                 <Card className="border-indigo-200 bg-white/90 backdrop-blur-sm">
//                   <CardHeader>
//                     <CardTitle className="text-indigo-900">Add Spiritual Activity</CardTitle>
//                     <CardDescription className="text-indigo-700">Plan your sacred visit</CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1 text-indigo-800">Activity Name</label>
//                       <Input
//                         value={newEvent.name}
//                         onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
//                         placeholder="e.g. Vitthal Temple Morning Aarti"
//                         className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-1 text-indigo-800">Activity Type</label>
//                       <Select
//                         value={newEvent.type}
//                         onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
//                       >
//                         <SelectTrigger className="border-indigo-300">
//                           <SelectValue placeholder="Select type" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="temple">
//                             <div className="flex items-center gap-2">
//                               <Landmark className="h-4 w-4 text-indigo-600" /> Temple
//                             </div>
//                           </SelectItem>
//                           <SelectItem value="food">
//                             <div className="flex items-center gap-2">
//                               <Utensils className="h-4 w-4 text-indigo-600" /> Food
//                             </div>
//                           </SelectItem>
//                           <SelectItem value="accommodation">
//                             <div className="flex items-center gap-2">
//                               <Hotel className="h-4 w-4 text-indigo-600" /> Stay
//                             </div>
//                           </SelectItem>
//                           <SelectItem value="landmark">
//                             <div className="flex items-center gap-2">
//                               <MapPin className="h-4 w-4 text-indigo-600" /> Landmark
//                             </div>
//                           </SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-1 text-indigo-800">Date</label>
//                         <DatePicker
//                           selected={newEvent.date}
//                           onChange={(date) => setNewEvent({ ...newEvent, date })}
//                           className="w-full p-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-1 text-indigo-800">Time</label>
//                         <Input
//                           type="time"
//                           value={newEvent.time}
//                           onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
//                           className="w-full p-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-1 text-indigo-800">Location</label>
//                       <Autocomplete
//                         onLoad={(auto) => setAutocomplete(auto)}
//                         onPlaceChanged={onPlaceChanged}
//                         options={{
//                           types: ['place_of_worship', 'restaurant', 'lodging', 'tourist_attraction'],
//                           componentRestrictions: { country: 'in' },
//                           bounds: {
//                             north: 17.8,
//                             south: 17.5,
//                             east: 75.5,
//                             west: 75.2,
//                           },
//                         }}
//                       >
//                         <Input
//                           type="text"
//                           placeholder="Search sacred places in Pandharpur"
//                           className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
//                         />
//                       </Autocomplete>
//                       {newEvent.location && (
//                         <p className="text-xs mt-1 text-indigo-600">
//                           Selected: {newEvent.location.name}
//                         </p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-1 text-indigo-800">Spiritual Notes</label>
//                       <Textarea
//                         value={newEvent.description}
//                         onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//                         placeholder="Any special rituals or preparations..."
//                         rows={3}
//                         className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
//                       />
//                     </div>
//                   </CardContent>
//                   <CardFooter>
//                     <Button
//                       onClick={addEvent}
//                       className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
//                     >
//                       <Plus className="h-4 w-4 mr-2" /> Add to Itinerary
//                     </Button>
//                   </CardFooter>
//                 </Card>
//               </motion.div>

//               {/* AI Suggestions Section */}
//               <motion.div
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.4, delay: 0.4 }}
//               >
//                 <Card className="border-purple-200 bg-white/90 backdrop-blur-sm">
//                   <CardHeader>
//                     <div className="flex justify-between items-center">
//                       <CardTitle className="text-purple-900">Spiritual Recommendations</CardTitle>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={getAiSuggestions}
//                         disabled={isAiLoading}
//                         className="border-purple-300 text-purple-700 hover:bg-purple-50"
//                       >
//                         {isAiLoading ? (
//                           <Loader2 className="h-4 w-4 animate-spin" />
//                         ) : (
//                           <Sparkles className="h-4 w-4 mr-2" />
//                         )}
//                         {isAiLoading ? 'Generating...' : 'Get Suggestions'}
//                       </Button>
//                     </div>
//                     <CardDescription className="text-purple-700">
//                       AI-powered sacred place recommendations
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     {aiSuggestions.length === 0 ? (
//                       <div className="text-center py-6">
//                         <Sparkles className="h-8 w-8 mx-auto text-purple-300 mb-3" />
//                         <p className="text-purple-500">Get divine suggestions for your pilgrimage</p>
//                         <Button
//                           variant="ghost"
//                           className="mt-4 text-purple-600 hover:bg-purple-50"
//                           onClick={getAiSuggestions}
//                           disabled={isAiLoading}
//                         >
//                           Generate Recommendations
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="space-y-3">
//                         {aiSuggestions.map((suggestion) => (
//                           <motion.div
//                             key={suggestion.id}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="border border-purple-100 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
//                           >
//                             <div className="flex justify-between items-start">
//                               <div>
//                                 <h3 className="font-medium text-purple-900">{suggestion.title}</h3>
//                                 <p className="text-sm text-purple-700 mt-1">{suggestion.description}</p>
//                                 <div className="flex gap-2 mt-2">
//                                   <Badge variant="outline" className="text-purple-600 border-purple-200">
//                                     {suggestion.type}
//                                   </Badge>
//                                   <Badge variant="outline" className="text-purple-600 border-purple-200">
//                                     {suggestion.duration}
//                                   </Badge>
//                                 </div>
//                                 {suggestion.practices && (
//                                   <p className="text-xs text-purple-500 mt-2">
//                                     <span className="font-medium">Practices:</span> {suggestion.practices.join(', ')}
//                                   </p>
//                                 )}
//                               </div>
//                               <Button
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => addAiSuggestion(suggestion)}
//                                 className="text-purple-600 hover:bg-purple-100"
//                               >
//                                 <Plus className="h-4 w-4" />
//                               </Button>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </div>

//             {/* Right Column - Map and Itinerary */}
//             <div className="lg:col-span-2 space-y-6">
//               {/* Tabs for different views */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 <Tabs defaultValue="itinerary" className="w-full">
//                   <TabsList className="grid w-full grid-cols-2 bg-indigo-100">
//                     <TabsTrigger
//                       value="itinerary"
//                       className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
//                     >
//                       Your Itinerary
//                     </TabsTrigger>
//                     <TabsTrigger
//                       value="map"
//                       className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
//                     >
//                       Sacred Map
//                     </TabsTrigger>
//                   </TabsList>

//                   <TabsContent value="itinerary">
//                     <Card className="bg-white/90 backdrop-blur-sm">
//                       <CardHeader>
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <CardTitle className="text-indigo-900">Your Spiritual Journey</CardTitle>
//                             <CardDescription className="text-indigo-700">
//                               {events.length} planned {events.length === 1 ? 'activity' : 'activities'}
//                             </CardDescription>
//                           </div>
//                           {events.length > 1 && (
//                             <Button
//                               variant="outline"
//                               onClick={optimizeRoute}
//                               disabled={routeOptimized}
//                               className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
//                             >
//                               <Route className="h-4 w-4 mr-2" />
//                               {routeOptimized ? 'Route Optimized' : 'Optimize Route'}
//                             </Button>
//                           )}
//                         </div>
//                       </CardHeader>
//                       <CardContent>
//                         {events.length === 0 ? (
//                           <div className="text-center py-12">
//                             <Landmark className="h-10 w-10 mx-auto text-indigo-300 mb-4" />
//                             <h3 className="text-lg font-medium text-indigo-800 mb-2">Your spiritual journey begins here</h3>
//                             <p className="text-indigo-600 mb-6">Add activities or generate a full plan to begin</p>
//                           </div>
//                         ) : (
//                           <div className="space-y-4">
//                             {events.map((event, index) => (
//                               <motion.div
//                                 key={event.id}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.2, delay: index * 0.05 }}
//                                 className="border border-indigo-100 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
//                               >
//                                 <div className="flex justify-between items-start">
//                                   <div className="flex gap-4">
//                                     <div className="flex flex-col items-center">
//                                       <div className={`w-8 h-8 rounded-full flex items-center justify-center 
//                                         ${index === 0 ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
//                                         {index + 1}
//                                       </div>
//                                       {index < events.length - 1 && (
//                                         <div className="w-0.5 h-8 bg-indigo-200 my-1"></div>
//                                       )}
//                                     </div>
//                                     <div>
//                                       <div className="flex items-center gap-2">
//                                         <h3 className="font-medium text-indigo-900">{event.name}</h3>
//                                         {event.isAiGenerated && (
//                                           <Badge variant="outline" className="border-purple-200 text-purple-600">
//                                             AI Suggested
//                                           </Badge>
//                                         )}
//                                       </div>
//                                       <p className="text-sm text-indigo-700 flex items-center gap-1 mt-1">
//                                         <Calendar className="h-3 w-3" />
//                                         {format(new Date(event.date), 'PPP')} at {event.time}
//                                       </p>
//                                       {event.location && (
//                                         <p className="text-sm text-indigo-700 flex items-center gap-1 mt-1">
//                                           <MapPin className="h-3 w-3" />
//                                           {event.location.name}
//                                         </p>
//                                       )}
//                                       {event.description && (
//                                         <p className="text-sm text-indigo-600 mt-2">{event.description}</p>
//                                       )}
//                                     </div>
//                                   </div>
//                                   <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={() => removeEvent(event.id)}
//                                     className="text-indigo-600 hover:bg-indigo-100"
//                                   >
//                                     <Trash2 className="h-4 w-4" />
//                                   </Button>
//                                 </div>
//                               </motion.div>
//                             ))}
//                           </div>
//                         )}
//                       </CardContent>
//                     </Card>
//                   </TabsContent>

//                   <TabsContent value="map">
//                     <Card className="bg-white/90 backdrop-blur-sm">
//                       <CardHeader>
//                         <CardTitle className="text-indigo-900">Sacred Pandharpur Map</CardTitle>
//                         <CardDescription className="text-indigo-700">
//                           Explore divine locations and routes
//                         </CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <div className="rounded-xl overflow-hidden border border-indigo-200">
//                           <GoogleMap
//                             mapContainerStyle={mapContainerStyle}
//                             zoom={14}
//                             center={selectedPlace?.geometry?.location || pandharpurCenter}
//                             onLoad={(map) => {
//                               setMap(map);
//                               mapRef.current = map;
//                             }}
//                             options={{
//                               streetViewControl: false,
//                               mapTypeControl: false,
//                               fullscreenControl: false,
//                               styles: [
//                                 {
//                                   featureType: "poi",
//                                   elementType: "labels",
//                                   stylers: [{ visibility: "off" }]
//                                 }
//                               ]
//                             }}
//                           >
//                             {selectedPlace && (
//                               <Marker
//                                 position={selectedPlace.geometry.location}
//                                 title={selectedPlace.name}
//                                 icon={{
//                                   url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
//                                 }}
//                               />
//                             )}
//                             {events.filter(e => e.location).map((event, index) => (
//                               <Marker
//                                 key={event.id}
//                                 position={{ lat: event.location.lat, lng: event.location.lng }}
//                                 title={event.name}
//                                 label={{
//                                   text: (index + 1).toString(),
//                                   color: 'white',
//                                   fontSize: '12px',
//                                   fontWeight: 'bold',
//                                 }}
//                                 icon={{
//                                   url: event.type === 'temple'
//                                     ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
//                                     : event.type === 'food'
//                                       ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
//                                       : 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
//                                 }}
//                               />
//                             ))}
//                             {directions && <DirectionsRenderer directions={directions} />}
//                           </GoogleMap>
//                         </div>
//                       </CardContent>
//                       <CardFooter className="flex justify-between">
//                         <div className="text-sm text-indigo-700">
//                           {events.filter(e => e.location).length} sacred locations plotted
//                         </div>
//                         {events.filter(e => e.location).length > 1 && (
//                           <Button
//                             variant="outline"
//                             onClick={optimizeRoute}
//                             disabled={routeOptimized}
//                             className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
//                           >
//                             <Route className="h-4 w-4 mr-2" />
//                             {routeOptimized ? 'Route Optimized' : 'Optimize Route'}
//                           </Button>
//                         )}
//                       </CardFooter>
//                     </Card>
//                   </TabsContent>
//                 </Tabs>
//               </motion.div>

//               {/* Sacred Pandharpur Locations */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4, delay: 0.2 }}
//               >
//                 <Card className="border-indigo-200 bg-white/90 backdrop-blur-sm">
//                   <CardHeader>
//                     <CardTitle className="text-indigo-900">Sacred Pandharpur Locations</CardTitle>
//                     <CardDescription className="text-indigo-700">
//                       Must-visit spiritual places for devotees
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {[
//                         {
//                           name: 'Shri Vitthal Rukmini Temple',
//                           type: 'temple',
//                           description: 'The main temple dedicated to Lord Vitthal and Goddess Rukmini',
//                           icon: <Landmark className="h-5 w-5 text-indigo-500" />,
//                         },
//                         {
//                           name: 'Chandrabhaga River',
//                           type: 'landmark',
//                           description: 'Sacred river where devotees take holy dips',
//                           icon: <Landmark className="h-5 w-5 text-indigo-500" />,
//                         },
//                         {
//                           name: 'Sant Tukaram Maharaj Temple',
//                           type: 'temple',
//                           description: 'Dedicated to the famous Bhakti saint Sant Tukaram',
//                           icon: <Landmark className="h-5 w-5 text-indigo-500" />,
//                         },
//                         {
//                           name: 'Pandharpur Prasadalaya',
//                           type: 'food',
//                           description: 'Experience divine temple food offerings',
//                           icon: <Utensils className="h-5 w-5 text-indigo-500" />,
//                         },
//                         {
//                           name: 'Namdev Maharaj Temple',
//                           type: 'temple',
//                           description: 'Temple dedicated to Saint Namdev',
//                           icon: <Landmark className="h-5 w-5 text-indigo-500" />,
//                         },
//                         {
//                           name: 'Pandharpur Pilgrimage Museum',
//                           type: 'landmark',
//                           description: 'Learn about the rich history of the pilgrimage',
//                           icon: <Landmark className="h-5 w-5 text-indigo-500" />,
//                         },
//                       ].map((place, index) => (
//                         <motion.div
//                           key={index}
//                           whileHover={{ y: -2 }}
//                           className="border border-indigo-100 rounded-lg p-4 bg-white hover:shadow-sm cursor-pointer transition-all"
//                           onClick={() => {
//                             setNewEvent(prev => ({
//                               ...prev,
//                               name: place.name,
//                               type: place.type,
//                               description: place.description,
//                             }));
//                             toast.info(`Search for "${place.name}" in the location field`);
//                           }}
//                         >
//                           <div className="flex items-start gap-3">
//                             <div className="p-2 bg-indigo-100 rounded-full">
//                               {place.icon}
//                             </div>
//                             <div>
//                               <h3 className="font-medium text-indigo-800">{place.name}</h3>
//                               <p className="text-sm text-indigo-600 mt-1">{place.description}</p>
//                               <Badge variant="outline" className="mt-2 text-indigo-600 border-indigo-200">
//                                 {place.type}
//                               </Badge>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
import { trips, aiSuggestions } from '@/lib/schema';

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
  const [aiSuggestionsList, setAiSuggestionsList] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary');
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

  // Initialize trip data for new users
  const initializeTrip = async () => {
    if (!userId) return false;

    try {
      const existingTrip = await db.select().from(trips).where(eq(trips.userId, userId));
      
      if (existingTrip.length === 0) {
        await db.insert(trips).values({
          userId,
          destination: 'Pandharpur',
          itinerary: [],
          coverImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error initializing trip data:', error);
      return false;
    }
  };

  // Load user's trip data
  useEffect(() => {
    if (!isUserLoaded) return;

    const loadTripData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        await initializeTrip();

        const result = await db.select().from(trips).where(eq(trips.userId, userId));
        
        if (result.length > 0) {
          const data = result[0];
          setTrip(data);

          const sortedEvents = [...(data.itinerary || [])].sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateA - dateB;
          });
          setEvents(sortedEvents);
        } else {
          setEvents([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading trip data:', error);
        setLoading(false);
      }
    };

    const loadAiSuggestions = async () => {
      if (!userId) return;

      try {
        const result = await db.select().from(aiSuggestions).where(eq(aiSuggestions.userId, userId));
        
        if (result.length > 0) {
          setAiSuggestionsList(result[0].suggestions || []);
        } else {
          setAiSuggestionsList([]);
        }
      } catch (error) {
        console.error('Error loading AI suggestions:', error);
        setAiSuggestionsList([]);
      }
    };

    loadTripData();
    loadAiSuggestions();
  }, [isUserLoaded, userId]);

  // Generate full trip plan with API call
  const generateFullTripPlan = async () => {
    if (!userId) {
      toast.error('Please sign in to generate trip plans');
      return;
    }

    setIsGeneratingFullPlan(true);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tripDuration: 3,
          specialRequirements: 'Spiritual focus with temple visits',
          preferredActivities: 'Morning aartis, temple darshan, local cuisine'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan');
      }

      const plan = await response.json();

      // Convert to our event format
      const newEvents = plan.days.flatMap(day =>
        day.activities.map(activity => ({
          name: activity.name,
          type: activity.type,
          date: new Date(day.date),
          time: activity.time,
          description: activity.description,
          location: activity.location,
          id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          isAiGenerated: true
        }))
      );

      // Update both trips and ai-suggestions
      await db.transaction(async (tx) => {
        await tx.update(trips)
          .set({ 
            itinerary: newEvents,
            updatedAt: new Date()
          })
          .where(eq(trips.userId, userId));

        await tx.insert(aiSuggestions)
          .values({
            userId,
            suggestions: plan.days.flatMap(day => day.activities.map(act => ({
              id: `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
              title: act.name,
              description: act.description,
              type: act.type,
              duration: act.duration,
              bestTime: act.time,
              practices: act.description.match(/special practices:(.*)/i)?.[1]?.split(',') || []
            }))),
            generatedAt: new Date()
          })
          .onConflictDoUpdate({
            target: aiSuggestions.userId,
            set: {
              suggestions: plan.days.flatMap(day => day.activities.map(act => ({
                id: `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                title: act.name,
                description: act.description,
                type: act.type,
                duration: act.duration,
                bestTime: act.time,
                practices: act.description.match(/special practices:(.*)/i)?.[1]?.split(',') || []
              }))),
              generatedAt: new Date()
            }
          });
      });

      toast.success('Full spiritual trip plan generated successfully!');
    } catch (error) {
      console.error('AI generation error:', error);
      toast.error('Failed to generate trip plan. Please try again.');
    } finally {
      setIsGeneratingFullPlan(false);
    }
  };

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

  // Optimize route
  const optimizeRoute = () => {
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
      const result = await db.select().from(trips).where(eq(trips.userId, userId));
      const currentItinerary = result.length > 0 ? result[0].itinerary || [] : [];

      await db.update(trips)
        .set({
          itinerary: [...currentItinerary, eventToAdd],
          updatedAt: new Date()
        })
        .where(eq(trips.userId, userId));

      toast.success('Spiritual activity added to itinerary');
      setNewEvent({
        name: '',
        type: 'temple',
        date: new Date(),
        time: '09:00',
        description: '',
        location: null,
      });
      setSelectedPlace(null);
    } catch (error) {
      toast.error('Failed to add activity');
      console.error(error);
    }
  };

  // Remove event from itinerary
  const removeEvent = async (eventId) => {
    if (!userId) return;

    try {
      const result = await db.select().from(trips).where(eq(trips.userId, userId));
      if (result.length === 0) return;

      const currentItinerary = result[0].itinerary || [];

      await db.update(trips)
        .set({
          itinerary: currentItinerary.filter(event => event.id !== eventId),
          updatedAt: new Date()
        })
        .where(eq(trips.userId, userId));

      toast.success('Activity removed');
    } catch (error) {
      toast.error('Failed to remove activity');
      console.error(error);
    }
  };

  // Get AI suggestions via API call
  const getAiSuggestions = async () => {
    if (!userId) return;

    setIsAiLoading(true);
    try {
      const response = await fetch('/api/get-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentItinerary: events
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get suggestions');
      }

      const data = await response.json();

      await db.insert(aiSuggestions)
        .values({
          userId,
          suggestions: data.suggestions,
          generatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: aiSuggestions.userId,
          set: {
            suggestions: data.suggestions,
            generatedAt: new Date()
          }
        });

      setAiSuggestionsList(data.suggestions);
      toast.success('Spiritual recommendations generated!');
    } catch (error) {
      toast.error('Failed to get suggestions');
      console.error(error);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Add AI suggestion to itinerary
  const addAiSuggestion = async (suggestion) => {
    const eventToAdd = {
      name: suggestion.title,
      type: suggestion.type,
      date: newEvent.date,
      time: suggestion.bestTime,
      description: `${suggestion.description}\n\nSpecial Practices: ${suggestion.practices?.join(', ') || 'None specified'}`,
      location: null,
      id: `ai-${suggestion.id}`,
      isAiGenerated: true,
    };

    try {
      const result = await db.select().from(trips).where(eq(trips.userId, userId));
      const currentItinerary = result.length > 0 ? result[0].itinerary || [] : [];

      await db.update(trips)
        .set({
          itinerary: [...currentItinerary, eventToAdd],
          updatedAt: new Date()
        })
        .where(eq(trips.userId, userId));

      toast.success('Spiritual recommendation added to itinerary');
    } catch (error) {
      toast.error('Failed to add recommendation');
      console.error(error);
    }
  };

  // Download itinerary as PDF
  const downloadItinerary = () => {
    toast.info('PDF generation would be implemented here');
  };

  // Share trip
  const shareTrip = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Pandharpur Spiritual Journey',
        text: 'Check out my spiritual trip plan for Pandharpur!',
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      toast.info('Copied trip link to clipboard');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded || (isUserLoaded && !user)) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12" /></div>;
  if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin h-12 w-12" /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
        <motion.div
          className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 40, -30, 0],
            y: [0, 30, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Trip Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Pandharpur Spiritual Trip Planner
            </h1>
            <p className="text-indigo-700 mt-2">Plan your divine journey to the holy city</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={generateFullTripPlan}
              disabled={isGeneratingFullPlan}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isGeneratingFullPlan ? (
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
              ) : (
                <Sparkles className="h-4 w-4 mr-2" />
              )}
              {isGeneratingFullPlan ? 'Generating...' : 'AI Full Plan'}
            </Button>
            <Button variant="outline" onClick={shareTrip} className="border-indigo-300 hover:bg-indigo-50">
              <Share2 className="h-4 w-4 mr-2 text-indigo-600" /> Share
            </Button>
            <Button variant="outline" onClick={downloadItinerary} className="border-indigo-300 hover:bg-indigo-50">
              <Download className="h-4 w-4 mr-2 text-indigo-600" /> Export
            </Button>
          </div>
        </motion.div>

        {!userId ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-8 max-w-2xl mx-auto border border-indigo-200"
          >
            <h2 className="text-2xl font-semibold text-indigo-800 mb-4">Sign In to Plan Your Spiritual Journey</h2>
            <p className="text-indigo-600 mb-6">Create your personalized Pandharpur itinerary with our AI-powered planner</p>
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Sign In
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Itinerary Form */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="border-indigo-200 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-indigo-900">Add Spiritual Activity</CardTitle>
                    <CardDescription className="text-indigo-700">Plan your sacred visit</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-indigo-800">Activity Name</label>
                      <Input
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        placeholder="e.g. Vitthal Temple Morning Aarti"
                        className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-indigo-800">Activity Type</label>
                      <Select
                        value={newEvent.type}
                        onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}
                      >
                        <SelectTrigger className="border-indigo-300">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="temple">
                            <div className="flex items-center gap-2">
                              <Landmark className="h-4 w-4 text-indigo-600" /> Temple
                            </div>
                          </SelectItem>
                          <SelectItem value="food">
                            <div className="flex items-center gap-2">
                              <Utensils className="h-4 w-4 text-indigo-600" /> Food
                            </div>
                          </SelectItem>
                          <SelectItem value="accommodation">
                            <div className="flex items-center gap-2">
                              <Hotel className="h-4 w-4 text-indigo-600" /> Stay
                            </div>
                          </SelectItem>
                          <SelectItem value="landmark">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-indigo-600" /> Landmark
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-indigo-800">Date</label>
                        <DatePicker
                          selected={newEvent.date}
                          onChange={(date) => setNewEvent({ ...newEvent, date })}
                          className="w-full p-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-indigo-800">Time</label>
                        <Input
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                          className="w-full p-2 border border-indigo-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-indigo-800">Location</label>
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
                          className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </Autocomplete>
                      {newEvent.location && (
                        <p className="text-xs mt-1 text-indigo-600">
                          Selected: {newEvent.location.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-indigo-800">Spiritual Notes</label>
                      <Textarea
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Any special rituals or preparations..."
                        rows={3}
                        className="border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={addEvent}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add to Itinerary
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* AI Suggestions Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <Card className="border-purple-200 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-purple-900">Spiritual Recommendations</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={getAiSuggestions}
                        disabled={isAiLoading}
                        className="border-purple-300 text-purple-700 hover:bg-purple-50"
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
                      AI-powered sacred place recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiSuggestionsList.length === 0 ? (
                      <div className="text-center py-6">
                        <Sparkles className="h-8 w-8 mx-auto text-purple-300 mb-3" />
                        <p className="text-purple-500">Get divine suggestions for your pilgrimage</p>
                        <Button
                          variant="ghost"
                          className="mt-4 text-purple-600 hover:bg-purple-50"
                          onClick={getAiSuggestions}
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
                            className="border border-purple-100 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                          >
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
                                {suggestion.practices && (
                                  <p className="text-xs text-purple-500 mt-2">
                                    <span className="font-medium">Practices:</span> {suggestion.practices.join(', ')}
                                  </p>
                                )}
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
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Map and Itinerary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs for different views */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Tabs defaultValue="itinerary" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-indigo-100">
                    <TabsTrigger
                      value="itinerary"
                      className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                    >
                      Your Itinerary
                    </TabsTrigger>
                    <TabsTrigger
                      value="map"
                      className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                    >
                      Sacred Map
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="itinerary">
                    <Card className="bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle className="text-indigo-900">Your Spiritual Journey</CardTitle>
                            <CardDescription className="text-indigo-700">
                              {events.length} planned {events.length === 1 ? 'activity' : 'activities'}
                            </CardDescription>
                          </div>
                          {events.length > 1 && (
                            <Button
                              variant="outline"
                              onClick={optimizeRoute}
                              disabled={routeOptimized}
                              className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
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
                            <Landmark className="h-10 w-10 mx-auto text-indigo-300 mb-4" />
                            <h3 className="text-lg font-medium text-indigo-800 mb-2">Your spiritual journey begins here</h3>
                            <p className="text-indigo-600 mb-6">Add activities or generate a full plan to begin</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {events.map((event, index) => (
                              <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="border border-indigo-100 rounded-lg p-4 bg-white hover:shadow-sm transition-shadow"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                                        ${index === 0 ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-600'}`}>
                                        {index + 1}
                                      </div>
                                      {index < events.length - 1 && (
                                        <div className="w-0.5 h-8 bg-indigo-200 my-1"></div>
                                      )}
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-indigo-900">{event.name}</h3>
                                        {event.isAiGenerated && (
                                          <Badge variant="outline" className="border-purple-200 text-purple-600">
                                            AI Suggested
                                          </Badge>
                                        )}
                                      </div>
                                      <p className="text-sm text-indigo-700 flex items-center gap-1 mt-1">
                                        <Calendar className="h-3 w-3" />
                                        {format(new Date(event.date), 'PPP')} at {event.time}
                                      </p>
                                      {event.location && (
                                        <p className="text-sm text-indigo-700 flex items-center gap-1 mt-1">
                                          <MapPin className="h-3 w-3" />
                                          {event.location.name}
                                        </p>
                                      )}
                                      {event.description && (
                                        <p className="text-sm text-indigo-600 mt-2">{event.description}</p>
                                      )}
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeEvent(event.id)}
                                    className="text-indigo-600 hover:bg-indigo-100"
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

                  <TabsContent value="map">
                    <Card className="bg-white/90 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-indigo-900">Sacred Pandharpur Map</CardTitle>
                        <CardDescription className="text-indigo-700">
                          Explore divine locations and routes
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="rounded-xl overflow-hidden border border-indigo-200">
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
                        <div className="text-sm text-indigo-700">
                          {events.filter(e => e.location).length} sacred locations plotted
                        </div>
                        {events.filter(e => e.location).length > 1 && (
                          <Button
                            variant="outline"
                            onClick={optimizeRoute}
                            disabled={routeOptimized}
                            className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                          >
                            <Route className="h-4 w-4 mr-2" />
                            {routeOptimized ? 'Route Optimized' : 'Optimize Route'}
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </motion.div>

              {/* Sacred Pandharpur Locations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Card className="border-indigo-200 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-indigo-900">Sacred Pandharpur Locations</CardTitle>
                    <CardDescription className="text-indigo-700">
                      Must-visit spiritual places for devotees
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          name: 'Shri Vitthal Rukmini Temple',
                          type: 'temple',
                          description: 'The main temple dedicated to Lord Vitthal and Goddess Rukmini',
                          icon: <Landmark className="h-5 w-5 text-indigo-500" />,
                        },
                        {
                          name: 'Chandrabhaga River',
                          type: 'landmark',
                          description: 'Sacred river where devotees take holy dips',
                          icon: <Landmark className="h-5 w-5 text-indigo-500" />,
                        },
                        {
                          name: 'Sant Tukaram Maharaj Temple',
                          type: 'temple',
                          description: 'Dedicated to the famous Bhakti saint Sant Tukaram',
                          icon: <Landmark className="h-5 w-5 text-indigo-500" />,
                        },
                        {
                          name: 'Pandharpur Prasadalaya',
                          type: 'food',
                          description: 'Experience divine temple food offerings',
                          icon: <Utensils className="h-5 w-5 text-indigo-500" />,
                        },
                        {
                          name: 'Namdev Maharaj Temple',
                          type: 'temple',
                          description: 'Temple dedicated to Saint Namdev',
                          icon: <Landmark className="h-5 w-5 text-indigo-500" />,
                        },
                        {
                          name: 'Pandharpur Pilgrimage Museum',
                          type: 'landmark',
                          description: 'Learn about the rich history of the pilgrimage',
                          icon: <Landmark className="h-5 w-5 text-indigo-500" />,
                        },
                      ].map((place, index) => (
                        <motion.div
                          key={index}
                          whileHover={{ y: -2 }}
                          className="border border-indigo-100 rounded-lg p-4 bg-white hover:shadow-sm cursor-pointer transition-all"
                          onClick={() => {
                            setNewEvent(prev => ({
                              ...prev,
                              name: place.name,
                              type: place.type,
                              description: place.description,
                            }));
                            toast.info(`Search for "${place.name}" in the location field`);
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2 bg-indigo-100 rounded-full">
                              {place.icon}
                            </div>
                            <div>
                              <h3 className="font-medium text-indigo-800">{place.name}</h3>
                              <p className="text-sm text-indigo-600 mt-1">{place.description}</p>
                              <Badge variant="outline" className="mt-2 text-indigo-600 border-indigo-200">
                                {place.type}
                              </Badge>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}