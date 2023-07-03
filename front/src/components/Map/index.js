import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import axios from "axios";

import "leaflet/dist/leaflet.css";

export const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [position, setPosition] = useState([0, 0]);
  const [isFetching, setIsFetching] = useState(true);

  const mapRef = useRef();

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        console.log(e.latlng.lat);
        console.log(e.latlng.lng);
      },
    });
    return false;
  };

  // fetch data from backend
  useEffect(() => {
    setIsFetching(true);
    axios
      .get("http://localhost:5000/locations")
      .then((res) => {
        setMarkers(res.data);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Fonction pour obtenir la position actuelle du navigateur
  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
          },
          (error) => {
            console.error(error);
            // set default position
            setPosition([48.8534, 2.3488]);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // set default position
        setPosition([48.8534, 2.3488]);
      }
    };

    getCurrentPosition();
  }, []);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <MapEvents />
      {markers.map((marker, index) => (
        <Marker position={[marker.lat, marker.lng]} key={index}>
          <Popup>
            <div>
              <h2>Description du point</h2>
              <p>Infos : {marker.text}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
