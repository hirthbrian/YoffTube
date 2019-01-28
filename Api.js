const API_KEY = 'AIzaSyAz_eGSnHruXC-zxNJYzGsxw2AtbnLMJb8';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';

export const search = (query) => {
  return fetch(`${API_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}`)
    .then((response) => response.json())
}