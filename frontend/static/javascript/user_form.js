$(document).ready(function () {
    $('#userForm').on('submit', function (event) {
        event.preventDefault(); 
        
        var formData = {
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val(),  
        };

        $.ajax({
            url: 'http://localhost:8000/usuario/', 
            type: 'POST',
            data: formData,
            success: function (response) {
                console.log('Usuario agregado correctamente:', response);
                window.location.href = '/frontend/templates/admin/user_list.html';
            },
            error: function (error) {
                console.log('Error al agregar usuario:', error);
            }
        });
    });
});
