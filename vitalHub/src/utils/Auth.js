import AsyncStorage from "@react-native-async-storage/async-storage";

import { jwtDecode } from "jwt-decode";

import { encode, decode } from "base-64";

if (!global.atob) {
  global.atob = decode;
}

if (!global.btoa) {
  global.btoa = encode;
}

export const userDecodeToken = async () => {
  const token = (await AsyncStorage.getItem("token"));

  if (token === null) {
    return null;
  }

  //Decodifica o token recebido
  const decoded = jwtDecode(token);

  return {
    idUsuario: decoded.jti,
    name: decoded.name,
    role: decoded.role,
    email: decoded.email,
    token: token,
  };
  
};
export const userLogoutToken = async () => {
  const token = await AsyncStorage.removeItem("token");
};

export const tokenClean = async () => {
  const token = JSON.parse(await AsyncStorage.getItem("token")).token;

  if (token === null) {
    return null;
  }
  return token;
};
