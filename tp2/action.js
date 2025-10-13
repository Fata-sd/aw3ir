// Attendre que la page soit complètement chargée
window.onload = () => {
  // Récupérer la chaîne de requête de l'URL
  const paramsString = document.location.search;

  // Créer un objet URLSearchParams pour lire facilement les paramètres
  const searchParams = new URLSearchParams(paramsString);

  // Boucle sur tous les paramètres
  for (const param of searchParams) {
    const elementId = param[0];                       // identifiant du champ
    const elementValue = decodeURIComponent(param[1]); // valeur décodée
    const element = document.getElementById(elementId);

    if (element !== null) {
      // Champs texte simples
      if (elementId !== "address" && elementId !== "email") {
        element.textContent = elementValue;
      }
    }

    // Adresse -> lien Google Maps
    if (elementId === "address" && element !== null) {
      element.href = `https://www.google.com/maps/search/?api=1&query=${elementValue}`;
      element.textContent = elementValue;
      element.target = "_blank"; // ouvre dans un nouvel onglet
    }

    // Email -> lien mailto
    if (elementId === "email" && element !== null) {
      element.href = `mailto:${elementValue}?subject=Hello!&body=What's up?`;
      element.textContent = elementValue;
    }

    // Affichage dans la console pour le débogage
    console.log(param);
  }
};
