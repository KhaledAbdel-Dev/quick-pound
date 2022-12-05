//quoting algorithm
document.querySelector('#trigger').addEventListener('click', quoteCar)

function quoteCar() {
    const mileage = Number(document.querySelector('#milage').value)
    const milageValue = Math.round((mileage - 50000) / 5000) * 50
    const basePrice = Number(document.querySelector('#make').value)
    const yearValue = Number(document.querySelector('#year').value)
    const catsValue = Number(document.querySelector('input[name="cats"]:checked').value)
    const bodyValue = Number(document.querySelector('#body').value) * 50
    const driveValue = Number(document.querySelector('input[name="drive"]:checked').value)

    console.log(milageValue, basePrice, yearValue, catsValue, bodyValue, driveValue)

    let quotePrice = (basePrice * yearValue * catsValue) + bodyValue + driveValue - milageValue

    console.log(quotePrice)
    document.getElementById('quote').innerText = `We'll buy it from you for $ ${quotePrice}`

}
console.log('hello')


// handles the multi-step forms
const multiStepForm = document.querySelector("[data-multi-step]")
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
let currentStep = formSteps.findIndex(step => {
  return step.classList.contains("active")
})

if (currentStep < 0) {
  currentStep = 0
  showCurrentStep()
}

multiStepForm.addEventListener("click", e => {
  let incrementor
  if (e.target.matches("[data-next]")) {
    incrementor = 1
  } else if (e.target.matches("[data-previous]")) {
    incrementor = -1
  }

  if (incrementor == null) return

  const inputs = [...formSteps[currentStep].querySelectorAll("input")]
  const allValid = inputs.every(input => input.reportValidity())
  if (allValid) {
    currentStep += incrementor
    showCurrentStep()
  }
})

formSteps.forEach(step => {
  step.addEventListener("animationend", e => {
    formSteps[currentStep].classList.remove("hide")
    e.target.classList.toggle("hide", !e.target.classList.contains("active"))
  })
})

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep)
  })
}

// handles the nav burger
const MenuHandler = (flag) => {
  if (flag) {
      document.getElementById("list").classList.add("top-100");
      document.getElementById("list").classList.remove("hidden");
      document.getElementById("close").classList.remove("hidden");
      document.getElementById("open").classList.add("hidden");
  } else {
      document.getElementById("list").classList.remove("top-100");
      document.getElementById("list").classList.add("hidden");
      document.getElementById("close").classList.add("hidden");
      document.getElementById("open").classList.remove("hidden");
  }
};