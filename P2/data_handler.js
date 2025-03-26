

const API_URL = "https://crudcrud.com/api/6e191c13b0a7485da08f7d41da433243/products";

const data_handler = {
  async getProducts() {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data.map(obj => Product.createFromObject(obj));
  },

  async getProductById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    return Product.createFromObject(data);
  },

  async createProduct(product) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!res.ok) throw new Error("No se pudo crear el producto");
    return await res.json();
  },

  async updateProduct(id, updatedProduct) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    if (!res.ok) throw new Error("No se pudo actualizar el producto");
  },

  async deleteProduct(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("No se pudo eliminar el producto");
  }
};
