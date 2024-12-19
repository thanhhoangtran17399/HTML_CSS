const buttonAbbreviated = document.getElementById("abbreviated");
buttonAbbreviated.addEventListener("click", showAllSideBar);
const hiddenText = document.querySelectorAll(".item");
const hiddenMenu = document.querySelector(".menu");

const listContainer = document.querySelectorAll(".container");
const listSideBar = document.querySelectorAll(".nav-link");

const profile=document.querySelector(".popup-profile");

function showAllSideBar() {
  hiddenText.forEach((e) => e.classList.toggle("hidden"));
  hiddenMenu.classList.toggle("menu");
}

function show(idMain,idNav) {
  listContainer.forEach((element) => element.classList.remove("active"));
  listSideBar.forEach((element) => element.classList.remove("active"));
  document.getElementById(idMain).classList.add("active");
  document.getElementById(idNav).classList.add("active");
}

function showPopupProfile(){
  profile.classList.toggle("active");
}

function showProfile() {
  const avatar = document.getElementById("avatar");
  const userEmail = document.getElementById("profile-email");
  const userName = document.getElementById("profile-name");
  
  const user = JSON.parse(localStorage.getItem("user"));
  if(user) {
     avatar.src = user.avatar;
     userEmail.innerText = user.email;
     userName.innerText = user.id;
  }

}

function logout() {
  // Xóa thông tin đăng nhập trong localStorage
  localStorage.removeItem('user');  // Xóa token hoặc các thông tin cần thiết

  // Chuyển hướng người dùng đến trang đăng nhập hoặc trang chính
  window.location.href = './login.html';  // Điều hướng tới trang đăng nhập
}

showProfile() ;