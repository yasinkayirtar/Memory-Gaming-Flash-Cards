
const english = document.getElementById('english');
const turkish = document.getElementById("turkish");
const open = document.querySelector(".open");
const close = document.querySelector(".close");
const panel = document.querySelector(".panel");
const saveBtn = document.getElementById("add");
const play = document.getElementById("play");
const textArea = document.querySelectorAll("textarea");
const turkishZone = document.querySelector(".turkishZone");
const englishZone = document.querySelector(".englishZone")
const playZone = document.querySelector(".playZone");
const clear = document.getElementById("clear");
const data = document.querySelector(".data");
const scoreTable = document.querySelector(".score");
const container = document.querySelector(".container")
// let dataset;
let textCont;
let dict = new Map(JSON.parse(localStorage.getItem('dict'))) || new Map();
let score = 0;
let wordsCount;
let lastRandom;
let x = { once: true }
const newArr = [];
const newArrTurks = [];
let newDict;
wordsCount = dict.size;

function randomize() {
    let random = Math.floor(Math.random() * wordsCount);

    if (random === lastRandom) {
        return randomize()
    }
    lastRandom = random;
    return random;
}
function displaySome(wordsCount, score) {

    if (score === undefined) {
        score = 0;
    } else if (score === 10) {
        play.removeAttribute("disabled")
    }
    data.innerText = `Total words: ${wordsCount}`;
    scoreTable.innerText = `Your score: ${score} /10`;

}


function playGame() {
    panel.style.transform = "translateX(-100%)";
    open.style.display = "block";
    score = 0;
    displaySome(wordsCount, score)
    const keys = [...dict.keys()];
    const values = [...dict.values()];


    for (let i = 0; i <= 9; i++) {

        let random = randomize()
        const cardEn = document.createElement("div");

        cardEn.classList.add("card");
        cardEn.setAttribute("data-id", values[random]);
        cardEn.innerHTML = keys[random]
        newArr.push(cardEn)




        const cardTurk = document.createElement("div");
        cardTurk.classList.add("card");
        cardTurk.innerHTML = values[random];
        newArrTurks.push(cardTurk);

        if (i === 9) {
            play.setAttribute("disabled", "");

        }

    }
    newArrTurks.sort((a, b) => a > b ? 1 : -1).forEach((el) => {
        turkishZone.appendChild(el);

    })
    newArr.sort((a) => Math.random() - 0.5).forEach((el) => {
        englishZone.appendChild(el);
    })
    const allCards = document.querySelectorAll(".card");

    allCards.forEach((el) => {
        el.addEventListener("click", (event) => {

            el.classList.toggle("clicked");
            matching(event)
        });

    })




}





function matching(event) {


    const clickedCards = document.querySelectorAll(".clicked");

    if (clickedCards.length == 2) {
        if (clickedCards[0].dataset.id === clickedCards[1].textContent) {
            clickedCards.forEach((el) => {
                el.classList.add("scale");
                setTimeout(() => {
                    el.classList.add("fade");
                }, 800)
                el.classList.remove("clicked");
                score++ / 2;
                displaySome(wordsCount, score / 2)
            })
        } else {
            clickedCards.forEach((el) => {
                el.classList.add("shake");
                el.classList.remove("clicked");
                setTimeout(() => {
                    el.classList.remove("shake");
                }, 800)

            })
        }

    }
}


function addWordDict(dict) {
    localStorage.setItem('dict', JSON.stringify([...dict]));
    location.reload();

}

saveBtn.addEventListener("click", () => {

    let key = english.value.trim().split(';').join(',');
    let values = turkish.value.trim().split(';').join(',');

    if (key && values == "") {
        textArea.forEach((e) => { e.classList.add("red") })
        return

    } else {
        textArea.forEach((e) => { e.classList.remove("red") })
    }
    dict.set(key, values);

    english.value = "";
    turkish.value = "";

    addWordDict(dict)
    displaySome(wordsCount);




})



open.addEventListener("click", () => {
    panel.style.transform = "translateX(0)";
    open.style.display = "none"
})
close.addEventListener("click", () => {
    panel.style.transform = "translateX(-100%)";
    open.style.display = "block"
})


clear.addEventListener("click", () => {
    if (confirm("All Data will be deleted")) {
        localStorage.clear();
        location.reload()

    }
})
play.addEventListener("click", playGame)

displaySome(wordsCount);
