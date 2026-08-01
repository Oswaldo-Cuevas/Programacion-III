const url = "http://localhost:3000/api/productos";

const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const lista = document.getElementById("lista");

let productos = [];
let editando = null;

// Obtener productos
async function obtenerProductos() {
  const res = await fetch(url);
  productos = await res.json();
  mostrarProductos();
}

// Mostrar productos
function mostrarProductos() {
  lista.innerHTML = "";
  productos.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${p.nombre} - $${p.precio}
      <button onclick="editar('${p.id}')">Editar</button>
      <button onclick="eliminar('${p.id}')">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

// Guardar producto
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nuevo = { nombre: nombre.value, precio: Number(precio.value) };

  if (editando) {
    await fetch(`${url}/${editando}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo)
    });
    editando = null;
  } else {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo)
    });
  }

  formulario.reset();
  obtenerProductos();
});

// Editar producto
function editar(id) {
  const producto = productos.find(p => p.id === id);
  nombre.value = producto.nombre;
  precio.value = producto.precio;
  editando = id;
}

// Eliminar producto
async function eliminar(id) {
  await fetch(`${url}/${id}`, { method: "DELETE" });
  obtenerProductos();
}

// Cancelar edición
function cancelarEdicion() {
  formulario.reset();
  editando = null;
}

// Inicial
obtenerProductos();