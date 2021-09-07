"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteExists = exports.categoryExists = exports.getNewId = exports.deleteCategory = exports.deleteNote = exports.updateCategory = exports.updateNote = exports.getCategory = exports.getNote = exports.insertCategory = exports.insertNote = void 0;
const mongoose_1 = require("mongoose");
require("dotenv").config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, mongoose_1.connect)(process.env["URI"]);
        console.log("connected to mongodb");
    }
    catch (error) {
        console.log("failed to connect to mongodb");
    }
});
const CategorySchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true },
});
const noteSchema = new mongoose_1.Schema({
    id: { type: Number, required: true },
    category: { type: CategorySchema, required: true },
    title: { type: String, required: true },
    body: { type: String, requried: false },
    date: { type: Date, requried: true },
});
const CategoryModel = (0, mongoose_1.model)("categories", CategorySchema);
const NoteModel = (0, mongoose_1.model)("notes", noteSchema);
const insertNote = (note) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    const newNote = new NoteModel(note);
    yield newNote.save();
    yield (0, mongoose_1.disconnect)();
});
exports.insertNote = insertNote;
const insertCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    const newCategory = new CategoryModel(category);
    yield newCategory.save();
    yield (0, mongoose_1.disconnect)();
});
exports.insertCategory = insertCategory;
const getNote = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    const res = yield NoteModel.find(filter);
    return res;
});
exports.getNote = getNote;
const getCategory = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    const res = yield CategoryModel.find(filter);
    return res;
});
exports.getCategory = getCategory;
const updateNote = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    yield NoteModel.updateMany(filter, update);
    yield (0, mongoose_1.disconnect)();
});
exports.updateNote = updateNote;
const updateCategory = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    yield CategoryModel.updateMany(filter, update);
    yield (0, mongoose_1.disconnect)();
});
exports.updateCategory = updateCategory;
const deleteNote = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    yield NoteModel.deleteMany(filter);
    yield (0, mongoose_1.disconnect)();
});
exports.deleteNote = deleteNote;
const deleteCategory = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    yield CategoryModel.deleteMany(filter);
    yield (0, mongoose_1.disconnect)();
});
exports.deleteCategory = deleteCategory;
const getNewId = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    const res = yield (0, exports.getNote)({});
    if (res.length > 0) {
        yield (0, mongoose_1.disconnect)();
        return Math.max(...res.map((note) => note.id)) + 1;
    }
    else {
        yield (0, mongoose_1.disconnect)();
        return 1;
    }
});
exports.getNewId = getNewId;
const categoryExists = (category) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    const res = yield (0, exports.getCategory)({
        "category.title": category.title,
    });
    if (res.length > 0) {
        yield (0, mongoose_1.disconnect)();
        return true;
    }
    yield (0, mongoose_1.disconnect)();
    return false;
});
exports.categoryExists = categoryExists;
const noteExists = (note) => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    const res = yield (0, exports.getNote)(note);
    if (res.length > 0) {
        yield (0, mongoose_1.disconnect)();
        return true;
    }
    yield (0, mongoose_1.disconnect)();
    return false;
});
exports.noteExists = noteExists;
