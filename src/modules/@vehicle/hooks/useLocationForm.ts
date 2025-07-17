import { type LatLng } from "@utils/geocoding";
import type { ILocation } from "../interface";
import { useEffect, useState } from "react";
import type { HttpError } from "@refinedev/core";
import { useRefineForm } from "@hooks/useForm";

type Props = {
  id?: string;
  action: "create" | "edit";
  onMutationSuccess?: () => void;
};

export const useLocationForm = (props: Props) => {
  const form = useRefineForm<ILocation, HttpError, ILocation>({
    defaultValues: {
      name: "",
      isActive: true,
      lat: 39.66853,
      lng: -75.67602,
    },
    refineCoreProps: {
      id: props.id,
      action: props.action,
      redirect: false,
      onMutationSuccess: () => {
        props.onMutationSuccess?.();
      },
    },
  });
  const location = form.refineCore.queryResult?.data?.data;

  const [latLng, setLatLng] = useState<Partial<LatLng>>({
    lat: props.action === "create" ? 39.66853 : undefined,
    lng: props.action === "create" ? -75.67602 : undefined,
  });

  useEffect(() => {
    console.log(location)
    if (location) {
      setLatLng({
        lat: Number(location.lat),
        lng: Number(location.lng),
      });
    }
  }, [location]);

  // we are using these debounced values to get lang and lat from the address text
  // to minimize the number of requests, we are using debounced values

  const handleMapOnDragEnd = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    form.setValue("lat", lat);
    form.setValue("lng", lng);
  };

  const isLoading =
    form.refineCore?.queryResult?.isFetching || form.refineCore.formLoading;

  return {
    ...form,
    location,
    formLoading: isLoading,
    latLng,
    handleMapOnDragEnd,
  };
};
