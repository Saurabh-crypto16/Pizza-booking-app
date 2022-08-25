import React, { useState } from "react";
import { addToCart, removeFromCart } from "../features/cartSlice";
import "./PizzaWrapper.css";
import { useDispatch } from "react-redux";
import Select from "react-select";

function PizzaWrapper(props) {
  const size_options = [];
  const toppings_options = [];

  const [sizeSelected, setSizeSelected] = useState([]);
  const [toppingsSelected, setToppingsSelected] = useState([]);

  //craeting options of size for Select component
  const makeSizeOptions = () => {
    {
      props.size[0].items.map((obj) => {
        var object = {};
        object["label"] = obj.size;
        object["value"] = obj.size;
        size_options.push(object);
      });
    }
  };

  makeSizeOptions();

  //craeting options of toppings for Select component
  const makeToppingsOptions = () => {
    {
      props.toppings[0].items.map((obj) => {
        var object = {};
        object["label"] = obj.name;
        object["value"] = obj.name;
        toppings_options.push(object);
      });
    }
  };

  makeToppingsOptions();

  //select size option
  const selectSize = () => {
    if (props.size[0].isRadio === true) {
      return (
        <Select
          placeholder={props.size[0].title}
          options={size_options}
          onChange={(e) => setSizeSelected([...sizeSelected, e.value])}
        />
      );
    } else {
      return (
        <Select
          placeholder={props.size[0].title}
          options={size_options}
          isMulti
          onChange={(e) =>
            setSizeSelected([...sizeSelected, e[e.length - 1].value])
          }
        />
      );
    }
  };

  //select topping option
  const selectToppings = () => {
    if (props.toppings[0].isRadio === true) {
      return (
        <Select
          placeholder={props.toppings[0].title}
          options={toppings_options}
          onChange={(e) => setToppingsSelected([...toppingsSelected, e.value])}
        />
      );
    } else {
      return (
        <Select
          placeholder={props.toppings[0].title}
          options={toppings_options}
          onChange={(e) =>
            setToppingsSelected([...toppingsSelected, e[e.length - 1].value])
          }
          isMulti
        />
      );
    }
  };

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);

  //adding to cart store
  const handleAddToCart = (e) => {
    dispatch(addToCart(e));
    setQuantity(quantity + 1);
  };

  //removing from cart store
  const handleSubToCart = (e) => {
    dispatch(removeFromCart(e));
    setQuantity(quantity - 1);
  };

  return (
    <div className="pizzaWrapperBase">
      <div>
        <img className="image" src={props.img_url} alt="pizza image" />
      </div>
      <div>
        <h3 className="pizza-name">{props.name}</h3>
        <h6 className="pizza-description">{props.description}</h6>
        {props.isVeg === true ? <h5>VEG</h5> : <h5>NON VEG</h5>}
        <div className="body">
          <p>Price: Rs. {props.price}</p>
          <p>Rating: {props.rating} </p>
        </div>
      </div>
      <div className="size">{selectSize()}</div>
      <div className="toppings">{selectToppings()}</div>
      <div className="qty-btns">
        <button
          className="qty-btn"
          onClick={() =>
            handleAddToCart({
              ...props,
              size_selected: sizeSelected,
              toppings_selected: toppingsSelected,
            })
          }
        >
          +
        </button>
        <p className="qty">{quantity}</p>
        <button
          className="qty-btn"
          onClick={() =>
            handleSubToCart({
              ...props,
              size_selected: sizeSelected,
              toppings_selected: toppingsSelected,
            })
          }
        >
          -
        </button>
      </div>
    </div>
  );
}

export default PizzaWrapper;
