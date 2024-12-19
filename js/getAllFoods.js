getAll(urlFood, getAllFoods);
let dataFood;
let currentFoodId = null;
const formEdit = document.getElementById("formEdit");
function getAllFoods(data, search) {
  const allFoods = document.querySelector(".all-foods");
  allFoods.innerHTML = "";
  dataFood = data.sort((a, b) => a.id - b.id);

  let filterFood;
  console.log(search);

  if (search) {
    filterFood = data.filter((item) =>
      item.foodName.toLowerCase().includes(search.toLowerCase())
    );
  } else {
    filterFood = data;
  }

  filterFood.forEach((element) => {
    const item = document.createElement("div");
    item.classList.add("col");
    item.innerHTML = `
            <div class="card card-food">
                <div class="card-top">
                    <div class="food-number">
                        <span class="number">${element.id}</span>
                    </div>
                    <h3>${element.foodName}</h3>
                    <i class="fa-solid fa-pen-to-square" data-bs-toggle="modal" data-bs-target="#editFoodModal" data-id="${element.id}"></i>
                </div>
                <div class="card-img">
                    <img src="${element.img}" alt="">
                </div>
                <span>${element.price}$</span>
                <div class="card-bottom">
                    <i class="fa-solid fa-circle-minus"></i>                   
                    <input type="text" value="0" class="quantity">
                    <i class="fa-solid fa-circle-plus"></i>
                    
                </div>
            </div>   
         `;
    allFoods.appendChild(item);
    let quantity = item.querySelector(".quantity");
    item.querySelector(".fa-circle-minus").addEventListener("click", () => {
      if (parseInt(quantity.value) > 0) {
        quantity.value = parseInt(quantity.value) - 1;
      }
    });
    item.querySelector(".fa-circle-plus").addEventListener("click", () => {
      quantity.value = parseInt(quantity.value) + 1;
    });

    //edit món ăn
    const iconEdit = document.querySelector(
      `[data-id = '${element.id}'].fa-pen-to-square`
    );

    iconEdit.addEventListener("click", (e) => {
      e.preventDefault();
      // Lưu ID của món ăn vào biến toàn cục
      currentFoodId = e.currentTarget.dataset.id;
      formEdit.foodName.value = element.foodName;
      formEdit.price.value = element.price;
      document.getElementById("imgCategory").src = element.img; // Hiển thị ảnh hiện tại trong form chỉnh sửa
      formEdit.imgUpload.value = ""; // Xóa ảnh đã chọn trước đó trong input file
    });
  });
}

//xử lý hiện preview hình ảnh trước khi thêm món ăn mới
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("imgCategory").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

//xử lý thêm mới món ăn
document.getElementById("formAddNew").addEventListener("submit", async (e) => {
  e.preventDefault();
  const foodName = document.getElementById("foodName").value;
  const price = document.getElementById("price").value;
  const file = document.getElementById("imgUpload").files[0];
  const img = await uploadImage(file);
  var id = 1;
  dataFood.forEach((a) => {
    if (a.id == id) {
      id++;
    } else {
      return;
    }
  });
  const formData = {
    id: id,
    foodName: foodName,
    img: img,
    quantity: null,
    price: price,
  };
  add(urlFood, formData);
  const modalElement = document.getElementById("addFoodModal");
  const modal = window.bootstrap.Modal.getInstance(modalElement);
  modal.hide();
});

//xử lý cập nhật món ăn
formEdit.addEventListener("submit", async (e) => {
  e.preventDefault();
  const foodName = formEdit.foodName.value;
  const price = formEdit.price.value;
  const file = formEdit.imgUpload.files[0];
  let img;
  if (file) {
    img = await uploadImage(file); // Tải ảnh mới nếu có
  } else {
    img = document.getElementById("imgCategory").src; // Giữ ảnh cũ nếu không có ảnh mới
  }

  const formData = {
    id: currentFoodId,
    foodName: foodName,
    img: img,
    quantity: null,
    price: price,
  };
  console.log(formData);

  edit(urlFood, currentFoodId, formData);
  const modalElement = document.getElementById("editFoodModal");
  const modal = window.bootstrap.Modal.getInstance(modalElement);
  modal.hide();
});

//Xóa món ăn
document
  .querySelector("#deleteModal .btn-del")
  .addEventListener("click", deleteFood);
function deleteFood() {
  let idFood = currentFoodId;
  console.log(idFood);
  deleted(urlFood, idFood);
}

document.querySelector(".search-food").addEventListener("change", (event) => {
  const search = event.target.value;
  getAllFoods(dataFood, search);
});
