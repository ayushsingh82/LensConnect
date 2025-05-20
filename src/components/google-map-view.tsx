"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef } from "react";

interface GoogleMapViewProps {
  isOpen: boolean;
  onClose: () => void;
  location: {
    lat: number;
    lng: number;
  };
  eventName: string;
}

export function GoogleMapView({ isOpen, onClose, location, eventName }: GoogleMapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !mapRef.current) return;

    // Load Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const map = new google.maps.Map(mapRef.current!, {
        center: location,
        zoom: 15,
        styles: [
          {
            featureType: "all",
            elementType: "all",
            stylers: [{ color: "#1a1a1a" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#2d1b4d" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#333333" }],
          },
        ],
      });

      new google.maps.Marker({
        position: location,
        map,
        title: eventName,
        animation: google.maps.Animation.DROP,
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [isOpen, location, eventName]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[600px] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>{eventName} - Location</DialogTitle>
        </DialogHeader>
        <div ref={mapRef} className="w-full h-[calc(100%-4rem)]" />
      </DialogContent>
    </Dialog>
  );
} 