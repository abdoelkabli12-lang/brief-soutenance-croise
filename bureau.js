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
const profileBG = document.getElementById("bgblur");
const profileCont = document.getElementById("profile-cont");

let dat = []
let currentRoom = null;
let experiences = [];




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
  const expIn = document.getElementById("expIn");
const from = document.getElementById("from");
const to = document.getElementById("to");

  function addExpBlock() {
    let exp = {expIn: expIn.value, From: from.value, toD: to.value};
    let block = document.createElement("div");
    block.classList.add("exp-block", "mt-4");
    experiences.push(exp);
    console.log(experiences);

    block.innerHTML = `
      <label>Experience in:</label><br>
      <input type="text" id = "expIn" name="type" class="border border-grey rounded-md mb-4 p-1 w-[14rem]" required><br>

      <label>From:</label><br>
      <input type="date" name="from" id = "from" class="border p-2 border-grey rounded-md mb-4 w-[14rem]" required><br>

      <label>To:</label><br>
      <input type="date" name="to" id = "to" class="border p-2 border-grey rounded-md mb-4 w-[14rem]" required><br>

      <div class = "">
      <button class="add-exp font-bold rounded-md mb-4  bg-uncommon p-2 w-[10rem] items-center md:w-[12rem]">+ Add Experience</button><br>
      <button class="rem-exp font-bold rounded-md mb-12  bg-uncommon pt-2 pb-2 pr-4 pl-4  items-center">-</button>
      </div>
    `;

    expCont.appendChild(block);
    console.log(exp);

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




plusbtn.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const parent = e.target.closest("[id]");
    const roomId = parent.id;

    addAWorker.classList.remove("hidden");

    const allowed = getWorkersAllowedIn(roomId);

    displayWorkers(allowed);
  });
});


// function assignPermissions(worker) {
//   worker.rooms = getRoomsForRole(worker.role);
// }
// function getRoomsForRole(role) {
//   switch (role) {
//     case "IT": return ["servers", "conference", "personnel"];
//     case "reception": return ["reception", "conference", "personnel"];
//     case "security": return ["security", "conference", "personnel"];
//     case "Manager": return ["reception", "servers", "conference", "personnel", "security", "vault"];
//     case "Cleaning": return ["reception", "servers", "conference", "personnel", "security"];
//     case "other": return ["personnel", "conference"];
//   }
// }

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

  list.forEach((worker, i) => {
    const workerDiv = document.createElement("div");
    workerDiv.className = "work object-contain grid grid-cols-3 gap-3 bg-white gap-4 mb-2 p-2 w-[10rem] rounded-lg text-sm shadow";
    workerDiv.innerHTML = `
                <img src="${worker.photo}" class="workerph w-12 rounded-full">
                <div>
                  <h4 class="font-bold">${worker.name}</h4>
                  <p class="text-grey text-sm">${worker.role}</p>
                </div>
                <button class="add-btn relative left-3 h-8 w-8 [box-shadow: 2px_2px_4px_rgba(0,0,0,0.25)] text-orangish font-extrabold">+</button>

    `;


    const workerbtn = workerDiv.querySelector(".add-btn");
    const roomCont = document.getElementById(`${currentRoom}`);
    workerbtn.addEventListener("click", (e) => {
    const container = document.querySelector(`[data-room="${currentRoom}"]`);
    workerbtn.textContent = '-';
    workerbtn.classList.add("rem-btn");
    workerbtn.classList.remove("add-btn");
    worker.current = currentRoom;
    container.appendChild(workerDiv);

    if(!(roomCont === 'conference' && roomCont === 'personnel')){
      roomCont.classList.add("hover:bg-uncommon/15");
      roomCont.classList.remove("hover:bg-red/15");
    }
    addAWorker.classList.add("hidden");


    // dat = dat.filter(w => !(w.name === worker.name && w.role === worker.role));

    const remWorker = document.querySelectorAll(".rem-btn");
    
    const sidebarItem = [...sideWorkers.children].find(el =>
      el.querySelector("h4").textContent.trim() === worker.name &&
      el.querySelector("p").textContent.trim() === worker.role);
      let deletedItem = sidebarItem;
      if (sidebarItem) sidebarItem.remove();
      
      console.log("Assigned worker:", worker);

      

      remWorker.forEach(btn => {
        btn.addEventListener("click", (e) => {
          const workers = e.target.closest(".work");
          workers.remove();
          sideWorkers.appendChild(deletedItem);
        })
});
})
    sideWorkers1.appendChild(workerDiv);
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



const Name = document.getElementById("name");
const role = document.getElementById("role");
const photo = document.getElementById("photourl");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
let count = 0;
function displaySiders(dat) {
AddWorkerForm.addEventListener("click", (e) => {
  e.preventDefault();
  formCont.reportValidity(); // shows warnings
  let worker = { name: Name.value, role: role.value, photo: photo.value, email: email.value, phone: phone.value };

  if (formCont.checkValidity()) {
    if (sideWorkers.children.length === 10) {
      alert("this is the maximum number of workers you can add");
    }
    else {
      dat.push(worker)
      console.log(dat);
      formBG.classList.add('hidden');
      let sideContainer = `
                <div class="work flex bg-white gap-4 mb-2 [box-shadow:2px_2px_4px_rgba(0,0,0,0.25)] p-2 rounded-lg hover:scale-105 [box-shadow:2px_2px_4px_rgba(0,0,0,0.50)] transition " draggable = "true">
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

function displayProfile (profile = dat){
workerDetails.forEach(photo =>{
  photo.addEventListener("click", () => {
    profileBG.classList.remove("hidden");
    let div = `
                  <div class="relative flex items-center bg-gradient-to-br from-brownish via-orangish via-redmagenta to-brownish w-full rounded-tl-2xl rounded-tr-2xl h-[12rem]">
                <div class="relative w-full flex left-12 h-[50%] gap-6">
                  <img src="${profile.photo}" class="relative rounded-2xl w-[6rem] h-[6rem] top-5 object-cover aspect-[1/1]">
                  <div class="flex flex-col gap-1">
                    <h3 class="font-bold text-md text-white">
                      ${profile.name}
                    </h3>
                    <h4 class="font-bold text-sm">
                      ${profile.role}
                    </h4>
                    <p class="font-semibold text-sm text-underbg">
                      currently in: ${profile.current}
                    </p>
                    <p class="font-semibold text-sm text-underbg">
                      ${profile.email}
                    </p>
                    <p class="font-semibold text-sm text-underbg">
                      ${profile.phone}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p>
                  Experiences
                </p>
              </div> `
              profileCont.innerHTML = div;
  })
})
  }

      displayProfile(worker);

profileBG.addEventListener("click", () => {
  profileBG.classList.add("hidden");
})

profileCont.addEventListener("click", (e) => {
  e.stopPropagation();
})


  dat.forEach(data => {
    if (data.role === "IT") {
      data.rooms = ["servers", "conference", "personnel"];
      console.log(data.rooms)
    }
    else if (data.role === "reception") {
      data.rooms = ["reception", "conference", "personnel"];
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
      data.rooms = ["security", "conference", "personnel"];
      console.log(data.rooms)
    }
    else if (data.role === "other") {
      data.rooms = ["personnel", "conference"];
      console.log(data.rooms)
    }
  })
})
}
displaySiders(dat);



 

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


addAWorker.addEventListener("click", () => {
  addAWorker.classList.add("hidden");
});



addAWorker.onclick = () => {
  addAWorker.classList.add("hidden")
}


plusWorker.onclick = (e) => {
  e.stopPropagation();
}




              // <div class="relative flex items-center bg-gradient-to-br from-brownish via-orangish via-redmagenta to-brownish w-full rounded-tl-2xl rounded-tr-2xl h-[12rem]">
              //   <div class="relative w-full flex left-12 h-[50%] gap-6">
              //     <img src="imgs/images (2).jpg" class="relative rounded-2xl w-[6rem] h-[6rem] top-5 object-cover aspect-[1/1]">
              //     <div class="flex flex-col gap-1">
              //       <h3 class="font-bold text-md text-white">
              //         Abdelhadi
              //       </h3>
              //       <h4 class="font-bold text-sm">
              //         Manager
              //       </h4>
              //       <p class="font-semibold text-sm text-underbg">
              //         currently in: ${worker.currentPlace}
              //       </p>
              //       <p class="font-semibold text-sm text-underbg">
              //         abdo.el.kabli@gmail.com
              //       </p>
              //       <p class="font-semibold text-sm text-underbg">
              //         +212611980236
              //       </p>
              //     </div>
              //   </div>
              // </div>
              // <div>
              //   <p>
              //     Experiences
              //   </p>
              // </div> 
