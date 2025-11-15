export function extractEpisodeIds(episodeUrls: string[], limit?: number): number[] {
  const ids = episodeUrls.map((url) => {
    const match = url.match(/\/episode\/(\d+)$/);
    return match ? Number(match[1]) : NaN;
  }).filter((n) => Number.isFinite(n)) as number[];
  return typeof limit === 'number' ? ids.slice(0, limit) : ids;
}

export default extractEpisodeIds;

