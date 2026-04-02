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
        // fallback to Pune if location denied
        setCoords({ lat: 18.52, lon: 73.85 });
      }
    );
  }, []);

  return coords;
};