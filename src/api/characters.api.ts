import axiosClient from "./axiosClient";
import type { CharactersResponse } from "../types/character";


export type CharacterQuery = {
  page?: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
};

export async function fetchCharacters(query: CharacterQuery): Promise<CharactersResponse> {
  const params: Record<string, string | number> = {};
  if (query.page) params.page = query.page;
  if (query.name) params.name = query.name;
  if (query.status) params.status = query.status;
  if (query.species) params.species = query.species;

  const { data } = await axiosClient.get<CharactersResponse>('/character', { params });
  return data;
}
export interface CharactersParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
}

export const getCharacters = async (params: CharactersParams) => {
  const res = await axiosClient.get<CharactersResponse>("/character", { params });
  return res.data;
};