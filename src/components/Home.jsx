import React, { useEffect, useState } from "react";
import { API_URL } from "../constants";
import axios from "axios";

const Home = () => {
  const url = API_URL;
  const [apiData, setApiData] = useState([]);
  const [pagination, setPagination] = useState();

  const fetchAPIData = async () => {
    const URL = pagination || url;
    const getData = await axios.get(URL);
    console.log("getData: ", getData);
    setApiData(getData.data);
  };

  useEffect(() => {
    fetchAPIData();
  }, [pagination]);

  return (
    <div>
      {apiData.results?.map((item, index) => {
        return (
          <div
            style={{
              backgroundColor: "goldenrod",
              borderRadius: "5px",
              width: "35%",
              cursor: "pointer",
            }}
            key={index}
          >
            <h2>{item.name}</h2>
            <h3>
              {item.climate}, {item.population}, {item.terrain}
            </h3>
          </div>
        );
      })}
      <div style={{ gap: "3px" }}>
        <button
          onClick={() => {
            setPagination(apiData?.previous);
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPagination(apiData?.next);
          }}
          style={{ marginLeft: "10%" }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
