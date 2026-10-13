import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Cost of one line (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Grand total of every plant in the cart
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Going below 1 removes the item from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => dispatch(removeItem(item.name));

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-total">Total Cart Amount: ${calculateTotalAmount()}</h2>

      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty. Add a few plants to get started.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">Unit price: ${item.cost}</div>
                <div className="cart-item-quantity">
                  <button className="cart-item-button" aria-label={`Decrease ${item.name} quantity`} onClick={() => handleDecrement(item)}>−</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button" aria-label={`Increase ${item.name} quantity`} onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div>
              </div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          ))}
        </div>
      )}

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <button className="get-started-button checkout" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
