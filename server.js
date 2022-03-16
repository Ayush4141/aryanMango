const mongoose = require("mongoose");
const express = require("express");
const app = express();
const DB = "mongodb://127.0.0.1:27017/LibraryDB";
const Book = require("./Book");
const { Accession_No } = require("./helper");
const { v4: uuid } = require("uuid");

app.use(express.json());

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connections successful");
  })
  .catch((err) => {
    console.log(err);
  });

// Route
app.post("/insert_ten_entries", async (req, res) => {
  try {
    for (let x = 1; x <= 10; x++) {
      let ISBN = uuid();
      let AcNo = Accession_No();
      let title = "random title";
      let author = "random author";
      let publisher = "random publisher";
      let edition = x;
      let yearOfPublication = 2022;
      let category = "Java";
      let totalPages = 787;
      let price = 420;

      await Book.create({
        ISBN,
        Accession_No: AcNo,
        title,
        author,
        publisher,
        edition,
        yearOfPublication,
        category,
        totalPages,
        price,
      });
    }
    res.json({ msg: "Ten Entries inserted in mongoDB" });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

app.post("/insert_manual_entry", async (req, res) => {
  try {
    const book = req.body;

    let ISBN = book.ISBN;
    let AcNo = Accession_No();
    let title = book.title;
    let author = book.author;
    let publisher = book.author;
    let edition = book.edition;
    let yearOfPublication = book.yearOfPublication;
    let category = book.category;
    let totalPages = book.totalPages;
    let price = book.price;

    await Book.create({
      ISBN,
      Accession_No: AcNo,
      title,
      author,
      publisher,
      edition,
      yearOfPublication,
      category,
      totalPages,
      price,
    });

    res.json({ msg: "Entry inserted in mongoDB" });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}...`);
});
