import {
  connect,
  Schema,
  model,
  disconnect,
  FilterQuery,
  UpdateQuery,
} from "mongoose";
import { Category, Note } from "./types";

require("dotenv").config();

const connectDB = async () => {
  try {
    await connect(process.env["URI"]!);
    console.log("connected to mongodb");
  } catch (error) {
    console.log("failed to connect to mongodb");
  }
};

const CategorySchema = new Schema<Category>({
  title: { type: String, required: true },
  subject: { type: String, required: true },
});

const noteSchema = new Schema<Note>({
  id: { type: Number, required: true },
  category: { type: CategorySchema, required: true },
  title: { type: String, required: true },
  body: { type: String, requried: false },
  date: { type: Date, requried: true },
});

const CategoryModel = model<Category>("categories", CategorySchema);

const NoteModel = model<Note>("notes", noteSchema);

export const insertNote = async (note: Note) => {
  await connectDB();
  const newNote = new NoteModel(note);
  await newNote.save();
  await disconnect();
};

export const insertCategory = async (category: Category) => {
  await connectDB();
  const newCategory = new CategoryModel(category);
  await newCategory.save();
  await disconnect();
};

export const getNote = async (filter: FilterQuery<Note>) => {
  await connectDB();
  const res = await NoteModel.find(filter);
  return res;
};

export const getCategory = async (filter: FilterQuery<Category>) => {
  await connectDB();
  const res = await CategoryModel.find(filter);
  return res;
};

export const updateNote = async (
  filter: FilterQuery<Note>,
  update: UpdateQuery<Note>
) => {
  await connectDB();
  await NoteModel.updateMany(filter, update);
  await disconnect();
};

export const updateCategory = async (
  filter: FilterQuery<Category>,
  update: UpdateQuery<Category>
) => {
  await connectDB();
  await CategoryModel.updateMany(filter, update);
  await disconnect();
};

export const deleteNote = async (filter: FilterQuery<Note>) => {
  await connectDB();
  await NoteModel.deleteMany(filter);
  await disconnect();
};

export const deleteCategory = async (filter: FilterQuery<Category>) => {
  await connectDB();
  await CategoryModel.deleteMany(filter);
  await disconnect();
};
