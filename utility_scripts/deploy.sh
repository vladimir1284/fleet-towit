#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Echo message for changing directory
echo "Changing directory to 'fleet-towit...'"
cd fleet-towit

# Echo message for pulling latest changes from git
echo "Pulling latest changes from git..."
git stash -a # Stash all server changes
git pull
 
# Echo message for restoring the .env file 
echo "Restoring the environment..." 
cp ../.env .
cp ../.env.local .

# Echo message for installing dependencies
echo "Installing dependencies..."
yarn install

# Echo message for running database migration
echo "Running database migration..."
yarn prisma migrate deploy
yarn prisma generate --generator client

# Echo message for building the code
echo "Building the project..."
yarn build

# Echo message for running database seeding
echo "Running database seeding..."
yarn prisma db seed

# Check if the build was successful
echo "Project build successful."

# Check if the migration was successful
echo "Database migration successful."

# Echo message for restarting the server
echo "Restarting the server..."
pm2 restart fleet