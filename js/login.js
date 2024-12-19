const formLogin = document.getElementById("login-form");
getAll(urlUser, getDataUser);
let userData; // toàn cục

function getDataUser(data) {
  userData = data;
}
getDataUser();

let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");

let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");

emailInput.addEventListener("input", (e) => {
  if (e.target.value) {
    emailError.style.display = "none";
  }
});

passwordInput.addEventListener("input", (e) => {
  if (e.target.value) {
    passwordError.style.display = "none";
  }
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = emailInput.value;
  let password = passwordInput.value;
  let isValid = true;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    emailError.style.display = "block";
    emailError.textContent = "Vui lòng nhập email.";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    emailError.style.display = "block";
    emailError.textContent = "Email không hợp lệ.";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  if (!password) {
    passwordError.style.display = "block";
    passwordError.textContent = "Vui lòng nhập mật khẩu.";
    isValid = false;
  } else {
    passwordError.style.display = "none";
  }

  // Nếu form không hợp lệ thì không thực hiện tiếp
  if (!isValid) return;

  const findUser = userData.find(
    (user) => user.email === email && user.password === password
  );

  if (!findUser) {
    alert("Email hoặc mật khẩu không đúng");
  } else {
    localStorage.setItem("user", JSON.stringify(findUser));
    window.location.href = "home.html";
  }

  
});
