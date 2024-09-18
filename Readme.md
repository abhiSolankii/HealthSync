Instructions to run this project:

To run server:

1. Create a .env file in the root directory
   Like this:

   PORT = 4000
   MONGO_URI =
   JWT_SECRET =
   NODE_ENV_PROD = false

2. Run npm install in the root directory
3. Run npm run dev in the root directory
   connected to database should come

To run front end:
create a .env file in the client
Like this:

    NODE_ENV_PROD = false

1. Open a new terminal
2. Run - cd client
3. Run - npm install

4. Run - npm run dev

Go to the url

//Manually setting the cookie to avoid deployment issue
Cookies.set("health_token", res.data.token, {
expires: 7,
path: "/",
secure: process.env.NODE_ENV === "production",
sameSite: "None",
});
