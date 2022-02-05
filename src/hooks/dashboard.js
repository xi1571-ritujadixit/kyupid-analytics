import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAreas,
    fetchUsers,
    fetchAreaToUserMapping,
} from "../redux/actions/dashboard";
import { capitalizeFirstLetter } from "../helpers/utils";

const useDashboardState = () => {
    const dispatch = useDispatch();
    const { areas, users, areaToUsersMapping, totalProUsers } = useSelector(
        (state) => state.dashboard
    );
    const layerRef = useRef(null);

    useEffect(() => {
        dispatch(fetchAreas());
        dispatch(fetchUsers());
    }, [dispatch]);

    useEffect(() => {
        if (areas && users) {
            dispatch(fetchAreaToUserMapping());
        }
    }, [areas, users, dispatch]);

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
            const popup = `
                    <h3>${capitalizeFirstLetter(name)}</h3>
                    Total Users - ${maleUsers + femaleUsers} <br />
                    Pro Users - ${proUsers} <br />
                    Male Users - ${maleUsers} <br />
                    Female Users - ${femaleUsers} <br />
                `;
            layer.on("mouseover", () => {
                layer.bindPopup(popup).openPopup();
            });
        }
    };

    const getStyle = (feature) => {
        const { proUsers } = getAreaAnalytics(
            areaToUsersMapping[feature.properties.area_id]
        );
        const percentage = (proUsers / totalProUsers) * 100;
        let fillColor;
        if (percentage <= 0.5) {
            fillColor = "#03045E";
        } else if (percentage <= 1 && percentage > 0.5) {
            fillColor = "#0077B6";
        } else if (percentage <= 1.5 && percentage > 1) {
            fillColor = "#48CAE4";
        } else {
            fillColor = "#CAF0F8";
        }
        return { fillColor, color: "black", weight: 0.5, fillOpacity: 1 };
    };

    return {
        areaToUsersMapping,
        areas,
        layerRef,
        onEachFeature,
        getStyle,
    };
};

export default useDashboardState;
