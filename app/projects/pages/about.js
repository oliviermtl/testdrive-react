import React, { useState, useEffect } from "react";
import ReactMapGL from 'react-map-gl';

export default function About() {
  const [viewport, setViewport] = useState({
    latitude: 49.3448841,
    longitude: -119.5802691,
    width: 100+"vw",
    height: 100+"vh",
    zoom: 13
  });
  const [selectedPark, setSelectedPark] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);  


  return (
   <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
  <div className="bg-black  object-center">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={"pk.eyJ1Ijoib2xpdmllcm10bCIsImEiOiJja2c2a3NlcjYxNWE5MnFvNXd3YWExaG13In0.n55Tr-IjbzoUZn0eNIk1iw"}
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
      <div className="box-border h-20 w-64 p-4 border-4 border-gray-400 bg-gray-200 "><div class="h-full w-full bg-gray-400"> <h1 className="text-purple-500">Hello</h1></div>
   </div>
      </ReactMapGL>
    </div>

    </div>
  

   
    
  );
}