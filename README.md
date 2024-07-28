# Wumela Web App

Print-On-Demand Marketing Material Platform.

Description:

The project aims to create a seamless platform for businesses to order print-on-demand marketing materials using HelloPrint's services. The platform will allow users to customize and order various marketing collateral such as flyers, brochures, business cards, and promotional items directly through an intuitive web interface.

## Table of Contents

- [Wumela Web App](#wumela-web-app)
  - [Table of Contents](#table-of-contents)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Configuration](#configuration)
  - [Getting Started](#getting-started-1)
  - [License](#license)

## Technologies Used

- **Next.js**: React framework for building server-side rendered (SSR).

- **TypeScript**: Statically typed superset of JavaScript that adds optional static typing to the language.

- **MongoDB**: MongoDB is a NoSQL database that stores data in a flexible, JSON-like format.

- **Mailtrap**: Mailtrap is a service that provides a fake SMTP server for testing email workflows in development and staging environments.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed:

- Node.js (>= 20)

- MongoDB (running locally)

- (Any other prerequisites)

### Installation

1. **Download MongoDB**:

- Visit the MongoDB download page: MongoDB Download Center
- Choose the appropriate version for your operating system (e.g., Windows, macOS, Linux).
- Follow the instructions to download the MongoDB installer.

2. **Clone the repository**:

   ```
    git clone https://github.com/TiinaTii/wumela-frontend.git
   ```

3. **Install dependencies**:
   ```
   cd wumela-frontend npm install
   ```

## Configuration

The project requires configuration settings for MongoDB and Mailtrap. Make sure to set up the following environment variables:

- **MONGODB_URI**: URI for your MongoDB instance.

- **MAILTRAP_USER**: Username for Mailtrap.

- **MAILTRAP_PASS**: Password for Mailtrap.

You can copy the sample environment variables from `sample.env` file and adjust them according to your setup.

     cp sample.env .env

## Getting Started

First, run the development server:

```bash

npm  run  dev

# or

yarn  dev

# or

pnpm  dev

```

## License

This project is licensed under the \[TiiNaTii SARL\] License - see the [LICENSE.md](LICENSE.md) file for details.

---
