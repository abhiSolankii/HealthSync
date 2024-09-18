Instructions to run this project:

To run server:

1. Create a .env file in the root directory
   Like this:

   PORT = 4000
   MONGO_URI =
   JWT_SECRET = myhealthsecret
   NODE_ENV_PROD = false

2. Run npm run build in the root directory
3. Run npm run dev in the root directory
   connected to database should come

To run front end:
create a .env file in the client
Like this:

    NODE_ENV_PROD = false

--------IMPORTANT--------
make sure that localhost api is not commented and other one is commented
client->src->lib->apiRequest

1. Open a new terminal
2. Run - cd client
3. Run - npm run dev

Go to the url
