"use client";
import type {FC} from "react";
import { useEffect} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

// Leaflet'e özgü `_leaflet_id` özelliğini tanımlamak için bir tür genişletme
interface LeafletHTMLElement extends HTMLElement {
  _leaflet_id?: string | null;
}

const Map: FC<MapProps> = ({latitude, longitude, zoom}) => {
  useEffect(() => {
    const mapElement = document.getElementById("map") as LeafletHTMLElement | null;

    if (mapElement?._leaflet_id) {
      mapElement._leaflet_id = null;
      mapElement.innerHTML = "";
    }

    // Initialize a new map instance
    const map = L.map("map", {preferCanvas: true}).setView([latitude, longitude], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: "/upwc.png",
      iconSize: [38, 38], // size of the icon
      iconAnchor: [22, 38], // point of the icon which will correspond to marker's location
      popupAnchor: [-3, -38], // point from which the popup should open relative to the iconAnchor
    });

    L.marker([latitude, longitude], {icon: customIcon})
      .addTo(map)
      .bindPopup(`Coordinates: ${latitude}, ${longitude}`)
      .openPopup();

    // Return a cleanup function to remove the map on component unmount
    return () => {
      map.remove();
    };
  }, [latitude, longitude, zoom]);

  return <div id="map" style={{height: "500px", width: "100%", borderRadius: "24px"}} />;
};

export default Map;
