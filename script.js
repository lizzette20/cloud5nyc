let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
};
themeButton.addEventListener("click", toggleDarkMode);

let count = 3; 

const validateForm = () => {
    let containsErrors = false;
    const petitionInputs = document.getElementById("sign-petition").elements;

    const person = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        hometown: document.getElementById('hometown').value
    };

    for (let i = 0; i < petitionInputs.length; i++) {
        if (petitionInputs[i].value.length < 2) {
            petitionInputs[i].classList.add('error');
            containsErrors = true;
        } else { 
            petitionInputs[i].classList.remove('error');
        }
    }
    
    if (!person.email.includes(".com")) {
        document.getElementById("email").classList.add("error");
        containsErrors = true;
    } else {
        document.getElementById("email").classList.remove("error");
    }

    if (!containsErrors) {
        addSignature(person);

        for (let i = 0; i < petitionInputs.length; i++) {
            petitionInputs[i].value = "";
        }
    }
};

const addSignature = () => {
    const nameInput = document.getElementById("name").value;
    const hometownInput = document.getElementById("hometown").value;

    const signature = document.createElement("p");
    signature.textContent = `🖊️ ${nameInput} from ${hometownInput} supports this.`;

    document.querySelector(".signatures").appendChild(signature);

    count += 1;
    const counterElement = document.getElementById("counter");
    counterElement.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

    const person = {
        name: nameInput,
        hometown: hometownInput
    };
    toggleModal(person);
};
const toggleModal = (person) => {

    const modal = document.getElementById("thanks-modal");
    const modalContent = document.getElementById("thanks-modal-content");

    modal.style.display = "flex"; 

    modalContent.textContent = `Thank you so much, ${person.name}! We truly appreciate you :) ${person.hometown} represent!`;

    setTimeout(() => {
        modal.style.display = "none"; 
    }, 4000); 
};

const closeModalButton = document.getElementById("close-modal-button");
const closeModal = () => {
    const modal = document.getElementById("thanks-modal");
    modal.style.display = "none"; // Hides the modal
};
closeModalButton.addEventListener("click", closeModal);

let signNowButton = document.getElementById("sign-now-button");
signNowButton.addEventListener("click", validateForm);

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("thanks-modal");
    modal.style.display = "none"; 
});



let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: '0s',
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease'
};

const revealableContainers = document.querySelectorAll('.revealable');

window.addEventListener('scroll', reveal);

function reveal() {
    for (let i = 0; i < revealableContainers.length; i++) {
        let windowHeight = window.innerHeight; 
        let topOfElement = revealableContainers[i].getBoundingClientRect().top;

        if (topOfElement < windowHeight - 150) { 
            revealableContainers[i].classList.add('active');
        } else {
            revealableContainers[i].classList.remove('active');
        }
    }
}
document.getElementById('reduce-motion-btn').addEventListener('click', function() {
    document.body.classList.toggle('reduce-motion');
  
    if (document.body.classList.contains('reduce-motion')) {
      this.textContent = 'Enable Motion';
    } else {
      this.textContent = 'Reduce Motion';
    }
  });