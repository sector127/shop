import { useDispatch, useSelector } from "react-redux";
import { CartIcon } from "../../../atoms/CartIcon/CartIcon";
import { uiActions } from "../../../store/ui-slice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button className="cart-nav-btn" onClick={toggleCartHandler}>
      <CartIcon className="cart-icon" />
      <span className={`${cartQuantity ? "total-items" : undefined}`}>
        {cartQuantity > 0 && cartQuantity}
      </span>
    </button>
  );
};

export default CartButton;
