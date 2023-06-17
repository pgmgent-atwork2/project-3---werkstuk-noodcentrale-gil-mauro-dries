const roleSelects = document.querySelectorAll('select[name="rol"]');
console.log(roleSelects);

console.log(document.cookie);

roleSelects.forEach((roleSelect) => {
  roleSelect.addEventListener('change', (e) => {
    const { id } = e.target.dataset;
    const role = e.target.options[e.target.selectedIndex].value;

    console.log(id, role);
    updateRole(id, role);
  });
});

async function updateRole(id, role) {
  // (this.options[this.selectedIndex].value)
  try {
    console.log('Updating role:', role);
    const resp = await fetch('/api/roles/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        token: jwt,
      },
      body: JSON.stringify({
        id,
        role,
      }),
    });
    const data = await resp.json();
    console.log('Data succesvol verzonden voor update: ', data);
  } catch (error) {
    console.error('Er liep iets mis bij het updaten van een rol: ', error);
  }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const medischeButton = document.getElementById('medische');
const functioneelButton = document.getElementById('functioneel');
const ploegleidersButton = document.getElementById('ploegleiders');
const deskundigenButton = document.getElementById('deskundigen');

async function filter() {
  const roles = await fetch('/api/roles/', {
    method: 'GET',
  });

  console.log(roles);


medischeButton.addEventListener('click', (e) => {
  console.log(e.target.dataset.value);
  window.location.href = '?roleId=2';
  console.log("window location:", window.location.href); 
});

functioneelButton.addEventListener('click', () => {
  console.log('functioneelButton clicked');
  window.location.href += '?roleId=3'; 
});

ploegleidersButton.addEventListener('click', () => {
  console.log('ploegleidersButton clicked');
  window.location.href += '?roleId=4'; 

});

deskundigenButton.addEventListener('click', () => {
  console.log('deskundigenButton clicked');
  window.location.href += '?roleId=5'; 
});
