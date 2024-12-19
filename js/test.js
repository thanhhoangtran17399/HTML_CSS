getAll(urlTable, getAllTables);

let idTable;

function getAllTables(data) {
  const allTables = document.querySelector(".all-tables");
  let selectTable = document.getElementById("selectTable");

  data.forEach((element) => {
    const img = element.status ? `../img/pub.png` : "../img/table.png";
    if (element.status) {
      selectTable.innerHTML += `<option class="option" id="${element.id}" value="${element.id}">Table ${element.id}</option>`;
    }
    const button = element.status
      ? `  <button onclick="showSelected('${element.id}')" class="btn btn-add btn-danger">
                      <i class="fa-solid fa-plus"></i> ADD
                    </button>
                    <button onclick="getById(${element.id})" class="btn btn-cart btn-success" data-bs-toggle="modal" data-bs-target="#card-modal">
                      <i class="fa-solid fa-cart-shopping"></i> CART
                    </button>`
      : `<button onclick="getById(${element.id})" class="btn btn-add btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <i class="fa-solid fa-plus"></i> BOOKING
                    </button>`;
    allTables.innerHTML += `
                 <div class="col">
                <div class="card p-2 pt-4">
                  <div class="card-number">
                    <span class="number">${element.id}</span>
                  </div>
                  <div class="w-50 m-auto">
                    <img
                      class="card-img-top"
                      src=${img}
                      alt="Card image cap"
                    />
                  </div>
                  <div class="card-body d-flex justify-content-around">
                      ${button}
                  </div>
                </div>
              </div>
         `;
  });
}

document.getElementById("booking").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!e.target.checkValidity()) {
    console.log("validate error");
    return;
  }
  let name = document.getElementById("customerName").value;
  let quantity = document.getElementById("quantity").value;
  console.log(name, quantity);

  const table = {
    id: idTable,
    nameCustomer: name,
    quantity: quantity,
    status: true,
  };
  edit(urlTable, idTable, table);
});

function getById(id) {
  idTable = id;
  console.log(idTable);
}

// function này để khi bâm vào add qua trang food và select hiển thị id của bàn đó
let allOption = document.querySelector("option");
function showSelected(id) {
  allOption.forEach((element) => element.classList.remove("selected"));
  console.log("selectTable: " + selectTable);

  document.getElementById(id).classList.add("selected");
  console.log(id);
}
