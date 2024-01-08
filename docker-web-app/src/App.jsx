import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      const res = await fetch("http://localhost:5000/counts");
      const data = await res.json();
      setCount(data[0].count);
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    if (count !== null) {
      fetch("http://localhost:5000/counts", {
        method: "POST",
        body: JSON.stringify({ count }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }, [count]);

  if (count === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React. Is it really working, now? 😲😲?</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
