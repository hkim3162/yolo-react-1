
// const fetchPhotoByID = (photoID) => {
//   return fetch(`http://localhost:3001/v1/photos/${photoID}`, {mode: 'cors'})
//     .then((response) => response.json());
// }

const fetchPhotos = () => {
  return fetch(`http://localhost:3001/v1/photos`, {mode: 'cors'})
    .then((response) => response.json())
}

const sendPhotosToAPI = (imageData) => {
  return fetch(`http://localhost:3001/v1/photos`, {
  mode: 'cors',
  credentials: 'same-origin',
  headers: {'content-type': 'application/json'},
  method: 'POST',
  body: JSON.stringify(imageData)
  })
}


export default {
  sendPhotosToAPI: sendPhotosToAPI,
  fetchPhotos: fetchPhotos
}