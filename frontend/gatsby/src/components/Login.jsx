import { Link } from "gatsby";
import React, { useState } from "react";
import * as styles from "../css/log.module.css";
export default function Login() {
  const [username, setUsername] = useState("UsuarioTest");
  const [password, setPassword] = useState("Test123!");

  const onSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };
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
            <button type="submit" className={styles.button}>Log in</button>
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
