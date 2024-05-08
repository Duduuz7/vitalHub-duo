import { mask, unMask } from "remask";

export const mascarar = (text, formato) => mask(text, `${formato}`) 