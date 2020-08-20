const slide = document.getElementById("slide");
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");
const number = document.getElementById("number");

let num = 2;

btnNext.addEventListener("click", function() {
  nextSlide();
});

btnPrev.addEventListener("click", function() {
  prevSlide();
});

function prevSlide() {
  if (num >= 4) {
    num = 3;
    btnNext.style.visibility = "visible";
    btnPrev.style.marginLeft = "20px";
  } else if (num == 2) {
    btnPrev.style.visibility = "hidden";
    btnNext.style.marginRight = "120px";
    num = 1;
  } else {
    num--;
  }
  slide.src = `resources/img${num}.jpg`;
  number.innerHTML = `${num}`;
}

function nextSlide() {
  if (num >= 4) {
    btnNext.style.visibility = "hidden";
    btnPrev.style.marginLeft = "120px";
  } else if (num == 1) {
    num = 2;
    btnPrev.style.visibility = "visible";
    btnNext.style.marginRight = "20px";
  }
  slide.src = `resources/img${num}.jpg`;
  number.innerHTML = `${num}`;
  num++;
}
