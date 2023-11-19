import React, { useEffect, useState } from "react"; // Import useEffect and useState
import { useDispatch, useSelector } from "react-redux";
import { CartIcon } from "../../../atoms/CartIcon/CartIcon";
import { uiActions } from "../../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const [updated, setUpdated] = useState(false);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  useEffect(() => {
    if (cartQuantity > 0) {
      setUpdated(true);
      setTimeout(() => setUpdated(false), 200);
    }
  }, [cartQuantity]);

  return (
    <button className="cart-nav-btn" onClick={toggleCartHandler}>
      <CartIcon className="cart-icon" />
      <span
        className={
          cartQuantity > 0 ? `total-items ${updated ? "changed" : ""}` : ""
        }
      >
        {cartQuantity > 0 && cartQuantity}
      </span>
    </button>
  );
};

export default CartButton;
