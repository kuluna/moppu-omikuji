const debug = true;

/** @type HTMLButtonElement */
const startButton = document.getElementById("start");
/** @type HTMLButtonElement */
const stopButton = document.getElementById("stop");
/** @type HTMLImageElement */
const image = document.getElementById("image");
/** @type HTMLHeadingElement */
const title = document.getElementById("title");
/** @type HTMLParagraphElement */
const description = document.getElementById("description");

let rouletteIntervalHandle;
let index = 0;

window.addEventListener("DOMContentLoaded", () => {
  stopButton.style.display = "none";

  // 以前の状態を復元
  const lastIndex = localStorage.getItem("index");
  const weekday = localStorage.getItem("weekday");

  if (weekday !== null && index !== null) {
    const nowWeekDay = new Date().getDay().toString();
    if (weekday === nowWeekDay) {
      index = parseInt(lastIndex);

      if (!debug) {
        startButton.style.display = "none";
      }
      showTodayCard();
    }
  }
});

function roulette() {
  startButton.style.display = "none";
  stopButton.style.display = "";

  rouletteIntervalHandle = setInterval(() => draw(), 50);
}

function stop() {
  stopButton.style.display = "none";
  clearInterval(rouletteIntervalHandle);

  showTodayCard();
  saveLocalStorage();

  if (debug) {
    startButton.style.display = "";
  }
}

function draw() {
  index = Math.trunc(Math.random() * 5);
  image.src = `img/img${index}.png`;
}

function showTodayCard() {
  image.src = `img/img${index}.png`;

  switch (index) {
    case 0:
      title.innerText = "納豆ご飯";
      description.innerText = "朝ごはんはやっぱり納豆ご飯！";
      break;
    case 1:
      title.innerText = "おもち";
      description.innerText = "この時期無性に食べたくなるおもち！\nどれだけ伸ばせるかな？";
      break;
    case 2:
      title.innerText = "にくまん";
      description.innerText = "意外と熱い！やけどには気をつけて！";
      break;
    case 3:
      title.innerText = "タピオカ";
      description.innerText = "ブームが過ぎた？今だからこそタピろう！";
      break;
    case 4:
      title.innerText = "アイスクリーム";
      description.innerText = "冬だからこそアイスクリームがおいしい！";
      break;
  }
}

function saveLocalStorage() {
  localStorage.setItem("index", index);
  localStorage.setItem("weekday", new Date().getDay());
}
