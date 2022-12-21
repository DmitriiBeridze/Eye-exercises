// popup variables
let windowOpen = document.getElementById("js-windowCounter");

let aud = new Audio("./sound/Priyatnoe_SMS_(ringon.site).mp3");

let timeStop;

// slider variables
const sliderBody = document.getElementById("js-sliderBody");
const sliderButtons = document.getElementsByClassName("slider-button");
const sliderItem = document.getElementsByClassName("slider__exercise");
const contentBackground = document.querySelectorAll("#js-contentBackground");
let slideCounter = 0;
let lenght;
// time output in page
let hourContainer = document.querySelector(".hourCount");
let minutContainer = document.querySelector(".minutCount");
let secondContainer = document.querySelector(".secondCount");

let milisec = 0;
let secondCount = 0;
let minutCount = 0;
let hourCount = 0;
// time settings variables
const timerSettingsContainer = document.getElementById("js-timerSettings");

//colon add remove function
const colon = () => {
  setTimeout(() => {
    document.getElementById("js-colon__sec").textContent = ":";
  }, 200);

  document.getElementById("js-colon__sec").textContent = "";
};

// start function=====================================================================
const timeStart = (e) => {
  // blocked start button
  document.querySelector(".openExercise").disabled = "true";
  // time settings block
  let settValue = new FormData(timerSettingsContainer);
  let hour = settValue.get("hour");
  let minute = settValue.get("minut");
  let second = settValue.get("second");

  if (!second) {
    second = false;
  }
  if (!minute) {
    minute = false;
  }
  if (!hour) {
    hour = false;
  }

  sliderBody.style.transform = "translateX(0px)";
  contentBackground.forEach((elem) => {
    elem.classList.remove("move-text");
  });
  contentBackground[0].classList.add("move-text");
  slideCounter = 1;

  windowOpen.classList.remove("open");

  timeStop = setInterval(() => {
    milisec++;

    if (milisec > 99) {
      secondCount++;
      colon();
      milisec = 0;
      if (secondCount < 10) {
        secondContainer.textContent = `0${secondCount}`;
      } else secondContainer.textContent = `${secondCount}`;
    } else if (secondCount > 59) {
      secondCount = 0;
      minutCount++;
      if (minutCount < 10) {
        minutContainer.textContent = `0${minutCount}`;
      } else minutContainer.textContent = `${minutCount}`;
    } else if (minutCount > 59) {
      minutCount = 0;
      hourCount++;
      if (hourCount < 10) {
        hourContainer.textContent = `0${hourCount}`;
      }
      hourContainer.textContent = `${hourCount}`;
    } else if (hourCount > 12) {
      hourCount = 0;
    }

    // Window opening caused by the user in seconds, minutes, hours
    if (secondCount >= second && minutCount >= minute && hourCount >= hour) {
      clearInterval(timeStop);
      minutCount = 0;
      secondCount = 0;
      hourCount = 0;
      minutContainer.textContent = `0${minutCount}`;
      secondContainer.textContent = `0${secondCount}`;
      hourContainer.textContent = `0${hourCount}`;
      windowOpen.classList.add("open");
      aud.play();
      // unblocked start button
      document.querySelector(".openExercise").disabled = "false";
    }

    // slider lenght
    lenght = 0;
  }, 10);

  // stop counter

  document.getElementById("js-stopCounter").addEventListener("click", () => {
    clearInterval(timeStop);
    // unblocked start button
    document.querySelector(".openExercise").removeAttribute("disabled");
  });
};
//  reset counter
document.getElementById("js-resetCounter").addEventListener("click", () => {
  minutCount = 0;
  secondCount = 0;
  hourCount = 0;
  secondContainer.textContent = "00";
  minutContainer.textContent = "00";
  hourContainer.textContent = "00";
});

let width = 760;

let slideContainer = 800;
console.log(slideContainer);
// margin of slide
let margin = (slideContainer - width) / 2;

for (const button of sliderButtons) {
  button.addEventListener("click", (e) => {
    if (e.target.dataset.moove == "forv") {
      // forvard

      slideCounter += 1;
      console.log("forward", slideCounter);

      lenght -= width + margin;
      if (lenght <= (-width + margin) * sliderItem.length) {
        lenght = (-width - margin) * (sliderItem.length - 1);
        slideCounter = sliderItem.length;
        console.log(lenght);
        return false;
      } else {
        sliderBody.style.transform = `translateX(${lenght}px)`;

        setTimeout(() => {
          contentBackground.forEach((elem) => {
            if (elem.dataset.action == slideCounter) {
              elem.classList.add("move-text");
            } else elem.classList.remove("move-text");
          });
        }, 800);
      }

      // backward
    } else {
      slideCounter -= 1;

      lenght += width + margin;
      if (lenght > 0) {
        slideCounter = 1;
        console.log("back", slideCounter);
        lenght = 0;
      } else {
        sliderBody.style.transform = `translateX(${lenght}px)`;

        setTimeout(() => {
          contentBackground.forEach((elem) => {
            if (elem.dataset.action == slideCounter) {
              elem.classList.add("move-text");
            } else elem.classList.remove("move-text");
          });
        }, 800);
      }
    }
  });
}

// timeStart();
document
  .getElementById("js-counterButton")
  .addEventListener("click", timeStart);

// open exercise button
document.querySelector(".openExercise").addEventListener("click", timeStart);
