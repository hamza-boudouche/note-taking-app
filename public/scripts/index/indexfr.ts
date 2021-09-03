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
  return `<li class="list-group-item btn-outline-secondary" id="${category.title}" onclick="clickCategory(event)">
  <span class="name">${category.title}</span>
  <div class="subject"><small>${category.subject}</small></div>
  <div class="extra">
    <button type="button" class="btn btn-outline-danger btn-xs extra">
      <span class="material-icons"> delete </span>
    </button>
    <button type="button" class="btn btn-outline-info btn-xs extra">
      <span class="material-icons"> edit </span>
    </button>
  </div>
  </li>`;
};

const noteTemplate = (note: Note) => {
  return `<li class="list-group-item btn-outline-secondary" id="${note.id}" onclick="clickNote(event)">
  <span class="name">${note.title}</span>
  <div class="subject"><small>${note.category.title}</small></div>
  <div class="extra">
    <button type="button" class="btn btn-outline-danger btn-xs extra">
      <span class="material-icons"> delete </span>
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
};
// forgot to get categories separately
(async () => {
  const res = await fetch(`${url}/notes`);
  const data = await res.json();
  if (!data.success) {
    alert("Error fetching notes");
    return;
  }
  currentState.notes = data.notes;
  currentState.categories = currentState.notes.map((note) => note.category);
  currentState.categories = currentState.categories.filter((cat, pos) => {
    return currentState.categories.indexOf(cat) == pos;
  });
  renderCategories();
  renderNotes();
})();

const clickCategory = (e: Event) => {
  currentState.categoryTitle = (e.target! as HTMLElement).id;
  currentState.categorySubject = currentState.categories.find(
    (c) => c.title === currentState.categoryTitle
  )!.subject!;
  renderCategories();
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

const addCategory = async () => {
  const categoryTitle = (
    document.getElementById("new-category-title")! as HTMLInputElement
  ).value;
  const categorySubject = (
    document.getElementById("new-category-subject")! as HTMLInputElement
  ).value;
  if (!categoryTitle) {
    alert("category title missing");
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
    alert("A problem occured");
  } else {
    const categoriesUl = document.getElementById("categories")!;
    categoriesUl.innerHTML += categoryTemplate(newCategory);
  }
  currentState.categoryTitle = categoryTitle;
  currentState.categorySubject = categorySubject;
};

const addNote = async () => {
  const noteTitle = (
    document.getElementById("new-note-title") as HTMLInputElement
  ).value;
  const noteBody = (
    document.getElementById("new-note-body") as HTMLInputElement
  ).value;
  if (!noteTitle) {
    alert("note title missing");
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
        alert("A problem occured");
      } else {
        const notesUl = document.getElementById("notes")!;
        newNote.id = data.note.id;
        notesUl.innerHTML += noteTemplate(newNote);
      }
    } else {
      alert("category subject missing");
    }
  } else {
    alert("category title missing");
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
