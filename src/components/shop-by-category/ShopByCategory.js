import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { useProductsByCategory } from "../../hooks/";
import "./ShopByCategory.css";
import { Link, useParams } from "react-router-dom";
import { CategoryItem } from "./CategoryItem";
import { useSelector } from "react-redux";

export const ShopByCategory = () => {
  const { input } = useParams();
  const { data } = useProductsByCategory({
    title: input,
  });
  const [products, setProducts] = useState([]);
  const currentCurrency = useSelector((state) => state.cart.currency.currency);

  useEffect(() => {
    if (data) {
      setProducts(data.category.products);
    }
  }, [data]);

  return (
    <div className="shop-by-category">
      <h1 className="category-title">
        {input[0].toUpperCase() + input.slice(1)}
      </h1>
      <div className="products-grid">
        {products.map((val) => {
          const price = val.prices.find(
            (c) => c.currency.symbol === currentCurrency
          ).amount;
          return (
            <div className="product" key={uuid()}>
              <Link
                id={val.id}
                to={`/details/${val.id}`}
                className={val.inStock ? "product-card" : "product-disabled"}
                key={uuid()}
              >
                <CategoryItem
                  id={val.id}
                  name={val.name}
                  brand={val.brand}
                  priceSymbol={currentCurrency}
                  price={price}
                  gallery={val.gallery}
                  attributes={val.attributes}
                  prices={val.prices}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
