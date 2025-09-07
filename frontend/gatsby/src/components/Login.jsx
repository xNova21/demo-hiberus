import { Link, navigate } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import * as styles from "../css/log.module.css";
import { AuthContext } from "../context/AuthContext";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const onSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        if (data.token) {
          //guardar token en localstorage
          localStorage.setItem("token", data.token);
          //user en contexto
          // setUser(data.user); --- IGNORE ---
          alert("Login successful!");
          navigate("/app/dashboard");
        } else {
          alert("Login failed. Please check your credentials.");
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
        <h1 className={styles.h1}>Login</h1>
        <form onSubmit={onSubmit}>
          <label className={`${styles.label} input-group`}>
            Username
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={`${styles.label} input-group`}>
            Password
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.button}>
            Log in
          </button>
        </form>

        <div className={styles.divider}>OR</div>

        {/* <section className="social-login">
            <button className="social-btn" type="button">
                    <img src="/google.svg" alt="Google logo" />
            </button>
        </section> */}

        <footer className={styles.footer}>
          <p>
            Don't have an account? <Link to="/app/register">Register</Link>
          </p>
        </footer>
      </main>
    </div>
  );
}
