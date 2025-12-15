# Option 1: With foreman
#foreman start -f Procfile.dev

# Stop foreman (Ctrl+C) and restart:
source .env && foreman start -f Procfile.dev

exit 0

###################################
# Option 2: Two terminals
# Terminal 1:
npm run dev

# Terminal 2:
source .env && bundle exec rails server
