This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Cities Quiz Game

Technical skils test made from scratch in two days for [United Cuisines](https://www.unitedcuisines.com/en/).

### Preview

![Cities Quiz Preview](https://res.cloudinary.com/drdwtcsc4/image/upload/v1595756046/Others/2020-07-26_11-32-16_oqfuav.gif "Cities Quiz Preview")

### Game Description

The player will see a map of Europe without Streets + Cities (Only Country-borders). Its mission is to find the right location to the city name on this map. After placing the needle pin, the game will show you the right location of the city and the difference of your needle pin and the city in kilometres. If it is in around 50km of the city, the selection will be defined as "correct".

### Game Logic

In the beginning, the player has a predetermined score of 1500 that symbolizes kilometres. At each round the difference between position of the city and your needle pin are reducing your score.

### Game End

The game ends when no kilometres are left or when all the cities have been placed (correctly or not).
The high score is the amount of cities you have found.

### Setup - Production Mode

You need to have installed on your machine a stable version of [Nodejs](https://nodejs.org/en/download/) to be able to run this project.

Once you have downloaded or cloned this project follow these steps:

1. Install all dependencies with `npm install`. Once they are all installed you can continue to the next step.
2. Open your terminal and go to the 'cities-quiz/server' directory with `cd cities-quiz/server/`.
3. Run `npm start` to launch the server on **localhost:8080**. You won't see anything yet since we still have to setup the frontend.
4. Open a new terminal and go to the 'cities-quiz' directory. If you are in the 'cities-quiz/server' directory use the command `cd ..`. If you are in the root directory 'cities-quiz-game' use this other command: `cd cities-quiz/`.
5. Run `npm start` to launch the app on **localhost:3000**. This might take a while. React will automatically open a tab on your browser after this last command and when it is done compiling you will see the Cities Quiz main page displayed on your browser.

For more information about React check out the readme on the 'cities-quiz' folder or go to [React's documentation page](https://reactjs.org/).

### Mapbox

The access token provided in this project is personal and will expire after finishing the interview process for which this project was built.
To be able to run this application correctly or for future projects you might want to sign up to [Mapbox](https://www.mapbox.com/) and get your own access token.
