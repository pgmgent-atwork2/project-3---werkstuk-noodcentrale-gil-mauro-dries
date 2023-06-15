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

  try {
    if (medischeButton === roleSelects[2]) {
      console.log(roleSelects);
    } else if (functioneelButton === roleSelects[3]) {
      console.log(roleSelects);
    } else if (ploegleidersButton === roleSelects[4]) {
      console.log(roleSelects);
    } else if (deskundigenButton === roleSelects[5]) {
      console.log(roleSelects);
    } else {
      console.log(roleSelects);
    }
  } catch (error) {
    console.error(error);
  }
}

medischeButton.addEventListener('click', () => {
  console.log('medischeButton clicked');
  filter();
});

functioneelButton.addEventListener('click', () => {
  console.log('functioneelButton clicked');
  filter();
});

ploegleidersButton.addEventListener('click', () => {
  console.log('ploegleidersButton clicked');
  filter();
});

deskundigenButton.addEventListener('click', () => {
  console.log('deskundigenButton clicked');
  filter();
});
