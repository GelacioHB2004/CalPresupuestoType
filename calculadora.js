var transacciones = [];
var balance = 0;
var totalIngresos = 0;
var totalGastos = 0;
function mostrarMensaje(mensaje, tipo) {
    var mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = tipo === "success" ? "mensaje success" : "mensaje error";
    mensajeDiv.style.display = "block";
    setTimeout(function () {
        mensajeDiv.style.display = "none";
    }, 3000);
}
function agregarTransaccion(tipo) {
    var montoInput = document.getElementById("monto");
    var descripcionInput = document.getElementById("descripcion");
    var listaTransacciones = document.getElementById("lista-transacciones");
    var balanceSpan = document.getElementById("balance");
    var ingresosSpan = document.getElementById("total-ingresos");
    var gastosSpan = document.getElementById("total-gastos");
    var monto = parseFloat(montoInput.value);
    var descripcion = descripcionInput.value.trim();
    if (isNaN(monto) || monto <= 0) {
        mostrarMensaje("⚠️ El monto debe ser un número positivo.", "error");
        return;
    }
    if (descripcion === "") {
        mostrarMensaje("⚠️ La descripción no puede estar vacía.", "error");
        return;
    }
    if (tipo === "gasto" && monto > balance) {
        mostrarMensaje("❌ No puedes gastar más de lo que tienes disponible.", "error");
        return;
    }
    var transaccion = {
        id: Date.now(),
        monto: monto,
        descripcion: descripcion,
        tipo: tipo
    };
    transacciones.push(transaccion);
    if (tipo === "ingreso") {
        balance += monto;
        totalIngresos += monto;
    }
    else {
        balance -= monto;
        totalGastos += monto;
    }
    // Crear una nueva fila para la tabla
    var fila = document.createElement("tr");
    // Crear celdas para la descripción, monto y tipo
    var celdaDescripcion = document.createElement("td");
    celdaDescripcion.textContent = transaccion.descripcion;
    fila.appendChild(celdaDescripcion);
    var celdaMonto = document.createElement("td");
    celdaMonto.textContent = "$".concat(transaccion.monto.toFixed(2));
    fila.appendChild(celdaMonto);
    var celdaTipo = document.createElement("td");
    celdaTipo.textContent = tipo === "ingreso" ? "Ingreso" : "Gasto";
    fila.appendChild(celdaTipo);
    // Añadir la fila a la tabla
    listaTransacciones.prepend(fila); // Insertar al principio
    // Actualizar los totales
    balanceSpan.textContent = balance.toString();
    ingresosSpan.textContent = totalIngresos.toString();
    gastosSpan.textContent = totalGastos.toString();
    montoInput.value = "";
    descripcionInput.value = "";
    mostrarMensaje("✅ Transacción agregada correctamente.", "success");
}
document.addEventListener("DOMContentLoaded", function () {
    mostrarMensaje("🎉 Aplicación lista y optimizada.", "success");
});
