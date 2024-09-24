import { deleteUsuario, getUsuarios, postUsuario, putUsuario } from "./api.js";

const entrada = document.getElementById('entrada-usuario');
const boton = document.getElementById('boton-agregar');
const usuarios = document.getElementById('usuarios');

boton.addEventListener('click', async () => {
    let usuario = entrada.value;
    if (usuario) {
        await postUsuario(usuario);  
        entrada.value = ''; 
        escribirUsers();  
    }
});

async function escribirUsers() {
    usuarios.innerHTML = '';  
    let tareas = await getUsuarios();  

    // Renderizar cada usuario
    tareas.forEach(element => {
        usuarios.innerHTML += `
            <div>
                <h1>User: ${element.name}</h1>
                <h2>ID: ${element.id}</h2>
                <button class="boton-borrar" data-id="${element.id}">Borrar usuario</button>
                <input type="text" id="modificacion-${element.id}" placeholder="Nuevo nombre">
                <button class="boton-modificar" data-id="${element.id}">Modificar usuario</button>
            </div>`;
    });

    document.querySelectorAll('.boton-borrar').forEach(boton => {
        boton.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id');  
            await deleteUsuario(id);  
            escribirUsers();  
        });
    });

  
    document.querySelectorAll('.boton-modificar').forEach(boton => {
        boton.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id');  
            const nuevoNombre = document.getElementById(`modificacion-${id}`).value;  
            if (nuevoNombre) {
                await putUsuario(id, { name: nuevoNombre });  
                escribirUsers();
            }
        });
    });
}

escribirUsers();
