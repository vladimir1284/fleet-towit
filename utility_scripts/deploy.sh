#!/bin/bash

# Echo message for changing directory 
echo "Changing directory to 'fleet-towit'..." 
cd fleet-towit 
 
# Echo message for pulling latest changes from git 
echo "Pulling latest changes from git..." 
git pull 
 
# Echo message for installing dependencies 
echo "Installing dependencies..." 
pnpm install
 
# Echo message for running database migration 
echo "Running database migration..." 
npx prisma migrate dev

# Echo message for restarting the server 
echo "restarting the server..." 
pm2 restart fleet