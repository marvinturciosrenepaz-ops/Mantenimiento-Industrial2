import { db, storage } from "./firebase.js";
import { collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-storage.js";

// ---------- ORDEN DE MANTENIMIENTO ----------
const formOrden = document.getElementById("formOrden");
formOrden.addEventListener("submit", async (e) => {
  e.preventDefault();

  const equipo = document.getElementById("equipo").value;
  const responsable = document.getElementById("responsable").value;
  const descripcion = document.getElementById("descripcion").value;
  const materiales = document.getElementById("materiales").value;
  const fallaDetectada = document.getElementById("fallaDetectada").value;
  const fotoFile = document.getElementById("fotoMantenimiento").files[0];

  let fotoURL = "";
  if (fotoFile) {
    const fotoRef = ref(storage, `mantenimientos/${fotoFile.name}`);
    await uploadBytes(fotoRef, fotoFile);
    fotoURL = await getDownloadURL(fotoRef);
  }

  await addDoc(collection(db, "ordenesMantenimiento"), {
    equipo,
    responsable,
    descripcion,
    materiales,
    fallaDetectada,
    fotoURL,
    fecha: new Date().toLocaleString(),
  });

  alert("✅ Orden de mantenimiento registrada con éxito.");
  formOrden.reset();
});

// ---------- FALLAS ----------
const formFalla = document.getElementById("formFalla");
formFalla.addEventListener("submit", async (e) => {
  e.preventDefault();

  const equipoFalla = document.getElementById("equipoFalla").value;
  const descripcionFalla = document.getElementById("descripcionFalla").value;
  const fotoAntes = document.getElementById("fotoFalla").files[0];
  const fotoDespues = document.getElementById("fotoReparacion").files[0];

  let urlAntes = "", urlDespues = "";

  if (fotoAntes) {
    const refAntes = ref(storage, `fallas/${fotoAntes.name}`);
    await uploadBytes(refAntes, fotoAntes);
    urlAntes = await getDownloadURL(refAntes);
  }

  if (fotoDespues) {
    const refDespues = ref(storage, `reparaciones/${fotoDespues.name}`);
    await uploadBytes(refDespues, fotoDespues);
    urlDespues = await getDownloadURL(refDespues);
  }

  await addDoc(collection(db, "fallas"), {
    equipoFalla,
    descripcionFalla,
    urlAntes,
    urlDespues,
    fecha: new Date().toLocaleString(),
  });

  alert("⚙️ Falla registrada correctamente.");
  formFalla.reset();
  mostrarFallas();
});

// ---------- HISTORIAL ----------
async function mostrarFallas() {
  const lista = document.getElementById("listaFallas");
  lista.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "fallas"));

  querySnapshot.forEach((docu) => {
    const data = docu.data();
    const li = document.createElement("li");
    li.innerHTML = `
      <b>Equipo:</b> ${data.equipoFalla}<br>
      <b>Descripción:</b> ${data.descripcionFalla}<br>
      <b>Fecha:</b> ${data.fecha}<br>
      <img src="${data.urlAntes}" width="100"><img src="${data.urlDespues}" width="100">
      <button class="delete-btn" data-id="${docu.id}">Borrar</button>
    `;
    lista.appendChild(li);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      await deleteDoc(doc(db, "fallas", id));
      alert("❌ Falla eliminada");
      mostrarFallas();
    });
  });
}

mostrarFallas();
