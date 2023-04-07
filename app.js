
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
    score = 0;
    displaySome(wordsCount, score)
    const keys = [...dict.keys()];
    const values = [...dict.values()];


    for (let i = 0; i <= 9; i++) {

        let random = randomize()
        const cardEn = document.createElement("div");

        cardEn.classList.add("card");
        cardEn.setAttribute("data-id", values[random][0]);
        cardEn.innerHTML = keys[random]
        newArr.push(cardEn)




        const cardTurk = document.createElement("div");
        cardTurk.classList.add("card");
        cardTurk.innerHTML = values[random];
        turkishZone.appendChild(cardTurk);
        if (i == 10) {
            play.setAttribute("disabled", "");

        }

    }

    newArr.sort((a, b) => a > b ? 1 : -1).forEach((el) => {
        englishZone.appendChild(el);
    })
    const englishCards = document.querySelectorAll(".englishZone .card");

    englishCards.forEach((el) => {
        el.addEventListener("click", matching, { once: true });
    })

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


function matching(e) {
    console.log("e:", e)
    let dataset = e.target.dataset.id;
    turkishZone.addEventListener("click", (b) => {
        console.log("b:", b.target)
        if (b.target.textContent.includes(dataset)) {
            e.target.classList.add("scale")
            b.target.classList.add("scale");
            setTimeout(() => {
                e.target.classList.add("fade");
                b.target.classList.add("fade");
            }, 800)
            x.once = true;
            score++
            displaySome(wordsCount, score)
            console.log(score)

        } else {
            e.target.classList.add("shake");
            b.target.classList.add("shake");
            setTimeout(() => {
                b.target.classList.remove("shake");
                e.target.classList.remove("shake");
            }, 500)
            x.once = false;



        }


    }, x)

    return e

}

// function matching2(e) {

//     // textCont = e.target.textContent
//     // console.log(textCont)
//     // englishZone.addEventListener("click", (b) => {
//     //     if (dataset === textCont) {
//     //         console.log({ dataset, textCont })
//     //         e.target.classList.add("scale")
//     //         b.target.classList.add("scale");
//     //         setTimeout(() => {
//     //             e.target.classList.add("fade");
//     //             b.target.classList.add("fade");
//     //         }, 800)
//     //     } else {
//     //         console.log({ dataset, textCont })
//     //         e.target.classList.add("shake");

//     //             b.target.classList.remove("shake");
//     //             e.target.classList.remove("shake");
//     //         }, 700)
//     //     }

//     // })

// }






function addWordDict(dict) {
    localStorage.setItem('dict', JSON.stringify([...dict]));
    location.reload();

}

saveBtn.addEventListener("click", () => {

    let key = english.value.trim().split(';').join(',').split(':').join(',').split(',');
    let values = turkish.value.trim().split(';').join(',').split(':').join(',').split(',');

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

// englishZone.addEventListener("mouseup", matching)
// turkishZone.addEventListener("click", matching2)

open.addEventListener("click", () => {
    panel.style.transform = "translateX(0)";
    open.style.display = "none"
})
close.addEventListener("click", () => {
    panel.style.transform = "translateX(-100%)";
    open.style.display = "block"
})
// playZone.addEventListener("click", (e) => {
//     panel.style.transform = "translateX(-100%)";
//     open.style.display = "block";
//     console.log("denm", e)
// })

clear.addEventListener("click", () => {
    if (confirm("All Data will be deleted")) {
        localStorage.clear();
        location.reload()

    }
})
play.addEventListener("click", playGame)

displaySome(wordsCount)


