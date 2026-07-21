import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

// Reusable Class Component (LO2)
class ProductCard extends Component {
  render() {
    const { product } = this.props; // Destructuring (LO3)
    return (
      <div className="card h-100 shadow-sm border-0 bg-light custom-product-card">
        <img
          src={`/images/${product.image}`}
          className="card-img-top bg-white product-image"
          alt={product.name}
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-danger fw-bold">{product.name}</h6>
          <p className="card-text small text-muted flex-grow-1">
            {product.description}
          </p>
          <div className="mb-3">
            <span
              className="text-decoration-line-through text-muted me-2"
              style={{ fontSize: "14px" }}
            >
              {product.price} đ
            </span>
            <strong className="text-danger d-block">
              {product.currentPrice} đ
            </strong>
          </div>
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-danger mt-auto"
          >
            View Details
          </Link>
        </div>
      </div>
    );
  }
}

export default ProductCard;
