# Snake Game

A simple Snake game implemented in HTML, CSS, and JavaScript.  
Game created as part of high school projects.


## How to Play

1. Open the game in a compatible web browser.
2. Use the **Arrow keys** or **W, A, S, D** keys to control the snake's direction.
3. The snake will start moving upwards when you press any of these keys.
4. Collect the fruits (red cricles) to increase your score and the length of the snake.
5. Avoid running into the walls or the snake's own tail, as this will end the game.
6. Your goal is to collect as many fruits as possible and achieve the highest score.

## Features

- Classic Snake gameplay.
- Score display to keep track of your points.
- Timer display to show how long you've been playing.

## Code Overview

The game consists of the following key components:

- `generateMap()`: Creates the game grid with borders and fields.
- `spawnSnake()`: Places the initial snake on the game grid.
- `generateFruit()`: Generates a new fruit at random positions on the grid.
- `pickDirection(e)`: Handles user input for snake's direction and starts the game.
- `snakeMove(direction_check)`: Moves the snake in the specified direction and handles collisions.
- `timer()`: Updates the game timer.
- `endGame()`: Displays the end-game screen with the player's score and duration.

The game loop is implemented using `setInterval` to continuously move the snake when the game is active.

## Getting Started

1. Clone this repository to your local machine.
2. Open the `index.html` file in a compatible web browser.

## Technologies Used

- HTML5
- CSS3
- JavaScript

