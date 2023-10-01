# Three ways to run this application:

1. [Local development environment](#local-development-environment)
2. [Local production environment](#local-production-environment)
3. [Docker image](#docker-image)


## Local development environment

1. Clone the repository.

2. Install the dependencies:

```sh
npm install
```

3. Create a .env file with following:

```
DATABASE_URL="file:./dev.db"
```

4. Run database migrations:

```sh
npx prisma migrate dev
```

5. Run the application:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Local production environment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

## Docker image

1. Build the image:

```sh
docker build -f ./Dockerfile . -t comments
```

2. Run the image:
```sh
docker run -p 3000:3000 comments
```
