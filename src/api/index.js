import Api from './api';

const api = new Api({
  baseURI: '/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default api
