import { useList, useNavigation, useTranslate } from "@refinedev/core";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { GoogleMap, AdvancedMarker } from "@components/map";
import type { ILocation } from "../../interface";

export const AllLocationMap = () => {
  const t = useTranslate();
  const parentRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(null);
  const { edit } = useNavigation();

  const { data: locationData } = useList<ILocation>({
    resource: "locations",
    pagination: {
      mode: "off",
    },
  });
  const locations = locationData?.data || [];

  const handleMarkerClick = (location: ILocation) => {
    setSelectedLocation(location);
  };

  return (
    <Box
      ref={parentRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <GoogleMap
        mapProps={{
          setMap,
          mapId: "all-locations-map",
          disableDefaultUI: true,
          center: {
            lat: 40.73061,
            lng: -73.935242,
          },
          zoom: 10,
        }}
      >
        {locations?.map((location) => {
          const lat = Number(location.lat);
          const lng = Number(location.lng);

          if (!lat || !lng) return null;

          return (
            <AdvancedMarker
              key={location.id}
              map={map}
              zIndex={selectedLocation?.id === location.id ? 1 : 0}
              position={{
                lat,
                lng,
              }}
              title={location.name}
              onClick={() => {
                handleMarkerClick(location);
              }}
            >
              {(selectedLocation?.id !== location.id || !selectedLocation) && (
                <img src="/images/marker-location.svg" alt={location.name} />
              )}
            </AdvancedMarker>
          );
        })}
      </GoogleMap>
    </Box>
  );
};
