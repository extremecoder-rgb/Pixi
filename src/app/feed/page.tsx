"use client";

import { useState, useEffect } from "react";

export default function Feed() {
  const [isDownloading, setIsDownloading] = useState<boolean>(true);
  const [moments, setMoments] = useState<any[]>([]); // For holding moment data, replace with real data later.

  // Example moments data (You can replace this with real data)
  const exampleMoments = [
    {
      id: 1,
      title: "Beautiful Sunset",
      description: "A stunning view of the sunset by the beach.",
    },
    {
      id: 2,
      title: "City Lights",
      description: "The city comes to life as night falls.",
    },
    {
      id: 3,
      title: "Mountain Peaks",
      description: "Snow-capped mountains reaching for the sky.",
    },
    {
      id: 4,
      title: "Forest Adventure",
      description: "Walking through a lush green forest path.",
    },
    {
      id: 5,
      title: "Ocean Breeze",
      description: "A calm day by the ocean with a gentle breeze.",
    },
  ];

  useEffect(() => {
    setIsDownloading(false); // Simulate loading
    setMoments(exampleMoments); // Set the moments data after "downloading"
  }, []);

  return !isDownloading ? (
    <div className="flex space-x-2 justify-center items-center bg-gray-200 h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  ) : (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 to-gray-800 p-10 text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Feed</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {moments.map((moment) => (
          <div
            key={moment.id}
            className="relative rounded-xl overflow-hidden shadow-lg bg-white bg-opacity-20 backdrop-blur-lg hover:scale-105 transition-all duration-300"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{moment.title}</h3>
              <p className="text-sm">{moment.description}</p>
            </div>
            <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 rounded-full px-4 py-2 text-sm cursor-pointer hover:bg-opacity-80">
              View Details
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
