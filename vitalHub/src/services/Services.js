import axios from "axios";

// export const externalApiUrl = `https://viacep.com.br/ws/`;


// export const api = axios.create({
//   baseURL: externalApiUrl,
// });

//declarar portaApi
const portaApi = '4466'

//declarar ip da máquina
const ip = '172.16.39.85'


//definir a url padrao
const apiUrlLocal = `http://${ip}:${portaApi}/api`

//trazer configurações do axios
const api = axios.create({
  baseURL: apiUrlLocal
})

export default api