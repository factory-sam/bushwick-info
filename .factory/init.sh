#!/bin/bash
set -e

cd /Users/sam/Developer/bushwick-maps

pnpm install --frozen-lockfile 2>/dev/null || pnpm install

if [ ! -f .env.local ]; then
  echo "ADMIN_PASSWORD=bushwick-admin-2024" > .env.local
  echo "Created .env.local with default ADMIN_PASSWORD"
fi
