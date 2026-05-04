function addLoadout() {
  const gun = document.getElementById("gunName").value;
  const attachments = document.getElementById("attachments").value;
  const file = document.getElementById("imageInput").files[0];

  if (!file) return alert("Upload an image!");

  const reader = new FileReader();
  reader.onload = function () {
    const data = {
      gun,
      attachments,
      image: reader.result
    };

    let loadouts = JSON.parse(localStorage.getItem("loadouts")) || [];
    loadouts.push(data);
    localStorage.setItem("loadouts", JSON.stringify(loadouts));

    displayLoadouts();
  };

  reader.readAsDataURL(file);
}

function displayLoadouts() {
  const container = document.getElementById("loadoutContainer");
  container.innerHTML = "";

  let loadouts = JSON.parse(localStorage.getItem("loadouts")) || [];

  loadouts.forEach(l => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${l.image}">
      <h3>${l.gun}</h3>
      <p>${l.attachments}</p>
    `;

    container.appendChild(div);
  });
function addComment(button, event) {
  event.stopPropagation();

  const card = button.closest(".card"); // 🔥 safer than interaction-box
  const input = card.querySelector(".comment-input");
  const list = card.querySelector(".comment-list");

  if (!input || !list) {
    console.log("Element not found ❌");
    return;
  }

  if (input.value.trim() === "") return;

  const li = document.createElement("li");
  li.textContent = input.value;

  list.appendChild(li);
  input.value = "";
}

displayLoadouts();