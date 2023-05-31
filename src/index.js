import "./styles.css";

const table = document.querySelector("table");
const username = document.querySelector("#input-username");
const email = document.querySelector("#input-email");
const address = document.querySelector("#input-address");
const admin = document.querySelector("#input-admin");
const image = document.querySelector("#input-image");
const submitBtn = document.querySelector("#submit-data");
const emptyBtn = document.querySelector("#empty-table");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // if the username in the form already exists in the table,
  // instead of adding the form data to the table, the data
  // in the table is edited instead
  const trArray = table.querySelectorAll("tr");
  let edit = false;
  trArray.forEach((tr) => {
    const adminTd = tr.querySelector("td");
    if (!adminTd) return;

    if (adminTd.textContent === username.value) {
      edit = true;
      //const tr = adminTd.parentElement;
      tr.innerHTML = "";
      addRow(
        tr,
        username.value,
        email.value,
        address.value,
        admin.checked,
        image.files[0]
      );
    }
  });

  if (!edit) {
    const newTr = document.createElement("tr");
    table.appendChild(newTr);
    addRow(
      newTr,
      username.value,
      email.value,
      address.value,
      admin.checked,
      image.files[0]
    );
  }
});

function addRow(tr, username, email, address, admin, image) {
  tr.innerHTML += `
    <td>${username}</td>
    <td>${email}</td>
    <td>${address}</td>
    <td>${admin ? "X" : "-"}</td>
  `;
  if (image) {
    tr.innerHTML += `<td><img src="${URL.createObjectURL(
      image
    )}" alt="image"/></td>`;
  }
}

emptyBtn.addEventListener("click", () => {
  let itemToRemove = table.querySelector("tr td");
  while (itemToRemove) {
    const parentTr = itemToRemove.parentElement;
    itemToRemove.parentElement.parentElement.removeChild(parentTr);

    itemToRemove = table.querySelector("tr td");
  }
});
