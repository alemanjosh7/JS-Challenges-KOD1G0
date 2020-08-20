const slide = document.getElementById("changed");
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");
const number = document.getElementById("number");

let num = 1;
btnPrev.style.visibility = "hidden";
btnNext.style.marginRight = "120px";

// slide.style.backgroundImage = `url("../resources/img${num}.jpg")`;
// slide.style.backgroundSize = "cover";
// slide.style.filter = "brightness(50%)";

btnNext.addEventListener("click", function() {
  nextSlide();
});

btnPrev.addEventListener("click", function() {
  prevSlide();
});

function prevSlide() {
  if (num == 4) {
    num = 3;
    btnNext.style.visibility = "visible";
    btnPrev.style.marginLeft = "20px";
  } else if (num <= 2) {
    btnPrev.style.visibility = "hidden";
    btnNext.style.marginRight = "120px";
    num = 1;
  } else {
    num--;
  }
  slide.style.backgroundImage = `url("../resources/img${num}.jpg")`;
  number.innerHTML = `${num}`;
}

function nextSlide() {
  if (num > 2) {
    btnNext.style.visibility = "hidden";
    btnPrev.style.marginLeft = "120px";
    num = 4;
  } else if (num <= 1) {
    num = 2;
    btnPrev.style.visibility = "visible";
    btnNext.style.marginRight = "20px";
  } else {
    num++;
  }
  slide.style.backgroundImage = `url("../resources/img${num}.jpg")`;
  slide.style.backgroundSize = "cover";
  number.innerHTML = `${num}`;
}
