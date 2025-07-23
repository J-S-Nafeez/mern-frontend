// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useContext } from "react";
// import { AppContext } from "../App";
// import { useFetcher } from "react-router-dom";
// import "./Orders.css";
// export default function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState();
//   const [page, setPage] = useState(1);
//   const [limit,setLimit]= useState(3)
//   const [totalPages, setTotalPages] = useState(1);
//   const [status, setStatus] = useState("");
//   const { user } = useContext(AppContext);
//   const API_URL = import.meta.env.VITE_API_URL;
//   const fetchOrders = async () => {
//     try {
//       const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
//       const result = await axios.get(url, {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       });
//       setOrders(result.data.orders);
//       setTotalPages(result.data.total);
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };
//   useEffect(() => {
//     fetchOrders();
//   }, [status,page]);
//   const updateOrder = async (status, id) => {
//     try {
//       const url = `${API_URL}/api/orders/${id}`;
//       const result = await axios.patch(url, { status });
//       fetchOrders();
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     }
//   };
//   return (
//     <div>
//       <h2>Order Management</h2>
//       <div>
//         <select onChange={(e) => setStatus(e.target.value)}>
//           <option value="">All</option>
//           <option value="Pending" >
//             Pending
//           </option>
//           <option value="completed">Completed</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//         {/* <button>Show</button> */}
//       </div>
//       {orders &&
//         orders.map((order) => (
//           <li>
//             {order._id}-{order.orderValue}-{order.status}-
//             {order.status === "Pending" && (
//               <>
//                 <button onClick={() => updateOrder("cancelled", order._id)}>
//                   Cancel
//                 </button>
//                 -
//                 <button onClick={() => updateOrder("completed", order._id)}>
//                   Complete
//                 </button>
//               </>
//             )}
//           </li>
//         ))}
//         <div>
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































import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [status, page]);

  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="orders-container">
      <h2 className="orders-heading">Order Management</h2>

      <div className="filter-container">
        <select
          className="filter-select"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <ul className="orders-list">
        {orders &&
          orders.map((order) => (
            <li className="order-item" key={order._id}>
              <span className="order-text">
                {order._id} - ₹{order.orderValue} - {order.status}
              </span>
              {order.status === "Pending" && (
                <span className="order-actions">
                  <button
                    className="btn btn-cancel"
                    onClick={() => updateOrder("cancelled", order._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-complete"
                    onClick={() => updateOrder("completed", order._id)}
                  >
                    Complete
                  </button>
                </span>
              )}
            </li>
          ))}
      </ul>

      <div className="pagination">
        <button
          className="btn btn-pagination"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="page-info">
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-pagination"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
