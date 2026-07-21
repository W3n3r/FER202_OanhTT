import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTotalCount } from "../redux/productSlice";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // State quản lý dữ liệu của Form "Add Product"
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    currentPrice: "",
    image: "laptop1.png", // Tạm thời set cứng một ảnh mặc định
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
        dispatch(setTotalCount(response.data.length)); // Gửi tổng số đếm được lên Navbar
        setLoading(false);
      })
      .catch((err) => {
        setError("Không thể tải dữ liệu từ API.");
        setLoading(false);
      });
  };

  //   // Xử lý khi người dùng gõ vào các ô input
  //   const handleInputChange = (e) => {
  //     const { name, value } = e.target;
  //     setNewProduct({ ...newProduct, [name]: value });
  //   };
  // Xử lý khi người dùng gõ vào các ô input
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu ô đang nhập là Giá tiền (price hoặc currentPrice)
    if (name === "price" || name === "currentPrice") {
      // 1. Lọc bỏ toàn bộ chữ cái và các ký tự đặc biệt, chỉ giữ lại số
      const onlyNumbers = value.replace(/\D/g, "");

      // 2. Dùng biểu thức chính quy (Regex) để chèn dấu chấm vào mỗi 3 chữ số
      const formattedPrice = onlyNumbers.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      // 3. Cập nhật vào state
      setNewProduct({ ...newProduct, [name]: formattedPrice });
    } else {
      // Nếu là các ô khác (Tên, Mô tả) thì cập nhật bình thường
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  // Hàm gọi API thêm sản phẩm mới
  //   const handleAddProduct = (e) => {
  //     e.preventDefault();
  //     axios
  //       .post("http://localhost:5000/products", newProduct)
  //       .then((response) => {
  //         const updatedProducts = [...products, response.data];
  //         setProducts(updatedProducts);
  //         dispatch(setTotalCount(updatedProducts.length)); // Cập nhật lại kho khi Thêm
  //         setNewProduct({
  //           name: "",
  //           description: "",
  //           price: "",
  //           currentPrice: "",
  //           image: "laptop1.png",
  //         });
  //       })
  //       .catch((err) => alert("Lỗi khi thêm sản phẩm!"));
  //   };
  // Hàm gọi API thêm sản phẩm mới
  const handleAddProduct = (e) => {
    e.preventDefault();

    // --- BẮT ĐẦU PHẦN BẮT LỖI (VALIDATION) ---
    // 1. Chống nhập khoảng trắng (space)
    if (!newProduct.name.trim() || !newProduct.description.trim()) {
      alert("Tên và mô tả không được chỉ chứa khoảng trắng!");
      return; // Dừng lại, không chạy API
    }

    // 2. Ép kiểu giá tiền phải là số (bỏ qua dấu chấm nếu có)
    const rawPrice = newProduct.price.replace(/\./g, "");
    const rawCurrentPrice = newProduct.currentPrice.replace(/\./g, "");

    if (isNaN(rawPrice) || isNaN(rawCurrentPrice)) {
      alert("Giá tiền và Giá khuyến mãi phải là số hợp lệ!");
      return;
    }

    if (Number(rawPrice) <= 0 || Number(rawCurrentPrice) <= 0) {
      alert("Giá tiền phải lớn hơn 0!");
      return;
    }

    if (Number(rawCurrentPrice) > Number(rawPrice)) {
      alert("Giá khuyến mãi không được lớn hơn Giá gốc!");
      return;
    }

    axios
      .post("http://localhost:5000/products", newProduct)
      .then((response) => {
        const updatedProducts = [...products, response.data];
        setProducts(updatedProducts);
        dispatch(setTotalCount(updatedProducts.length));
        setNewProduct({
          name: "",
          description: "",
          price: "",
          currentPrice: "",
          image: "laptop1.png",
        });
      })
      .catch((err) => alert("Lỗi khi thêm sản phẩm!"));
  };

  // Hàm gọi API xóa sản phẩm
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      axios
        .delete(`http://localhost:5000/products/${id}`)
        .then(() => {
          const updatedProducts = products.filter(
            (product) => product.id !== id,
          );
          setProducts(updatedProducts);
          dispatch(setTotalCount(updatedProducts.length)); // Cập nhật lại kho khi Xóa
        })
        .catch((err) => alert("Lỗi khi xóa sản phẩm!"));
    }
  };

  if (loading)
    return <div className="text-center mt-5">Đang tải dữ liệu...</div>;
  if (error)
    return <div className="alert alert-danger text-center mt-5">{error}</div>;

  return (
    <div>
      {/* --- KHU VỰC 1: FORM THÊM SẢN PHẨM --- */}
      <div className="card mb-4 bg-dark text-white border-0 shadow">
        <div className="card-header text-center fw-bold fs-5 border-bottom border-secondary">
          Add Product
        </div>
        <div className="card-body">
          <form onSubmit={handleAddProduct}>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2 text-md-end">Name:</div>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2 text-md-end">Description:</div>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3 align-items-center">
              <div className="col-md-2 text-md-end">Price:</div>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="price"
                  value={newProduct.price}
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
                  value={newProduct.currentPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-primary px-4">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* --- KHU VỰC 2: BẢNG DANH SÁCH SẢN PHẨM --- */}
      <div className="card border-0 shadow">
        <div className="card-header bg-dark text-white text-center fw-bold fs-5">
          Product List
        </div>
        <div className="card-body p-0 table-responsive">
          {products.length === 0 ? (
            <div className="alert alert-warning m-3 text-center">
              No products found.
            </div>
          ) : (
            <table className="table table-bordered table-hover mb-0 align-middle text-center">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th style={{ width: "40%" }}>Description</th>
                  <th>Price</th>
                  <th>Current Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td className="text-start fw-semibold">{product.name}</td>
                    <td className="text-start text-muted small">
                      {product.description}
                    </td>
                    <td>
                      <span className="text-decoration-line-through text-muted">
                        {product.price} đ
                      </span>
                    </td>
                    <td>
                      <span className="fw-bold">{product.currentPrice} đ</span>
                    </td>
                    <td>
                      <div className="d-flex flex-column gap-2 px-2">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                        {/* Nút Edit này sẽ chuyển hướng sang trang Chi tiết (Activity 3) */}
                        <Link
                          to={`/products/${product.id}`}
                          className="btn btn-danger btn-sm"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
