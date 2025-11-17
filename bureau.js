  const input = document.getElementById("photourl");
  const preview = document.getElementById("preview");
  const imgBg = document.getElementById("img-bg");
    const expCont = document.getElementById("exp-cont");
  const exp = document.getElementById("exp");
  const expBtn = document.querySelectorAll(".add-exp");
  let dat = []

  fetch("./bureauPhotos.json") 
    .then(response => response.json())
    .then(data => {
      dat = data
      displayPhoto(dat);
    })
.   catch(error => console.error('error connecting with the server', error));
  

function displayPhoto() {
  input.addEventListener("input", () => {
    const url = input.value.trim();

    if (!url) {
      preview.classList.add("hidden");
      imgBg.classList.remove("hidden");
      return;
    }
    preview.onload = () => {
      preview.classList.remove("hidden");
      imgBg.classList.add("hidden");
    };

    preview.onerror = () => {
      preview.classList.add("hidden");
      imgBg.classList.remove("hidden");
      console.warn("Invalid image URL");
    };

    preview.src = url;
  });
}
document.addEventListener("DOMContentLoaded", () => {

  const expCont = document.getElementById("exp-cont");

  function addExpBlock() {
    let block = document.createElement("div");
    block.classList.add("exp-block", "mt-4");

    block.innerHTML = `
      <label>Experience in:</label><br>
      <input type="text" name="type" class="border border-grey rounded-md mb-4 p-1 w-[14rem]" required><br>

      <label>From:</label><br>
      <input type="date" name="from" class="border p-2 border-grey rounded-md mb-4 w-[14rem]" required><br>

      <label>To:</label><br>
      <input type="date" name="to" class="border p-2 border-grey rounded-md mb-4 w-[14rem]" required><br>

      <button class="add-exp bg-uncommon font-bold rounded-md mb-2 p-2 w-[10rem]">+ Add Experience</button><br>
      <button class="rem-exp bg-red font-bold rounded-md p-2 w-[10rem]">- Remove Experience</button>
    `;

    expCont.appendChild(block);

    block.querySelector(".add-exp").addEventListener("click", (e) => {
      e.preventDefault();
      addExpBlock();
    });

    block.querySelector(".rem-exp").addEventListener("click", (e) => {
      e.preventDefault();
      block.remove();
    });
  }


  const firstAddBtn = document.querySelector(".add-exp");
  firstAddBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addExpBlock();
  });
});





