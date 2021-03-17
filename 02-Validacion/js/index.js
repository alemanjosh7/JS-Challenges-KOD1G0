//modal
var openmodal = document.querySelectorAll(".modal-open");
for (var i = 0; i < openmodal.length; i++) {
  openmodal[i].addEventListener("click", function(event) {
    event.preventDefault();
    toggleModal();
  });
}
const overlay = document.querySelector(".modal-overlay");
overlay.addEventListener("click", toggleModal);

var closemodal = document.querySelectorAll(".modal-close");
for (var i = 0; i < closemodal.length; i++) {
  closemodal[i].addEventListener("click", toggleModal);
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key === "Escape" || evt.key === "Esc";
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape && document.body.classList.contains("modal-active")) {
    toggleModal();
  }
};

function toggleModal() {
  const body = document.querySelector("body");
  const modal = document.querySelector(".modal");
  modal.classList.toggle("opacity-0");
  modal.classList.toggle("pointer-events-none");
  body.classList.toggle("modal-active");
}

//voltear tarjeta
const card = document.querySelector("#card"),
  btnForm = document.querySelector("#open-form-btn"),
  form = document.querySelector("#card-form"),
  selectMonth = document.querySelector("#selectMonth"),
  selectYear = document.querySelector("#selectYear"),
  creditNumber = document.querySelector("#number .number"),
  creditName = document.querySelector("#name .name"),
  brandLogo = document.querySelector("#brand-logo"),
  sign = document.querySelector("#sign .sign p"),
  expirationMonth = document.querySelector("#card p .month"),
  expirationYear = document.querySelector("#card p .year"),
  ccv = document.querySelector("#card #ccv .ccv");
card.addEventListener("click", () => {
  card.classList.toggle("active");
});

const flipCard = () => {
  if (card.classList.contains("active")) {
    card.classList.remove("active");
  }
};

//voltear el boton form y agregar la opcion de ver el form

btnForm.addEventListener("click", () => {
  form.classList.toggle("active");
  btnForm.classList.toggle("active");
});

//formulario

for (let i = 1; i <= 12; i++) {
  let opcion = document.createElement("option");
  opcion.value = i;
  opcion.innerText = i;
  form.selectMonth.appendChild(opcion);
}

const actualYear = new Date().getFullYear();

for (let i = 0; i <= 8; i++) {
  let opcion = document.createElement("option");
  opcion.value = i + actualYear;
  opcion.innerText = i + actualYear;
  form.selectYear.appendChild(opcion);
}

form.inputNumber.addEventListener("keyup", (e) => {
  let inputValue = e.target.value;
  form.inputNumber.value = inputValue
    .replace(/\s/g, "")
    .replace(/\D/g, "")
    .replace(/([0-9]{4})/g, "$1 ")
    .split(".")
    .join("")
    .trim();
  creditNumber.textContent = inputValue;
  if (inputValue == "") {
    creditNumber.textContent = "#### #### #### ####";
    brandLogo.innerHTML = "";
  }

  if (inputValue[0] == "4") {
    brandLogo.innerHTML = "";
    const img = document.createElement("img");
    img.src = "../src/images/visa.png";
    brandLogo.appendChild(img);
  } else if (inputValue[0] == "5") {
    brandLogo.innerHTML = "";
    const img = document.createElement("img");
    img.src = "../src/images/mastercard.png";
    brandLogo.appendChild(img);
  }
  flipCard();
});

form.inputNamex.addEventListener("keyup", (e) => {
  let inputValue = e.target.value;
  form.inputNamex.value = inputValue
    .replace(/[0-9]/, "")
    .split(".")
    .join("")
    .toUpperCase();
  creditName.textContent = inputValue;
  sign.textContent = inputValue;
  if (inputValue == "") {
    creditName.textContent = "John Doe";
  }
  flipCard();
});

form.selectMonth.addEventListener("change", (e) => {
  expirationMonth.textContent = e.target.value;
  flipCard();
});

form.selectYear.addEventListener("change", (e) => {
  expirationYear.textContent = e.target.value;
  flipCard();
});

form.inputCCV.addEventListener("keyup", (e) => {
  let inputValue = e.target.value;
  form.inputCCV.value = inputValue.replace(/\s/g, "").replace(/\D/g, "");
  ccv.textContent = inputValue;
  if (!card.classList.contains("active")) {
    card.classList.add("active");
  }
});

form.btnSubmit.addEventListener("click", (e) => {
  if (
    validationCard() &&
    validationInputs(
      form.inputNumber,
      form.inputNamex,
      form.selectMonth,
      form.selectYear,
      form.inputCCV
    )
  ) {
    toggleModal();
    e.preventDefault();
    let s = creditNumber.textContent;
    Swal.fire(
      "Congratulations",
      `Your credit card: #### #### #### ${s[15] +
        s[16] +
        s[17] +
        s[18]} is correct!`,
      "success"
    );
  } else {
    Swal.fire("Oops...", "Something went wrong!", "error");
    e.preventDefault();
  }
});

const validationInputs = (
  cardNumber,
  cardName,
  expireMonth,
  expireYear,
  cardCcv
) => {
  if (
    cardNumber.value == "" ||
    cardName.value == "" ||
    expireMonth == "Month" ||
    expireYear == "Year" ||
    cardCcv == ""
  )
    return false;
  return true;
};

const validationCard = () => {
  let s = creditNumber.textContent.replace(/\s/g, "");
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    let x = parseInt(s[i]);
    if (i % 2 == 0) {
      x *= 2;
      if (x > 9) {
        sum += x % 10;
        x = parseInt(x / 10);
      }
      sum += x % 10;
    } else {
      sum += x;
    }
  }
  if (sum % 10 == 0) return true;
  return false;
};
