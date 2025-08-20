#!/bin/bash
set -e

APP_DIR="/home/ec2-user/app"
cd $APP_DIR
echo "Running Prisma migrations..."
# npx prisma migrate deploy

echo "=== Installing production dependencies ==="

npm ci --only=production
