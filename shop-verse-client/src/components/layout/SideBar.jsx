import React from "react";

const flexStyle = {
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
};

function SideBar() {
  return (
    <>
      <section className="sidebar">
        <div>
          <label for="product-categories">Category</label>
          <select id="product-categories">
            <option value="all">All</option>
            <option value="accesserios">Accessories</option>
            <option value="mobile">Mobiles</option>
            <option value="computer">Computers</option>
            <option value="book">Books</option>
            <option value="handmade">Handmades</option>
          </select>
        </div>
        <div>
          <h3>Filters</h3>
        </div>
        <div style={flexStyle}>
          <h3>Price</h3>
          <div>
            <label htmlFor="low-to-high-price">Low to high</label>
            <input
              id="low-to-high-price"
              type="radio"
              name="price-filter"
              value="low-to-high"
            />
          </div>

          <div>
            <label htmlFor="high-to-low-price">High to low</label>
            <input
              id="high-to-low-price"
              type="radio"
              name="price-filter"
              value="high-to-low"
            />
          </div>
        </div>

        <div style={flexStyle}>
          <h3>Brand</h3>

          <div>
            <label htmlFor="brand-samsung">Samsung</label>
            <input
              id="brand-samsung"
              type="checkbox"
              name="brand-filter"
              value="samsung"
            />
          </div>

          <div>
            <label htmlFor="brand-apple">Apple</label>
            <input
              id="brand-apple"
              type="checkbox"
              name="brand-filter"
              value="apple"
            />
          </div>

          <div>
            <label htmlFor="brand-xiomi">Xiomi</label>
            <input
              id="brand-xiomi"
              type="checkbox"
              name="brand-filter"
              value="xiomi"
            />
          </div>
          <div>
            <label htmlFor="brand-hp">hp</label>
            <input
              id="brand-hp"
              type="checkbox"
              name="brand-filter"
              value="hp"
            />
          </div>
          <div>
            <label htmlFor="brand-boat">Boat</label>
            <input
              id="brand-boat"
              type="checkbox"
              name="brand-filter"
              value="boat"
            />
          </div>
          <div>
            <label htmlFor="brand-nothing">Nothing</label>
            <input
              id="brand-nothing"
              type="checkbox"
              name="brand-filter"
              value="nothing"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default SideBar;
