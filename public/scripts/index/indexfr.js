var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var url = "http://localhost:3000";
var currentState = {
    categoryTitle: null,
    categorySubject: null,
    noteId: null,
    categories: [],
    notes: []
};
var categoryTemplate = function (category) {
    return "<li class=\"list-group-item btn-outline-secondary\" id=\"" + category.title + "\" onclick=\"clickCategory(event)\">\n  <span class=\"name\">" + category.title + "</span>\n  <div class=\"subject\"><small>" + category.subject + "</small></div>\n  <div class=\"extra\">\n    <button type=\"button\" class=\"btn btn-outline-danger btn-xs extra\">\n      <span class=\"material-icons\"> delete </span>\n    </button>\n    <button type=\"button\" class=\"btn btn-outline-info btn-xs extra\">\n      <span class=\"material-icons\"> edit </span>\n    </button>\n  </div>\n  </li>";
};
var noteTemplate = function (note) {
    return "<li class=\"list-group-item btn-outline-secondary\" id=\"" + note.id + "\" onclick=\"clickNote(event)\">\n  <span class=\"name\">" + note.title + "</span>\n  <div class=\"subject\"><small>" + note.category.title + "</small></div>\n  <div class=\"extra\">\n    <button type=\"button\" class=\"btn btn-outline-danger btn-xs extra\">\n      <span class=\"material-icons\"> delete </span>\n    </button>\n  </div>\n  </li>";
};
var renderCategories = function () {
    var categoriesUl = document.getElementById("categories");
    categoriesUl.innerHTML = "";
    if (currentState.categoryTitle) {
        var categoriesToRender = currentState.categories.filter(function (cat) { return cat.title === currentState.categoryTitle; });
        for (var _i = 0, categoriesToRender_1 = categoriesToRender; _i < categoriesToRender_1.length; _i++) {
            var category = categoriesToRender_1[_i];
            categoriesUl.innerHTML += categoryTemplate(category);
        }
    }
    else {
        for (var _a = 0, _b = currentState.categories; _a < _b.length; _a++) {
            var category = _b[_a];
            categoriesUl.innerHTML += categoryTemplate(category);
        }
    }
};
var renderNotes = function () {
    var notesUl = document.getElementById("notes");
    notesUl.innerHTML = "";
    if (currentState.categoryTitle) {
        var notesToRender = currentState.notes.filter(function (note) { return note.title === currentState.categoryTitle; });
        for (var _i = 0, notesToRender_1 = notesToRender; _i < notesToRender_1.length; _i++) {
            var note = notesToRender_1[_i];
            notesUl.innerHTML += noteTemplate(note);
        }
    }
    else {
        for (var _a = 0, _b = currentState.notes; _a < _b.length; _a++) {
            var note = _b[_a];
            notesUl.innerHTML += noteTemplate(note);
        }
    }
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url + "/notes")];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                if (!data.success) {
                    alert("Error fetching notes");
                    return [2 /*return*/];
                }
                currentState.notes = data.notes;
                currentState.categories = currentState.notes.map(function (note) { return note.category; });
                currentState.categories = currentState.categories.filter(function (cat, pos) {
                    return currentState.categories.indexOf(cat) == pos;
                });
                renderCategories();
                renderNotes();
                return [2 /*return*/];
        }
    });
}); })();
var clickCategory = function (e) {
    currentState.categoryTitle = e.target.id;
    currentState.categorySubject = currentState.categories.find(function (c) { return c.title === currentState.categoryTitle; }).subject;
    renderCategories();
    renderNotes();
};
var clickNote = function (e) {
    currentState.noteId = Number(e.target.id);
    var note = currentState.notes.find(function (note) { return note.id === currentState.noteId; });
    document.getElementById("new-note-title").value =
        note.title;
    if (note.body) {
        document.getElementById("new-note-body").value = note === null || note === void 0 ? void 0 : note.body;
    }
    else {
        document.getElementById("new-note-body").value = "";
    }
};
var addCategory = function () { return __awaiter(_this, void 0, void 0, function () {
    var categoryTitle, categorySubject, newCategory, res, data, categoriesUl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                categoryTitle = document.getElementById("new-category-title").value;
                categorySubject = document.getElementById("new-category-subject").value;
                if (!categoryTitle) {
                    alert("category title missing");
                    return [2 /*return*/];
                }
                newCategory = {
                    title: categoryTitle,
                    subject: categorySubject
                };
                return [4 /*yield*/, fetch(url + "/notes/category", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        body: JSON.stringify(newCategory)
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                if (!data.success) {
                    alert("A problem occured");
                }
                else {
                    categoriesUl = document.getElementById("categories");
                    categoriesUl.innerHTML += categoryTemplate(newCategory);
                }
                currentState.categoryTitle = categoryTitle;
                currentState.categorySubject = categorySubject;
                return [2 /*return*/];
        }
    });
}); };
var addNote = function () { return __awaiter(_this, void 0, void 0, function () {
    var noteTitle, noteBody, newNote, res, data, notesUl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                noteTitle = document.getElementById("new-note-title").value;
                noteBody = document.getElementById("new-note-body").value;
                if (!noteTitle) {
                    alert("note title missing");
                    return [2 /*return*/];
                }
                if (!(currentState.categoryTitle != null)) return [3 /*break*/, 5];
                if (!(currentState.categorySubject != null)) return [3 /*break*/, 3];
                newNote = {
                    id: 1,
                    category: {
                        subject: currentState.categorySubject,
                        title: currentState.categoryTitle
                    },
                    date: new Date(),
                    title: noteTitle,
                    body: noteBody
                };
                return [4 /*yield*/, fetch(url + "/notes", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        body: JSON.stringify(newNote)
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                if (!data.success) {
                    alert("A problem occured");
                }
                else {
                    notesUl = document.getElementById("notes");
                    newNote.id = data.note.id;
                    notesUl.innerHTML += noteTemplate(newNote);
                }
                return [3 /*break*/, 4];
            case 3:
                alert("category subject missing");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                alert("category title missing");
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
var addNoteButton = function () {
    document.getElementById("new-note-title").value = "";
    document.getElementById("new-note-body").value = "";
};
var showAllButton = function () {
    currentState.categoryTitle = null;
    currentState.categorySubject = null;
    renderCategories();
    renderNotes();
};
