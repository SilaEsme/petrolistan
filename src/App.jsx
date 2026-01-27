import MapView from "./components/view/MapView";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState();

  const fetchData = async () => {
    fetch("https://petrolistan.com/api/").then((res) => {
      res.json().then((result) => {
        setData(result.data);
      });
    });
  };

  useEffect(() => {
    fetchData()}, 
    []);

  return (
    <>
      <MapView mapData={data}></MapView>
    </>
  );
}

export default App;
