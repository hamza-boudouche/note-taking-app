import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import {
  deleteCategory,
  deleteNote,
  getCategory,
  getNewId,
  getNote,
  insertCategory,
  insertNote,
  updateCategory,
  updateNote,
} from "./database";
import { Category, Note } from "./types";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("combined"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.get("/notes", async (req, res) => {
  const notes = await getNote({});
  return res.json({ success: true, notes });
});

app.get("/categories", async (req, res) => {
  const categories = await getCategory({});
  return res.json({ success: true, categories });
});

app.get("/notes/search", async (req, res) => {
  const notes = await getNote({});
  return res.json({ success: true, notes });
});

app.get("/notes/search/:query", async (req, res) => {
  const searchQuery = req.params.query;
  const categorieTitles = await getNote({
    "category.title": { $regex: new RegExp(searchQuery) },
  });
  const categorieSubjects = await getNote({
    "category.subject": { $regex: new RegExp(searchQuery) },
  });
  const titles = await getNote({ title: { $regex: new RegExp(searchQuery) } });
  const bodies = await getNote({ body: { $regex: new RegExp(searchQuery) } });
  let result = [...categorieTitles, ...categorieSubjects, ...titles, ...bodies];
  result = result.filter((note, index) => {
    const _note = JSON.stringify(note);
    return (
      index ===
      result.findIndex((obj) => {
        return JSON.stringify(obj) === _note;
      })
    );
  });
  return res.json({
    success: true,
    notes: result,
  });
});

app.get("/notes/category/:category", async (req, res) => {
  const category = req.params.category;
  const notes = await getNote({ "category.title": category });
  return res.json({ sucess: true, notes });
});

app.post("/notes/category", async (req, res) => {
  const newCategory: Category = req.body.category;
  console.log(newCategory);
  await insertCategory(newCategory);
  return res.json({ success: true });
});

app.post("/notes/", async (req, res) => {
  // check if category is already present, else return success: false and error message
  const newNote: Note = req.body.note;
  console.log(req.body);
  newNote.id = await getNewId();
  await insertNote(newNote);
  return res.json({ success: true, note: newNote });
});

app.put("/notes/category", async (req, res) => {
  // check if category is present, else return success: false and error message
  const category: Category = req.body.category;
  await updateCategory({ title: category.title }, category);
  return res.json({ success: true });
});

app.put("/notes/", async (req, res) => {
  // check if category is present, else return success: false and error message
  const note: Note = req.body.note;
  await updateNote({ id: note.id }, note);
  return res.json({ success: true });
});

app.delete("/category/:title", async (req, res) => {
  //check if it exists and has no associated notes, else return success: false and error message
  const title = req.params.title;
  await deleteCategory({ title });
  return res.json({ success: true });
});

app.delete("/notes/:id", async (req, res) => {
  //check if exists, else return success: false and error message
  const id = Number(req.params.id);
  await deleteNote({ id });
  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
