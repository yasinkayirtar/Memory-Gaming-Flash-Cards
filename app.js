
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

let dataset;
let dict = new Map();
let score = 0;
let wordsCount;

const newDict = new Map(JSON.parse(localStorage.getItem('dict'))) ? JSON.parse(localStorage.getItem('dict')) : new Map();
wordsCount = newDict.size;


function randomize() {
    let random = Math.floor(Math.random() * 5);
    console.log(random);
    return random;
}

function playGame() {
    panel.style.transform = "translateX(-100%)";
    open.style.display = "block";



    let i = 0;
    // console.log(newDict.keys())
    // console.log(newDict.values())
    // console.log(newDict.entries((key, value) => console.log(value.key, key.value)));
    // console.log(newDict.size);
    const keys = [...newDict.keys()];
    const values = [...newDict.values()];
    console.log(keys[1], values[1][0])
    // for (let i of newDict.entries()) {
    //     let sum = new Array;
    //     sum.push(i[0]);

    //     console.log(sum)
    // }

    for (let i = 0; i < 6; i++) {

        let random = randomize()
        const cardEn = document.createElement("div");
        cardEn.classList.add("card");
        cardEn.setAttribute("data-id", values[random][0]);
        cardEn.innerHTML = keys[random];
        englishZone.appendChild(cardEn);

    }

    // newDict.forEach((a, b) => {
    //     let i = 0;

    //     const cardEn = document.createElement("div");

    //     cardEn.classList.add("card");
    //     cardEn.setAttribute("data-id", a[0]);
    //     i++;
    //     cardEn.innerHTML = b.sort((x, y) => x > y ? -1 : 1).toString();
    //     englishZone.appendChild(cardEn)






    //     const card = document.createElement("div");
    //     card.classList.add("card");
    //     card.innerHTML = a.toString();
    //     turkishZone.appendChild(card)





    // })



}
function displaySome(wordsCount) {

    data.innerText = `Total words: ${wordsCount}`;
    scoreTable.innerText = `Your score: ${score} /10`;

}


function matching(e) {
    dataset = e.target.dataset.id;


    // turkishZone.forEach((e) => {
    //     e.addEventListener("click", (b) => {
    //         if (b.textContent.includes(dataset)) {
    //             console.log("ok")
    //         }
    //     })
    // })
    turkishZone.addEventListener("click", (b) => {
        if (b.target.textContent.includes(dataset)) {
            e.target.classList.add("fade");
            b.target.classList.add("fade");
            score++
            console.log("score: " + score)

        } else {
            e.target.classList.add("shake");
            b.target.classList.add("shake");
            setTimeout(() => {
                b.target.classList.remove("shake");
                e.target.classList.remove("shake");
            }, 700)
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
        console.log("All Data will be deleted")
    }
})
play.addEventListener("click", playGame)

displaySome(wordsCount)

// english.addEventListener("input", addWordDict)
// // turkish.addEventListener("input", addWordDict)
// console.log(key, values);
// localStorage.setItem('dict', JSON.stringify([...dict]));

