"use client";

import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa"; // Import GitHub icon
import "./index.css";

const Footer = () => {
  return (
    <footer className="w-full h-[80px] px-6 flex items-center justify-between bg-neutral-950 border-t border-neutral-800 text-sm text-gray-400">
      <span>© 2025 Pixi</span>
      <span>Author - Subhranil Mondal</span>
      <div className="space-x-4 flex items-center">
        {/* GitHub link with icon */}
        <Link href="https://github.com/extremecoder-rgb" className="hover:text-white transition-colors flex items-center">
          <FaGithub className="mr-2" /> Github
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
