import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { useParams } from "react-router";
import "./Product.css";
import { useDispatch } from "react-redux";
import { useProduct } from "../../hooks";
import { useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

export const Product = () => {
  const { id } = useParams();
  const { error, loading, data } = useProduct(id);
  const currentCurrency = useSelector((state) => state.cart.currency.currency);
  const [image, setImage] = useState();
  const [showMore, setShowMore] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (data) {
      const defaultSelectedAtt = data.product.attributes.map((attr) => ({
        name: attr.name,
        value: attr.items[0].value,
      }));
      setProduct({
        attributes: data.product.attributes,
        gallery: data.product.gallery,
        name: data.product.name,
        brand: data.product.brand,
        prices: data.product.prices,
        description: data.product.description,
        selectedAttributes: defaultSelectedAtt,
        id: data.product.id,
      });
    }
  }, [data]);

  const handleClick = (e) => {
    setImage(e.currentTarget.src);
  };

  const dispatch = useDispatch();
  const addToCartHandler = (e) => {
    e.preventDefault();
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
        selectedAttributes: product.selectedAttributes,
      })
    );
  };

  const handleSelect = (attr, value) => {
    const updatedSelectedAttributes = [...product.selectedAttributes];
    const selected = {
      name: attr,
      value: value,
    };
    const indexOfObject = updatedSelectedAttributes.findIndex(
      (object) => object.name === selected.name
    );

    if (
      updatedSelectedAttributes.some(
        (s) => s.name === attr && s.value === value
      )
    ) {
      updatedSelectedAttributes.splice(indexOfObject, 1);
    } else if (updatedSelectedAttributes.some((s) => s.name === attr)) {
      updatedSelectedAttributes.splice(indexOfObject, 1);
      updatedSelectedAttributes.push(selected);
    } else {
      updatedSelectedAttributes.push(selected);
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      selectedAttributes: updatedSelectedAttributes,
    }));
  };

  if (loading) return "Loading...";
  if (error) return "Error: " + error.message;

  if (!product.name) return "Loading...";

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
          {product.attributes?.map((attr) => (
            <div key={uuid()}>
              <div
                className="product-attr-title"
                key={uuid()}
              >{`${attr.id}:`}</div>
              <div key={uuid()}>
                {attr.items.map((item) => {
                  const isSelected = product.selectedAttributes.some(
                    (selectedItem) =>
                      selectedItem.value === item.value &&
                      selectedItem.name === attr.name
                  );

                  let buttonClasses = item.value.includes("#")
                    ? "color-btn details"
                    : "btn-attr details";

                  if (isSelected) {
                    buttonClasses += item.value.includes("#")
                      ? " selected"
                      : " selected-string";
                  }

                  return (
                    <button
                      key={uuid()}
                      onClick={() => handleSelect(attr.name, item.value)}
                      className={buttonClasses}
                      style={{
                        backgroundColor: item.value,
                      }}
                    >
                      {!item.value.includes("#") ? item.value : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="product-attr-title">Price:</div>
          <div className="product-about-price">
            {currentCurrency}
            {
              product.prices.find((c) => c.currency.symbol === currentCurrency)
                .amount
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
        <div
          className={`product-description ${
            showMore
              ? "show-more-description-expanded"
              : "show-more-description-collapsed"
          }`}
        >
          {product.description.replace(/<\/?[^>]+(>|$)/g, "").length > 200
            ? showMore
              ? product.description.replace(/<\/?[^>]+(>|$)/g, "")
              : product.description
                  .replace(/<\/?[^>]+(>|$)/g, "")
                  .substring(0, 200)
            : product.description.replace(/<\/?[^>]+(>|$)/g, "")}
          {product.description.replace(/<\/?[^>]+(>|$)/g, "").length > 200 && (
            <button
              className="show-more-button"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
