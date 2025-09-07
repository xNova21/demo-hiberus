import { Link, navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import * as styles from "../css/log.module.css";
import { AuthContext } from "../context/AuthContext";
export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);

  const onSubmit = (e) => {
    e.preventDefault();
    // fetch a localhost 3000 /users/register
    fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.token) {
          //guardar token en localstorage y user en contexto
          localStorage.setItem("token", data.token);
          //user en contexto
          login(data.token);
          alert("Registration successful!");
          navigate("/app/dashboard");
        } else {
          alert(
            data?.error?.message || "Registration failed. Please try again."
          );
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("An error occurred. Please try again.");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      //fetch user data from token
      fetch("http://localhost:3000/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            login(data);
            navigate("/app/dashboard");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
          localStorage.removeItem("token");
        });
    }
  }, [login]);
  return (
    <div className={styles.pageWrapper}>
      <main className={styles.loginContainer}>
        <h1 className={styles.h1}>Register</h1>
        <form onSubmit={onSubmit}>
          <label className={`${styles.label} input-group`}>
            Username
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className={styles.input}
            />
          </label>

          <label className={`${styles.label} input-group`}>
            Email
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={styles.input}
            />
          </label>

          <label className={`${styles.label} input-group`}>
            Password
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>

        <div className={styles.divider}>OR</div>

        {/*   <section className="social-login">
            <button className="social-btn" type="button">
                    <img src="/google.svg" alt="Google logo" />
            </button>
        </section> */}

        <footer className={styles.footer}>
          <p>
            Already have an account? <Link to="/app/login">Login</Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
