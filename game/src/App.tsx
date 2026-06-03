import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h1 className={styles.wordmark}>FONT</h1>
        <p className={styles.tagline}>your only limit is you</p>
        <p className={styles.subtitle}>A Game of Spirits &amp; Spark</p>
      </header>
      <main className={styles.main}>
        <button className={styles.startBtn}>
          Begin your run
        </button>
      </main>
    </div>
  );
}
