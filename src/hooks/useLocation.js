import { useState, useEffect } from "react";

export const useLocation = () => {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      () => {
        console.log("Location denied, using default");
        setCoords({ lat: 18.52, lon: 73.85 }); // fallback Pune
      }
    );
  }, []);

  return coords;
};