
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
const cardEn = document.createElement("div");
let dataset;
let dict = new Map(JSON.parse(localStorage.getItem('dict'))) || new Map();
let score = 0;
let wordsCount;
let lastRandom;
const newArr = []
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

function playGame() {
    panel.style.transform = "translateX(-100%)";
    open.style.display = "block";
    const keys = [...dict.keys()];
    const values = [...dict.values()];


    for (let i = 0; i < 11; i++) {

        let random = randomize()

        cardEn.classList.add("card");
        cardEn.setAttribute("data-id", values[random][0]);

        newArr.push(keys[random])



        const cardTurk = document.createElement("div");
        cardTurk.classList.add("card");
        cardTurk.innerHTML = values[random];
        turkishZone.appendChild(cardTurk);
        if (i == 10) {
            play.setAttribute("disabled", "");

        }


    }
    console.log(cardEn);
    newArr.sort().forEach((e) => {
        console.log(e)
        cardEn.innerHTML = e;
        englishZone.appendChild(cardEn);
    });


}
function displaySome(wordsCount) {

    data.innerText = `Total words: ${wordsCount}`;
    scoreTable.innerText = `Your score: ${score} /10`;

}


function matching(e) {
    dataset = e.target.dataset.id;

    turkishZone.addEventListener("click", (b) => {
        if (b.target.textContent.includes(dataset)) {
            e.target.classList.add("scale")
            b.target.classList.add("scale");
            setTimeout(() => {
                e.target.classList.add("fade");
                b.target.classList.add("fade");
            }, 800)

            score++
            console.log(b)

        } else {
            e.target.classList.add("shake");
            b.target.classList.add("shake");
            setTimeout(() => {
                b.target.classList.remove("shake");
                e.target.classList.remove("shake");
            }, 700)
            console.log(b)
        }
    })
}







function addWordDict(dict) {
    localStorage.setItem('dict', JSON.stringify([...dict]));

}
saveBtn.addEventListener("click", () => {

    let key = english.value.split(",");
    let values = turkish.value.split(',');

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
    displaySome(wordsCount)



})

englishZone.addEventListener("click", matching)

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

    }
})
play.addEventListener("click", playGame)

displaySome(wordsCount)


