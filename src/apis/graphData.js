import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/"
    : "https://diplomski-api.vercel.app/api/v1/oglasi";

export default axios.create({
  baseURL,
});
