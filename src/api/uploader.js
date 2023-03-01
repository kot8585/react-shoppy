import axios from 'axios';

export async function uploadImage(imageUrl) {
  const cloudName = 'dxy2ifpy4';
  const resourceType = 'image';
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

  const formData = new FormData();
  formData.append('file', imageUrl);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);

  return axios
    .post(url, formData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.error(error));
}
