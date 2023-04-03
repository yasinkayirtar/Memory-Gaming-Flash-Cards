
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


let dict = new Map();


function playGame() {
    panel.style.display = "none"
    let newDict = new Map(JSON.parse(localStorage.getItem('dict')));

    newDict.forEach((a, b) => {
        let i = 0;

        const cardEn = document.createElement("div");

        cardEn.classList.add("card");
        cardEn.setAttribute("data-id", a[0]);
        i++;
        cardEn.innerHTML = b.toString()
        englishZone.appendChild(cardEn)

        console.log(b)




        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = a.toString();
        turkishZone.appendChild(card)





    })

}


function addWordDict() {

    let key = english.value.split(",");
    let values = turkish.value.split(',');
    if (key && values == "") {
        textArea.forEach((e) => { e.classList.add("red") })
        return

    } else {
        textArea.forEach((e) => { e.classList.remove("red") })
    }


    dict.set(key, values);
    localStorage.setItem('dict', JSON.stringify([...dict]));

    english.value = "";
    turkish.value = "";



}





play.addEventListener("click", playGame)
saveBtn.addEventListener("click", addWordDict)



open.addEventListener("click", () => {
    panel.style.transform = "translateX(0)";
    open.style.display = "none"
})
close.addEventListener("click", () => {
    panel.style.transform = "translateX(-100%)";
    open.style.display = "block"
})

// english.addEventListener("input", addWordDict)
// // turkish.addEventListener("input", addWordDict)
// console.log(key, values);
// localStorage.setItem('dict', JSON.stringify([...dict]));

