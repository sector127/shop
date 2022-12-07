import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../providers/CartProvider";
import uuid from "react-uuid";
import { useProductsByCategory } from "../../hooks/";
import "./ShopByCategory.css";
import { Link, useParams } from "react-router-dom";

export const ShopByCategory = () => {
  const { input } = useParams();
  const { error, loading, data } = useProductsByCategory({
    title: input,
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data.category.products);
    }
  }, [data]);

  const { addToCart, toCart, currentCurrency } = useContext(CartContext);

  return (
    <div>
      <h1 className="category-title">
        {input[0].toUpperCase() + input.slice(1)}
      </h1>
      <div className="products-container">
        {products.map((val) => {
          return (
            <div className="product" key={uuid()}>
              <Link
                id={val.id}
                to={val.inStock ? `/details/${val.id}` : "#"}
                className={val.inStock ? "product-card" : "product-disabled"}
                key={uuid()}
              >
                <div className="product-img">
                  <img src={val.gallery[0]} />
                </div>
                <div className="product-title">{val.name}</div>
                <div className="product-price">
                  <span>{currentCurrency}</span>
                  {
                    val.prices.find(
                      (c) => c.currency.symbol === currentCurrency
                    ).amount
                  }
                </div>
                <button
                  kay={uuid()}
                  className={"to-cart-btn"}
                  onClick={(e) => {
                    e.preventDefault();
                    toCart(val);
                  }}
                ></button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
