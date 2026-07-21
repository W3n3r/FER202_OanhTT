import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import hook của Redux
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Lazy load các trang
const Home = lazy(() => import("./pages/Home"));
const ProductList = lazy(() => import("./pages/ProductList"));
const About = lazy(() => import("./pages/About"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));

function App() {
  // BẮT BUỘC ĐẶT Ở ĐÂY: Lấy tổng số sản phẩm từ Redux store
  const totalProducts = useSelector((state) => state.product.totalCount);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Laptop Store{" "}
            <span className="badge bg-danger ms-2">Kho: {totalProducts}</span>
          </Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>
            <Link className="nav-link" to="/products">
              Products
            </Link>
            <Link className="nav-link" to="/about">
              About
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Suspense fallback={<div>Đang tải trang...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
