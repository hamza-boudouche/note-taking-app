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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, morgan_1.default)("combined"));
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/node_modules", express_1.default.static(path_1.default.join(__dirname, "../node_modules")));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
app.get("/notes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield (0, database_1.getNote)({});
    return res.json({ success: true, notes });
}));
app.get("/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, database_1.getCategory)({});
    return res.json({ success: true, categories });
}));
app.get("/notes/search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield (0, database_1.getNote)({});
    return res.json({ success: true, notes });
}));
app.get("/notes/search/:query", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchQuery = req.params.query;
    const categorieTitles = yield (0, database_1.getNote)({
        "category.title": { $regex: new RegExp(searchQuery) },
    });
    const categorieSubjects = yield (0, database_1.getNote)({
        "category.subject": { $regex: new RegExp(searchQuery) },
    });
    const titles = yield (0, database_1.getNote)({ title: { $regex: new RegExp(searchQuery) } });
    const bodies = yield (0, database_1.getNote)({ body: { $regex: new RegExp(searchQuery) } });
    let result = [...categorieTitles, ...categorieSubjects, ...titles, ...bodies];
    result = result.filter((note, index) => {
        const _note = JSON.stringify(note);
        return (index ===
            result.findIndex((obj) => {
                return JSON.stringify(obj) === _note;
            }));
    });
    return res.json({
        success: true,
        notes: result,
    });
}));
app.get("/notes/category/:category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const notes = yield (0, database_1.getNote)({ "category.title": category });
    return res.json({ sucess: true, notes });
}));
app.post("/notes/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = req.body.category;
    console.log(newCategory);
    yield (0, database_1.insertCategory)(newCategory);
    return res.json({ success: true });
}));
app.post("/notes/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = req.body.note;
    if (yield (0, database_1.categoryExists)(newNote.category)) {
        newNote.id = yield (0, database_1.getNewId)();
        yield (0, database_1.insertNote)(newNote);
        const notes = yield (0, database_1.getNote)({});
        return res.json({ success: true, note: newNote, notes });
    }
    return res.json({ success: false, error: "category doesn't exist" });
}));
app.put("/notes/category", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oldCategory = req.body.oldCategory;
    const newCategory = req.body.newCategory;
    if (yield (0, database_1.categoryExists)(oldCategory)) {
        yield (0, database_1.updateCategory)({ title: oldCategory.title }, newCategory);
        yield (0, database_1.updateNote)({ "category.title": oldCategory.title }, { category: newCategory });
        const notes = yield (0, database_1.getNote)({});
        const categories = yield (0, database_1.getCategory)({});
        return res.json({ success: true, notes, categories });
    }
    return res.json({ success: false, error: "category doesn't exist" });
}));
app.put("/notes/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const note = req.body.note;
    if (yield (0, database_1.categoryExists)(note.category)) {
        yield (0, database_1.updateNote)({ id: note.id }, note);
        const notes = yield (0, database_1.getNote)({});
        return res.json({ success: true, notes });
    }
    return res.json({ success: false, error: "category doesn't exist" });
}));
app.delete("/category/:title", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.params.title;
    if (yield (0, database_1.categoryExists)({ title })) {
        yield (0, database_1.deleteCategory)({ title });
        return res.json({ success: true });
    }
    return res.json({ success: false, error: "category doesn't exist" });
}));
app.delete("/notes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    if (yield (0, database_1.noteExists)({ id })) {
        yield (0, database_1.deleteNote)({ id });
        return res.json({ success: true });
    }
    return res.json({ success: false, error: "note doesn't exist" });
}));
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
