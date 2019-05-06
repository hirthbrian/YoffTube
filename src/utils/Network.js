const API_KEY = 'AIzaSyA8oHYJ-Cn_OLX82_F3zk9T4x2u2Lq7Twc';
const API_URL = 'https://www.googleapis.com/youtube/v3/';

export const getSearchUrl = (query) => {
  const encodedURI = encodeURIComponent(query);
  return `${API_URL}search?part=id&q=${encodedURI}&type=video&maxResults=5&key=${API_KEY}`
}

export const getVideosUrl = (videoIds) => {
  const videoIdsString = videoIds.join(',')
  return `${API_URL}videos?part=snippet,statistics,contentDetails&id=${videoIdsString}&key=${API_KEY}`
}
