require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db/database");

app.use(cors());
app.use(express.json());

//ROUTES
//svi oglasi
app.get("/oglasi", async (req, res) => {
  try {
    const sviOglasi = await db.query(
      "SELECT * FROM oglasi WHERE (tip='stan' OR tip='kuca') AND datum > '2022-01-01' AND cijena_m2 > 10"
    );
    res.json(sviOglasi.rows);
  } catch (err) {
    console.error(err.message);
  }
});


//oglasi koji se prikazuju
app.get("/prikazoglasi", async (req, res) => {
  try {
    const sviOglasi = await db.query(
      "SELECT o.id, o.povrsina, o.cijena, o.cijena_m2, o.naslov, o.link, o.tip, c.ocjena, o.lokacija, o.slika, ST_X(o.geom::geometry) AS lon, ST_Y(o.geom::geometry) AS lat FROM oglasi o JOIN ocjene c ON o.njuskalo_id = c.njuskalo_id WHERE o.geom IS NOT NULL AND o.tocna_lokacija = 'true' AND o.cijena_m2 > 10 AND o.stanje = 'Aktivan'"
    );
    res.json(sviOglasi.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//jedan oglasi
app.get("/oglasi/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oglas = await db.query("SELECT * FROM oglasi WHERE id = $1", [id]);

    res.json(oglas.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


const oglasiRouter = require('../src/routes/oglasiRoutes')
app.use("/api/v1/oglasi")

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
