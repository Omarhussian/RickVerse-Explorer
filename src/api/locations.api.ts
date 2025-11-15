import axiosClient from './axiosClient';

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

export async function fetchLocationById(id: number): Promise<Location> {
  const { data } = await axiosClient.get<Location>(`/location/${id}`);
  return data;
}

