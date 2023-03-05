# MaxMind IP Addresses Look up

## Overview

The IP addresses look up project is a web application that allows users to look up information about a given IP addresses. The application uses the `@maxmind/geoip2-node` API to retrieve city data for the IP addresses and displays it on the UI.

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

1. Clone the repository: `git clone git@bitbucket.org:ibzoor/ip-lookup-max-mind.git`
2. Install the dependencies: `npm install`
3. Install nx globally `npm install -g nx` to invoke the command directly using nx, or you can use npx to run the script without installing nx globally, assuming it has already been added to the script's dependencies


## Usage

1. Start the Web App and the API server: `npm start`
2. Back-end (api): Open your browser and go to `http://localhost:3333/api`
3. Front-end (web): Open your browser and go to `http://localhost:4200`
