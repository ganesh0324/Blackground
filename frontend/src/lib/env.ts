import dotenv from "dotenv";
import { cleanEnv, host, port, str, testOnly } from "envalid";

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly("test"),
    choices: ["development", "production", "test"],
  }),
  HOST: host({
    devDefault: testOnly("https://bb43-103-10-28-198.ngrok-free.app"),
  }),
  PORT: port({ devDefault: testOnly(3000) }),
  PUBLIC_URL: str({
    devDefault: testOnly("https://bb43-103-10-28-198.ngrok-free.app"),
  }),
  DB_PATH: str({ devDefault: ":memory:" }),
  COOKIE_SECRET: str({ devDefault: "00000000000000000000000000000000" }),
});
