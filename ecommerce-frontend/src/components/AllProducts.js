import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const size = 8; // number of products per page

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const fetchProducts = (pageNumber) => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/api/products?page=${pageNumber}&size=${size}`)
      .then((res) => {
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center mt-5">
        <h5>No products available 😕</h5>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">All Products</h3>
      <div className="row">
        {products.map((product, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">{product.name}</h5>
                <p>
                  <strong>MRP:</strong> ₹{product.mrp}
                </p>
                <p>
                  <strong>Discounted Price:</strong> ₹{product.discountedPrice}
                </p>
                <p>
                  <strong>Quantity:</strong> {product.quantity}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-primary mx-2"
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>

        <span className="align-self-center">
          Page {page + 1} of {totalPages}
        </span>

        <button
          className="btn btn-outline-primary mx-2"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllProducts;
