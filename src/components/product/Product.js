import React, { useState, useEffect, useCallback } from "react";
import uuid from "react-uuid";
import { useParams } from "react-router";
import { useIncart } from "../../providers/CartProvider";
import "./Product.css";

import { useProduct } from "../../hooks";

export const Product = () => {
  const { id } = useParams();
  const { data } = useProduct(id);
  const { toCart, currentCurrency } = useIncart();
  const [product, setProduct] = useState();
  const [, updateState] = useState();
  const [image, setImage] = useState();
  const [showMore, setShowMore] = useState(false);

  const forceUpdate = useCallback(() => updateState({}), []);

  let item;
  useEffect(() => {
    if (data) {
      setProduct(item);
    }
  }, [data, item]);

  if (data) {
    item = {
      [data.product.id]: {
        wish: true,
        qty: 1,
        attributes: data.product.attributes,
        gallery: data.product.gallery,
        name: data.product.name,
        brand: data.product.brand,
        prices: data.product.prices,
        description: data.product.description,
        selectedAttr: [],
        id: data.product.id,
      },
    };
  }

  const handleClick = (e) => {
    setImage(e.currentTarget.src);
  };

  const handleSelect = (attr, value) => {
    let selected = {
      name: attr,
      value: value,
    };
    const arr = product[data.product.id].selectedAttr;
    const indexOfObject = arr.findIndex(
      (object) => object.name === selected.name
    );
    if (arr.some((s) => s.name === attr && s.value === value)) {
      arr.splice(indexOfObject, 1);
    } else if (arr.some((s) => s.name === attr)) {
      arr.splice(indexOfObject, 1);
      arr.push(selected);
    } else {
      arr.push(selected);
    }
  };

  if (product)
    return (
      <div className="product-container">
        <div className="product-img-items" key={uuid()}>
          {product[data.product.id].gallery.map((val) => {
            return (
              <img
                src={val}
                key={uuid()}
                onClick={handleClick}
                alt={product[data.product.id].name}
              />
            );
          })}
        </div>
        <div className="product-details-img">
          {
            <img
              src={image ? image : product[data.product.id].gallery[0]}
              alt={product[data.product.id].name}
            />
          }
        </div>
        <div className="product-about">
          <div className="product-brand">{product[data.product.id].brand}</div>
          <div className="product-about-title">
            {product[data.product.id].name}
          </div>
          <div className="product-attr">
            {product[data.product.id].attributes.map((attr) => {
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
                      let attrInCart = product[
                        data.product.id
                      ].selectedAttr.map((s) => s);
                      for (const a of attrInCart)
                        if (
                          item?.value === a?.value &&
                          attr?.name === a?.name
                        ) {
                          return (
                            <button
                              key={uuid()}
                              onClick={() => {
                                handleSelect(attrId, attrValue);
                                forceUpdate();
                              }}
                              className={`${
                                item.value.includes("#")
                                  ? "color-btn details selected"
                                  : "btn-attr details selected-string"
                              }`}
                              style={{
                                backgroundColor: item.value,
                              }}
                            >
                              {!item.value.includes("#") ? item.value : null}
                            </button>
                          );
                        }
                      if (item.value.includes("#"))
                        return (
                          <button
                            key={uuid()}
                            className="color-btn details"
                            style={{
                              backgroundColor: item.value,
                            }}
                            onClick={() => {
                              handleSelect(attrId, attrValue);
                              forceUpdate();
                            }}
                          ></button>
                        );
                      else {
                        return (
                          <button
                            key={uuid()}
                            className={`btn-attr details`}
                            onClick={() => {
                              handleSelect(attrId, attrValue);
                              forceUpdate();
                            }}
                          >
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
                product[data.product.id].prices.find(
                  (c) => c.currency.symbol === currentCurrency
                ).amount
              }
            </div>
          </div>
          <button
            disabled={!data.product.inStock}
            className="product-to-cart"
            onClick={() => {
              toCart(product[data.product.id]);
            }}
          >
            {data.product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
          </button>
          <div className="product-description">
            {showMore
              ? product[data.product.id].description.replace(
                  /<\/?[^>]+(>|$)/g,
                  ""
                )
              : product[data.product.id].description
                  .replace(/<\/?[^>]+(>|$)/g, "")
                  .substring(0, 250)}
            <button onClick={() => setShowMore(!showMore)}>
              {showMore ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>
    );
};
