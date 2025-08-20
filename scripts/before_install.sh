#!/bin/bash
set -e
echo "=== Cleaning old application files but keeping .env ==="
cd /home/ec2-user/app

# Enable extended pattern matching
shopt -s extglob

# Remove everything except .env
sudo rm -rf !( .env )

echo "=== Cleanup complete ==="

