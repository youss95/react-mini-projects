import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import "./Cart.css";
import CartItem from "./CartItem";
const Cart = ({ showCartHandler }) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount}`;
  const hasItems = cartCtx.items.length > 0;
  const removeHandler = (id) => {
    console.log("removeid", id);
    cartCtx.removeItem(id);
  };
  const addHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className="cart-items">
      {cartCtx.items.map((item) => (
        <CartItem
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeHandler}
          onAdd={addHandler}
        />
      ))}
    </ul>
  );

  return (
    <Modal showCartHandler={showCartHandler}>
      {hasItems ? cartItems : <div>장바구니 비었음...</div>}
      <div className="total">
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      <div className="actions">
        <button className="button--alt" onClick={showCartHandler}>
          Close
        </button>
        {hasItems && <button className="button">Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
