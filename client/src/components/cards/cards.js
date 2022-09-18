import React from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <>
      <div className="cards">
        <div>
          <h2>{props.name}</h2>
          <p>preço: {props.price}</p>
          <p>categoria: {props.category}</p>
        </div>
        <div className="btnEdition">
          <Link to={"/edit/" + props.id}>Editar</Link>
          <Link to={"/delete/" + props.id}>Deletar</Link>
        </div>
      </div>
    </>
  );
}
