$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8000/api/users/',  // Cambia la URL según la API de tu backend
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
            var row = '<tr>' +
                '<td>' + usuario.id + '</td>' +
                '<td>' + usuario.username + '</td>' +
                '<td>' + usuario.email + '</td>' +
                '<td>' + (usuario.is_superuser ? 'Sí' : 'No') + '</td>' +
                '<td><a href="/frontend/templates/admin/user_confirm_delete.html?id=' + usuario.id + '" class="btn btn-danger">Eliminar</a></td>' +
                '<td><a href="/frontend/templates/admin/user_confirm_delete.html?id=' + usuario.id + '" class="btn btn-danger">Eliminar</a></td>' +
                '</tr>';
            tbody.append(row);
        });
    }
});
