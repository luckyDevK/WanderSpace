import axios from 'axios';

export async function getPlaces() {
  const res = await axios.get('http://localhost:5000/place/');

  return res.data;
}
