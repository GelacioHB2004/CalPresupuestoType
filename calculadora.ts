type TipoTransaccion = "ingreso" | "gasto";

interface Transaccion {
    id: number;
    monto: number;
    descripcion: string;
    tipo: TipoTransaccion;
}

let transacciones: Transaccion[] = [];
let balance = 0;
let totalIngresos = 0;
let totalGastos = 0;

function mostrarMensaje(mensaje: string, tipo: "error" | "success") {
    const mensajeDiv = document.getElementById("mensaje") as HTMLDivElement;
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = tipo === "success" ? "mensaje success" : "mensaje error";
    mensajeDiv.style.display = "block";

    setTimeout(() => {
        mensajeDiv.style.display = "none";
    }, 3000);
}

function agregarTransaccion(tipo: TipoTransaccion): void {
    const montoInput = document.getElementById("monto") as HTMLInputElement;
    const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
    const listaTransacciones = document.getElementById("lista-transacciones") as HTMLTableSectionElement;
    const balanceSpan = document.getElementById("balance") as HTMLSpanElement;
    const ingresosSpan = document.getElementById("total-ingresos") as HTMLSpanElement;
    const gastosSpan = document.getElementById("total-gastos") as HTMLSpanElement;

    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();

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

    const transaccion: Transaccion = {
        id: Date.now(),
        monto,
        descripcion,
        tipo
    };

    transacciones.push(transaccion);
    
    if (tipo === "ingreso") {
        balance += monto;
        totalIngresos += monto;
    } else {
        balance -= monto;
        totalGastos += monto;
    }

    // Crear una nueva fila para la tabla
    const fila = document.createElement("tr");

    // Crear celdas para la descripción, monto y tipo
    const celdaDescripcion = document.createElement("td");
    celdaDescripcion.textContent = transaccion.descripcion;
    fila.appendChild(celdaDescripcion);

    const celdaMonto = document.createElement("td");
    celdaMonto.textContent = `$${transaccion.monto.toFixed(2)}`;
    fila.appendChild(celdaMonto);

    const celdaTipo = document.createElement("td");
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

document.addEventListener("DOMContentLoaded", () => {
    mostrarMensaje("🎉 Aplicación lista y optimizada.", "success");
});
