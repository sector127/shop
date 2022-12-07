import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { useParams } from "react-router";
import { useIncart } from "../../providers/CartProvider";
import "./Product.css";

import { useProduct } from "../../hooks";

export const Product = () => {
  const { id } = useParams();
  const { error, loading, data } = useProduct(id);
  const { addToCart, toCart, offCart, currentCurrency, cartAttr } = useIncart();
  const [product, setProduct] = useState();
  const [image, setImage] = useState();
  useEffect(() => {
    if (data) setProduct(data.product);
  }, [data]);

  const handleClick = (e) => {
    setImage(e.currentTarget.src);
  };

  if (product)
    return (
      <div className="product-container">
        <div className="product-img-items" key={uuid()}>
          {product.gallery.map((val) => {
            return <img src={val} key={uuid()} onClick={handleClick} />;
          })}
        </div>
        <div className="product-details-img">
          {<img src={image ? image : product.gallery[0]} />}
        </div>
        <div className="product-about">
          <div className="product-about-title">{product.name}</div>
          <div className="product-brand">{product.brand}</div>
          <div className="product-attr">
            {product.attributes.map((attr) => {
              return (
                <div key={uuid()}>
                  <div
                    className="product-attr-title"
                    key={uuid()}
                  >{`${attr.id}:`}</div>
                  <div key={uuid()}>
                    {attr.items.map((item) => {
                      const attrId = attr.id;
                      const attrValue = item.value;
                      if (item.value.includes("#"))
                        return (
                          <button
                            key={uuid()}
                            className="color-btn details"
                            style={{
                              backgroundColor: item.value,
                            }}
                          ></button>
                        );
                      else {
                        return (
                          <button key={uuid()} className={`btn-attr details`}>
                            {item.value}
                          </button>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div className="product-attr-title">Price:</div>
            <div className="product-about-price">
              {currentCurrency}
              {
                product.prices.find(
                  (c) => c.currency.symbol === currentCurrency
                ).amount
              }
            </div>
          </div>
          <button
            className="product-to-cart"
            onClick={() => {
              toCart(product);
            }}
          >
            ADD TO CART
          </button>
          <div className="product-description">
            {product.description.replace(/<\/?[^>]+(>|$)/g, "")}
          </div>
        </div>
      </div>
    );
};
