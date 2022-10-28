class consulta {
  constructor(nombre, apellido, telefono, email, mensaje, horario) {
    this.nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    this.apellido = apellido.charAt(0).toUpperCase() + apellido.slice(1);
    this.telefono = telefono;
    this.email = email;
    this.mensaje = mensaje;
    this.horario = horario.toString();
  }
}

let nombre = "";
let apellido = "";
let telefono = "";
let email = "";
let mensaje = "";
let horario = "";
let error = "";
let valido = 1;


aletaFormValido = (form) => {
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((res) => {
      Swal.fire({
        title: `Buen ${form.nombre}`,
        text: `${res.results[0].name.first} atenderá su consulta desde ${res.results[0].email}`,
        imageUrl: `${res.results[0].picture.large}`,
        imageAlt: "Imagen de asesor",
      });
    });
    console.log(form);
    document.getElementById("formulario").reset();
  };
  
  alertaForm = (falta) => {
    Swal.fire({
      icon: "error",
      title: "Cuidado",
      text: `Por favor complete los campos ${falta.toUpperCase()}`,
    });
  };

validar = (form) => {
  error = "";
  Object.entries(form).forEach(([key, value]) => {
    value == "" &&
      ((error +=
        error == "" ? `${key}` : key == "mensaje" ? `y ${key}` : `, ${key}`),
      alertaForm(error));
  });
};

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  let formulario = evento.target;
  nombre = `${formulario.children[1].value}`;
  apellido = `${formulario.children[3].value}`;
  telefono = `${formulario.children[5].value}`;
  email = `${formulario.children[7].value}`;
  mensaje = `${formulario.children[9].value}`;
  horario = new Date();
  let form = new consulta(
    nombre,
    apellido,
    telefono,
    email,
    mensaje,
    horario.toLocaleDateString()
  );
  validar(form);
  error === "" && aletaFormValido(form, hora);
});