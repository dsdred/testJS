const getRandomNumInRange = (min, max) => {
    const randomNum = (Math.random() * (max - min) + min).toFixed(0)
    return randomNum
}

const gameState = {
    taskInProcess: false,
    rightAnswer: null,
}

const getTask = () => {
    const symbol = (Math.random > 0.5) ? "+" : "-"
    const task = `${getRandomNumInRange(0, 100)} ${symbol} ${getRandomNumInRange(0, 100)}`
    gameState.rightAnswer = eval(task)
    return task
}

const toggleGameState = () => {
    gameState.taskInProcess = !gameState.taskInProcess
}
const gameElements = document.getElementById("my_Game").children

const title = gameElements[0]
const userTask = gameElements[1]
const userAnswer = gameElements[2]
const btnGame = gameElements[3]

const startGameFunc = () => {
    if (!gameState.taskInProcess) {
        title.innerText = "Игра началась"
        userAnswer.value = null
        userTask.innerText = getTask()
        userAnswer.hidden = false
        btnGame.innerText = "Проверить"
        toggleGameState()

    } else {
        const isRight = gameState.rightAnswer == userAnswer.value
        userTask.innerText = userTask.innerText + " = " + gameState.rightAnswer
        title.innerText = "Вы п" + ((isRight) ? "обедили" : "роиграли")
        btnGame.innerText = "Начать заново"
        toggleGameState()
    }
}

btnGame.addEventListener("click", startGameFunc)
userAnswer.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {
        startGameFunc()
    } else if (e.key === "Escape") {
        userAnswer.blur()
    }
})

const choosedEl = document.querySelectorAll(".choosed_block-container > div")
const counterEl = document.querySelector(".choosed_block span")

const choosedState = {
    countsElements: 0,
    setCounValue(value) {
        this.countsElements += value
        counterEl.innerText = this.countsElements
    }
}

const eventFunc = (e) => {

    if (e.target.className === "") {
        e.target.className = "choosed_element"
        choosedState.setCounValue(1)
    } else {
        e.target.className = ""
        choosedState.setCounValue(-1)
    }
}

for (let i = 0; i < choosedEl.length; i++) {
    choosedEl[i].addEventListener("click", eventFunc)
}

const postsBlock = document.querySelector(".posts_block-container")
const showPostsBTN = document.querySelector(".posts_block button")

function addPost(title, body) {
    const postsTitle = document.createElement("h3")
    const postsBody = document.createElement("span")
    const postsItem = document.createElement("p")

    postsTitle.innerText = title
    postsBody.innerText = body

    postsItem.append(postsTitle, postsBody)
    postsBlock.append(postsItem)
}

function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => {
            for (el of data) {
                addPost(el.title, el.body)
            }
        })
        .catch(err => console.log(err.massage))
}

getPosts()
