// const mongoose = require("mongoose");
const express = require("express");
const app = express();
const DB = "mongodb://127.0.0.1:3360/LibraryDB";
const Book = require("./Book");
// const { Accession_No } = require("./helper");
const { v4: uuid } = require("uuid");

app.use(express.json());

maria
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connections successful");
  })
  .catch((err) => {
    console.log(err);
  });


app.post("/deleteBook", async (req, res) => {
  // To get to know that which book we want to delete.
  let Accession_No = req.data;
  LibraryDB.collection('Books').deleteOne({ "Accession_No": Accession_No }, function(err, result) {
    console.log('Book deleted');
    LibraryDB.collection('Reader').deleteOne({ "Accession_No": Accession_No }, function(err, result) {
      console.log('Reader deleted');
    });
    LibraryDB.close();
  });
}
         
app.post("/updateBook", async (req, res) => {
  // To get to know that which book we want to update.
  let Accession_No = req.data;
  const bookRecord = LibraryDB.collection('Books').findOne({ "Accession_No": Accession_No });
  const readerRecord = LibraryDB.collection('Reader').findOne({ "Accession_No": Accession_No });
  
  let title = data.title;
  let author = data.author;
  let publisher = data.publisher;
  let edition = data.edition;
  let yearOfPublication = data.yearOfPublication;
  let category = data.category;
  let totalPages = data.totalPages;
  let price = data.price;
  
  bookRecord.update({
    title,
    author,
    publisher,
    edition,
    yearOfPublication,
    category,
    totalPages,
    price,
  });
  
  readerRecord.update();
  
  bookRecord.save();
  readerRecord.save();
}


// API for addition of a book:
app.post("/addBook", async (req, res) => {
  const Accession_No = uuid();
  const data = req.data;
  let ISBN = uuid();
  let Accession_No = uuid();
  let title = data.title;
  let author = data.author;
  let publisher = data.publisher;
  let edition = data.edition;
  let yearOfPublication = data.yearOfPublication;
  let category = data.category;
  let totalPages = data.totalPages;
  let price = data.price;
  
  await Book.create({
    ISBN,
    Accession_No: Accession_No,
    title,
    author,
    publisher,
    edition,
    yearOfPublication,
    category,
    totalPages,
    price,
  });
  
  await Reader.create({
    readerId: uuid(),
    Accession_No: Accession_No,
    issueDate: Date.now(),
    returnDate: Date.now()
  });
}

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
