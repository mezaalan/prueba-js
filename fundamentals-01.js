const data = require("./proveedores.json"); 
const prompt = require("prompt-sync")();

const productosPlano = data.proveedores.flatMap(item =>
  Object.keys(item.productos).flatMap(tipo =>
    item.productos[tipo].map(producto => ({
      tipo,
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
    }))
  )
); 

console.table(productosPlano);
