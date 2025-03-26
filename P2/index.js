

document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.querySelector("main section.row");
  
    
    try {
      const productos = await data_handler.getProducts();
  
      contenedor.innerHTML = productos.map(product => crearTarjeta(product)).join("");
  
    } catch (error) {
      console.error("Error al cargar productos:", error);
      contenedor.innerHTML = `<p class="text-danger">No se pudieron cargar los productos.</p>`;
    }
  });
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("agregar-carrito")) {
      e.preventDefault();
      const productId = e.target.getAttribute("data-id");
  
      try {
        carrito_handler.addItem(productId, 1);
        console.log("Producto agregado al carrito:", carrito_handler.carrito);
      } catch (error) {
        console.error("Error al agregar al carrito:", error);
      }
    }
  });
  

  function crearTarjeta(product) {
    return `
      <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
        <div class="card h-100">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.title}" />
          <div class="card-body d-flex flex-column">
            <h4 class="card-title">${product.title}</h4>
            <p class="card-text">$ ${product.price}</p>
            <a href="#" class="btn btn-delifesti mt-auto agregar-carrito" data-id="${product._id}">Agregar al carrito</a>
          </div>
        </div>
      </div>
    `;
  }
  
