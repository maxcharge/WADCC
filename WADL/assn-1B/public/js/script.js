$(document).ready(function () {
  $("#submit").click(function () {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    console.log(username + " " + password);
    $.post(
      "/request",
      {
        username: username,
        password: password,
      },
      function (data, status) {
        console.log("Data from res : ", data);
        var userPass = {
          username: data.username,
          password: data.password,
        };
        localStorage.setItem("data", JSON.stringify(userPass));
        window.location.href = "/index2.html";
      }
    );
  });
});
