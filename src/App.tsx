import styles from "./App.module.css";

function App() {
  const Components = [
    {
      name: "Button",
      href: "/src/views/Button/example.html",
    },
    {
      name: "TextField",
      href: "/src/views/TextField/example.html",
    },
  ];

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>React Component Library</h1>
          <p className={styles.subtitle}>
            Tree-shakable components with CSS Modules and design tokens
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h2>Components</h2>
            <div className={styles.links}>
              <div className={styles.linkGrid}>
                {Components.map((component) => (
                  <a
                    key={component.name}
                    href={component.href}
                    className={styles.link}
                  >
                    {component.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
