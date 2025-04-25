"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  // Handle mouse movement for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the screen
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      setPosition({ x, y });
      setRotation(x * 2);
      setScale(1 + Math.abs(x + y) / 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Stars for background
  const stars = Array.from({ length: 50 }).map((_, i) => {
    const size = Math.random() * 4 + 1;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const animationDelay = Math.random() * 3;

    return (
      <div
        key={i}
        className="absolute rounded-full bg-accent-white"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          opacity: Math.random() * 0.8 + 0.2,
          animation: `twinkle 4s infinite ${animationDelay}s`
        }}
      />
    );
  });

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-secondary-900 to-secondary">
      {/* Add global styles */}
      <style jsx global>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            scale: 1;
          }
          50% {
            opacity: 0.8;
            scale: 0.95;
          }
        }
      `}</style>

      {/* Stars background */}
      <div className="absolute inset-0">{stars}</div>

      {/* Content container */}
      <div className="flex flex-col items-center justify-center h-full">
        {/* Animated 404 text */}
        <div
          className="relative mb-8"
          style={{
            transform: `rotate(${rotation}deg) scale(${scale})`,
            transition: "transform 0.2s ease-out"
          }}
        >
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-primary to-primary-700">
            404
          </h1>

          {/* Orbiting planet */}
          <div
            className="absolute w-12 h-12 rounded-full bg-gradient-to-r from-primary-400 to-primary-200 shadow-lg"
            style={{
              top: `calc(50% + ${position.y}px)`,
              right: `-50px`,
              animation: "float 8s ease-in-out infinite",
              boxShadow: "0 0 30px rgba(var(--primary-400), 0.6)"
            }}
          />
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-accent-white mb-6 text-center">The stars are misaligned!</h2>

        <p className="text-lg text-secondary-200 mb-8 max-w-md text-center">
          The cosmic path you seek has vanished into another dimension. Perhaps it was written in your destiny to find a
          different route.
        </p>

        {/* Animated UFO */}
        <div
          className="relative mb-8"
          style={{
            animation: "float 6s ease-in-out infinite",
            transform: `translateX(${position.x * 2}px)`
          }}
        >
          <div className="w-32 h-16 bg-gradient-to-r from-primary-700 to-primary-900 rounded-full relative flex justify-center items-center">
            <div
              className="absolute top-0 left-1/4 right-1/4 h-8 bg-primary-300 rounded-t-full"
              style={{
                animation: "pulse 3s infinite",
                boxShadow: "0 0 20px rgba(var(--primary-300), 0.8)"
              }}
            ></div>
            <div className="absolute bottom-0 left-1/3 right-1/3 h-3 w-1/3 bg-primary-300 rounded-b-lg"></div>
          </div>
        </div>

        {/* Return home button */}
        <Button asChild className="position-relative z-10" size="lg">
          <Link href="/">Return to Cosmic Home</Link>
        </Button>
      </div>
    </div>
  );
}
