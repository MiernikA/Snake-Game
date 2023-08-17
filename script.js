const map_size = 36
const all_borders = []
const snake_body = []
let ifstart = false
let direction
let snake_lenght = 2
let check = false
let time_interval
let time_ct = 0



function timer() {
    time_ct++

    const minutes = Math.floor(time_ct / 60)
    const seconds = time_ct % 60

    const formattedMinutes = String(minutes).padStart(2, '0')
    const formattedSeconds = String(seconds).padStart(2, '0')

    document.getElementById('clock').innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}

function generateMap() {

    let color_dictate = 0

    for (let y = 0; y < map_size; y++) {

        const line = document.createElement("div")
        line.className = "line"

        for (let x = 0; x < map_size; x++) {

            const field = document.createElement("div")

            if (color_dictate % 2 == 0) {
                field.style.backgroundColor = "#ADD644"
            }
            else {
                field.style.backgroundColor = "#A6D13C"
            }

            line.appendChild(field)

            field.id = x + ":" + y

            if (x == 0 || y == 0 || x == (map_size - 1) || y == (map_size - 1)) {

                all_borders.push(field)
                field.style.backgroundColor = "#006400"
                field.className = 'border'
            }

            else {
                field.className = 'field'
            }

            color_dictate++
        }
        color_dictate--
        document.getElementById("main").appendChild(line)
    }

}

function pickDirection(e) {

    if (ifstart) {
        if ((e.key == 'ArrowLeft' || e.key == 'a') && direction != "right") {
            direction = "left"
        }
        if ((e.key == 'ArrowUp' || e.key == 'w') && direction != "down") {
            direction = "up"
        }
        if ((e.key == 'ArrowDown' || e.key == 's') && direction != "up") {
            direction = "down"
        }
        if ((e.key == 'ArrowRight' || e.key == 'd') && direction != "left") {
            direction = "right"
        }

    }
    else {
        if (e.key == " ") {
            ifstart = true
            direction = "up"
            document.getElementById("holder").remove()
            document.getElementById("holder_txt").remove()

            time_interval = setInterval(function () {
                timer()
            }, 1000)
        }
    }

}


function spawnSnake() {
    const middle = Math.floor((map_size - 1) / 2)

    const head_field = document.getElementById(`${middle}:${middle}`)
    const first_tail_field = document.getElementById(`${middle}:${middle + 1}`)

    head_field.className = "head"
    first_tail_field.className = 'tail'

    snake_body.push(head_field, first_tail_field)
}

function generateFruit() {

    const fruit_x = Math.floor(Math.random() * map_size + 1)
    const fruit_y = Math.floor(Math.random() * map_size + 1)
    const fruit = document.getElementById(fruit_x + ":" + fruit_y)
    if (fruit != null && fruit != undefined) {
        if (fruit.className == 'field') {
            fruit.className = 'fruit'
            return
        }
        else {
            generateFruit()
        }

    }
    else[
        generateFruit()
    ]


}

function snakeMove(direction_check) {
    const head_id = snake_body[0].id.split(":");
    let target_id

    switch (direction_check) {
        case "left":
            target_id = `${+head_id[0] - 1}:${+head_id[1]}`;
            break;
        case "right":
            target_id = `${+head_id[0] + 1}:${+head_id[1]}`;
            break;
        case "up":
            target_id = `${+head_id[0]}:${+head_id[1] - 1}`;
            break;
        case "down":
            target_id = `${+head_id[0]}:${+head_id[1] + 1}`;
            break;
        default:
            break;
    }

    const target = document.getElementById(target_id);

    if (target.className === "fruit") {

        snake_lenght++;
        document.getElementById('points').innerHTML = snake_lenght
        generateFruit();
        check = true;
    }

    else {
        check = false;
    }

    const target_class = target.className;
    if (target_class === "border" || target_class === "tail") {
        endGame()
        clearInterval(move)
    }

    const new_head = document.getElementById(target_id);
    new_head.className = 'head';
    snake_body.unshift(new_head);

    for (let i = 1; i < snake_lenght; i++) {
        snake_body[i].className = 'tail';
    }

    if (!check) {
        const lastSnakePart = snake_body.pop()
        lastSnakePart.className = 'field'
    }
}

function newGame() {
    window.location.reload()
}


function endGame() {

    const points = document.getElementById("points").innerHTML
    const time = document.getElementById('clock').innerHTML
    const site = `

    <div class='interface'></div>
    <div class='winning_screen'>
        <h1>Congratulations!</h1>
        <p>Your snake get <b>${points}</b> points, the game lasted <b>${time}</b> </p>
        <button id="ng_button">Play Again!</button>
    </div>
    `
    document.body.innerHTML = site
    const new_game_button = document.getElementById("ng_button")
    new_game_button.addEventListener("click", newGame)

}



generateMap()
spawnSnake()
generateFruit()



const move = setInterval(function () {
    if (ifstart) snakeMove(direction)

}, 100)

document.addEventListener("keydown", e => {
    pickDirection(e)
});