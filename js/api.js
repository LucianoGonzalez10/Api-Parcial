const url = 'http://localhost:3000/';

export async function getUsuarios() {
    try {
        const response = await fetch(url + 'usuarios', { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Error fetching users: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}


export async function postUsuario(usuario) {
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");

    let inicializador = {
        method: 'POST',
        headers: cabecera,
        body: JSON.stringify({ name: usuario }) 
    };
    try {
        const response = await fetch(url + 'usuarios', inicializador);
        if (!response.ok) {
            throw new Error(`Error adding user: ${response.status}`);
        }
    } catch (error) {
        console.log(`Error: ${error}`);
        throw error;
    }
}


export async function deleteUsuario(id) {
    try {
        const response = await fetch(url + `usuarios/${id}`, { method: 'DELETE' });
        if (!response.ok) {
            throw new Error(`Error deleting user: ${response.status}`);
        }
        return true; 
    } catch (error) {
        console.log(error);
    }
}

// Fetch a user by ID
export async function getUsuarioById(id) {
    try {
        const response = await fetch(url + `usuarios/${id}`, { method: 'GET' });
        if (!response.ok) {
            throw new Error(`Error fetching user by ID: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Update a user by ID
export async function putUsuario(id, usuario) {
    try {
        const response = await fetch(url + `usuarios/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)  
        });
        if (!response.ok) {
            throw new Error(`Error updating user: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}
