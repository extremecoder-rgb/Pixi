"use client";

import React from "react";

export default function Home() {
  const cardData = [
    "Store your memories securely and privately.",
    "End-to-end encrypted. Only you have access.",
    "Access your memories from anywhere.",
    "Designed for peace of mind, powered by Web3.",
  ];

  return (
    <main className="flex flex-col min-h-screen bg-neutral-950 text-white justify-center items-center px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-500 to-cyan-400 text-transparent bg-clip-text">
        Welcome to Pixi
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
        {cardData.map((text, index) => (
          <div
            key={index}
            className="perspective group"
          >
            <div className="relative w-full h-40 transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180">
              <div className="absolute inset-0 bg-neutral-900 rounded-2xl shadow-md p-6 text-center flex items-center justify-center backface-hidden">
                <p className="text-lg md:text-xl text-gray-300">{text}</p>
              </div>
              <div className="absolute inset-0 bg-neutral-800 rounded-2xl shadow-md p-6 text-center flex items-center justify-center rotate-y-180 backface-hidden">
                <p className="text-sm text-gray-400">Explore now →</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
