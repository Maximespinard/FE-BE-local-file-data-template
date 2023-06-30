import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/data", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("cannot get data", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFetching(true);
    axios
      .post("http://localhost:5000/data/add", {
        name: inputValue,
      })
      .then((res) => {
        setIsFetching(false);
        setInputValue("");
        setData([...data, res.data]);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/data/delete/${id}`)
      .then((res) => {
        setData(data.filter((data) => data.id !== res.data));
      })
      .catch((err) => {
        console.error("cannot delete data", err);
      });
  };

  return (
    <div className="App">
      <h1>Ici tu récup tes données pour voir si get c'est ok</h1>
      <ul>
        {data.map((data, index) => {
          return (
            <>
              <li key={index}>{data.name}</li>
              <button onClick={() => handleDelete(data.id)}>
                Supprime ce charlatant
              </button>
            </>
          );
        })}
      </ul>
      <h2>Et là tu peux en créé pour voir si post fonctionne fréro</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block" }}>Ecrit un bail</label>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button disabled={isFetching} type="submit">
          Envoie poulet
        </button>
      </form>
    </div>
  );
}

export default App;
