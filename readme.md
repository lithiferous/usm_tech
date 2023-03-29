## Project Overview

- Backend
    - Basic nodejs server that is used to reactively populate job `market` index in ES
- Frontend
    - create app framework: https://create-react-app.dev/docs/getting-started
    - using Reactivesearch, and make sure to import V3 3.43.7
- Services
    - setting up configs for ES and potentially other services
- Data
    - shared volume (used only by backend currently)

## Setup

1. Build & run services declared in docker-compose (verbose)
```
make run
```
2. Ingest index to ES
```
make load_data
```
3. Navigate to [frontend page](localhost:8080)

## Roadmap
- [x] source code of the main React app (frontend/src)
- [x] source code of the script to populate the data (backend/server/load.js)
- [x] docker or docker-compose to start elasticsearch
