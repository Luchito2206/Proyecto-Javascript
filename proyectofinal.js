class Alumno {
  constructor(id, name, apellido, note) {
    this.id = id;
    this.name = name;
    this.apellido = apellido;
    this.note = note;
  }
}

const alumnoEnLocalStorage = localStorage.getItem("alumno")||"[]";
let alumno = JSON.parse(alumnoEnLocalStorage);
const tableAlumno = document.querySelector("#alumnoTable tbody");
const alumnoForm = document.querySelector("#addAlumno");
updateAlumnoTable();

function saveAlumno() {
  console.log(alumnoForm.idStudent);
  if (alumnoForm.idStudent && alumnoForm.idStudent != 0) {
    for (let index = 0; index < alumno.length; index++) {
      if (alumno[index].id == alumnoForm.idStudent) {
        alumno[index].name = alumnoForm.alumnoName.value;
        alumno[index].apellido = alumnoForm.alumnoApellido.value;
        alumno[index].note = alumnoForm.alumnoNote.value;
        break;
      }
    }
    alumnoForm["idStudent"] = 0;
    updateAlumnoTable();
  } else {
    //crear
    const newAlumno = new Alumno(
      Math.max(0,...alumno.map((alumno)=>alumno.id)) + 1,
      alumnoForm.alumnoName.value,
      alumnoForm.alumnoApellido.value,
      alumnoForm.alumnoNote.value
    );
    alumno.push(newAlumno);
    updateAlumnoTable();
  }
}

function updateAlumnoTable() {
  tableAlumno.innerHTML = "";
  console.log(alumno);
  alumno.forEach((student) => {
    const studentHTML = document.createElement("tr");
    studentHTML.innerHTML = `<th scope="row">${student.id}</th>
        <td>${student.name}</td>
        <td>${student.apellido}</td>
        <td>${student.note}</td>
        <td><button
                id="editBtn_${student.id}"
                type="button"
                class="btn btn-primary"
                onclick="editAlumno(event)"
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                >
                Editar
                </button>
            <button
                id="deleteBtn_${student.id}"
                type="button"
                class="btn btn-danger"
                onclick="deleteAlumno(event)">
                Borrar
                </button>
            </td>
        `;
    tableAlumno.appendChild(studentHTML);
  });
  agregarEnLocalStorage();
}

function deleteAlumno(event) {
  const btn = event.target;
  const id = btn.id.split("_")[1];
  alumno = alumno.filter((student) => student.id != id);
  updateAlumnoTable();
}

function editAlumno(event) {
  const btn = event.target;
  const id = btn.id.split("_")[1];
  const plato = alumno.filter((student) => student.id == id)[0];
  alumnoForm.alumnoName.value = plato.name;
  alumnoForm.alumnoApellido.value = plato.apellido;
  alumnoForm.alumnoNote.value = plato.note;
  alumnoForm["idStudent"] = plato.id;
  console.dir(alumnoForm);
}

function agregarEnLocalStorage(){

  const alumnoJSON = JSON.stringify(alumno);
  localStorage.setItem("alumno", alumnoJSON)

}