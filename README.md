# MaxMind IP Addresses Lookup

## Overview

The IP Addresses Lookup Project is a web application that allows users to look up information about a given IP addresses. The application uses the `@maxmind/geoip2-node` API to retrieve city data for the IP addresses and displays it on the UI.

The project is built using Nest.js (Node.js, Express.js), and React.

## Folder Structure

 The project is created using the Nx workspace, it generates a folder structure that looks something like this:

max-mind/
├── apps/
│   ├── api          # The back-end api server
│   ├── web          # The front-end web ui
├── db/              # GeoLite2-City database
├── libs/
│   ├── core          # The core code between api and web apps
├── tools/
├── nx.json
├── package.json
└── tsconfig.base.json

## Requirements

- Node.js version 14 or higher
- npm: The package manager for Node.js.

## Installation

1. Clone the repository: `git clone https://github.com/myusername/myproject.git`
2. Install the dependencies: `npm install`
3. Nx CLI: Nx is a set of command-line tools that you can use to create, develop, and test your project. You can install it globally using npm by running the following command: npm install -g nx.

## Usage

1. Start the Web App and the API server: `npm start`
2. Back-end (api): Open your browser and go to `http://localhost:3333/api`
3. Front-end (web): Open your browser and go to `http://localhost:4200`
