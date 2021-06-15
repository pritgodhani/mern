import react, { useEffect } from "react";
import axios from "axios";

const App = () => {
  const click = async () => {
    const { data } = await axios.get("http://localhost:5000/form");
    // console.log(data);
  };

  return (
    <>
      <h1 onClick={click}>App</h1>
    </>
  );
};
export default App;
