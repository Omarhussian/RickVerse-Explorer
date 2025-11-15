import axiosClient from './axiosClient';

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export async function fetchEpisodesByIds(ids: number[]): Promise<Episode[]> {
  if (ids.length === 0) return [];
  const idPath = ids.join(',');
  const { data } = await axiosClient.get<Episode | Episode[]>(`/episode/${idPath}`);
  return Array.isArray(data) ? data : [data];
}

