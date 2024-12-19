getAll(urlTable, getAllTables);

let idTable;

function getAllTables(data) {
  const allTables = document.querySelector(".all-tables");
  let selectTable = document.getElementById("selectTable");
  let selectTableCart = document.getElementById("selectTableCart");

  data.forEach((element) => {
    const img = element.status ? `../img/pub.png` : "../img/table.png";
    if (element.status) {
      selectTable.innerHTML += `<option value="${element.id}">Table ${element.id}</option>`;
      selectTableCart.innerHTML += `<option value="${element.id}">Table ${element.id}</option>`;
    }
    const button = element.status
      ? `  <button onclick="showSelected('${element.id}')" class="btn btn-add btn-danger">
                      <i class="fa-solid fa-plus"></i> ADD
                    </button>
                    <button onclick="showCart(${element.id})" class="btn btn-cart btn-success" data-bs-toggle="modal" data-bs-target="#card-modal">
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

function showSelected(id) {
  show("order", "nav-link-order");
  let selectTable = document.getElementById("selectTable");
  selectTable.value = id;
}

function showCart(id) {
  // tim ve thung chua
  let cartBody = document.querySelector(".cart-body-modal");
  let cartFoot = document.querySelector(".cart-foot-modal");
  cartBody.innerHTML = "";
  cartFoot.innerHTML = "";
  const order = orders.find((element) => element.id == id);
  let total = 0;
  order.items.forEach((item) => {
    const food = dataFood.find((element) => element.id == item.id);
    console.log(food);

    cartBody.innerHTML += ` <tr>
                    <th scope="row">${food.id}</th>
                    <td><img src="${food.img}" alt="" /></td>
                    <td>${food.foodName}</td>
                    <td>${item.quantity}</td>
                    <td>${food.price}</td>
                  </tr>`;

    total += parseInt(food.price) * parseInt(item.quantity);
  });
  cartFoot.innerHTML += ` <tr>
  <th scope="col" colspan="4">Total</th>
  <th scope="col">${total}</th>
</tr>`;
}

function showCartBill(id) {
  console.log(id);
  let cartBillBody = document.querySelector(".cart-body");

  let cartBillFoot = document.querySelector(".cart-foot");

  cartBillBody.innerHTML = "";
  cartBillFoot.innerHTML = "";
  const order = orders.find((element) => element.id == id);
  console.log(order);

  if (!order) return;
  let total = 0;
  order.items.forEach((item) => {
    const food = dataFood.find((element) => element.id == item.id);
    // console.log(item.id);

    cartBillBody.innerHTML += ` <tr>
                    <th scope="row">${food.id}</th>
                    <td><img src="${food.img}" alt="" /></td>
                    <td>${food.foodName}</td>
                    <td>${item.quantity}</td>
                    <td>${food.price}</td>
                  </tr>`;

    total += parseInt(food.price) * parseInt(item.quantity);
  });
  cartBillFoot.innerHTML += ` <tr>
  <th scope="col" colspan="4">Total</th>
  <th scope="col">${total}</th>
</tr>`;

  console.log(cartBillBody, cartBillFoot);
}
