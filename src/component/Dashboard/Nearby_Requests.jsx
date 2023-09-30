import { useEffect, useState } from "react";
import "../../style/NearbyRequests.css";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { db } from "../Firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Nearby_Requests() {
  const [data, setData] = useState([]);
  const collRef = collection(db, "findDonors");
  const navigate = useNavigate();

  useEffect(() => {
    const getData = () => {
      onSnapshot(collRef, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    getData();
  }, []);

  return (
    <>
      <div className="nearby">
        <MapContainer center={[19.2183, 72.9781]} zoom={10}>
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {data.map((value, key) => {
            const singleReq = () => {
              // console.log("Marker clicked");
              navigate(`/singlerequest/${value.id}`);
            };
            const customIcon = L.divIcon({
              className: "custom-marker-icon",
              html: `<div class="marker-content">${value.bloodgroup}</div>`,
              iconSize: [20, 20],
            });
            return (
              <Marker
                position={[value.latitude, value.longitude]}
                icon={customIcon}
                eventHandlers={{ click: singleReq }}
                key={key}>
                <Tooltip direction="top" offset={[0, -20]}>
                  {value.name}
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </>
  );
}
