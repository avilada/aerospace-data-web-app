import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <h1>Aerospace Data Test</h1>
      {data.map((item, i) => (
        <div key={i} className="card">
          <h2>{item.title}</h2>
          <img src={item.url} alt={item.title} width="400" />
          <p>{item.explanation}</p>
          <p><i>{item.date}</i></p>
        </div>
      ))}
    </div>
  );
}

export default App;
