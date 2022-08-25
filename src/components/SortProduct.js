import React from "react";
import "./SortProduct.css";

function SortProduct(props) {
  function onSortValueChange(e) {
    props.onSortValueSelected(e.target.value);
  }

  return (
    <div className="filter-area">
      <label>Sort by --</label>
      <select name="isAvailable" onChange={onSortValueChange}>
        <option value="price-up">Price High</option>
        <option value="price-down">Price Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
}

export default SortProduct;
