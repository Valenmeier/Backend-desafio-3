const fs = require("fs");
class ProductMananger {
  constructor(products) {
    this.path = products;
  }
  addProduct = async (title, description, price, thumbnail, stock, code) => {
    if ((title, description, price, thumbnail, stock, code)) {
      if (fs.existsSync(this.path)) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(info);
        const codeCheck = result.find((el) => el.code == code);
        if (codeCheck) {
          console.log(
            `El código ya existe, porfavor agregue un producto valido.`
          );
        } else {
          if (result.length > 0) {
            let idParaProducto = result[result.length - 1].id + 1;
            let nuevoProducto = {
              id: idParaProducto,
              title,
              description,
              price,
              thumbnail,
              stock,
              code,
            };
            result.push(nuevoProducto);

            await fs.promises.writeFile(
              this.path,
              JSON.stringify(result, null, 2)
            );
          }
        }
      } else {
        let nuevoProducto = {
          id: 1,
          title,
          description,
          price,
          thumbnail,
          stock,
          code,
        };
        await fs.promises.writeFile(
          this.path,
          JSON.stringify([nuevoProducto], null, 2)
        );
      }
    } else {
      console.log(`Porfavor agrega todos los detalles del producto`);
    }
  };
  getProduct = async () => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      return result;
    } else {
      console.log(`No hay ningún producto en la empresa`);
    }
  };
  getProductById = async (id) => {
    if (fs.existsSync(this.path)) {
      let info = await fs.promises.readFile(this.path, "utf-8");
      let result = JSON.parse(info);
      let mostrarProducto = result.find((product) => product.id == id);
      if (mostrarProducto) {
        return mostrarProducto;
      } else {
        `Not Found, producto no encontrado`;
      }
    } else {
      return `No hay ningún producto en la empresa`;
    }
  };
  uptadeProduct = async (id, propiedadActualizadas) => {
    if ((id, propiedadActualizadas)) {
      if (fs.existsSync(this.path)) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(info);
        let encontrarProducto = result.find((product) => product.id == id);
        if (encontrarProducto) {
          const productUpdates = result.map((product) => {
            if (product.id == id) {
              return { ...product, ...propiedadActualizadas };
            }
            return product;
          });
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(productUpdates, null, 2)
          );
        } else {
          console.log(`El producto a actualizar no se ha encontrado`);
        }
      } else {
        console.log("No hay producto para agregar");
      }
    } else {
      console.log(`Completa todos los propiedades para actualizar el producto`);
    }
  };
  deleteProduct = async (id) => {
    if (fs.existsSync(this.path)) {
      if (id) {
        let info = await fs.promises.readFile(this.path, "utf-8");
        let result = JSON.parse(info);
        let eliminarProducto = result.filter((prod) => prod.id != id);
        result = eliminarProducto;
        await fs.promises.writeFile(this.path, JSON.stringify(result, null, 2));
      } else {
        console.log(`Porfavor coloca el id para eliminar el producto`);
      }
    } else {
      console.log(
        `No se pueden eliminar productos de la base de datos debido a que se encuentra vacia`
      );
    }
  };
}

const productosEnEmpresa = new ProductMananger("listaDeProductos.json");

module.exports.products = productosEnEmpresa;
