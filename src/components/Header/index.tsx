"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useWeb3ModalAccount } from "@web3modal/ethers5/react";
import { walletConnectInstance } from "@/components/WalletContext";
import "./index.css";

const menuStyle =
  "nav-links px-4 cursor-pointer capitalize font-medium hover:scale-105 hover:text-blue-400 duration-200 link-underline";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const { address, isConnected } = useWeb3ModalAccount();
  const [selectedIndex, setSeletedIndex] = useState<number>(0);

  const handleConnect = async () => {
    await walletConnectInstance.open();
  };

  const handleDisconnect = async () => {
    await walletConnectInstance.disconnect();
    localStorage.removeItem("connectedAddress");
  };

  const handleSelectIndex = (id: number) => {
    setSeletedIndex(id);
  };

  const links = [
    {
      id: 1,
      title: "Feed",
      link: "/feed",
    },
    {
      id: 2,
      title: "Explore",
      link: "/explore",
    },
    {
      id: 3,
      title: "Vaults",
      link: "/myVaults",
    },
    {
      id: 4,
      title: "Profile",
      link: "/profile",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-transparent backdrop-blur-md bg-opacity-30 shadow-lg rounded-lg nav">
      <div>
        <h1 className="text-3xl font-signature ml-2 text-black font-bold">
          <Link href={"/"}>Pixi</Link>
        </h1>
      </div>

      <ul className="hidden md:flex space-x-6">
        {links.map(({ id, link, title }) => (
          <li
            key={id}
            onClick={() => handleSelectIndex(id)}
            className={
              selectedIndex == id
                ? `${menuStyle} text-blue-400`
                : `${menuStyle} text-gray-500`
            }
          >
            <Link href={link}>{title}</Link>
          </li>
        ))}
        <li
          className="nav-links px-4 cursor-pointer capitalize font-medium hover:text-blue-400 duration-200 link-underline text-blue-400"
          onClick={() => handleSelectIndex(0)}
        >
          <Link href={"/addMoment"}>Mint Pics</Link>
        </li>
      </ul>

      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
          {links.map(({ id, link }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link onClick={() => setNav(!nav)} href={link}>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      )}

      <button
        className="walletStyle bg-transparent text-black border border-white rounded-full px-6 py-2 backdrop-blur-sm hover:bg-opacity-80"
        onClick={() => (isConnected ? handleDisconnect() : handleConnect())}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
};

export default Navbar;
