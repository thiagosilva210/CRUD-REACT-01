import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const initialState = {
  name: "",
  category: "",
  price: "",
};

export default function Edit(props) {
  const [editValue, setEditValue] = useState({ initialState });
  const { name, category, price } = editValue;

  const { id } = useParams();

  const [message, setMessage] = React.useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/getProduct/${id}`)
      .then((response) => setEditValue({ ...response.data[0] }))
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValue({ ...editValue, [name]: value });
  };

  const updateTutorial = () => {
    Axios.put(`http://localhost:3001/edit/${id}`, {
      name: editValue.name,
      price: editValue.price,
      category: editValue.category,
    })
      .then((response) => {
        setMessage("produto editado com sucesso!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="center">
      <div className="form">
        <div className="registerContainer">
          <h1 className="title">Àrea de Edição</h1>

          <p className="white">{message}</p>

          <div className="input-container ic1">
            <input
              type="text"
              name="name"
              placeholder="Nome"
              className="input"
              value={name || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container ic1">
            <input
              type="text"
              name="price"
              placeholder="price"
              className="input"
              value={price || ""}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container ic1">
            <input
              type="text"
              name="category"
              placeholder="category"
              className="input"
              value={category || ""}
              onChange={handleInputChange}
            />
          </div>

          <button className="submit" type="submit" onClick={updateTutorial}>
            Editar produto
          </button>
        </div>
      </div>
    </div>
  );
}
