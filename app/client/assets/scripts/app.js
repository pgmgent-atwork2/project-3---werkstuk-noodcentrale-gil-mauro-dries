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
