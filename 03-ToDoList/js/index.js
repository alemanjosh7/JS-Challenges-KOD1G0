const db = firebase.firestore(),
  taskForm = document.getElementById("task-form"),
  taskContainer = document.getElementById("tasks-container"),
  btnCreateTask = document.getElementById("btn-create-task"),
  btnListTasks = document.getElementById("btn-list-tasks"),
  oldForm = taskContainer.innerHTML,
  btnIndex = document.querySelector(".logo p");
const saveTask = (title, description) =>
  db
    .collection("tasks")
    .doc()
    .set({
      title,
      description,
    });

const getTasks = () => db.collection("tasks").get();

btnIndex.addEventListener("click", () => {
  taskContainer.innerHTML = oldForm;
});

btnListTasks.addEventListener("click", async (e) => {
  taskContainer.innerHTML = "";
  const queriesSnapshot = await getTasks();
  queriesSnapshot.forEach((doc) => {
    const task = doc.data();
    taskContainer.innerHTML += `<div class="flex justify-center flex-col rounded-xl p-4 shadow-xl bg-white">
        <h3>${task.title}</h3>
      </div>`;
  });
});

btnCreateTask.addEventListener("click", () => {
  taskContainer.innerHTML = oldForm;
});

// window.addEventListener("DOMContentLoaded", async (e) => {
//data
// });

taskContainer.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("task-title");
  const description = document.getElementById("task-description");
  //creamos la coleccion(traduccion SQL = tabla) tasks para almacenar las tareas y crear documentos(traduccion a SQL = registros)
  await saveTask(title.value, description.value);
  document.getElementById("task-form").reset();

  title.focus();
  //para almacenar y tomar los datos usamos problemas(async await)
  console.log(title, description);
});
