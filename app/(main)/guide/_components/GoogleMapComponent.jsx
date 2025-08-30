// File: app/(main)/guide/_components/GoogleMapComponent.jsx

"use client";

import { useEffect, useRef, useCallback } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

/**
 * GoogleMapComponent (Client Component)
 *
 * This component handles the rendering of the Google Map,
 * including adding markers and polylines based on the provided locations.
 */
const GoogleMapComponent = ({ locations, GOOGLE_MAPS_API_KEY }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);
  const polyline = useRef(null);

  const initMap = useCallback(async () => {
    if (!GOOGLE_MAPS_API_KEY) {
      console.error("Google Maps API Key is missing.");
      return;
    }
    try {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["marker", "maps"],
      });
      const google = await loader.load();
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 17.6744, lng: 75.3235 },
        zoom: 14,
        mapId: 'TRIP_PLANNER_MAP_VFINAL',
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          { "featureType": "poi", "elementType": "labels.text", "stylers": [{ "visibility": "off" }] },
          { "featureType": "transit", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }
        ]
      });
      polyline.current = new google.maps.Polyline({
        strokeColor: "#ea580c",
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: mapInstance.current,
      });
    } catch (e) {
      console.error("Error loading Google Maps:", e);
    }
  }, [GOOGLE_MAPS_API_KEY]);

  useEffect(() => {
    initMap();
  }, [initMap]);

  useEffect(() => {
    if (!mapInstance.current || !window.google) return;
    markers.current.forEach(marker => marker.map = null);
    markers.current = [];
    polyline.current.setPath([]);

    if (!locations || locations.length === 0) {
      mapInstance.current.setCenter({ lat: 17.6744, lng: 75.3235 });
      mapInstance.current.setZoom(14);
      return;
    }

    const bounds = new window.google.maps.LatLngBounds();
    const path = [];
    locations.forEach(({ position, title }, index) => {
      if (position?.lat && position?.lng) {
        const pinElement = new window.google.maps.marker.PinElement({
          glyph: `${index + 1}`,
          background: "#f97316",
          borderColor: "#c2410c",
          glyphColor: "#ffffff",
        });
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map: mapInstance.current,
          position,
          title,
          content: pinElement.element,
        });
        markers.current.push(marker);
        bounds.extend(position);
        path.push(position);
      }
    });

    if (path.length > 1) {
      polyline.current.setPath(path);
    }

    if (locations.length > 0) {
      mapInstance.current.fitBounds(bounds);
    }
  }, [locations]);

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex items-center justify-center h-full bg-muted rounded-lg">
        <div className="text-center p-4">
          <p className="font-semibold text-destructive">API Key Missing</p>
        </div>
      </div>
    );
  }
  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
};

export default GoogleMapComponent;