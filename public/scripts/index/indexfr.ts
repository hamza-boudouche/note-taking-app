const url = "http://localhost:3000";

interface Category {
  title: string;
  subject: string;
}

interface Note {
  id: number;
  category: Category;
  title: string;
  body?: string;
  date: Date;
}

interface State {
  categoryTitle: string | null;
  categorySubject: string | null;
  noteId: number | null;
  categories: Category[];
  notes: Note[];
}

const currentState: State = {
  categoryTitle: null,
  categorySubject: null,
  noteId: null,
  categories: [],
  notes: [],
};

const categoryTemplate = (category: Category) => {
  return `<li class="list-group-item btn-outline-secondary" id="${category.title}" data-clickCategory="something">
  <span class="name" id="${category.title}">${category.title}</span>
  <div class="subject"><small>${category.subject}</small></div>
  <div class="extra">
    <button type="button" class="btn btn-outline-danger btn-xs extra" id="${category.title}" data-deleteCategory="something">
      <span class="material-icons" id="${category.title}"> delete </span>
    </button>
    <button type="button" class="btn btn-outline-info btn-xs extra" id="${category.title}">
      <span class="material-icons" id="${category.title}"> edit </span>
    </button>
  </div>
  </li>`;
};

const noteTemplate = (note: Note) => {
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
  const categoriesUl = document.getElementById("categories")!;
  categoriesUl.innerHTML = "";
  if (currentState.categoryTitle) {
    const categoriesToRender = currentState.categories.filter(
      (cat) => cat.title === currentState.categoryTitle
    );
    for (const category of categoriesToRender) {
      categoriesUl.innerHTML += categoryTemplate(category);
    }
  } else {
    for (const category of currentState.categories) {
      categoriesUl.innerHTML += categoryTemplate(category);
    }
  }

  for (const element of document.querySelectorAll(
    "[data-clickCategory]"
  ) as any) {
    element.addEventListener("click", clickCategory);
  }

  for (const element of document.querySelectorAll(
    "[data-deleteCategory]"
  ) as any) {
    element.addEventListener("click", deleteCategory);
  }
};

const renderNotes = () => {
  const notesUl = document.getElementById("notes")!;
  notesUl.innerHTML = "";
  if (currentState.categoryTitle) {
    const notesToRender = currentState.notes.filter(
      (note) => note.category.title === currentState.categoryTitle
    );
    for (const note of notesToRender) {
      notesUl.innerHTML += noteTemplate(note);
    }
  } else {
    for (const note of currentState.notes) {
      notesUl.innerHTML += noteTemplate(note);
    }
  }

  for (const element of document.querySelectorAll("[data-clickNote]") as any) {
    element.addEventListener("click", clickNote);
  }

  for (const element of document.querySelectorAll("[data-deleteNote]") as any) {
    element.addEventListener("click", deleteNote);
  }
};

const clickCategory = (e: Event) => {
  currentState.categoryTitle = (e.target! as HTMLElement).id;
  try {
    currentState.categorySubject = currentState.categories.find(
      (c) => c.title === currentState.categoryTitle
    )!.subject!;
  } catch (error) {
    console.log(currentState.categoryTitle);
    console.log(currentState.categories);
  }
  renderNotes();
};

const clickNote = (e: Event) => {
  currentState.noteId = Number((e.target! as HTMLElement).id);
  const note = currentState.notes.find(
    (note) => note.id == currentState.noteId
  )!;
  (document.getElementById("new-note-title") as HTMLInputElement).value =
    note.title;
  if (note.body) {
    (document.getElementById("new-note-body") as HTMLInputElement).value =
      note?.body;
  } else {
    (document.getElementById("new-note-body") as HTMLInputElement).value = "";
  }
};

const deleteCategory = async (e: Event) => {
  const title = (e.target as HTMLElement).id;
  console.log(title);
  const res = await fetch(`${url}/category/${title}`, { method: "DELETE" });
  const data = await res.json();
  if (!data.success) {
    // @ts-ignore
    (Swal as any).fire(
      "something went wrong",
      "the category was not deleted!",
      "error"
    );
    return;
  }
  currentState.categories = currentState.categories.filter(
    (c) => c.title != title
  );
  currentState.categoryTitle = null;
  currentState.categorySubject = null;
  renderCategories();
};

const deleteNote = async (e: Event) => {
  const id = (e.target! as HTMLElement).id;
  const res = await fetch(`${url}/notes/${id}`, { method: "DELETE" });
  const data = await res.json();
  if (!data.success) {
    // @ts-ignore
    (Swal as any).fire(
      "something went wrong",
      "the note was not deleted!",
      "error"
    );
    return;
  }
  currentState.notes = currentState.notes.filter((n) => n.id != Number(id));
  currentState.noteId = null;
  renderNotes();
  addNoteButton();
};

const addCategory = async () => {
  const categoryTitle = (
    document.getElementById("new-category-title")! as HTMLInputElement
  ).value;
  const categorySubject = (
    document.getElementById("new-category-subject")! as HTMLInputElement
  ).value;
  if (!categoryTitle) {
    // @ts-ignore
    (Swal as any).fire("Error", "category title missing", "error");
    return;
  }
  const newCategory = {
    title: categoryTitle,
    subject: categorySubject,
  };
  const res = await fetch(`${url}/notes/category`, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ category: newCategory }),
  });
  const data = await res.json();
  if (!data.success) {
    // @ts-ignore
    (Swal as any).fire("Error", "A problem occured", "error");
  } else {
    const categoriesUl = document.getElementById("categories")!;
    categoriesUl.innerHTML += categoryTemplate(newCategory);
  }
  currentState.categoryTitle = categoryTitle;
  currentState.categorySubject = categorySubject;
  currentState.categories.push(newCategory);
};

const addNote = async () => {
  const noteTitle = (
    document.getElementById("new-note-title") as HTMLInputElement
  ).value;
  const noteBody = (
    document.getElementById("new-note-body") as HTMLInputElement
  ).value;
  if (!noteTitle) {
    // @ts-ignore
    (Swal as any).fire("Error", "note title missing", "error");
    return;
  }
  if (currentState.categoryTitle != null) {
    if (currentState.categorySubject != null) {
      const newNote: Note = {
        id: 1,
        category: {
          subject: currentState.categorySubject,
          title: currentState.categoryTitle,
        },
        date: new Date(),
        title: noteTitle,
        body: noteBody,
      };
      const res = await fetch(`${url}/notes`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ note: newNote }),
      });
      const data = await res.json();
      if (!data.success) {
        // @ts-ignore
        (Swal as any).fire("Error", "A problem occured", "error");
      } else {
        const notesUl = document.getElementById("notes")!;
        newNote.id = data.note.id;
        notesUl.innerHTML += noteTemplate(newNote);
        currentState.notes.push(newNote);
      }
    } else {
      // @ts-ignore
      (Swal as any).fire("Error", "category subject missing", "error");
    }
  } else {
    // @ts-ignore
    (Swal as any).fire("Error", "category title missing", "error");
  }
};

const addNoteButton = () => {
  (document.getElementById("new-note-title") as HTMLInputElement).value = "";
  (document.getElementById("new-note-body") as HTMLInputElement).value = "";
};

const showAllButton = () => {
  currentState.categoryTitle = null;
  currentState.categorySubject = null;
  renderCategories();
  renderNotes();
};

const search = async (e: Event) => {
  const query = (e.target as HTMLInputElement).value;
  const res = await fetch(`${url}/notes/search/${query}`);
  const data = await res.json();
  const notes = currentState.notes;
  const categories = currentState.categories;
  currentState.notes = data.notes;
  currentState.categories = currentState.notes.map((n) => n.category);
  const uniqueCategories = currentState.categories.filter((category, index) => {
    const _category = JSON.stringify(category);
    return (
      index ===
      currentState.categories.findIndex((obj) => {
        return obj.title === category.title && obj.subject === category.subject;
      })
    );
  });
  console.log(currentState.notes);
  console.log(currentState.categories);
  currentState.categories = uniqueCategories;
  renderCategories();
  renderNotes();
  currentState.notes = notes;
  currentState.categories = categories;
};

(async () => {
  const resNotes = await fetch(`${url}/notes`);
  const dataNotes = await resNotes.json();
  if (!dataNotes.success) {
    // @ts-ignore
    (Swal as any).fire("Error", "Error fetching notes", "error");
    return;
  }
  currentState.notes = dataNotes.notes;
  const resCat = await fetch(`${url}/categories`);
  const dataCat = await resCat.json();
  if (!dataCat.success) {
    // @ts-ignore
    (Swal as any).fire("Error", "Error fetching categories", "error");
    return;
  }
  currentState.categories = dataCat.categories;
  renderCategories();
  renderNotes();
  document.querySelector("#add-note")!.addEventListener("click", addNote);
  document
    .querySelector("#add-category")!
    .addEventListener("click", addCategory);
  document.querySelector("#search-bar")!.addEventListener("change", search);
  document
    .querySelector("#show-all-button")!
    .addEventListener("click", showAllButton);
  document
    .querySelector("#add-note-button")!
    .addEventListener("click", addNoteButton);
})();
