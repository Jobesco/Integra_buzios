This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [`docker`](https://docker.com).

## Pre-requisites
- Docker/Docker Desktop

## Getting Started

**OBS:** If you're on *DOCKER DESKTOP*, run `git config core.protectNTFS false`.

First, build the image with `docker build --tag "front:latest" --file Dockerfile.dev .`.

Then, run the server with docker:
```bash
docker run -d \
--env-file .env.development \
-h 0.0.0.0 \
-p 3015:3015 \
-v ./src:/app/src \
-v node_modules:/app/node_modules \
--name front-integra \
--network bridge \
front:latest
```

**OBS:** Remember to set the `.env.development` to `.env.stg` and other options to its respective environment in the command *above*, if necessary.

**OBS:** If you intend to release a tag on docker, run `docker build --tag "tag_name" Dockerfile.dev .` on *this* folder.

Open [http://localhost:3015](http://localhost:3015) or another configured port by changing the **first** port in the `-p` section on the bash command.

You can start editing the page by modifying the `jsx` pages. 

### Entrypoint is at `src/app/page.jsx`!!!

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More (read these if you want to take part in more than screen coding, but do prioritize first!)

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)
