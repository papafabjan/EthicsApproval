import { useState } from "react";
import ReactDOM from 'react-dom/client';
import Users from '../components/Users';

const Home = () => {

  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
    <>
      <div>
        <h1>Home Page Here</h1>
        <form onSubmit={handleSubmit}>
      <label>Send something to the database:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
    </form>
      </div>
      <div>
        <Users />
      </div>
    </>
    )
};

export default Home;