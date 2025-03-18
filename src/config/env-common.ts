const { config } = require('dotenv');
const path = require('path');

console.log("NODE_ENV: ----------------------> ", process.env.NODE_ENV); // Debugging NODE_ENV

// Dynamically set the path depending on the environment
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

// Log which environment file is loaded (for debugging)
console.log(`Loading environment variables from: ${envFile}`);

// Load environment variables from the determined file
const result = config({ path: path.resolve(process.cwd(), envFile)});

console.log("result: -----------> ", result)

// Handle error if the .env file is not loaded correctly
if (result.error) {
  console.error(`Error loading environment variables from ${envFile}`);
  process.exit(1);  // Exit the process if env variables cannot be loaded
}

console.log("NODE_ENV: ----------------------> ", process.env.NODE_ENV);

// Define common environment variables required by the application
const requiredEnvVars = [
  'PG_DB_HOST',
  'PG_DB_USERNAME',
  'PG_DB_PASSWORD',
  'PG_DB_NAME',
  'PG_DB_PORT',
  'SERVER_PORT',
  'NODE_ENV',
  'BASE_URL',
  'JWT_ACCESS_TOKEN_SECRET',
  'JWT_REFRESH_TOKEN_SECRET',
];

// Ensure that all required environment variables are set
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});


// Destructure environment variables from process.env and export
export const {
  SERVER_PORT,
  NODE_ENV,
  BASE_URL,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  PG_DB_HOST,
  PG_DB_USERNAME,
  PG_DB_PASSWORD,
  PG_DB_NAME,
  PG_DB_PORT,
  PG_DB_DIALECT,
} = process.env;
