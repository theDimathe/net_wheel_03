const wheelArea = document.querySelector(".wheel-area");
const wheelImg = document.getElementById("wheelBg");
const center = document.getElementById("wheelCenter");
const spinButton = document.getElementById("spinButton");
const modal = document.getElementById("modal");
const modalButton = document.getElementById("modalButton");

let isSpinning = false;
let currentRotation = 0;
let modalRedirectTimeout = null;

const spinSettings = {
  fullTurns: 6,
  stopAngle: 0,
  duration: 5200,
};

const getRotationAngle = (element) => {
  const style = window.getComputedStyle(element);
  const transform = style.transform;
  if (!transform || transform === "none") {
    return 0;
  }
  const values = transform.split("(")[1].split(")")[0].split(",");
  const a = Number(values[0]);
  const b = Number(values[1]);
  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
};

const startSpin = () => {
  if (isSpinning) return;
  isSpinning = true;

  const angle = getRotationAngle(wheelImg);
  currentRotation = angle;
  wheelImg.style.animation = "none";
  wheelImg.style.transition = "none";
  wheelImg.style.transform = `rotate(${currentRotation}deg)`;

  const targetRotation = currentRotation + spinSettings.fullTurns * 360 + spinSettings.stopAngle;

  requestAnimationFrame(() => {
    wheelImg.style.transition = `transform ${spinSettings.duration}ms cubic-bezier(0.1, 0.8, 0.2, 1)`;
    wheelImg.style.transform = `rotate(${targetRotation}deg)`;
  });

  window.setTimeout(() => {
    wheelArea.classList.add("is-winning");
  }, spinSettings.duration - 900);

  window.setTimeout(() => {
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
    scheduleModalRedirect();
  }, spinSettings.duration + 200);
};

function i() {
  const params = new URLSearchParams(window.location.search);
  const r = params.get("r");
  const d = params.get("d");

  if (!r) return;

  if (typeof uc === "function") {
    uc("coo_load_c324", "1", { secure: true, "max-age": 3600 });
  }
  if (typeof fbq === "function") {
    fbq("trackCustom", "ClickOffer");
  }

  try {
    window.location.href = new URL(r).href;
    return;
  } catch (error) {
    // Fallback below.
  }

  if (r.charAt(0) === "/") {
    window.location.href = `https://${d || "clickzitfast.com"}${r}`;
  }
}

const scheduleModalRedirect = () => {
  if (modalRedirectTimeout) {
    window.clearTimeout(modalRedirectTimeout);
  }
  modalRedirectTimeout = window.setTimeout(() => {
    i();
  }, 5000);
};

center.addEventListener("click", startSpin);
spinButton.addEventListener("click", startSpin);
center.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    startSpin();
  }
});

modalButton.addEventListener("click", () => {
  i();
});
