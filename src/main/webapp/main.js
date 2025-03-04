/**
 * 
 */
var usuarios = [];
let numerosAux = 1;
var orden = "ID";
function envio() {
	let informacion = document.getElementById("usuario").value
	let dia = new Date();
	let info = document.getElementById("fecha").value;
	let dia2 = new Date(info);
	if (dia < dia2) {
		alert("Fecha incorrecta");
	} else {
		const edad = new Date(dia - dia2);

		if (!usuarios.includes(informacion.toLowerCase())) {
			let fila = document.createElement("tr");
			let celda = document.createElement("td");
			celda.innerHTML = numerosAux;
			fila.appendChild(celda);
			celda = document.createElement("td");
			celda.innerHTML = informacion;
			fila.appendChild(celda);
			celda = document.createElement("td");
			celda.innerHTML = edad.getFullYear() - 1970;
			fila.appendChild(celda);
			usuarios.push(numerosAux, informacion.toLowerCase(), edad.getFullYear() - 1970);
			numerosAux++;
			document.getElementById("tabla").appendChild(fila);
		} else {
			alert("Usuario ya existente")
		}
		return false;
	}
}

function eliminar() {
	const id = prompt("Escriba el ID del usuario a eliminar: ")
	usuarios = usuarios.filter(
		function(arrayUs) {
			if (arrayUs[0] != id) {
				return arrayUs;
			}
		}
	);
	escribir();
}

function escribir() {
	document.getElementById("tablas").innerHTML="";
	usuarios.forEach(function(arrayUs) {
		let fila = document.createElement("tr");
		let celda = document.createElement("td");
		celda.innerHTML = arrayUs[0];
		fila.appendChild(celda);
		celda = document.createElement("td");
		fila.appendChild(celda);
		celda.innerHTML = arrayUs[1];
		celda = document.createElement("td");
		fila.appendChild(celda);
		celda.innerHTML = arrayUs[2];
		usuarios.push(informacion.toLowerCase);
		document.getElementById("tablas").appendChild(fila);
	})
}

function ordenar(valor) {
	switch (valor) {
		case 0: //ordenar por ID
			if (orden != "ID") {
				alert("valor 0");
				usuarios = usuarios.sort(function(posIni, posFin) {
					if (posIni[0] > posFin[0]) {
						return 1;
					} else {
						return -1;
					}
				});
				orden = "ID";
			} else {
				usuarios = usuarios.sort(function(posIni, posFin) {
					if (posIni[0] > posFin[0]) {
						return -1;
					} else {
						return 1;
					}
				});
				orden = "";
			}
			escribir();
			break;
		case 1: //ordenar por Nombre
			alert("valor 1");
			if (orden != "nombre") {
				usuarios = usuarios.sort(function(posIni, posFin) {
					if (posIni[1] > posFin[1]) {
						return 1;
					} else {
						return -1;
					}
				});
				orden = "nombre";
			} else {
				usuarios = usuarios.sort(function(posIni, posFin) {
					if (posIni[1] > posFin[1]) {
						return -1;
					} else {
						return 1;
					}
				});
				orden = "";
			}
			escribir();
			break;
		default:
			alert("Alerta Carmoniense")
			break;
	}
}
