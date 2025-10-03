/*const data = require("./data.json");

const clave = Object.keys(data);


clave.forEach((item) => { 
    
    const valor = data[item]
    const tipo = typeof valor;
 
    if ( tipo === "string" ) {
        console.log(item + " => " + valor )
    }
    else {
        console.log(item + " => " + Object.keys(valor[0]) )
    }
}) 

    === exercise 2 ===

// 1. Librerías externas
const prompt = require("prompt-sync")();

// 2. Constantes globales
const IMPUESTO = 1.08;
const VALOR_IPHONE16 = 1635; 
const VALOR_IPHONE17 = 1923;
const VIDRIO_TEMPLADO = 10; 
const FUNDA = 15;

// 3. Funciones auxiliares
function pedirNumeroPositivo(mensaje) {
    let valor;
    do {
        valor = Number(prompt(mensaje));
    } while (isNaN(valor) || valor < 0);
    return valor;
}

function pasarADolar(valor) {
    return `$${valor.toFixed(2)}`;
}

// 4. Inputs del usuario
const cuentaBancaria = pedirNumeroPositivo("Ingrese el total disponible para gastar: ");
const cantidadIphone16 = pedirNumeroPositivo("Ingrese el total de iPhone16 que desea: ");
const cantidadIphone17 = pedirNumeroPositivo("Ingrese el total de iPhone17 que desea: ");
const cantidadVidrio = pedirNumeroPositivo("Ingrese el total de vidrio templado que desea: ");
const cantidadFundas = pedirNumeroPositivo("Ingrese el total de fundas que desea: ");

// 5. Cálculos principales
const totalCompra =
    (VALOR_IPHONE16 * cantidadIphone16) +
    (VALOR_IPHONE17 * cantidadIphone17) +
    (VIDRIO_TEMPLADO * cantidadVidrio) +
    (FUNDA * cantidadFundas);

const totalAPagar = totalCompra * IMPUESTO;
const faltante = totalAPagar - cuentaBancaria;

// 6. Condiciones y salida
if (totalAPagar <= cuentaBancaria) {
    console.log(`El total a pagar es: ${pasarADolar(totalAPagar)} está dentro de tu presupuesto: ${pasarADolar(cuentaBancaria)}.`);
    console.log("Disfrutá de tu compra!");
} else {
    console.log(`El total a pagar es: ${pasarADolar(totalAPagar)} supera tu presupuesto que es: ${pasarADolar(cuentaBancaria)}.`);
    console.log(`Te faltan ${pasarADolar(faltante)} para completar la compra.`);
}

*/

const data = require("./proveedores.json"); 
const prompt = require("prompt-sync")();
const productosPlano = [];
let carrito = [];

data.proveedores.forEach((proveedor) => {
  Object.keys(proveedor.productos).forEach((tipo) => {
    proveedor.productos[tipo].forEach((producto) => {
      productosPlano.push({
        tipo: tipo,
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        stock: producto.stock,
      });
    });
  });
});

function mostrarTabla() {
  console.table(productosPlano);
}

function mostrarPorTipo(tipo) {
  const filtrados = productosPlano.filter((p) => p.tipo === tipo);
  console.table(filtrados);
}

function elegirProductoPorID(tipo) {
  mostrarPorTipo(tipo);
  const idElegido = comprobar("Ingrese el ID del producto que quiere comprar: ");
  const producto = productosPlano.find(
    (p) => p.tipo === tipo && p.id === idElegido
  );

  if (producto) {
    console.log(`Stock disponible: ${producto.stock}`);
    let cantidad = comprobar("Ingrese la cantidad que quiere comprar: ");

    if (cantidad > 0 && cantidad <= producto.stock) {
      carrito.push({ ...producto, cantidad });
      console.log(` ${cantidad} x ${producto.nombre} agregado al carrito.`);
    } else {
      console.log(" Cantidad inválida o sin stock suficiente.");
    }
  } else {
    console.log(" Producto no encontrado.");
  }
}

function queQuiereComprar() {
  let seguirComprando = "s";

  while (seguirComprando === "s") {
    console.log("\n¿Qué desea comprar?");
    console.log("1 - Celulares");
    console.log("2 - Vidrios");
    console.log("3 - Fundas");
    console.log("4 - Volver al menú principal");

    let tipoOpcionCompra = comprobar("Ingrese 1, 2, 3 o 4: ");

    switch (tipoOpcionCompra) {
      case 1:
        elegirProductoPorID("celulares");
        break;
      case 2:
        elegirProductoPorID("vidrios");
        break;
      case 3:
        elegirProductoPorID("fundas");
        break;
      case 4:
        console.log("Volviendo al menú principal...");
        return;
      default:
        console.log("Opción inválida. Ingrese solo 1, 2, 3 o 4.");
        continue;
    }

    seguirComprando = comprobarSN("¿Desea seguir comprando?: ");
  }

    finalizarCompra();
}

function elegirFormaPago(total) {
  console.log("\nFormas de pago:");
  console.log("1 - Tarjeta de crédito");
  console.log("2 - Transferencia bancaria");
  console.log("3 - Efectivo al recibir");

  let opcionPago = comprobar("Ingrese 1, 2 o 3: ");
  switch (opcionPago) {
    case 1:
      let numeroTarjeta = prompt("Ingrese número de tarjeta: ");
      let nombre = prompt("Ingrese nombre del titular: ");
      let vencimiento = prompt("Ingrese fecha de vencimiento (MM/AA): ");
      let cvv = prompt("Ingrese CVV: ");
      console.log(` Pago aprobado con tarjeta ****${numeroTarjeta.slice(-4)} por $${total}`);
      break;
    case 2:
      let cbu = prompt("Ingrese su CBU/alias: ");
      console.log(` Transferencia realizada desde ${cbu} por $${total}`);
      break;
    case 3:
      console.log(` Pago en efectivo registrado. Debe abonar $${total} al recibir.`);
      break;
    default:
      console.log(" Opción inválida. Se cancela el pago.");
      return false;
  }
  return true;
}

function preguntarSeguirComprando() {
  let seguir = comprobarSN("¿Desea seguir comprando?:");
  if (seguir === "n") {
    finalizarCompra();
  }
}

function finalizarCompra() {
  if (carrito.length === 0) {
    console.log(" No hay productos en el carrito.");
    return;
  }

  console.log("\n Carrito de compras:");
  console.table(carrito.map(p => ({
    id: p.id,
    nombre: p.nombre,
    cantidad: p.cantidad,
    precioUnitario: p.precio,
    subtotal: p.precio * p.cantidad
  })));

  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  console.log(` Total a pagar: $${total}`);

  let confirmar = comprobarSN("¿Desea confirmar la compra?: ");
  if (confirmar === "s") {
    if (elegirFormaPago(total)) {
      carrito.forEach(item => {
        let producto = productosPlano.find(p => p.id === item.id && p.tipo === item.tipo);
        if (producto) {
          producto.stock -= item.cantidad;
        }
      });
      console.log("Gracias por su compra");
      carrito = []; 
      
    }
  } else {
    console.log(" Compra cancelada.");
  }
}

function comprobar(texto) {
  const pasaje = parseInt(prompt(`Ingresa un número: ${texto}`), 10);
  return pasaje;
}

function comprobarSN (texto) {
  const pasaje = prompt(`${texto} (s/n):`).toLowerCase().trim();
  return pasaje;
} 

let opcion;

// Menú principal
do {
  console.log("\nMenú principal:");
  console.log("1 - Mostrar todos los productos");
  console.log("2 - Comprar productos por categoría");
  console.log("3 - Finalizar");

  opcion = comprobar("Ingrese 1, 2 o 3:");

  switch (opcion) {
    case 1:
      mostrarTabla();
      queQuiereComprar(); 
      break;
    case 2:
      subMenuCompra();
      break;
    case 3:
      console.log("Gracias por visitarnos. ¡Hasta luego!");
      break;
    default:
      console.log("Opción inválida. Ingrese solo 1, 2 o 3.");
      break;
  }
} while (opcion !== 3);

function subMenuCompra() {
  let opcionCompra;
  do {
    console.log("\nMenú de compras:");
    console.log("1 - Mostrar Celulares");
    console.log("2 - Mostrar Vidrios");
    console.log("3 - Mostrar Fundas");
    console.log("4 - Volver al menú principal");

    opcionCompra = comprobar("Ingrese 1, 2, 3 o 4: ");

    switch (opcionCompra) {
      case 1:
        elegirProductoPorID("celulares");
        preguntarSeguirComprando();
        break;
      case 2:
        elegirProductoPorID("vidrios");
        preguntarSeguirComprando();
        break;
      case 3:
        elegirProductoPorID("fundas");
        preguntarSeguirComprando();
        break;
      case 4:
        console.log("Volviendo al menú principal...");
        break;
      default:
        console.log("Opción inválida. Ingrese solo 1, 2, 3 o 4.");
        break;
    }
  } while (opcionCompra !== 4);
}







