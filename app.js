const express = require("express");
const morgan = require('morgan');
const app = express();
const port = 3000;

//! memanggil express layout
const expressLayouts = require('express-ejs-layouts');
//! untuk menggunakan express layoutnya (third-party middleware punya express)
app.use(expressLayouts);

//! third-party middleware morgan
app.use(morgan('dev'));

//? memberitahukan express kalo kita viewnya menggunakan ejs
app.set("view engine", "ejs");

// Applicattion level middleware
app.use((req,res,next) => {
  console.log('Time: ', Date.now());
  next();
});

// Build in middleware
app.use(express.static('public'));



app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Efraim",
      email: "hayoappa@gmail.com",
    },
    {
      nama: "urel",
      email: "gataumales@gmail.com",
    },
    {
      nama: "Molly",
      email: "hayamaja@gmail.com",
    },
    {
      nama: "Ebong",
      email: "apaliatliat@gmail.com",
    },
  ];

  res.render("index", {
    layout : 'layouts/main-layout',
    nama: "efraim urel palodang",
    tittle: "Halaman Home",
    mahasiswa
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout : 'layouts/main-layout',
    tittle : 'Halaman About'
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout : 'layouts/main-layout',
    tittle : 'Halaman Contact'
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});
