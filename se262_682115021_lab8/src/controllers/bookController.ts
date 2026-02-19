import { Request, Response } from "express";
import {
  readBooks,
  addBook as addBookService,
  deleteBook,
  searchBooks
} from "../services/fileDb";


// GET /books
export const listBooks = (req: Request, res: Response) => {
  const books = readBooks();
  res.render("books", { books });
};


// POST /books
export const addBook = (req: Request, res: Response) => {
  const bookName = req.body.bookName?.trim();

  if (!bookName) {
    return res.status(400).send("bookName is required");
  }

  addBookService(bookName);
  res.redirect("/books");
};


// POST /books/delete/:bookNo
export const removeBook = (req: Request, res: Response) => {
  const bookNo = parseInt(req.params.bookNo);

  const success = deleteBook(bookNo);

  if (!success) {
    return res.status(404).send("Book not found");
  }

  res.redirect("/books");
};


// GET /books/search?q=...
export const searchBook = (req: Request, res: Response) => {
  const keyword = req.query.q as string;
  const results = searchBooks(keyword || "");
  res.json(results);   // ⚠️ ต้อง json ไม่ใช่ render
};

