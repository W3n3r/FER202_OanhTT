import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL (VD: /products/1)
  const navigate = useNavigate(); // Dùng để điều hướng trang

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State để bật/tắt chế độ chỉnh sửa
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    currentPrice: "",
    image: "",
  });

  useEffect(() => {
    // Lấy thông tin chi tiết của 1 sản phẩm
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setEditForm(response.data); // Đưa dữ liệu sẵn vào form sửa
        setLoading(false);
      })
      .catch((err) => {
        setError("Không tìm thấy sản phẩm.");
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  // Hàm gọi lệnh PUT để cập nhật dữ liệu
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/products/${id}`, editForm)
      .then((response) => {
        setProduct(response.data); // Cập nhật lại UI hiển thị
        setIsEditing(false); // Tắt chế độ sửa
        alert("Cập nhật thành công!");
      })
      .catch((err) => alert("Lỗi khi cập nhật sản phẩm."));
  };

  if (loading)
    return <div className="text-center mt-5">Đang tải chi tiết...</div>;
  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  // Giao diện CHỈNH SỬA (Edit Mode)
  if (isEditing) {
    return (
      <div className="card bg-dark text-white border-0 shadow mt-4">
        <div className="card-header text-center fw-bold fs-5 border-bottom border-secondary">
          Edit Product
        </div>
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2 text-md-end">Name:</div>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2 text-md-end">Description:</div>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  value={editForm.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2 text-md-end">Price:</div>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={editForm.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2 text-md-end">Current Price:</div>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="currentPrice"
                  value={editForm.currentPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={() => setIsEditing(false)}
              >
                Back to Detail
              </button>
              <button type="submit" className="btn btn-danger">
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Giao diện HIỂN THỊ CHI TIẾT (View Mode)
  return (
    <div className="card bg-dark text-white border-0 shadow mt-4 text-center pb-4">
      <h3 className="card-header border-0 pt-4">{product.name}</h3>
      <div className="card-body d-flex flex-column align-items-center">
        <div className="bg-white p-3 rounded mb-4" style={{ width: "300px" }}>
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="img-fluid"
          />
        </div>
        <p className="w-75 mx-auto">{product.description}</p>
        <p className="mt-3 text-muted text-decoration-line-through">
          Price: {product.price} đ
        </p>
        <p className="fs-5">Current Price: {product.currentPrice} đ</p>

        <div className="mt-4">
          <button
            className="btn btn-primary me-2"
            onClick={() => navigate("/products")}
          >
            Back Home
          </button>
          <button className="btn btn-danger" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
