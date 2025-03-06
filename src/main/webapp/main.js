var usuarios = [];
let numerosAux = 1;
var orden = "ID";

function envio() {
  let nombreUsuario = document.getElementById("usuario").value;
  let fechaNacimiento = document.getElementById("fecha").value;

  // Verificar que se haya ingresado una fecha válida
  if (!fechaNacimiento) {
    alert("Por favor, ingrese una fecha válida.");
    return false;
  }

  let diaHoy = new Date();
  let fechaNacimientoDate = new Date(fechaNacimiento);
  
  // Verificar que la fecha de nacimiento no sea futura
  if (fechaNacimientoDate > diaHoy) {
    alert("Fecha de nacimiento no válida.");
    return false;
  }

  let edad = calcularEdad(fechaNacimientoDate, diaHoy);

  // Verificar si el usuario ya existe
  if (!usuarios.some(user => user.nombre.toLowerCase() == nombreUsuario.toLowerCase())) {
    let fila = document.createElement("tr");
    
    let celdaID = document.createElement("td");
    celdaID.textContent = numerosAux;
    fila.appendChild(celdaID);
    
    let celdaNombre = document.createElement("td");
    celdaNombre.textContent = nombreUsuario;
    fila.appendChild(celdaNombre);

    let celdaEdad = document.createElement("td");
    celdaEdad.textContent = edad;
    fila.appendChild(celdaEdad);

    // Celda de validación con el texto
    let celdaValidado = document.createElement("td");
    let textoValidado = document.createElement("span");
    textoValidado.textContent = "No";  // Por defecto el estado es "No"
    textoValidado.style.cursor = "pointer";
    textoValidado.onclick = function() {
      cambiarValidacion(textoValidado);  // Cambia la validación cuando se hace clic
    };
    celdaValidado.appendChild(textoValidado);
    fila.appendChild(celdaValidado);

    // Guardamos la información del usuario con su estado de validación como texto
    usuarios.push({
      id: numerosAux,
      nombre: nombreUsuario,
      edad: edad,
      validado: "No", // Por defecto es "No"
    });

    document.getElementById("tabla").appendChild(fila);
    numerosAux++;
  } else {
    alert("Usuario ya existente.");
  }
  return false;
}

function calcularEdad(fechaNacimiento, fechaActual) {
  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  let mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
  
  // Si no ha llegado el cumpleaños de este año
  if (mes < 0 || (mes == 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  
  return edad;
}

function eliminar() {
  const idEliminar = prompt("Escriba el ID del usuario a eliminar: ");
  let usuarioEliminado = false;

  usuarios = usuarios.filter(usuario => {
    if (usuario.id == idEliminar) {
      usuarioEliminado = true;
      return false;
    }
    return true;
  });

  if (!usuarioEliminado) {
    alert("Usuario no encontrado.");
  } else {
    alert("Usuario eliminado.");
  }

  escribir();
}

function escribir() {
  let tabla = document.getElementById("tabla");
  tabla.innerHTML = ""; // Limpiar la tabla antes de volver a escribir

  usuarios.forEach(function(usuario) {
    let fila = document.createElement("tr");

    let celdaID = document.createElement("td");
    celdaID.textContent = usuario.id;
    fila.appendChild(celdaID);

    let celdaNombre = document.createElement("td");
    celdaNombre.textContent = usuario.nombre;
    fila.appendChild(celdaNombre);

    let celdaEdad = document.createElement("td");
    celdaEdad.textContent = usuario.edad;
    fila.appendChild(celdaEdad);

    // Celda de validación con el texto
    let celdaValidado = document.createElement("td");
    let textoValidado = document.createElement("span");
    textoValidado.textContent = usuario.validado;  // Usamos el estado actual de validación
    textoValidado.style.cursor = "pointer";
    textoValidado.onclick = function() {
      cambiarValidacion(textoValidado);  // Cambiar entre "Sí" y "No"
    };
    celdaValidado.appendChild(textoValidado);
    fila.appendChild(celdaValidado);

    tabla.appendChild(fila);
  });
}

function cambiarValidacion(textoValidado) {
  // Cambiar entre "Sí" y "No" al hacer clic
  if (textoValidado.textContent == "No") {
    textoValidado.textContent = "Sí";
  } else {
    textoValidado.textContent = "No";
  }
}

function ordenar(columna) {
  switch (columna) {
    case 0: // Ordenar por ID
      if (orden != "ID") {
        usuarios.sort((a, b) => a.id - b.id);
        orden = "ID";
      } else {
        usuarios.sort((a, b) => b.id - a.id);
        orden = "";
      }
      break;
    case 1: // Ordenar por Nombre
      if (orden != "Nombre") {
        usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre));
        orden = "Nombre";
      } else {
        usuarios.sort((a, b) => b.nombre.localeCompare(a.nombre));
        orden = "";
      }
      break;
  }
  escribir();
}
