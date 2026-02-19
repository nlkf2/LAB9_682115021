import fs from "fs";
import path from "path";

export type Book = {
  bookNo: number;
  bookName: string;
};

type DbShape = { books: Book[] };

const dbPath = path.join(process.cwd(), "data", "books.json");

// TODO 1: Implement readDb(): DbShape
// - If file not found: create data folder + books.json with { books: [] }
// - Read file text (utf-8) and JSON.parse
function readDb(): DbShape {
  // ถ้าไฟล์ยังไม่มี → สร้างโฟลเดอร์ + ไฟล์เริ่มต้น
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });

    const initData: DbShape = { books: [] };
    fs.writeFileSync(dbPath, JSON.stringify(initData, null, 2), "utf-8");
    return initData;
  }

  // ถ้ามีไฟล์แล้ว → อ่านและแปลง JSON
  const text = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(text);

  // TODO 2: Implement writeDb(db: DbShape)
  // - JSON.stringify(db, null, 2) and writeFileSync utf-8
}
function writeDb(db: DbShape) {
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf-8");
  }

export function readBooks(): Book[] {
  // TODO 3: return readDb().books
  const db = readDb();
  return db.books; // TODO 3
}

export function addBook(bookName: string): Book {
  // TODO 4:
  // - read db
  // - find max bookNo
  // - create newBook { bookNo: max+1, bookName }
  // - push, write db
  // - return newBook
  if (!bookName || bookName.trim() === "") {
    throw new Error("Book name is required");
  }
  const db = readDb();
  const maxBookNo = db.books.reduce(
    (max, book) => Math.max(max, book.bookNo),
    0,
  );
  const newBook: Book = { bookNo: maxBookNo + 1, bookName: bookName.trim() };
  db.books.push(newBook);
  writeDb(db);
  return newBook;
}

export function deleteBook(bookNo: number): boolean {
  const db = readDb();

  const index = db.books.findIndex(b => b.bookNo === bookNo);
  if (index === -1) return false;

  db.books.splice(index, 1);
  writeDb(db);

  return true;
}

export function searchBooks(keyword: string): Book[] {
  const db = readDb();

  return db.books.filter(b =>
    b.bookName.toLowerCase().includes(keyword.toLowerCase())
  );
}

