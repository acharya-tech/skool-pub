import { useCallback } from "react";
import _debounce from "lodash/debounce";
import Box from "@mui/material/Box";
import { GoogleMap, MapMarker } from "@components/map";
import type { ILocation } from "../../interface";
import { convertLatLng } from "@utils/geocoding";

type Props = {
  location?: ILocation;
  lat?: number;
  lng?: number;
  zoom?: number;
  isDisabled?: boolean;
  onDragEnd?: ({ lat, lng }: { lat: number; lng: number }) => void;
};

export const LocationMap = (props: Props) => {
  const onDragEndDebounced = useCallback(
    _debounce((lat, lng) => {
      if (props.onDragEnd) {
        props.onDragEnd({ lat, lng });
      }
    }, 1000),
    [],
  );

  const handleDragEnd = (e: google.maps.FeatureMouseEvent) => {
    if (!props.onDragEnd) return;

    const googleLat = e.latLng?.lat();
    const googleLng = e.latLng?.lng();
    if (!googleLat || !googleLng) return;

    const { lat, lng } = convertLatLng({
      lat: googleLat.toString(),
      lng: googleLng.toString(),
    });

    onDragEndDebounced.cancel();
    onDragEndDebounced(lat, lng);
  };

  const lat = Number(props.lat);
  const lng = Number(props.lng);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <GoogleMap
        mapProps={{
          mapId: "location-map",
          center: {
            lat: lat || 39.6685458,
            lng: lng || -75.6760264,
          },
        }}
      >
        {lat && lng && (
          <MapMarker
            key={props?.location?.id}
            // icon={{
            //   url: props.isDisabled
            //     ? "/images/marker-store.svg"
            //     : "/images/marker-store-pick.svg",
            // }}
            position={{
              lat,
              lng,
            }}
            onDragEnd={props.isDisabled ? undefined : handleDragEnd}
          />
        )}
      </GoogleMap>
    </Box>
  );
};
