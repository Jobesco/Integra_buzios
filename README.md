# Integra buzios

## Requirements

- Docker 27
- Ubuntu 22 or similar

## Setting .env files

On integra, create the .env file as follows:
```
ALLOWED_ORIGIN=origins, separated by ", " (http://localhost:3015, for example)
ALLOWED_METHODS=GET, POST, PUT, DELETE, OPTIONS, etc...
ALLOWED_HEADERS=Authorization, Content-Type
EXPOSED_HEADERS=Content-Type, X-Auth-Token
CREDENTIALS=true
MAX_AGE=3600 # until you need to login again
```

## Building and running

Run on `bash`, on **this** folder:

```bash
# builds every service and detaches from the terminal
docker compose up --build -d
```
or
```bash
# for specific services (can be any or none, which is the same as above)
docker compose up --build -d front integra db
```

### Stopping and restarting

```bash
docker compose stop
docker compose up
```