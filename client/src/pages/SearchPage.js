import React, { useState } from "react";
import Card from "../components/cards/cards";
import Axios from "axios";

export default function SearchPage() {
  const [SearchedValues, setSearchedValues] = useState(false);
  const [listProducts, SetListProducts] = useState([]);
  let [SearchTitle, setSearchTitle] = useState("");

  const onChangeSearchTitle = (e) => {
    const SearchTitle = e.target.value;
    setSearchTitle(SearchTitle);
  };

  const findByTitle = (e) => {
    e.preventDefault();

    if (!SearchTitle) {
      SearchTitle = null;
    }

    Axios.get("http://localhost:3001/search/" + SearchTitle)
      .then((response) => {
        if (!response.data.length) {
          console.log("nenhum produto foi encontrado");
          setSearchedValues(true);
        } else {
          setSearchedValues(false);
        }

        SetListProducts(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div id="cover">
        <form className="form-search">
          <div className="tb-search">
            <div className="td-search">
              <input
                className="input-search"
                type="text"
                placeholder="Search a product"
                value={SearchTitle}
                onChange={onChangeSearchTitle}
              />
            </div>
            <div className="td-search" id="s-cover">
              <button
                className="btn-search"
                type="submit"
                onClick={findByTitle}
              >
                <div id="s-circle"></div>
                <span></span>
              </button>
            </div>
          </div>
        </form>
      </div>
      {SearchedValues ? (
        <div>
          <h1>Nenhum produto foi encontrado!</h1>
        </div>
      ) : null}

      {typeof listProducts !== "undefined" &&
        listProducts.map((value) => {
          return (
            <Card
              key={value.id}
              ListCard={listProducts}
              SetListCard={SetListProducts}
              id={value.id}
              name={value.name}
              price={value.price}
              category={value.category}
            />
          );
        })}
    </div>
  );
}
