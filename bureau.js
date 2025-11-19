const input = document.getElementById("photourl");
const preview = document.getElementById("preview");
const imgBg = document.getElementById("img-bg");
const expCont = document.getElementById("exp-cont");
const exp = document.getElementById("exp");
const expBtn = document.querySelectorAll(".add-exp");
const AddWorker = document.getElementById("Add");
const formBG = document.getElementById("blur");
const form = document.getElementById("form-cont");
const sideWorkers = document.getElementById("workers-cont");
const sideWorkers1 = document.getElementById("workers-cont1");
const plusbtn = document.querySelectorAll(".plus");
const addAWorker = document.getElementById("ee");
const plusWorker = document.getElementById("plusworker");
let dat = []
let currentRoom = null;




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

      <div class = "">
      <button class="add-exp font-bold rounded-md mb-4  bg-uncommon p-2 w-[10rem] items-center md:w-[12rem]">+ Add Experience</button><br>
      <button class="rem-exp font-bold rounded-md mb-12  bg-uncommon pt-2 pb-2 pr-4 pl-4  items-center">-</button>
      </div>
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

AddWorker.addEventListener('click', () => {
  formBG.classList.remove("hidden")
})

formBG.onclick = () => {
  formBG.classList.add("hidden");
}

form.onclick = (e) => {
  e.stopPropagation();
}

const AddWorkerForm = document.getElementById("sub-btn");
const formCont = document.querySelector("#form-cont .forms");




const Name = document.getElementById("name");
const role = document.getElementById("role");
const photo = document.getElementById("photourl");
AddWorkerForm.addEventListener("click", (e) => {
  e.preventDefault();
  formCont.reportValidity(); // shows warnings
  let worker = { name: Name.value, role: role.value, photo: photo.value };

  if (formCont.checkValidity()) {
    if (sideWorkers.children.length === 10) {
      alert("this is the maximum number of workers you can add");
    }
    else {
      dat.push(worker)
      console.log(dat);
      formBG.classList.add('hidden');
      let sideContainer = `
                <div class="work flex gap-4 mb-2 [box-shadow:2px_2px_4px_rgba(0,0,0,0.25)] p-2 rounded-lg hover:scale-105 [box-shadow:2px_2px_4px_rgba(0,0,0,0.50)] transition " draggable = "true">
                  <img src="${worker.photo}" alt="" class="workerph w-12 rounded-full" draggable="false">
                  <div class="relative top-1">
                    <h4 class=" font-bold h-5">
                      ${worker.name}
                    </h4>
                    <p class="text-grey text-sm">
                      ${worker.role}
                    </p>
                  </div>
                </div>`
      sideWorkers.innerHTML += sideContainer;
      formCont.reset();
      preview.classList.add("hidden");
      imgBg.classList.remove("hidden");
    }
  }


  const workerDetails = document.querySelectorAll(".workerph");

workerDetails.forEach(photo =>{
  photo.addEventListener("click", () => {
    
  })
})


  dat.forEach(data => {
    if (data.role === "IT") {
      data.rooms = "servers";
      console.log(data.rooms)
    }
    else if (data.role === "reception") {
      data.rooms = "reception";
      console.log(data.rooms)
    }
    else if (data.role === "Manager") {
      data.rooms = ["reception", "servers", "conference", "personnel", "security", "vault"];
      console.log(data.rooms)
    }
    else if (data.role === "Cleaning") {
      data.rooms = ["reception", "servers", "conference", "personnel", "security"];
      console.log(data.rooms)
    }
    else if (data.role === "security") {
      data.rooms = "security";
      console.log(data.rooms)
    }
    else if (data.role === "other") {
      data.rooms = ["personnel", "conference"];
      console.log(data.rooms)
    }
  })
})




// sideWorkers.addEventListener("click", (e) =>{
//   if(e.target.classList.contains("remove")) {
//     const rem = e.target.closest(".work").remove();
//     sideWorkers1.remove(rem);
//   }
// })

displayPhoto();


// sideWorkers.addEventListener("dragstart", (e) => {
//   const worker = e.target.closest(".work");
//   if (!worker) return;
//   worker.classList.add("bg-red");
// });

// sideWorkers.addEventListener("dragend", (e) => {
//   const worker = e.target.closest(".work");
//   if (!worker) return;
//   worker.classList.remove("bg-red");
//   worker.classList.add("opacity-80");
// });
plusbtn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const parent = e.target.closest("[id]");
    const roomId = parent.id;

    addAWorker.classList.remove("hidden");

    const allowed = getWorkersAllowedIn(roomId);

    displayWorkers(allowed);
  });
});


function assignPermissions(worker) {
  worker.rooms = getRoomsForRole(worker.role);
}
function getRoomsForRole(role) {
  switch (role) {
    case "IT": return ["servers"];
    case "reception": return ["reception"];
    case "security": return ["security"];
    case "Manager": return ["reception", "servers", "conference", "personnel", "security", "vault"];
    case "Cleaning": return ["reception", "servers", "conference", "personnel", "security"];
    case "other": return ["personnel", "conference"];
  }
}

function getWorkersAllowedIn(roomId) {
  return dat.filter(worker => worker.rooms.includes(roomId));
}

function displayWorkers(list) {
  sideWorkers1.innerHTML = "";

  if (list.length === 0) {
    sideWorkers1.innerHTML = `
      <p class="text-lg font-bold text-center">
        No workers allowed here 😕
      </p>`;
    return;
  }

  list.forEach(worker => {
    const div = document.createElement("div");
    div.className = "work flex gap-4 mb-2 p-2 rounded-lg shadow hover:scale-105 transition";
    div.innerHTML = `
      <img src="${worker.photo}" class="w-12 rounded-full">
      <div>
        <h4 class="font-bold">${worker.name}</h4>
        <p class="text-grey text-sm">${worker.role}</p>
      </div>
      <button class="add-btn text-orangish font-bold">Add</button>
    `;

    div.querySelector(".add-btn").addEventListener("click", () => {
      const container = document.querySelector(`[data-room="${currentRoom}"]`);
      container.appendChild(div);
      addAWorker.classList.add("hidden");
    });

    sideWorkers1.appendChild(div);
  });
}
plusbtn.forEach(btn => {
  btn.addEventListener("click", (e) => {

    const roomWrapper = e.target.closest("[id]");
    const roomId = roomWrapper.id;

    currentRoom = roomId; 
    addAWorker.classList.remove("hidden");

    const allowed = getWorkersAllowedIn(roomId);
    displayWorkers(allowed);
  });
});

addAWorker.addEventListener("click", () => {
  addAWorker.classList.add("hidden");
});



addAWorker.onclick = () => {
  addAWorker.classList.add("hidden")
}


plusWorker.onclick = (e) => {
  e.stopPropagation();
}





