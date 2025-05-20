"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function CreateEvent() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFeatures(features.filter(feature => feature !== featureToRemove));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 ">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">Create New Event</h1>
      
      <form className="space-y-6 border-2 border-white rounded-xl p-6">
        {/* Event Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">Event Name</Label>
          <Input
            id="name"
            placeholder="Enter event name"
            className="border-white focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* Event Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">Event Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your event..."
            className="min-h-[100px] border-white focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        {/* Event Image */}
        <div className="space-y-2">
                                    <Label className="text-white">Event Image</Label>
          <div className="border-2 border-dashed border-white rounded-lg p-8 text-center hover:border-purple-500 transition-colors cursor-pointer">
            <input type="file" className="hidden" id="image" accept="image/jpeg,image/png" />
            <label htmlFor="image" className="cursor-pointer">
              <div className="space-y-2">
                <div className="text-white">Click to upload event image</div>
                <div className="text-sm text-white/70">
                  Supports: JPG, PNG (Max 5MB)
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Start Date & Time */}
        <div className="space-y-2">
          <Label className="text-white">Start Date & Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-white hover:border-purple-500",
                  !startDate && "text-white/70"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                {startDate ? format(startDate, "PPP") : "Select start date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
                className="border border-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date & Time */}
        <div className="space-y-2">
          <Label className="text-white">End Date & Time</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-white hover:border-purple-500",
                  !endDate && "text-white/70"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-white" />
                {endDate ? format(endDate, "PPP") : "Select end date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                initialFocus
                className="border border-white"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Event Features */}
        <div className="space-y-4">
          <label className="block text-white">
            Event Features
            <div className="mt-2 flex gap-2">
              <Input
                type="text"
                placeholder="Add a feature (e.g., POAP, Live Streaming)"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addFeature}
                className="bg-purple-500 hover:bg-purple-600 text-white"
              >
                Add
              </Button>
            </div>
          </label>
          <div className="flex flex-wrap gap-2">
            {features.map((feature) => (
              <Badge
                key={feature}
                variant="secondary"
                className="bg-purple-500/10 text-white border border-white px-3 py-1 flex items-center gap-2"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(feature)}
                  className="hover:text-red-400"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500">
          Create Event
        </Button>
      </form>
    </div>
  );
}