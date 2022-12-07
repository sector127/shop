import React from "react";
import uuid from "react-uuid";
import { useIncart } from "../../providers/CartProvider";
import { Slider } from "../../components/Slider/Slider";

export const Bag = () => {
  const { addToCart, toCart, offCart, currentCurrency, cartAttr } = useIncart();

  return (
    <>
      <h1 className="cart-category-title">Cart</h1>
      <div className="cart-container">
        {Object.entries(addToCart.products).map(([products, desc]) => {
          const currentItem = {
            ...desc,
            id: products,
          };
          return (
            <div className="cart-products" key={uuid()}>
              <div className="mini-cart-product-desc" key={uuid()}>
                <div className="cart-product-desc-name" key={uuid()}>
                  {desc.name}
                </div>
                <div className="cart-product-desc-brand" key={uuid()}>
                  {desc.brand}
                </div>
                <div className="cart-product-price" key={uuid()}>
                  {currentCurrency}
                  {
                    desc.prices.find(
                      (c) => c.currency.symbol === currentCurrency
                    ).amount
                  }
                </div>
                <div className="mini-cart-product-attr">
                  {desc.attr.map((attr) => {
                    return (
                      <div key={uuid()}>
                        <div
                          className="cart-product-attr-title"
                          key={uuid()}
                        >{`${attr.name}:`}</div>
                        <div key={uuid()}>
                          {attr.items?.map((item) => {
                            const currentAttr = {
                              ...desc,
                              id: products,
                            };
                            const attrId = attr.name;
                            const attrValue = item.value;
                            let attrInCart = desc.selectedAttr.map((s) => s);
                            for (const a of attrInCart)
                              if (
                                item.value === a.value &&
                                attr.name === a.name
                              ) {
                                return (
                                  <button
                                    key={uuid()}
                                    onClick={() => {
                                      cartAttr(currentAttr, attrId, attrValue);
                                    }}
                                    className={`${
                                      item.value.includes("#")
                                        ? "cart-color-btn color-btn selected"
                                        : "cart-btn selected-string"
                                    }`}
                                    style={{
                                      backgroundColor: item.value,
                                    }}
                                  >
                                    {!item.value.includes("#")
                                      ? item.value
                                      : null}
                                  </button>
                                );
                              }
                            if (item.value.includes("#")) {
                              return (
                                <button
                                  key={uuid()}
                                  onClick={() => {
                                    cartAttr(currentAttr, attrId, attrValue);
                                  }}
                                  className={`cart-color-btn color-btn`}
                                  style={{
                                    backgroundColor: item.value,
                                  }}
                                ></button>
                              );
                            } else {
                              return (
                                <button
                                  key={uuid()}
                                  className={`cart-btn`}
                                  onClick={(e) => {
                                    cartAttr(currentAttr, attrId, attrValue);
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
              </div>
              <div className="qty-slider">
                <div className="mini-cart-qty">
                  <div className="mini-cart-qty-increment">
                    <button
                      className="mini-cart-btn btn-attr"
                      onClick={() => {
                        toCart(currentItem);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <div className="mini-cart-qty-display">{desc.qty}</div>
                  <div className="mini-cart-qty-decrement">
                    <button
                      className="mini-cart-btn btn-attr"
                      onClick={() => {
                        offCart(currentItem);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="cart-product-slider" key={uuid()}>
                  <Slider slides={desc.image} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="tax-total">
        <div className="cart-total-qty-title">
          Tax 21%:{" "}
          <span className="tax">
            {currentCurrency}
            {Math.round(addToCart.total * 0.21)}
          </span>
        </div>
        <div className="cart-total-qty">
          <div className="cart-total-qty-title">
            Quantiy: <span className="tax">{addToCart.cartTotal}</span>
          </div>
        </div>
        <div className="total-after-tax">
          Total:{" "}
          <span className="tax">
            {currentCurrency}
            {Math.round(addToCart.total * 1.21)}
          </span>
        </div>
        <button className="order">ORDER</button>
      </div>
    </>
  );
};
