import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "oglasi"
    : "http://localhost:4000/oglasi";

export default axios.create({
  baseURL,
});
