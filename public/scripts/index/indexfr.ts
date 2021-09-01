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

const categoryTemplate = (category: Category) => {
  return `<li class="list-group-item btn-outline-secondary">
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
  return `<li class="list-group-item btn-outline-secondary">
  <span class="name">${note.title}</span>
  <div class="subject"><small>${note.category.title}</small></div>
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

(async () => {
  const res = await fetch(`${url}/notes`);
  const data = await res.json();
  if (!data.success) {
    alert("Error fetching notes");
    return;
  }
  const notes: Note[] = await data.notes;
  let categories: Category[] = notes.map((note) => note.category);
  categories = categories.filter((cat, pos) => {
    return categories.indexOf(cat) == pos;
  });
  const notesUl = document.getElementById("notes")!;
  const categoriesUl = document.getElementById("categories")!;
  categoriesUl.innerHTML = "";
  notesUl.innerHTML = "";
  for (const category of categories) {
    categoriesUl.innerHTML += categoryTemplate(category);
  }
  for (const note of notes) {
    notesUl.innerHTML += noteTemplate(note);
  }
})();

const addCategory = async () => {
  const categoryTitle = (
    document.getElementById("new-category-title")! as HTMLInputElement
  ).value;
  const categorySubject = (
    document.getElementById("new-category-subject")! as HTMLInputElement
  ).value;
  const newCategory = {
    title: categoryTitle,
    subject: categorySubject,
  };
  const res = await fetch(`${url}/notes/category`, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(newCategory),
  });
  const data = await res.json();
  if (!data.success) {
    alert("A problem occured");
  } else {
    const categoriesUl = document.getElementById("categories")!;
    categoriesUl.innerHTML += categoryTemplate(newCategory);
  }
};

const addNote = async () => {};
