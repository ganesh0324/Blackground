import dotenv from "dotenv";
import { cleanEnv, host, port, str, testOnly } from "envalid";

dotenv.config();

let url : String = "https://17e4-2407-1400-aa3f-9fe8-e0ae-f2a5-3816-e699.ngrok-free.app";

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly("test"),
    choices: ["development", "production", "test"],
  }),
  HOST: host({
    devDefault: testOnly(`${url}`),
  }),
  PORT: port({ devDefault: testOnly(3000) }),
  PUBLIC_URL: str({
    devDefault: testOnly(`https://${url}`),
  }),
  DB_PATH: str({ devDefault: ":memory:" }),
  COOKIE_SECRET: str({ devDefault: "00000000000000000000000000000000" }),
});
