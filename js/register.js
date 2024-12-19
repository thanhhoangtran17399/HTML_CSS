const formSignup = document.getElementById("sign-up");

formSignup.addEventListener("submit", (e) => {
  e.preventDefault();
  let userName = document.getElementById("fullName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;


  if (validation(userName,email,password,confirmPassword)) {
    if (password !== confirmPassword) {
      alert("mat khau khong trung khop");
      return;
    }
    let user = {
      id: userName,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      avatar : "https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png"
    };
    add(urlUser, user);
  }

  // let isValid = true;
  // Validate full name
  // if (!userName) {
  //   userNameError.style.display = "block";
  //   userNameError.textContent = "Vui lòng nhập họ tên.";
  //   isValid = false;
  // } else {
  //   userNameError.style.display = "none";
  // }

  // Validate email
  // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!email) {
  //   emailError.style.display = "block";
  //   emailError.textContent = "Vui lòng nhập email.";
  //   isValid = false;
  // } else if (!emailPattern.test(email)) {
  //   emailError.style.display = "block";
  //   emailError.textContent = "Email không hợp lệ.";
  //   isValid = false;
  // } else {
  //   emailError.style.display = "none";
  // }

  // Validate password
  // if (!password) {
  //   passwordError.style.display = "block";
  //   passwordError.textContent = "Vui lòng nhập mật khẩu.";
  //   isValid = false;
  // } else {
  //   passwordError.style.display = "none";
  // }

  // Validate confirm password
  // if (!confirmPassword) {
  //   confirmPasswordError.style.display = "block";
  //   confirmPasswordError.textContent = "Vui lòng xác nhận mật khẩu.";
  //   isValid = false;
  // } else if (password !== confirmPassword) {
  //   confirmPasswordError.style.display = "block";
  //   confirmPasswordError.textContent = "Mật khẩu không khớp.";
  //   isValid = false;
  // } else {
  //   confirmPasswordError.style.display = "none";
  // }

  // if (isValid) {
  //   let user = {
  //     id: userName,
  //     email: email,
  //     password: password,
  //     confirmPassword: confirmPassword,
  //   };
  //   add(urlUser, user);
  // }
});

function validation(userName,email,password,confirmPassword) {
  let userNameError = document.getElementById("fullNameError");
  let emailError = document.getElementById("emailError");
  let passwordError = document.getElementById("passwordError");
  let confirmPasswordError = document.getElementById("confirmPasswordError");
  userNameError.innerText = "";
  emailError.innerText = "";
  passwordError.innerText = "";
  confirmPasswordError.innerText = "";
  let error = {};
  console.log(userName);
  error.userName = userName ? "" : "Vui lòng nhập họ tên!";
  error.email = email ? "" : "Vui lòng nhập email!";
  error.password = password ? "" : "Vui lòng nhập mật khẩu!";
  error.confirmPassword = confirmPassword ? "" : "Vui lòng nhập lại mật khẩu!";
  console.log(error);

  userNameError.innerText = error.userName;
  emailError.innerText = error.email;
  passwordError.innerText = error.password;
  confirmPasswordError.innerText = error.confirmPassword;

  return (
    !error.userName && !error.email && !error.password && !error.confirmPassword
  );
}
