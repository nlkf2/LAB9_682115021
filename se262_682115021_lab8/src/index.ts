import express from "express";
import path from "path";
import * as bookController from "./controllers/bookController";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", bookController.listBooks);
app.get("/books", bookController.listBooks);
app.post("/books", bookController.addBook);
app.post("/books/delete/:bookNo", bookController.removeBook);
app.get("/books/search", bookController.searchBook);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
