import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  category: "",
  price: "",
};

export default function Delete(props) {
  const [ProductValue, setProductValue] = useState({ initialState });
  const { name } = ProductValue;

  const { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get(`http://localhost:3001/getProduct/${id}`)
      .then((response) => {
        setProductValue(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const deleteTutorial = () => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
      .then((response) => {
        navigate("/search");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="center">
      <div className="form-delete-area">
        <div className="registerContainer">
          <h1 className="title">Àrea de Exclusão</h1>
          <p className="white">
            Você tem certeza que deseja deletar {name || ""}?
          </p>

          <button onClick={deleteTutorial}>Sim,deletar produto!</button>
        </div>
      </div>
    </div>
  );
}
