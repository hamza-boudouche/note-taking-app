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
const url = "http://localhost:3000";
const currentState = {
    categoryTitle: null,
    categorySubject: null,
    noteId: null,
    categories: [],
    notes: [],
};
const categoryTemplate = (category) => {
    return `<li class="list-group-item btn-outline-secondary" id="${category.title}" data-clickCategory="something">
  <span class="name" id="${category.title}">${category.title}</span>
  <div class="subject"><small>${category.subject}</small></div>
  <div class="extra">
    <button type="button" class="btn btn-outline-danger btn-xs extra" id="${category.title}" data-deleteCategory="something">
      <span class="material-icons" id="${category.title}"> delete </span>
    </button>
    <button type="button" class="btn btn-outline-info btn-xs extra" id="${category.title}" data-updateCategory="something">
      <span class="material-icons" id="${category.title}"> edit </span>
    </button>
  </div>
  </li>`;
};
const noteTemplate = (note) => {
    return `<li class="list-group-item btn-outline-secondary" id="${note.id}" data-clickNote="something">
  <span class="name" id="${note.id}">${note.title}</span>
  <div class="subject"><small>${note.category.title}</small></div>
  <div class="extra">
    <button type="button" class="btn btn-outline-danger btn-xs extra" id="${note.id}" data-deleteNote="something">
      <span class="material-icons" id="${note.id}"> delete </span>
    </button>
  </div>
  </li>`;
};
const renderCategories = () => {
    const categoriesUl = document.getElementById("categories");
    categoriesUl.innerHTML = "";
    if (currentState.categoryTitle) {
        const categoriesToRender = currentState.categories.filter((cat) => cat.title === currentState.categoryTitle);
        for (const category of categoriesToRender) {
            categoriesUl.innerHTML += categoryTemplate(category);
        }
    }
    else {
        for (const category of currentState.categories) {
            categoriesUl.innerHTML += categoryTemplate(category);
        }
    }
    for (const element of document.querySelectorAll("[data-clickCategory]")) {
        element.addEventListener("click", clickCategory);
    }
    for (const element of document.querySelectorAll("[data-deleteCategory]")) {
        element.addEventListener("click", deleteCategory);
    }
    for (const element of document.querySelectorAll("[data-updateCategory]")) {
        element.addEventListener("click", updateCategory);
    }
};
const renderNotes = () => {
    const notesUl = document.getElementById("notes");
    notesUl.innerHTML = "";
    if (currentState.categoryTitle) {
        const notesToRender = currentState.notes.filter((note) => note.category.title === currentState.categoryTitle);
        for (const note of notesToRender) {
            notesUl.innerHTML += noteTemplate(note);
        }
    }
    else {
        for (const note of currentState.notes) {
            notesUl.innerHTML += noteTemplate(note);
        }
    }
    for (const element of document.querySelectorAll("[data-clickNote]")) {
        element.addEventListener("click", clickNote);
    }
    for (const element of document.querySelectorAll("[data-deleteNote]")) {
        element.addEventListener("click", deleteNote);
    }
};
const clickCategory = (e) => {
    currentState.categoryTitle = e.target.id;
    currentState.categorySubject = currentState.categories.find((c) => c.title === currentState.categoryTitle).subject;
    renderNotes();
};
const updateCategory = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const title = e.target.id;
    const subject = currentState.categories.find((c) => c.title === title)
        .subject;
    // @ts-ignore
    const { value: newTitle } = yield Swal.fire({
        title: "Input new Category title",
        input: "text",
        inputLabel: "the new category title",
        inputValue: title,
        inputPlaceholder: "Enter the new category title",
    });
    alert(newTitle);
    const res = yield fetch(`${url}/notes/category`, {
        method: "PUT",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            oldCategory: { title, subject },
            newCategory: { title: newTitle, subject },
        }),
    });
    const data = yield res.json();
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
});
const clickNote = (e) => {
    currentState.noteId = Number(e.target.id);
    const note = currentState.notes.find((note) => note.id == currentState.noteId);
    document.getElementById("new-note-title").value =
        note.title;
    if (note.body) {
        document.getElementById("new-note-body").value =
            note === null || note === void 0 ? void 0 : note.body;
    }
    else {
        document.getElementById("new-note-body").value = "";
    }
};
const deleteCategory = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const title = e.target.id;
    console.log(title);
    const res = yield fetch(`${url}/category/${title}`, { method: "DELETE" });
    const data = yield res.json();
    if (!data.success) {
        // @ts-ignore
        Swal.fire("something went wrong", "the category was not deleted!", "error");
        return;
    }
    currentState.categories = currentState.categories.filter((c) => c.title != title);
    currentState.categoryTitle = null;
    currentState.categorySubject = null;
    currentState.noteId = null;
    renderCategories();
});
const deleteNote = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const id = e.target.id;
    const res = yield fetch(`${url}/notes/${id}`, { method: "DELETE" });
    const data = yield res.json();
    if (!data.success) {
        // @ts-ignore
        Swal.fire("something went wrong", "the note was not deleted!", "error");
        return;
    }
    currentState.notes = currentState.notes.filter((n) => n.id != Number(id));
    currentState.noteId = null;
    renderNotes();
    addNoteButton();
});
const addCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    const categoryTitle = document.getElementById("new-category-title").value;
    const categorySubject = document.getElementById("new-category-subject").value;
    if (!categoryTitle) {
        // @ts-ignore
        Swal.fire("Error", "category title missing", "error");
        return;
    }
    if (!categorySubject) {
        // @ts-ignore
        Swal.fire("Error", "category subject missing", "error");
        return;
    }
    const newCategory = {
        title: categoryTitle,
        subject: categorySubject,
    };
    const res = yield fetch(`${url}/notes/category`, {
        method: "POST",
        mode: "cors",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify({ category: newCategory }),
    });
    const data = yield res.json();
    if (!data.success) {
        // @ts-ignore
        Swal.fire("Error", "A problem occured", "error");
    }
    else {
        const categoriesUl = document.getElementById("categories");
        categoriesUl.innerHTML += categoryTemplate(newCategory);
    }
    currentState.categoryTitle = categoryTitle;
    currentState.categorySubject = categorySubject;
    currentState.categories.push(newCategory);
});
const addNote = () => __awaiter(void 0, void 0, void 0, function* () {
    const noteTitle = document.getElementById("new-note-title").value;
    const noteBody = document.getElementById("new-note-body").value;
    if (!noteTitle) {
        // @ts-ignore
        Swal.fire("Error", "note title missing", "error");
        return;
    }
    if (currentState.categoryTitle != null) {
        if (currentState.categorySubject != null) {
            const newNote = {
                id: currentState.noteId || 1,
                category: {
                    subject: currentState.categorySubject,
                    title: currentState.categoryTitle,
                },
                date: new Date(),
                title: noteTitle,
                body: noteBody,
            };
            const res = yield fetch(`${url}/notes`, {
                method: currentState.noteId ? "PUT" : "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                body: JSON.stringify({ note: newNote }),
            });
            const data = yield res.json();
            if (!data.success) {
                // @ts-ignore
                Swal.fire("Error", "A problem occured", "error");
            }
            else {
                currentState.notes = data.notes;
                renderNotes();
            }
        }
        else {
            // @ts-ignore
            Swal.fire("Error", "category subject missing", "error");
        }
    }
    else {
        // @ts-ignore
        Swal.fire("Error", "category title missing", "error");
    }
    currentState.noteId = null;
});
const addNoteButton = () => {
    document.getElementById("new-note-title").value = "";
    document.getElementById("new-note-body").value = "";
};
const showAllButton = () => {
    currentState.categoryTitle = null;
    currentState.categorySubject = null;
    currentState.noteId = null;
    renderCategories();
    renderNotes();
};
const search = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const query = e.target.value;
    const res = yield fetch(`${url}/notes/search/${query}`);
    const data = yield res.json();
    const notes = currentState.notes;
    const categories = currentState.categories;
    currentState.notes = data.notes;
    currentState.categories = currentState.notes.map((n) => n.category);
    const uniqueCategories = currentState.categories.filter((category, index) => {
        const _category = JSON.stringify(category);
        return (index ===
            currentState.categories.findIndex((obj) => {
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
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const resNotes = yield fetch(`${url}/notes`);
    const dataNotes = yield resNotes.json();
    if (!dataNotes.success) {
        // @ts-ignore
        Swal.fire("Error", "Error fetching notes", "error");
        return;
    }
    currentState.notes = dataNotes.notes;
    const resCat = yield fetch(`${url}/categories`);
    const dataCat = yield resCat.json();
    if (!dataCat.success) {
        // @ts-ignore
        Swal.fire("Error", "Error fetching categories", "error");
        return;
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
}))();
