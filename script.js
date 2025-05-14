let data = {};
let isEditing = false;
const PASSWORD = "guardia2025"; // puedes cambiarla luego

async function loadData() {
  const res = await fetch('contactos_guardias.json');
  data = await res.json();
  renderTable();
  updateDate();
}

function renderTable() {
  const container = document.getElementById('content');
  container.innerHTML = '';

  for (let group in data) {
    const title = document.createElement('h2');
    title.textContent = group;
    container.appendChild(title);

    const table = document.createElement('table');
    data[group].forEach((item, index) => {
      const row = document.createElement('tr');
      const cell = document.createElement('td');

      if (isEditing) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = item;
        input.onchange = (e) => data[group][index] = e.target.value;
        cell.appendChild(input);
      } else {
        cell.textContent = item;
      }

      row.appendChild(cell);
      table.appendChild(row);
    });
    container.appendChild(table);
  }
}

function login() {
  const pass = document.getElementById('password').value;
  if (pass === PASSWORD) {
    isEditing = true;
    document.getElementById('save-btn').style.display = 'inline-block';
    renderTable();
  } else {
    alert("Contraseña incorrecta");
  }
}

function saveChanges() {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'contactos_guardias_actualizado.json';
  a.click();
  const now = new Date().toLocaleString();
  localStorage.setItem("ultimaActualizacion", now);
  updateDate();
  alert("Datos guardados localmente. Sube el archivo a GitHub si quieres que todos vean los cambios.");
}

function updateDate() {
  const last = localStorage.getItem("ultimaActualizacion");
  document.getElementById("last-updated").textContent = last || '---';
}

window.onload = loadData;
