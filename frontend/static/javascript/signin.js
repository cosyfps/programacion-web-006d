$(document).ready(function () {
    $('#loginForm').validate({
        rules: {
            loginUsername: {
                required: true,
            },
            loginPassword: {
                required: true,
                minlength: 4,
            },
        },
        messages: {
            loginUsername: {
                required: "Por favor, ingrese su usuario",
            },
            loginPassword: {
                required: "Por favor, ingrese su contraseña",
                minlength: "La contraseña debe tener al menos 4 caracteres",
            },
        },
        submitHandler: function (form) {
            $.ajax({
              url: "http://localhost:8000/api/usuario/retrieve-by-username/",
              type: "POST",
              data: {
                username: $("#loginUsername").val(),
                password: $('#loginPassword').val(),
              },
              success: function (response) {
                localStorage.setItem("access", response.access);
                localStorage.setItem("refresh", response.refresh);
                window.location.href = 'home_page_auth.html';
              },
              error: function (response) {
                alert("Error: Usuario o contraseña incorrectos.");
                console.log(response);
              },
            });
        }
    });
});
