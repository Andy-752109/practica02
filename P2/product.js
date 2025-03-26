

class ProductException extends Error {
  constructor(message) {
    super(message);
    this.name = "ProductException";
  }
}

class Product {
  constructor(title, price, category, imageUrl, _id = null) {
    this.title = title;
    this.price = price;
    this.category = category;
    this.imageUrl = imageUrl;
    this._id = _id;
  }


  get title() {
    return this._title;
  }

  get price() {
    return this._price;
  }

  get category() {
    return this._category;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  get id() {
    return this._id;
  }


  set title(value) {
    if (!value || value.trim() === "") {
      throw new ProductException("El título es obligatorio.");
    }
    this._title = value;
  }

  set price(value) {
    if (value === undefined || value === null || isNaN(value) || value < 0) {
      throw new ProductException("El precio debe ser un número positivo.");
    }
    this._price = Number(value);
  }

  set category(value) {
    if (!value || value.trim() === "") {
      throw new ProductException("La categoría es obligatoria.");
    }
    this._category = value;
  }

  set imageUrl(value) {
    if (!value || value.trim() === "") {
      throw new ProductException("La URL de la imagen es obligatoria.");
    }
    this._imageUrl = value;
  }

  set id(value) {
    this._id = value;
  }

  static createFromJson(jsonValue) {
    const obj = JSON.parse(jsonValue);
    return Product.createFromObject(obj);
  }

  static createFromObject(obj) {
    return new Product(
      obj.title,
      obj.price,
      obj.category,
      obj.imageUrl,
      obj._id
    );
  }
}
