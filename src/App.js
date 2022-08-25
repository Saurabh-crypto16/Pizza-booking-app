import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import "./App.css";
import { Route, Routes } from "react-router";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
