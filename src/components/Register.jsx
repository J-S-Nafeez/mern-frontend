// import "./Register.css";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Register() {
//   const [user, setUser] = useState({});
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

//   const handleSubmit = async () => {
//     // Optional: Simple frontend validation
//     if (!user.firstName || !user.lastName || !user.email || !user.password) {
//       setError("All fields are required.");
//       return;
//     }

//     try {
//       const url = `${API_URL}/api/users/register`;
//       const result = await axios.post(url, user);
//       setError("Data saved successfully ✅");
//       navigate("/login");
//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong ❌");
//     }
//   };

//   return (
//     <div className="App-Register-Row">
//       <h2>Registration Form</h2>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <p>
//         <input
//           type="text"
//           onChange={(e) => setUser({ ...user, firstName: e.target.value })}
//           placeholder="Enter First Name"
//         />
//       </p>

//       <p>
//         <input
//           type="text"
//           placeholder="Enter Last Name"
//           onChange={(e) => setUser({ ...user, lastName: e.target.value })}
//         />
//       </p>

//       <p>
//         <input
//           type="text"
//           placeholder="Enter Email Address"
//           onChange={(e) => setUser({ ...user, email: e.target.value })}
//         />
//       </p>

//       <p>
//         <input
//           type="password"
//           placeholder="Enter Password"
//           onChange={(e) => setUser({ ...user, password: e.target.value })}
//         />
//       </p>

//       <p>
//         <button onClick={handleSubmit}>Submit</button>
//       </p>

//       <hr />
//       <Link to="/login">Already a member? Login Here...</Link>
//     </div>
//   );
// }























import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const handleSubmit = async () => {
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      setError("All fields are required.");
      return;
    }

    try {
      const url = `${API_URL}/api/users/register`;
      await axios.post(url, user);
      setError("Registration Successful ✅");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("Something went wrong ❌");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Your Account</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={(e) => e.preventDefault()}>
        <label>First Name</label>
        <input
          type="text"
          placeholder="John"
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Doe"
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="john@example.com"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="********"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button onClick={handleSubmit}>Register</button>
      </form>

      <p className="login-link">
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
}


























