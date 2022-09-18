import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import Home from "./pages/Home";
import Register from "./pages/registerPage";
import Search from "./pages/SearchPage";
import Edit from "./pages/EditPage";
import Delete from "./pages/DeletePage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div className="topnav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/register">Register product</Link>
              </li>

              <li>
                <Link to="/search">Search product</Link>
              </li>
            </ul>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/register" element={<Register />}></Route>
            <Route exact path="/search" element={<Search />}></Route>
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/delete/:id" element={<Delete />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
