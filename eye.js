// popup variables
let windowOpen = document.getElementById("js-windowCounter");

// let audio = document.getElementById("js-signal");
let aud = new Audio(
  "./sound/Ochen_Podozritelnoe_SMS_Soobschenie_(ringon.site).mp3"
);
let timeCounter = JSON.parse(localStorage.getItem("time"));
let timeStop;

// slider variables
const sliderBody = document.getElementById("js-sliderBody");
const sliderButtons = document.getElementsByClassName("slider-button");
const sliderItem = document.getElementsByClassName("slider__exercise");
// ====================================================
const timeStart = () => {
  sliderBody.style.transform = " translateX(0px)";

  windowOpen.classList.remove("open");
  timeStop = setInterval(() => {
    timeCounter++;
    if (timeCounter > 0.5) {
      clearInterval(timeStop);
      timeCounter = null;
      windowOpen.classList.add("open");
      //   audio.play();

      // aud.play();
    }
    localStorage.setItem("time", JSON.stringify(timeCounter));
    // ?======================================================================
    // slider functional

    // lenght
    let width;
    for (const elem of sliderItem) {
      width = elem.offsetWidth;
    }

    let slideContainer =
      document.querySelector(".contentContainer").offsetWidth;
    // margin of slide
    let margin = (slideContainer - width) / 2;
    // move lenght
    let lenght = 0;

    for (const button of sliderButtons) {
      button.addEventListener("click", (e) => {
        if (e.target.dataset.moove == "forv") {
          // forvard
          lenght -= width + margin;
          console.log(lenght);
          if (lenght <= (-width + margin) * sliderItem.length) {
            lenght = (-width - margin) * (sliderItem.length - 1);
            console.log(lenght);
            return false;
          } else sliderBody.style.transform = `translateX(${lenght}px)`;

          // backward
        } else {
          lenght += width + margin;
          if (lenght > 0) {
            lenght = 0;
          } else sliderBody.style.transform = `translateX(${lenght}px)`;
          console.log(lenght);
        }
      });
    }
  }, 1000);
};

// timeStart();
document
  .getElementById("js-counterButton")
  .addEventListener("click", timeStart);
// open exercise button
document.querySelector(".openExercise").addEventListener("click", timeStart);

// ! test counter

// let testCount = 0;
// let countStop;

// const countStart = () => {
//   countStop = setInterval(() => {
//     testCount += 1;
//     if (testCount > 5) {
//       clearInterval(countStop);
//       testCount = 0;
//     } else console.log(testCount);
//   }, 1000);
// };
// countStart();
// document.getElementById("js-goButton").addEventListener("click", countStart);
