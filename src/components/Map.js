import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

const Map = ({
    areaToUsersMapping,
    areas,
    layerRef,
    onEachFeature,
    getStyle,
}) => {
    return (
        <MapContainer
            style={{ width: "100%", height: "100vh" }}
            center={[12.9716, 77.5946]}
            maxBoundsViscosity={1.0}
            zoom={10}
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
                    style={(feature) => getStyle(feature)}
                />
            )}
        </MapContainer>
    );
};

export default Map;
