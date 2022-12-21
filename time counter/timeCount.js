let hourContainer = document.querySelector(".hourCount");
let minutContainer = document.querySelector(".minutCount");
let secondContainer = document.querySelector(".secondCount");

let milisec = 0;
let secondCount = 0;
let minutCount = 0;
let hourCount = 0;

const timer = () => {
  milisec++;
  if (milisec > 99) {
    secondCount++;
    milisec = 0;
    if (secondCount < 10) {
      secondContainer.textContent = `0${secondCount}`;
    } else secondContainer.textContent = `${secondCount}`;
  } else if (secondCount > 59) {
    minutCount++;
    secondCount = 0;
    if (minutCount < 10) {
      minutContainer.textContent = `0${minutCount}:`;
    } else minutContainer.textContent = `${minutCount}:`;
  } else if (minutCount > 59) {
    hourCount++;
    minutCount = 0;
    if (hourCount < 10) {
      hourContainer.textContent = `0${hourCount}:`;
    }
    hourContainer.textContent = `${hourCount}:`;
  } else if (hourCount > 11) {
    hourCount = 0;
  }
};
let countStop = setInterval(() => {
  timer();
}, 10);
