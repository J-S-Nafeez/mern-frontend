// import React from "react";
// import { useEffect, useState } from "react";
// import { useRef } from "react";
// import axios from "axios";
// export default function Products() {
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState();
//   const frmRef = useRef();
//   const [form, setForm] = useState({
//     productName: "",
//     description: "",
//     price: "",
//     imgUrl: "",
//   });
//   const [page, setPage] = useState(1);
//   const [searchVal, setSearchVal] = useState("");
//   const [totalPages, setTotalPages] = useState(1);
//   const [limit, setLimit] = useState(2);
//   const [editId, setEditId] = useState();
//   const API_URL = import.meta.env.VITE_API_URL;
//   const fetchProducts = async () => {
//     try {
//       setError("Loading...");
//       const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
//       const result = await axios.get(url);
//       setProducts(result.data.products);
//       setTotalPages(result.data.total);
//       setError();
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };
//   useEffect(() => {
//     fetchProducts();
//   }, [page]);
//   const handleDelete = async (id) => {
//     try {
//       const url = `${API_URL}/api/products/${id}`;
//       const result = await axios.delete(url);
//       setError("User Deleted Successfully");
//       fetchUsers();
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();
//     const frm = frmRef.current;
//     if (!frm.checkValidity()) {
//       frm.reportValidity();
//       return;
//     }
//     try {
//       const url = `${API_URL}/api/products`;
//       const result = await axios.post(url, form);
//       setError("User added succesfully");
//       fetchProducts();
//       resetForm();
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };

//   const handleEdit = (product) => {
//     setEditId(product._id);
//     setForm({
//       ...form,
//       productName: product.productName,
//       description: product.description,
//       price: product.price,
//       imgUrl: product.imgUrl,
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const frm = frmRef.current;
//     if (!frm.checkValidity()) {
//       frm.reportValidity();
//       return;
//     }
//     try {
//       const url = `${API_URL}/api/products/${editId}`;
//       const result = await axios.patch(url, form);
//       fetchProducts();
//       setEditId();
//       resetForm();
//       setError("User information updated successfully");
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };

//   const handleCancel = () => {
//     setEditId();
//     resetForm();
//   };

//   const resetForm = () => {
//     setForm({
//       ...form,
//       productName: "",
//       description: "",
//       price: "",
//       imgUrl: "",
//     });
//   };
//   return (
//     <div>
//       <h2>Product Management</h2>
//       {error}
//       <div>
//         <form ref={frmRef}>
//           <input
//             name="productName"
//             value={form.productName}
//             type="text"
//             placeholder="Product Name"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="description"
//             value={form.description}
//             type="text"
//             placeholder="Description"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="price"
//             value={form.price}
//             type="text"
//             placeholder="Price"
//             onChange={handleChange}
//             required
//           />
//           <input
//             name="imgUrl"
//             value={form.imgUrl}
//             type="text"
//             placeholder="Image Url"
//             onChange={handleChange}
//             required
//           />


//           {editId ? (
//             <>
//               <button onClick={handleUpdate}>Update</button>
//               <button onClick={handleCancel}>Cancel</button>
//             </>
//           ) : (
//             <button onClick={handleAdd}>Add</button>
//           )}
//         </form>
//       </div>
//       <div>
//         <input type="text" onChange={(e) => setSearchVal(e.target.value)} />
//         <button onClick={fetchProducts}>Search</button>
//       </div>
//       <div>
//         <table border="1">
//           <thead>
//             <tr>
//               <th>Product Name</th>
//               <th>Description</th>
//               <th>Price</th>
//               <th>Image Url</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           {products.map((value) => (
//             <tbody key={value._id}>
//               <tr>
//                 <td>{value.productName}</td>
//                 <td>{value.description}</td>
//                 <td>{value.price}</td>
//                 <td>{value.imgUrl}</td>
//                 <td>
//                   <button onClick={() => handleEdit(value)}>Edit</button>
//                   <button onClick={() => handleDelete(value._id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           ))}
//         </table>
//       </div>
//       <div>
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           Previous
//         </button>
//         Page {page} of {totalPages}
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage(page + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


























// Products.jsx

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Products.css";

 function Products() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const frmRef = useRef();
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    imgUrl: "",
  });
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(2);
  const [editId, setEditId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      setError("Loading...");
      const url = `${API_URL}/api/products/?page=${page}&limit=${limit}&search=${searchVal}`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setTotalPages(result.data.total);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const url = `${API_URL}/api/products/${id}`;
      await axios.delete(url);
      setError("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!frmRef.current.checkValidity()) {
      frmRef.current.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products`;
      await axios.post(url, form);
      setError("Product added successfully");
      fetchProducts();
      resetForm();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm({
      productName: product.productName,
      description: product.description,
      price: product.price,
      imgUrl: product.imgUrl,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!frmRef.current.checkValidity()) {
      frmRef.current.reportValidity();
      return;
    }
    try {
      const url = `${API_URL}/api/products/${editId}`;
      await axios.patch(url, form);
      fetchProducts();
      setEditId(null);
      resetForm();
      setError("Product updated successfully");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditId(null);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      productName: "",
      description: "",
      price: "",
      imgUrl: "",
    });
  };

  return (
    <div className="product-container">
      <h2 className="heading">Product Management</h2>
      {error && <div className="message">{error}</div>}

      <form ref={frmRef} className="product-form">
        <input
          name="productName"
          value={form.productName}
          type="text"
          placeholder="Product Name"
          onChange={handleChange}
          required
        />
        <input
          name="description"
          value={form.description}
          type="text"
          placeholder="Description"
          onChange={handleChange}
          required
        />
        <input
          name="price"
          value={form.price}
          type="text"
          placeholder="Price"
          onChange={handleChange}
          required
        />
        <input
          name="imgUrl"
          value={form.imgUrl}
          type="text"
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        {editId ? (
          <>
            <button className="btn update" onClick={handleUpdate}>Update</button>
            <button className="btn cancel" onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button className="btn add" onClick={handleAdd}>Add</button>
        )}
      </form>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Products"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <button className="btn search" onClick={fetchProducts}>Search</button>
      </div>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((value) => (
            <tr key={value._id}>
              <td>{value.productName}</td>
              <td>{value.description}</td>
              <td>{value.price}</td>
              <td><img src={value.imgUrl} alt={value.productName} className="product-img"/></td>
              <td>
                <button className="btn edit" onClick={() => handleEdit(value)}>Edit</button>
                <button className="btn delete" onClick={() => handleDelete(value._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Products;