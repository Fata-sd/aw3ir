// compteur de caractères
function calcNbChar(id){
  const val = document.getElementById(id).value.length;
  document.getElementById('count-' + id).textContent = val + " car.";
}

// LocalStorage contacts
const contactStore = {
  key: 'contacts',
  get(){ return JSON.parse(localStorage.getItem(this.key) || '[]'); },
  add(c){ const arr = this.get(); arr.push(c); localStorage.setItem(this.key, JSON.stringify(arr)); },
  remove(i){ const arr=this.get(); arr.splice(i,1); localStorage.setItem(this.key, JSON.stringify(arr)); displayContacts(); },
  reset(){ localStorage.removeItem(this.key); displayContacts(); }
};

// afficher tableau
function displayContacts(){
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";
  contactStore.get().forEach((c,i)=>{
    tbody.innerHTML += `<tr>
      <td>${c.name}</td>
      <td>${c.firstname}</td>
      <td>${c.birthday}</td>
      <td>${c.address}</td>
      <td>${c.email}</td>
      <td><button class="btn btn-sm btn-danger" onclick="contactStore.remove(${i})">Supprimer</button></td>
    </tr>`;
  });
}

// Carte Leaflet
let map = L.map('map').setView([48.8566, 2.3522], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
let marker;

// GPS bouton
document.getElementById("getLocationBtn").addEventListener("click", ()=>{
  if(!navigator.geolocation){ alert("Géo non supportée"); return; }
  navigator.geolocation.getCurrentPosition(pos=>{
    const lat=pos.coords.latitude, lon=pos.coords.longitude;
    document.getElementById("address").value = lat.toFixed(6)+','+lon.toFixed(6);
    if(marker) map.removeLayer(marker);
    marker = L.marker([lat,lon]).addTo(map);
    map.setView([lat,lon],15);
  }, ()=>alert("Impossible d'obtenir la position"));
});

// submit form
document.getElementById("form-contact").addEventListener("submit", e=>{
  e.preventDefault();
  contactStore.add({
    name: document.getElementById("name").value,
    firstname: document.getElementById("firstname").value,
    birthday: document.getElementById("birthday").value,
    address: document.getElementById("address").value,
    email: document.getElementById("email").value
  });
  displayContacts();
  e.target.reset();
});
window.onload = displayContacts;
