import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Full-Stack Challenges</h1>
        <p>
          Practice building modern web applications with real-world scenarios.
        </p>
      </header>

      <div className={styles.grid}>
        <Link to="/workspace/1" className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>Frontend</span>
            <span className={styles.difficulty}>Medium</span>
          </div>
          <h2>Build a Counter Component</h2>
          <p>
            Create a React counter component that increments, decrements, and
            resets.
          </p>
        </Link>
        <Link to="/workspace/2" className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>Backend</span>
            <span className={`${styles.difficulty} ${styles.hard}`}>Hard</span>
          </div>
          <h2>REST API for Todo List</h2>
          <p>Implement core CRUD operations for a Todo application using Go.</p>
        </Link>
        <Link to="/workspace/3" className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.badge}>Full-Stack</span>
            <span className={styles.difficulty}>Medium</span>
          </div>
          <h2>Auth Flow Integration</h2>
          <p>
            Connect a React login form to a Node.js authentication endpoint.
          </p>
        </Link>
      </div>
    </div>
  );
}
