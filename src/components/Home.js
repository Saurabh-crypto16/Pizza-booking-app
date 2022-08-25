import React, { useEffect, useState } from "react";
import axios from "axios";
import PizzaWrapper from "./PizzaWrapper";
import "./Home.css";
import FilterProduct from "./FilterProduct";
import SortProduct from "./SortProduct";

function Home() {
  const [pizzaList, setPizzaList] = useState([]);
  const [filterTextValue, filterTextValueUpdate] = useState("all");
  const [sortTextValue, sortTextValueUpdate] = useState("no-sort");

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68")
      .then((res) => {
        //console.log(res.data);
        res.data.map((item) => (item.quantity = 1));
        setPizzaList(res.data);
      });
  }, [pizzaList]);

  //console.log(pizzaList);

  function onFilterValueSelected(filterValue) {
    filterTextValueUpdate(filterValue);
  }

  function onSortValueSelected(sortValue) {
    sortTextValueUpdate(sortValue);
    //console.log(sortValue);
  }

  let filteredProductList = pizzaList.filter((product) => {
    if (filterTextValue == "veg") {
      return product.isVeg === true;
    } else if (filterTextValue == "nonveg") {
      return product.isVeg === false;
    } else {
      return product;
    }
  });

  if (sortTextValue == "price-up") {
    filteredProductList.sort((a, b) => b.price - a.price);
  } else if (sortTextValue == "price-down") {
    filteredProductList.sort((a, b) => a.price - b.price);
  } else {
    filteredProductList.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div>
      <div className="filter_menu">
        <FilterProduct onFilterValueSelected={onFilterValueSelected} />
        <SortProduct onSortValueSelected={onSortValueSelected} />
      </div>
      <div className="home">
        {filteredProductList.map((item) => (
          <PizzaWrapper {...item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
