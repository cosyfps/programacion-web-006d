$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8000/api/usuario/',  // Cambia la URL según la API de tu backend
        type: 'GET',
        success: function (response) {
            console.log('Listado de usuarios:');
            console.log(response);
            mostrarUsuarios(response);
        },
        error: function (error) {
            console.log('Error al obtener el listado de usuarios:');
            console.log(error);
        }
    });

    function mostrarUsuarios(usuarios) {
        var tbody = $('#usersTable tbody');
        tbody.empty();
        usuarios.forEach(function (usuario) {
            var row = '<tr style="border: 1px solid black;" >' +
                '<td style="border: 1px solid black;" >' + usuario.id + '</td>' +
                '<td style="border: 1px solid black;" >' + usuario.username + '</td>' +
                '<td style="border: 1px solid black;" >' + usuario.email + '</td>' +
                '<td style="border: 1px solid black;" ><a href="/frontend/templates/admin/user_edit.html?id=' + usuario.id + '" class="btn btn-primary">Editar</a></td>' +
                '<td style="border: 1px solid black;" ><button class="btn btn-danger delete-btn" data-id="' + usuario.id + '">Eliminar</button></td>' +
                '</tr style="border: 1px solid black;" >';
            tbody.append(row);
        });

        // Agregar evento clic para botones de eliminar
        $('.delete-btn').on('click', function () {
            var userId = $(this).data('id');
            eliminarUsuario(userId);
        });
    }

    function eliminarUsuario(userId) {
        $.ajax({
            url: 'http://localhost:8000/api/usuario/' + userId + '/',  
            type: 'DELETE',
            success: function (response) {
                console.log('Usuario eliminado correctamente');
                $.ajax({
                    url: 'http://localhost:8000/api/usuario/',  
                    type: 'GET',
                    success: function (response) {
                        mostrarUsuarios(response);
                    },
                    error: function (error) {
                        console.log('Error al obtener el listado de usuarios después de eliminar:');
                        console.log(error);
                    }
                });
            },
            error: function (error) {
                console.log('Error al eliminar el usuario:');
                console.log(error);
            }
        });
    }
    
});
