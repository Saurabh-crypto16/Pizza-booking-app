import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart, clearCart, removeFromCart } from "../features/cartSlice";
import "./Cart.css";

function Cart() {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    dispatch(addToCart(e));
  };

  const handleSubToCart = (e) => {
    dispatch(removeFromCart(e));
  };

  const handleClickToClearCart = () => {
    dispatch(clearCart());
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="cart-container">
      <h2>Cart Contents</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty" onClick={handleClick}>
          <p>Your cart is empty...Go back</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </div>
      ) : (
        <div className="cart-not-empty">
          <div className="titles">
            <h3 className="product-title">Products</h3>
            <h3 className="price">Price</h3>
            <h3 className="Quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>

          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img
                      className="cart-image"
                      src={cartItem.img_url}
                      alt={cartItem.name}
                    />
                    <div className="product_desc">
                      <div className="product_name">
                        <h3>{cartItem.name}</h3>
                      </div>
                      <div>
                        {cartItem.size_selected.map((size_value) => (
                          <p>{size_value}</p>
                        ))}
                      </div>
                      <div>
                        {cartItem.toppings_selected.map((toppings_value) => (
                          <p>{toppings_value}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="cart-product-price">Rs.{cartItem.price}</div>

                  <div className="cart-product-quantity">
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                    {cartItem.quantity}
                    <button onClick={() => handleSubToCart(cartItem)}>-</button>
                  </div>

                  <div className="cart-product-total-price">
                    Rs.{cartItem.price * cartItem.quantity}
                  </div>
                </div>
              ))}
          </div>

          <div className="cart-items-summary">
            <button onClick={handleClickToClearCart} className="clear-btn">
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal </span>
                <span className="amount">Rs.{cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button>Check out</button>
              <div className="continue-shopping" onClick={handleClick}>
                <p>Order more</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="currentColor"
                  class="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bottom"></div>
    </div>
  );
}

export default Cart;
