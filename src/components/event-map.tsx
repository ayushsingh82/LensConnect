"use client";

import { useEffect, useRef, useState } from "react";
import { Users } from "lucide-react";

interface EventMapProps {
  eventLocation: {
    lat: number;
    lng: number;
  };
  attendees: number;
  fullscreen?: boolean;
  eventName?: string;
}

interface Character {
  id: string;
  x: number;
  y: number;
  lensHandle: string;
  type: 'ninja' | 'wizard' | 'knight' | 'archer';
}

export function EventMap({ eventLocation, attendees, fullscreen = false }: EventMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [characters, setCharacters] = useState<Character[]>([]);

  // Scale based on fullscreen mode
  const BASE_SIZE = fullscreen ? 18 : 12;
  const CANVAS_WIDTH = 1200;
  const CANVAS_HEIGHT = 800;

  // Mock data for characters
  useEffect(() => {
    const characterTypes: Character['type'][] = ['ninja', 'wizard', 'knight', 'archer'];
    const mockCharacters = Array.from({ length: attendees }, (_, i) => ({
      id: `char-${i}`,
      x: Math.random() * CANVAS_WIDTH,
      y: Math.random() * CANVAS_HEIGHT,
      lensHandle: `user${i + 1}.lens`,
      type: characterTypes[Math.floor(Math.random() * characterTypes.length)],
    }));
    setCharacters(mockCharacters);
  }, [attendees]);

  const drawCharacter = (ctx: CanvasRenderingContext2D, x: number, y: number, type: Character['type']) => {
    const pixelSize = BASE_SIZE;

    // Draw character shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.beginPath();
    ctx.ellipse(x, y + pixelSize * 2, pixelSize, pixelSize / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Draw character based on type
    ctx.fillStyle = "#4c1d95";
    ctx.fillRect(x - pixelSize, y - pixelSize, pixelSize * 2, pixelSize * 2);
    ctx.fillRect(x - pixelSize, y - pixelSize * 2, pixelSize * 2, pixelSize);
  };

  // Draw map and characters
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw map background with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#1a1a1a");
    gradient.addColorStop(1, "#2d1b4d");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid with glow effect
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 1;
    ctx.shadowColor = "#9333ea";
    ctx.shadowBlur = 5;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Draw event location marker with pulsing effect
    const pulseSize = 20 + Math.sin(Date.now() / 500) * 5;
    ctx.fillStyle = "rgba(147, 51, 234, 0.3)";
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, pulseSize * 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#9333ea";
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, pulseSize, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // "EVENT HERE" text
    ctx.fillStyle = "#ffffff";
    ctx.font = `${fullscreen ? 18 : 14}px 'Press Start 2P', monospace`;
    ctx.textAlign = "center";
    ctx.fillText("EVENT HERE", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + pulseSize + 20);

    // Draw characters
    characters.forEach((char) => {
      drawCharacter(ctx, char.x, char.y, char.type);
    });
  }, [characters, fullscreen]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="w-full h-full rounded-lg"
      />
      
      {/* Attendees count */}
      <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <Users className="w-4 h-4 text-purple-400" />
        <span>{attendees} attendees nearby</span>
      </div>
    </div>
  );
}