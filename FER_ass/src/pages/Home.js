import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTotalCount } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => {
        setProducts(response.data);
        dispatch(setTotalCount(response.data.length)); // Gửi tổng số lên Redux (LO8)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading)
    return <div className="text-center mt-5">Đang tải cửa hàng...</div>;

  return (
    <div>
      <h2 className="text-center text-white bg-dark p-2 mb-4 rounded">
        Product List
      </h2>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
