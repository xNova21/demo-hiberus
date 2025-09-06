import { Link } from "gatsby";
import React, { useState } from "react";
import * as styles from "../css/log.module.css";
export default function Register() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

  const onSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
  };
return (   <div className={styles.pageWrapper}>

    <main className={styles.loginContainer}>
        <h1 className={styles.h1}>Register</h1>
        <form onSubmit={onSubmit}>
            <label className={`${styles.label} input-group`}>
                Username
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={styles.input}
                />
            </label>

            <label className={`${styles.label} input-group`}>
                Password
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={styles.input}
                />
            </label>
            <button type="submit" className={styles.button}>Register</button>
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
