// Récupération des éléments du formulaire
const form = document.getElementById("form-inscription");
const nameInput = document.getElementById("name");
const firstnameInput = document.getElementById("firstname");
const birthdayInput = document.getElementById("birthday");
const addressInput = document.getElementById("address");
const emailInput = document.getElementById("email");

// Fonction pour afficher ou cacher l'erreur
function setValidationMessage(input, message) {
    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.className = 'invalid-feedback';
        input.parentNode.appendChild(feedback);
    }
    feedback.innerText = message;
    if (message) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
}

// Validation en temps réel
nameInput.addEventListener('input', () => {
    if (nameInput.value.length < 2) {
        setValidationMessage(nameInput, "Le nom doit contenir au moins 2 caractères.");
    } else if (nameInput.value.length > 20) {
        setValidationMessage(nameInput, "Le nom ne doit pas dépasser 20 caractères.");
    } else {
        setValidationMessage(nameInput, "");
    }
});

firstnameInput.addEventListener('input', () => {
    if (firstnameInput.value.length < 2) {
        setValidationMessage(firstnameInput, "Le prénom doit contenir au moins 2 caractères.");
    } else if (firstnameInput.value.length > 20) {
        setValidationMessage(firstnameInput, "Le prénom ne doit pas dépasser 20 caractères.");
    } else {
        setValidationMessage(firstnameInput, "");
    }
});

birthdayInput.addEventListener('input', () => {
    if (!birthdayInput.value) {
        setValidationMessage(birthdayInput, "La date de naissance est obligatoire.");
    } else {
        setValidationMessage(birthdayInput, "");
    }
});

addressInput.addEventListener('input', () => {
    if (addressInput.value.length < 5) {
        setValidationMessage(addressInput, "L'adresse doit contenir au moins 5 caractères.");
    } else if (addressInput.value.length > 50) {
        setValidationMessage(addressInput, "L'adresse ne doit pas dépasser 50 caractères.");
    } else {
        setValidationMessage(addressInput, "");
    }
});

emailInput.addEventListener('input', () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.match(emailPattern)) {
        setValidationMessage(emailInput, "Email invalide.");
    } else {
        setValidationMessage(emailInput, "");
    }
});

// Soumission du formulaire
form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Vérification finale avant affichage
    if (
        nameInput.classList.contains('is-invalid') ||
        firstnameInput.classList.contains('is-invalid') ||
        birthdayInput.classList.contains('is-invalid') ||
        addressInput.classList.contains('is-invalid') ||
        emailInput.classList.contains('is-invalid')
    ) {
        alert("Veuillez corriger les erreurs avant de soumettre le formulaire.");
        return;
    }

    // Création des liens pour Google Maps et email
    let googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressInput.value)}`;

    document.getElementById("resultText").innerHTML =
    `Bonjour <b>${firstnameInput.value} ${nameInput.value}</b>.<br>
     Né(e) le <b>${birthdayInput.value}</b>.<br>
     Adresse : <b><a href="${googleMapsLink}" target="_blank">${addressInput.value}</a></b>.<br>
     Email : <b><a href="mailto:${emailInput.value}">${emailInput.value}</a></b>.`;

    let modal = new bootstrap.Modal(document.getElementById('resultModal'));
    modal.show();
});
