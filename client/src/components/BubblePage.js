import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const { goBack } = useHistory();
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then((res) => {
        console.log("bubble page color fetch data: ", res.data);
        setColorList(res.data);
      })
      .catch((err) =>
        console.log("bubble page color fetch err: ", err.message)
      );
  }, []);

  return (
    <>
      <button onClick={goBack}>Go Back</button>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
