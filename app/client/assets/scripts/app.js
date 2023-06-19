const roleSelects = document.querySelectorAll('select[name="rol"]');
console.log(roleSelects);

console.log(document.cookie);

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

roleSelects.forEach((roleSelect) => {
  roleSelect.addEventListener('change', (e) => {
    const { id } = e.target.dataset;
    const role = e.target.options[e.target.selectedIndex].value;

    console.log(id, role);
    updateRole(id, role);
  });
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const medischeButton = document.getElementById('medische');
const functioneelButton = document.getElementById('functioneel');
const ploegleidersButton = document.getElementById('ploegleiders');
const deskundigenButton = document.getElementById('deskundigen');
const allButton = document.getElementById('all');

if (window.location.href === 'http://localhost:3000/admin-dash') {
  window.location.href = 'http://localhost:3000/admin-dash/?roleId=0';
}

medischeButton.addEventListener('click', (e) => {
  console.log(e.target.dataset.value);
  window.location.href = 'http://localhost:3000/admin-dash/?roleId=2';
  console.log('window location:', window.location.href);
});

functioneelButton.addEventListener('click', () => {
  console.log('functioneelButton clicked');
  window.location.href = 'http://localhost:3000/admin-dash/?roleId=3';
});

ploegleidersButton.addEventListener('click', () => {
  console.log('ploegleidersButton clicked');
  window.location.href = 'http://localhost:3000/admin-dash/?roleId=4';
});

deskundigenButton.addEventListener('click', () => {
  console.log('deskundigenButton clicked');
  window.location.href = 'http://localhost:3000/admin-dash/?roleId=5';
});

allButton.addEventListener('click', () => {
  console.log('allButton clicked');
  window.location.href = 'http://localhost:3000/admin-dash/?roleId=0';
});
