import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import {
  categoryExists,
  deleteCategory,
  deleteNote,
  getCategory,
  getNewId,
  getNote,
  insertCategory,
  insertNote,
  noteExists,
  updateCategory,
  updateNote,
} from "./database";
import { Category, Note } from "./types";

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("combined"));
app.use("/", express.static(path.join(__dirname, "../public")));
app.use(
  "/node_modules",
  express.static(path.join(__dirname, "../node_modules"))
);
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
  const newNote: Note = req.body.note;
  if (await categoryExists(newNote.category)) {
    newNote.id = await getNewId();
    await insertNote(newNote);
    const notes = await getNote({});
    return res.json({ success: true, note: newNote, notes });
  }
  return res.json({ success: false, error: "category doesn't exist" });
});

app.put("/notes/category", async (req, res) => {
  const oldCategory: Category = req.body.oldCategory;
  const newCategory: Category = req.body.newCategory;
  if (await categoryExists(oldCategory)) {
    await updateCategory({ title: oldCategory.title }, newCategory);
    await updateNote(
      { "category.title": oldCategory.title },
      { category: newCategory }
    );
    const notes = await getNote({});
    const categories = await getCategory({});
    return res.json({ success: true, notes, categories });
  }
  return res.json({ success: false, error: "category doesn't exist" });
});

app.put("/notes/", async (req, res) => {
  const note: Note = req.body.note;
  if (await categoryExists(note.category)) {
    await updateNote({ id: note.id }, note);
    const notes = await getNote({});
    return res.json({ success: true, notes });
  }
  return res.json({ success: false, error: "category doesn't exist" });
});

app.delete("/category/:title", async (req, res) => {
  const title = req.params.title;
  if (await categoryExists({ title })) {
    await deleteCategory({ title });
    return res.json({ success: true });
  }
  return res.json({ success: false, error: "category doesn't exist" });
});

app.delete("/notes/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (await noteExists({ id })) {
    await deleteNote({ id });
    return res.json({ success: true });
  }
  return res.json({ success: false, error: "note doesn't exist" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
