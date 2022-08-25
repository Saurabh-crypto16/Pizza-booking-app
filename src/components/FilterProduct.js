import React from "react";
import "./FilterProduct.css";

function FilterProduct(props) {
  function onFilterValueChange(e) {
    props.onFilterValueSelected(e.target.value);
  }
  return (
    <div className="filter-area">
      <label>Apply Filter -- </label>
      <select name="isAvailable" onChange={onFilterValueChange}>
        <option value="all">All</option>
        <option value="veg">Veg</option>
        <option value="nonveg">Non Veg</option>
      </select>
    </div>
  );
}

export default FilterProduct;
