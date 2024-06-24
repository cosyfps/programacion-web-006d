$(document).ready(function () {
    var userId = obtenerParametroUrl('id');

    if (userId) {
        obtenerUsuario(userId);
    }

    $('#editUserForm').submit(function (event) {
        event.preventDefault();
        editarUsuario(userId);
    });

    function obtenerParametroUrl(parametro) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(parametro);
    }

    function obtenerUsuario(userId) {
        $.ajax({
            url: 'http://localhost:8000/usuario/' + userId + '/',  
            type: 'GET',
            success: function (usuario) {
                $('#userId').val(usuario.id);
                $('#username').val(usuario.username);
                $('#email').val(usuario.email);
            },
            error: function (error) {
                console.log('Error al obtener los detalles del usuario:');
                console.log(error);
            }
        });
    }

    function editarUsuario(userId) {
        var formData = {
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val(),  
        };
    
        $.ajax({
            url: 'http://localhost:8000/usuario/' + userId + '/',
            type: 'PUT',
            data: formData,
            success: function (response) {
                console.log('Usuario actualizado correctamente');
                window.location.href = '/frontend/templates/admin/user_list.html';
            },
            error: function (error) {
                console.log('Error al actualizar el usuario:');
                console.log(error.responseJSON); 
            }
        });
    }
});
