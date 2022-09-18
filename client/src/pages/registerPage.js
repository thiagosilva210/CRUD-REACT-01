import React, { useState } from "react";
import "../App.css";
import Axios from "axios";

function Register() {
  const [values, SetValues] = useState();
  const [message, setMessage] = React.useState("");

  const handleChangeValues = (values) => {
    SetValues((prevValue) => ({
      ...prevValue,
      [values.target.name]: values.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      price: values.price,
      category: values.category,
    }).then((response) => {
      setMessage("produto cadastrado com sucesso!");
    });
  };

  return (
    <div className="center">
      <div className="form">
        <div className="registerContainer">
          <h1 className="title">Àrea de cadastro</h1>

          <p className="white">{message}</p>

          <div className="input-container ic1">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              className="input"
              onChange={handleChangeValues}
            />
          </div>

          <div className="input-container ic2">
            <input
              type="text"
              name="price"
              placeholder="Preço"
              className="input"
              onChange={handleChangeValues}
            />
          </div>

          <div className="input-container ic2">
            <input
              type="text"
              name="category"
              placeholder="Categria"
              className="input"
              onChange={handleChangeValues}
            />
          </div>

          <button
            className="submit"
            type="submit"
            onClick={() => handleClickButton()}
          >
            Cadastrar produto
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
