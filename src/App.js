import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/App.css";
import "leaflet/dist/leaflet.css";
import {
    fetchAreas,
    fetchUsers,
    fetchAreaToUserMapping,
} from "./redux/actions/dashboard";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";

const App = () => {
    const dispatch = useDispatch();
    const { areas, users, areaToUsersMapping } = useSelector(
        (state) => state.dashboard
    );
    const layerRef = useRef(null);

    useEffect(() => {
        dispatch(fetchAreas());
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        if (areas && users) {
            dispatch(fetchAreaToUserMapping());
        }
    }, [areas, users]);

    const getAreaAnalytics = (users) => {
        let proUsers = 0;
        let maleUsers = 0;
        for (let i = 0; i < users.length; i++) {
            if (users[i].is_pro_user) {
                proUsers++;
            }
            if (users[i].gender.toUpperCase() === "M") {
                maleUsers++;
            }
        }
        const femaleUsers = users.length - maleUsers;
        return { proUsers, maleUsers, femaleUsers };
    };

    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            const { name, area_id } = feature.properties;
            const { proUsers, maleUsers, femaleUsers } = getAreaAnalytics(
                areaToUsersMapping[area_id]
            );
            layer
                .bindPopup(
                    `${name} Pro Users - ${proUsers} Male Users - ${maleUsers} Female Users - ${femaleUsers} Total Users - ${areaToUsersMapping[area_id].length}`
                )
                .openPopup();
        }
    };

    return (
        <div className="App">
            <MapContainer
                style={{ width: "100%", height: "100vh" }}
                center={[12.9716, 77.5946]}
                maxBoundsViscosity={1.0}
                zoom={5}
                attributionControl
                zoomControl
                scrollWheelZoom
                dragging
                animate
                preferCanvas
                easeLinearity={0.35}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {areaToUsersMapping && (
                    <GeoJSON
                        data={areas}
                        ref={layerRef}
                        onEachFeature={onEachFeature}
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default App;
