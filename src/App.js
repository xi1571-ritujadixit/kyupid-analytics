import React from "react";
import "./css/App.css";
import "leaflet/dist/leaflet.css";
import Map from "./components/Map";
import useDashboardState from "./hooks/dashboard";

const App = () => {
    const { areaToUsersMapping, areas, layerRef, onEachFeature, getStyle } =
        useDashboardState();

    return (
        <div className="App">
            <Map
                areaToUsersMapping={areaToUsersMapping}
                areas={areas}
                layerRef={layerRef}
                onEachFeature={onEachFeature}
                getStyle={getStyle}
            />
        </div>
    );
};

export default App;
