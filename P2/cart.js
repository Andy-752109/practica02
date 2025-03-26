

const carrito_handler = {
    carrito: [],
  
    addItem(productId, amount = 1) {
      if (!productId || amount <= 0) {
        throw new Error("Datos inválidos para agregar al carrito");
      }
  
     
      const existente = this.carrito.find(item => item.productId === productId);
  
      if (existente) {
        existente.amount += amount;
      } else {
        this.carrito.push({
          uuid: crypto.randomUUID(), 
          productId,
          amount
        });
      }
    },
  
    updateItem(uuid, newAmount) {
      const item = this.carrito.find(item => item.uuid === uuid);
  
      if (!item) return;
  
      if (newAmount < 0) throw new Error("La cantidad no puede ser negativa");
      if (newAmount === 0) {
        this.removeItem(uuid);
      } else {
        item.amount = newAmount;
      }
    },
  
    removeItem(uuid) {
      this.carrito = this.carrito.filter(item => item.uuid !== uuid);
    },
  
    calculateTotal(products) {
      return this.carrito.reduce((total, item) => {
        const producto = products.find(p => p._id === item.productId);
        return producto ? total + producto.price * item.amount : total;
      }, 0);
    }
  };
  