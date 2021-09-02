import cors from "cors";
import express from "express";
import path from "path";
import {
  deleteCategory,
  deleteNote,
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
  return res.json({ sucess: true, notes });
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
  return res.json({
    success: true,
    notes: [...categorieTitles, ...categorieSubjects, ...titles, ...bodies],
  });
});

app.get("/notes/category/:category", async (req, res) => {
  const category = req.params.category;
  const notes = await getNote({ "category.title": category });
  return res.json({ sucess: true, notes });
});

app.post("/notes/category", async (req, res) => {
  const newCategory: Category = req.body.category;
  await insertCategory(newCategory);
  return res.json({ success: true });
});

app.post("/notes/", async (req, res) => {
  const newNote: Note = req.body.notes;
  newNote.id = await getNewId();
  await insertNote(newNote);
  return res.json({ success: true, note: newNote });
});

app.put("/notes/category", async (req, res) => {
  const category: Category = req.body.category;
  await updateCategory({ title: category.title }, category);
  return res.json({ success: true });
});

app.put("/notes/", async (req, res) => {
  const note: Note = req.body.note;
  await updateNote({ id: note.id }, note);
  return res.json({ success: true });
});

app.delete("/category/:title", async (req, res) => {
  const title = req.params.title;
  await deleteCategory({ title });
  return res.json({ success: true });
});

app.delete("/notes/:id", async (req, res) => {
  const id = Number(req.params.id);
  await deleteNote({ id });
  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
