# Pixi

A Next.js-based web3 application for creating and managing digital memories as NFTs on the LUKSO blockchain.

## Overview

Pixi is a modern web3 application that combines the power of Next.js with LUKSO blockchain technology to create a decentralized platform for digital memories. Built with performance and user experience in mind, it allows users to create, manage, and share digital memories through blockchain-secured vaults and NFTs.

## Features

- **Blockchain Integration**
  - Built on LUKSO blockchain network
  - Supports both LUKSO Mainnet and Testnet
  - Implements LSP7 and LSP8 token standards
  - Web3 wallet integration with Web3Modal

- **Memory Vaults**
  - Create public and private memory vaults
  - Secure memory storage using blockchain technology
  - Invite-only access for private vaults
  - Join and explore public vaults

- **NFT Capabilities**
  - Mint memories as NFTs
  - LSP7/LSP8 compliant tokens
  - View NFT metadata and ownership
  - Like and interact with NFTs

- **Modern Web Architecture**
  - Built with Next.js for optimal performance
  - Responsive design for all devices
  - Real-time updates and interactions
  - Optimized font loading with next/font

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [LUKSO](https://lukso.network/) - Blockchain network for digital assets
- [Web3Modal](https://web3modal.com/) - Wallet connection management
- [ERC725.js](https://docs.lukso.tech/tools/erc725js/getting-started) - Universal Profile interaction
- TypeScript for type safety
- Tailwind CSS for styling

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Smart Contracts

The application uses several smart contracts:
- Vault Factory Contract - Manages the creation and management of memory vaults
- LSP7/LSP8 Contracts - Handles NFT functionality and token standards
- Collection Minter - Manages the minting of memory NFTs

## Learn More

- [LUKSO Documentation](https://docs.lukso.tech/) - Learn about LUKSO blockchain and LSPs
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Web3Modal Documentation](https://docs.web3modal.com/) - Learn about Web3Modal integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.