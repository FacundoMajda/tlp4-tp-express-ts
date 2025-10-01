import jwt from "jsonwebtoken";
import { environment } from "../core/config/environment";

const config = environment.jwt;

export const sign = (payload: string | Object) => {
  return jwt.sign(payload, config.secret);
};

export const verify = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.secret);
    return { valid: true, decoded };
  } catch (error) {
    console.log("token", token, { error });
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }
    return {
      valid: false,
      msg: msg,
      decoded: null,
    };
  }
};
