import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "oglasi"
    : "postgres://default:gXh7vYRPn1Cz@ep-royal-dust-927701-pooler.eu-central-1.postgres.vercel-storage.com:5432/verceldb";

export default axios.create({
  baseURL,
});
