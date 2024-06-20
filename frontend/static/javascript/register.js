$(document).ready(function () {
    $('#registerForm').validate({
        rules: {
            registerName: {
                required: true,
            },
            registerEmail: {
                required: true,
                email: true,
            },
            registerPassword: {
                required: true,
                minlength: 4,
            },
            confirmPassword: {
                required: true,
                equalTo: "#registerPassword"
            }
        },
        messages: {
            registerName: {
                required: "Por favor, ingrese un nombre de usuario",
            },
            registerEmail: {
                required: "Por favor, ingrese un correo electrónico",
                email: "Por favor, ingrese un correo electrónico válido",
            },
            registerPassword: {
                required: "Por favor, ingrese una contraseña",
                minlength: "La contraseña debe tener al menos 8 caracteres",
            },
            confirmPassword: {
                required: "Por favor, confirme su contraseña",
                equalTo: "Las contraseñas no coinciden",
            }
        },
        submitHandler: function (form) {
            $.ajax({
                url: 'http://localhost:8000/api/usuario/', 
                type: 'POST',
                data: {
                    username: $('#registerName').val(),
                    email: $('#registerEmail').val(),
                    password: $('#registerPassword').val(),
                },
                success: function (response) {
                    alert('Usuario registrado correctamente.');
                    window.location.href = 'signin.html'; 
                    console.log(response);
                },
                error: function (response) {
                    if (response.responseJSON && response.responseJSON.username) {
                        alert('ERROR: ' + response.responseJSON.username[0]);  // Mostrar mensaje de error específico
                    } else {
                        alert('ERROR: Usuario no se ha registrado.');  // Mensaje genérico de error
                    }
                    console.log(response);
                }
            });
        }
    });
});
