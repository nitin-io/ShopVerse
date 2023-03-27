import { useEffect, useState } from "react";

function AddProduct() {
  const [inputValues, setInputValues] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setInputValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
    console.log(inputValues);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/product/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...inputValues,
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <main>
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="product-name">Name*</label>
          <input
            type="text"
            name="name"
            required
            id="product-name"
            onChange={handleChange}
            value={inputValues.name}
          />
          <label htmlFor="product-price">Price*</label>
          <input
            type="number"
            name="price"
            required
            id="product-price"
            onChange={handleChange}
            value={inputValues.price}
          />
          <label htmlFor="product-quantity">Quantity</label>
          <input
            type="number"
            name="quantity"
            required
            id="product-quantity"
            onChange={handleChange}
            value={inputValues.quantity}
          />
          <label htmlFor="product-discription">Discription</label>
          <textarea
            name="discription"
            id="product-discription"
            onChange={handleChange}
            value={inputValues.discription}
          ></textarea>
          <label htmlFor="product-category">Category*</label>
          <select
            required
            name="category"
            id="product-category"
            onChange={handleChange}
            value={inputValues.category}
          >
            <option>Select a Category</option>
            <option value="accessories">accessories</option>
            <option value="mobile">mobile</option>
            <option value="computer">computer</option>
            <option value="book">book</option>
            <option value="handmade">handmade</option>
          </select>
          {/* <label htmlFor="product-images">Upload image</label>
          <input
            type="file"
            name="image"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            disabled
            id="product-images"
          />
          <p style={{ color: "red" }}>working on images</p> */}
          <button type="submit">Add</button>r
        </form>
      </main>
    </>
  );
}

export default AddProduct;
