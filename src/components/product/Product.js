import React, { useState } from "react";
import uuid from "react-uuid";
import { useParams } from "react-router";
import "./Product.css";
import { useDispatch } from "react-redux";
import { useProduct } from "../../hooks";
import { useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

export const Product = () => {
  const { id } = useParams();
  const { data } = useProduct(id);
  const currentCurrency = useSelector((state) => state.cart.currency.currency);
  const [image, setImage] = useState();
  const [showMore, setShowMore] = useState(false);

  let product = {};

  if (data) {
    let defaultSelected = [];
    data.product.attributes.forEach((attr) => {
      let allAttr = {};
      allAttr.name = attr.name;
      allAttr.value = attr.items[0].value;
      defaultSelected.push(allAttr);
    });
    product = {
      attributes: data.product.attributes,
      gallery: data.product.gallery,
      name: data.product.name,
      brand: data.product.brand,
      prices: data.product.prices,
      description: data.product.description,
      selectedAttributes: defaultSelected,
      id: data.product.id,
    };
  }

  console.log(product.selectedAttributes);

  const handleClick = (e) => {
    setImage(e.currentTarget.src);
  };

  console.log(product);
  const handleAttrSelect = (attrName, itemValue) => {
    const id = data.product.id;
    dispatch(cartActions.selectAttribute({ id, attrName, itemValue }));
    console.log(attrName);
  };

  const dispatch = useDispatch();
  const addToCartHandler = (e) => {
    e.preventDefault();
    let defaultSelected = [];
    data.product.attributes.forEach((attr) => {
      let allAttr = {};
      allAttr.name = attr.name;
      allAttr.value = attr.items[0].value;
      defaultSelected.push(allAttr);
    });
    dispatch(
      cartActions.addItemToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.prices.find((c) => c.currency.symbol === currentCurrency)
          .amount,
        gallery: product.gallery,
        attributes: product.attributes,
        prices: product.prices,
        selectedAttributes:
          product.selectedAttributes?.length > 0
            ? product.selectedAttributes
            : defaultSelected,
      })
    );
    console.log(product);
  };

  const handleSelect = (attr, value) => {
    let selected = {
      name: attr,
      value: value,
    };
    // console.log(item.selectedAttributes);
    // const arr = [...item.selectedAttributes];
    const indexOfObject = product.selectedAttributes.findIndex(
      (object) => object.name === selected.name
    );
    if (
      product.selectedAttributes.some(
        (s) => s.name === attr && s.value === value
      )
    ) {
      console.log(product.selectedAttributes);
      product.selectedAttributes.splice(indexOfObject, 1);
    } else if (product.selectedAttributes.some((s) => s.name === attr)) {
      console.log(product.selectedAttributes);
      product.selectedAttributes.splice(indexOfObject, 1);
      product.selectedAttributes.push(selected);
    } else {
      console.log(product.selectedAttributes);
      product.selectedAttributes.push(selected);
    }
  };

  if (data)
    return (
      <div className="product-container">
        <div className="product-img-items" key={uuid()}>
          {product.gallery.map((val) => {
            return (
              <img
                src={val}
                key={uuid()}
                onClick={handleClick}
                alt={product.name}
              />
            );
          })}
        </div>
        <div className="product-details-img">
          {<img src={image ? image : product.gallery[0]} alt={product.name} />}
        </div>
        <div className="product-about">
          <div className="product-brand">{product.brand}</div>
          <div className="product-about-title">{product.name}</div>
          <div className="product-attr">
            {product.attributes.map((attr) => {
              return (
                <div key={uuid()}>
                  <div
                    className="product-attr-title"
                    key={uuid()}
                  >{`${attr.id}:`}</div>
                  <div key={uuid()}>
                    {attr.items.map((i) => {
                      const attrId = attr.id;
                      const attrValue = product.value;
                      let attrInCart = product.selectedAttributes?.map(
                        (s) => s
                      );
                      console.log(attrInCart);
                      for (const a of attrInCart)
                        if (i?.value === a?.value && attr?.name === a?.name) {
                          return (
                            <button
                              key={uuid()}
                              onClick={() => {
                                handleSelect(attr.name, i.value);
                              }}
                              className={`${
                                i.value.includes("#")
                                  ? "color-btn details selected"
                                  : "btn-attr details selected-string"
                              }`}
                              style={{
                                backgroundColor: i.value,
                              }}
                            >
                              {!i.value.includes("#") ? i.value : null}
                            </button>
                          );
                        }
                      if (i.value.includes("#"))
                        return (
                          <button
                            key={uuid()}
                            className="color-btn details"
                            style={{
                              backgroundColor: i.value,
                            }}
                            onClick={() => {
                              handleSelect(attr.name, i.value);
                            }}
                          ></button>
                        );
                      else {
                        return (
                          <button
                            key={uuid()}
                            className={`btn-attr details`}
                            onClick={() => {
                              handleSelect(attr.name, i.value);
                              // forceUpdate();
                            }}
                          >
                            {i.value}
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
            disabled={!data.product.inStock}
            className="product-to-cart"
            onClick={(e) => {
              addToCartHandler(e);
            }}
          >
            {data.product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
          </button>
          <div className="product-description">
            {showMore
              ? product.description.replace(/<\/?[^>]+(>|$)/g, "")
              : product.description
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
