## URL Shortener Backend

This project provides a URL shortening service backend using Node.js, Express.js, and MongoDB.

### Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Setting Up](#setting-up)
  - [Starting the Server](#starting-the-server)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

### Features

- Shorten a long URL to a unique short URL.
- Redirect to the original long URL using the short URL.
- Handle errors gracefully.
- RESTful API endpoints for URL shortening.

### Prerequisites

Before starting, ensure you have the following installed:

- Node.js (v14.x or higher)
- MongoDB
- npm or yarn

### Getting Started

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mdrianislam0or1/generates-short-urls-backend.git
   cd generates-short-urls-backend

    Install dependencies:

    bash

    npm install
    ## or
    yarn install
   ```

## Setting Up

    Set up environment variables:

    Create a .env file in the root directory based on .env.example and configure your MongoDB connection URL.

Setting Up

## Set up environment variables:

Create a .env file in the root directory based on .env.example and configure your MongoDB connection URL:

plaintext

    ```PORT=5000
    DATABASE_URL=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/your-database?retryWrites=true&w=majority
    NODE_ENV=development
    ```

## Starting the Server

    Start the server:

    bash

    npm start
    ## or
    yarn start

    This will start the server at http://localhost:5000.

## API Endpoints

    POST /api/url

    Endpoint to shorten a long URL.

    Request body:

    json

{
"longUrl": "https://example.com/very-long-url"
}

## Response:

json

{
"success": true,
"message": "Short URL generated successfully",
"data": "short-url-code"
}

GET /api/url/

Redirect to the original long URL using the short URL.

Example:

vbnet

GET /api/url/short-url-code

Response:

vbnet

    302 Found
    Location: https://example.com/very-long-url

Error Handling

## The API handles various errors such as:

    Invalid or missing request parameters.
    Duplicate URL entries.
    Not found errors for unknown short URLs.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.
