getAll(urlOrder, getDataOrder);
let orders; // toàn cục

function getDataOrder(data) {
  orders = data;
}

function order() {
  //lấy ra id bàn
  let idTable = document.getElementById("selectTable").value;
  //tìm ra danh sách tất cả món ăn dựa vào tất cả thẻ có class = card-food
  const listFood = document.querySelectorAll(".card-food");

  const bill = orders.find((e) => e.id === idTable);

  let items = bill ? bill.items : [];

  listFood.forEach((e) => {
    const quantity = e.querySelector(".quantity").value;
    if (parseInt(quantity) > 0) {
      //Lấy ra id món ăn
      const idFood = e.querySelector(".number").innerText;
      const index = items.findIndex((e) => e.id === idFood);
      console.log(index);

      if (index >= 0) {
        items[index].quantity += parseInt(quantity);
      } else {
        //đưa các món ăn vào mảng item
        items.push({ id: idFood, quantity: parseInt(quantity) });
      }
    }
  });

  const tableOder = {
    id: idTable,
    items: items,
  };
  console.log(tableOder);

  if (bill) {
    edit(urlOrder, idTable, tableOder);
  } else {
    add(urlOrder, tableOder);
  }
}

//hàm paybill thực hiện xóa order theo id và reset bàn về mặc định
document.getElementById("btnPayBill").addEventListener("click", payBill);
function payBill() {
  let idTable = document.getElementById("selectTableCart").value;
  console.log(idTable);
  //thư
  deleted(urlOrder, idTable);
  const tableReset = {
    id: idTable,
    nameCustomer: "",
    quantity: null,
    status: false,
  };
  edit(urlTable, idTable, tableReset);
}
