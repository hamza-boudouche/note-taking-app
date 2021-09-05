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
    return "<li class=\"list-group-item btn-outline-secondary\" id=\"" + category.title + "\" data-clickCategory=\"something\">\n  <span class=\"name\" id=\"" + category.title + "\">" + category.title + "</span>\n  <div class=\"subject\"><small>" + category.subject + "</small></div>\n  <div class=\"extra\">\n    <button type=\"button\" class=\"btn btn-outline-danger btn-xs extra\" id=\"" + category.title + "\" data-deleteCategory=\"something\">\n      <span class=\"material-icons\" id=\"" + category.title + "\"> delete </span>\n    </button>\n    <button type=\"button\" class=\"btn btn-outline-info btn-xs extra\" id=\"" + category.title + "\">\n      <span class=\"material-icons\" id=\"" + category.title + "\"> edit </span>\n    </button>\n  </div>\n  </li>";
};
var noteTemplate = function (note) {
    return "<li class=\"list-group-item btn-outline-secondary\" id=\"" + note.id + "\" data-clickNote=\"something\">\n  <span class=\"name\" id=\"" + note.id + "\">" + note.title + "</span>\n  <div class=\"subject\"><small>" + note.category.title + "</small></div>\n  <div class=\"extra\">\n    <button type=\"button\" class=\"btn btn-outline-danger btn-xs extra\" id=\"" + note.id + "\" data-deleteNote=\"something\">\n      <span class=\"material-icons\" id=\"" + note.id + "\"> delete </span>\n    </button>\n  </div>\n  </li>";
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
    for (var _c = 0, _d = document.querySelectorAll("[data-clickCategory]"); _c < _d.length; _c++) {
        var element = _d[_c];
        element.addEventListener("click", clickCategory);
    }
    for (var _e = 0, _f = document.querySelectorAll("[data-deleteCategory]"); _e < _f.length; _e++) {
        var element = _f[_e];
        element.addEventListener("click", deleteCategory);
    }
};
var renderNotes = function () {
    var notesUl = document.getElementById("notes");
    notesUl.innerHTML = "";
    if (currentState.categoryTitle) {
        var notesToRender = currentState.notes.filter(function (note) { return note.category.title === currentState.categoryTitle; });
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
    for (var _c = 0, _d = document.querySelectorAll("[data-clickNote]"); _c < _d.length; _c++) {
        var element = _d[_c];
        element.addEventListener("click", clickNote);
    }
    for (var _e = 0, _f = document.querySelectorAll("[data-deleteNote]"); _e < _f.length; _e++) {
        var element = _f[_e];
        element.addEventListener("click", deleteNote);
    }
};
var clickCategory = function (e) {
    currentState.categoryTitle = e.target.id;
    currentState.categorySubject = currentState.categories.find(function (c) { return c.title === currentState.categoryTitle; }).subject;
    renderNotes();
};
var updateCategory = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var title, subject, newTitle, res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                title = e.target.id;
                subject = currentState.categories.find(function (c) { return c.title === title; })
                    .subject;
                return [4 /*yield*/, Swal.fire({
                        title: "Input new Category name",
                        input: "email",
                        inputLabel: "Your email address",
                        inputValue: title,
                        inputPlaceholder: "Enter your email address"
                    })];
            case 1:
                newTitle = (_a.sent()).value;
                return [4 /*yield*/, fetch(url + "/notes/category", {
                        method: "PUT",
                        mode: "cors",
                        headers: {
                            Accept: "application/json",
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ category: { title: newTitle, subject: subject } })
                    })];
            case 2:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 3:
                data = _a.sent();
                if (!data.success) {
                    // @ts-ignore
                    Swal.fire("Error", "A problem occured", "error");
                }
                currentState.categories = data.categories;
                currentState.notes = data.notes;
                currentState.categoryTitle = null;
                currentState.categorySubject = null;
                currentState.noteId = null;
                renderNotes();
                renderCategories();
                return [2 /*return*/];
        }
    });
}); };
var clickNote = function (e) {
    currentState.noteId = Number(e.target.id);
    var note = currentState.notes.find(function (note) { return note.id == currentState.noteId; });
    document.getElementById("new-note-title").value =
        note.title;
    if (note.body) {
        document.getElementById("new-note-body").value = note === null || note === void 0 ? void 0 : note.body;
    }
    else {
        document.getElementById("new-note-body").value = "";
    }
};
var deleteCategory = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var title, res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                title = e.target.id;
                console.log(title);
                return [4 /*yield*/, fetch(url + "/category/" + title, { method: "DELETE" })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                if (!data.success) {
                    // @ts-ignore
                    Swal.fire("something went wrong", "the category was not deleted!", "error");
                    return [2 /*return*/];
                }
                currentState.categories = currentState.categories.filter(function (c) { return c.title != title; });
                currentState.categoryTitle = null;
                currentState.categorySubject = null;
                currentState.noteId = null;
                renderCategories();
                return [2 /*return*/];
        }
    });
}); };
var deleteNote = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var id, res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = e.target.id;
                return [4 /*yield*/, fetch(url + "/notes/" + id, { method: "DELETE" })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                if (!data.success) {
                    // @ts-ignore
                    Swal.fire("something went wrong", "the note was not deleted!", "error");
                    return [2 /*return*/];
                }
                currentState.notes = currentState.notes.filter(function (n) { return n.id != Number(id); });
                currentState.noteId = null;
                renderNotes();
                addNoteButton();
                return [2 /*return*/];
        }
    });
}); };
var addCategory = function () { return __awaiter(_this, void 0, void 0, function () {
    var categoryTitle, categorySubject, newCategory, res, data, categoriesUl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                categoryTitle = document.getElementById("new-category-title").value;
                categorySubject = document.getElementById("new-category-subject").value;
                if (!categoryTitle) {
                    // @ts-ignore
                    Swal.fire("Error", "category title missing", "error");
                    return [2 /*return*/];
                }
                newCategory = {
                    title: categoryTitle,
                    subject: categorySubject
                };
                return [4 /*yield*/, fetch(url + "/notes/category", {
                        method: "POST",
                        mode: "cors",
                        headers: {
                            Accept: "application/json",
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ category: newCategory })
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                if (!data.success) {
                    // @ts-ignore
                    Swal.fire("Error", "A problem occured", "error");
                }
                else {
                    categoriesUl = document.getElementById("categories");
                    categoriesUl.innerHTML += categoryTemplate(newCategory);
                }
                currentState.categoryTitle = categoryTitle;
                currentState.categorySubject = categorySubject;
                currentState.categories.push(newCategory);
                return [2 /*return*/];
        }
    });
}); };
var addNote = function () { return __awaiter(_this, void 0, void 0, function () {
    var noteTitle, noteBody, newNote, res, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                noteTitle = document.getElementById("new-note-title").value;
                noteBody = document.getElementById("new-note-body").value;
                if (!noteTitle) {
                    // @ts-ignore
                    Swal.fire("Error", "note title missing", "error");
                    return [2 /*return*/];
                }
                if (!(currentState.categoryTitle != null)) return [3 /*break*/, 5];
                if (!(currentState.categorySubject != null)) return [3 /*break*/, 3];
                newNote = {
                    id: currentState.noteId || 1,
                    category: {
                        subject: currentState.categorySubject,
                        title: currentState.categoryTitle
                    },
                    date: new Date(),
                    title: noteTitle,
                    body: noteBody
                };
                return [4 /*yield*/, fetch(url + "/notes", {
                        method: currentState.noteId ? "PUT" : "POST",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        },
                        body: JSON.stringify({ note: newNote })
                    })];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                if (!data.success) {
                    // @ts-ignore
                    Swal.fire("Error", "A problem occured", "error");
                }
                else {
                    currentState.notes = data.notes;
                    renderNotes();
                }
                return [3 /*break*/, 4];
            case 3:
                // @ts-ignore
                Swal.fire("Error", "category subject missing", "error");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                // @ts-ignore
                Swal.fire("Error", "category title missing", "error");
                _a.label = 6;
            case 6:
                currentState.noteId = null;
                return [2 /*return*/];
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
    currentState.noteId = null;
    renderCategories();
    renderNotes();
};
var search = function (e) { return __awaiter(_this, void 0, void 0, function () {
    var query, res, data, notes, categories, uniqueCategories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = e.target.value;
                return [4 /*yield*/, fetch(url + "/notes/search/" + query)];
            case 1:
                res = _a.sent();
                return [4 /*yield*/, res.json()];
            case 2:
                data = _a.sent();
                notes = currentState.notes;
                categories = currentState.categories;
                currentState.notes = data.notes;
                currentState.categories = currentState.notes.map(function (n) { return n.category; });
                uniqueCategories = currentState.categories.filter(function (category, index) {
                    var _category = JSON.stringify(category);
                    return (index ===
                        currentState.categories.findIndex(function (obj) {
                            return obj.title === category.title && obj.subject === category.subject;
                        }));
                });
                console.log(currentState.notes);
                console.log(currentState.categories);
                currentState.categories = uniqueCategories;
                renderCategories();
                renderNotes();
                currentState.notes = notes;
                currentState.categories = categories;
                return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(_this, void 0, void 0, function () {
    var resNotes, dataNotes, resCat, dataCat;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(url + "/notes")];
            case 1:
                resNotes = _a.sent();
                return [4 /*yield*/, resNotes.json()];
            case 2:
                dataNotes = _a.sent();
                if (!dataNotes.success) {
                    // @ts-ignore
                    Swal.fire("Error", "Error fetching notes", "error");
                    return [2 /*return*/];
                }
                currentState.notes = dataNotes.notes;
                return [4 /*yield*/, fetch(url + "/categories")];
            case 3:
                resCat = _a.sent();
                return [4 /*yield*/, resCat.json()];
            case 4:
                dataCat = _a.sent();
                if (!dataCat.success) {
                    // @ts-ignore
                    Swal.fire("Error", "Error fetching categories", "error");
                    return [2 /*return*/];
                }
                currentState.categories = dataCat.categories;
                renderCategories();
                renderNotes();
                document.querySelector("#add-note").addEventListener("click", addNote);
                document
                    .querySelector("#add-category")
                    .addEventListener("click", addCategory);
                document.querySelector("#search-bar").addEventListener("change", search);
                document
                    .querySelector("#show-all-button")
                    .addEventListener("click", showAllButton);
                document
                    .querySelector("#add-note-button")
                    .addEventListener("click", addNoteButton);
                return [2 /*return*/];
        }
    });
}); })();
