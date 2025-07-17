import { IFileResponse } from "src/interfaces";
import { IStaff } from "@employee/interface";
import { IStudentInfo } from "@student/interface";

export interface ILocation {
  id: string;
  name: string;
  duration: number;
  lng: number;
  lat: number;
  isActive: boolean;
}

export interface IInfo {
  id: string;
  image?: IFileResponse;
  name: string;
  number: string;
  type_id: string;
  staff_id: number[];
  staff?: IStaff[];
  seats: string;
  wheels: string;
}

export interface IRoute {
  id: string;
  name: string;
  bus: IInfo;
  bus_id: string;
  student_count: number;
  depart_time: string;
  arrival_time: string;
  location: IRouteLocation[];
}

export interface IVehicleStudent {
  id?: string;
  route_location_id: string;
  student_id: string;
  student: IStudentInfo;
  routeLocation: IRouteLocation;
  price: number;
}

export interface IRouteLocation {
  id: string;
  location: ILocation;
  route: IRoute;
  arrival_time: string;
  depart_time: string;
  price: number;
  student_count: string;
  isActive: boolean;
}

export interface IVehicleDashboardStatus {
  students: number;
  routes: number;
  locations: number;
  buses: number;
}
