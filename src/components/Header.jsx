// import React from "react";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import App, { AppContext } from "../App";
// import "./Header.css";
// export default function Header() {
//   const { user } = useContext(AppContext);
//   return (
//     <div>
//       <div className="header">
//       <h1>Dubai Cafe</h1>
//       <Link to="/">Home</Link><Link to="/cart">MyCart</Link>
//       <Link to="/order">MyOrder</Link>
//       {/* <Link to="/admin">Admin</Link> */}

//       {user?.role === "admin" && <Link to="/admin">Admin</Link>}
      
//       {user?.token ? <Link to="/profile">Profile</Link> : <Link to="/login">Login</Link> }
//       </div>
//     </div>
//   );
// }









import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <header className="header">
      <h1 className="logo">Dubai Cafe</h1>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">MyCart</Link>
        <Link to="/order">MyOrder</Link>
        {user?.role === "admin" && <Link to="/admin">Admin</Link>}
        {user?.token ? (
          <Link to="/profile">Profile</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
