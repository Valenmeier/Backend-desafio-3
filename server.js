const use = require("./logica.js");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  const productos = await use.products.getProduct();
  if (req.query.limit <= productos.length && req.query.limit > 0) {
    res.send(productos.slice(0, req.query.limit));
  } else if (req.query.limit) {
    res.send(
      `<h1>El limite de productos no puede ser nulo ni mayor a los productos dados, productos actuales:</h1> <br> ${productos.map(
        (p) => `<h2>${p.title}</h2>`
      )}`
    );
  } else {
    res.send(productos);
  }
});

app.get("/products/:pid", async (req, res) => {
  let producto = await use.products.getProductById(req.params.pid);
  producto
    ? res.send(producto)
    : res.send(`<h1>El id del producto buscado no existe</h1>`);
});

app.listen(8080, () => {
  console.log(`Servidor escuchando`);
});

// //TODO --> await use.products PARA PODER ACCEDER AL MODULO DE LOGICA Y ASÍ PODER ACCEDER A SUS MÉTODOS

// //! Importante escribir dentro de la función llamar métodos

// let llamarMetodos = async () => {
//   //* Agregar productos --> use.products.addProduct(titulo,descripción,precio,imagen,stock)

//   // await use.products.addProduct(
//   //   "Mochila roja",
//   //   `Para llevar todo lo que quieras,pero con una mochila roja`,
//   //   500,
//   //   "https://static.dafiti.com.ar/p/jansport-9733-76539-1-product.jpg",
//   //   50,
//   //   1548
//   // );
//   // await use.products.addProduct(
//   //   "Mochila azul",
//   //   `Para llevar todo lo que quieras,pero con una mochila azul`,
//   //   700,
//   //   "https://www.tematika.com/media/catalog/Ilhsa/Imagenes/671976.jpg",
//   //   20,
//   //   1546
//   // );
//   // //* Ver todos los productos -->  use.products.getProduct()
//   // await use.products.getProduct();
//   // //* Buscar producto por id --> use.products.getProductById(id)
//   // await use.products.getProductById(2);

//   //* Actualizar producto --> use.products.updateProduct(id del producto,{propiedades a cambiar: "nuevo valor de la propiedad"}), En caso de agregar más de una utilizar coma y dentro del mismo corchete
//   // await use.products.uptadeProduct(2, {
//   //   title: "Mochila marrón",
//   //   description: "Para llevar todo lo que quieras,pero con una mochila marrón",
//   // });

//   //* Eliminar un producto --> use.products.deleteProduct(id del producto)
//   // await use.products.deleteProduct(2)
// };

// llamarMetodos();
