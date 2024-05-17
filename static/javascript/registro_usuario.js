$(document).ready(function(){
    var storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    var userCounter = storedUsers.length + 4; 

    storedUsers.forEach(function(user) {
        addUser(user.id, user.name, user.email, user.role);
    });

    $('#addUserBtn').click(function(){
        var newUser = {
            id: userCounter++,
            name: 'Nuevo usuario',
            email: 'email@ejemplo.com',
            role: 'Usuario'
        };
        addUser(newUser.id, newUser.name, newUser.email, newUser.role);
        storedUsers.push(newUser);
        saveUsersToLocalStorage();
    });

    $(document).on('click', '.edit-user', function(){
        var row = $(this).closest('tr');
        var cols = row.find('td');
        var isEditing = $(this).text() === 'Editar';

        cols.each(function(index){
            if (index < 3) {
                $(this).attr('contenteditable', isEditing);
            }
        });

        $(this).text(isEditing ? 'Guardar' : 'Editar');
        if (!isEditing) saveUsersToLocalStorage();
    });

    $(document).on('click', '.delete-user', function(){
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text();
        row.remove();
        storedUsers = storedUsers.filter(user => user.id != id);
        saveUsersToLocalStorage();
    });

    function addUser(id, name, email, role) {
        var newRow = `
            <tr id="row-${id}">
                <td>${id}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${role}</td>
                <td>
                    <button class="btn btn-primary edit-user"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger delete-user"><i class="bi bi-trash3-fill"></i></button>
                </td>
            </tr>
        `;
        $('#usersTable tbody').append(newRow);
    }

    function saveUsersToLocalStorage() {
        $('#usersTable tbody tr').each(function() {
            var id = $(this).find('td:eq(0)').text();
            var user = storedUsers.find(user => user.id == id);
            if (user) {
                user.name = $(this).find('td:eq(1)').text();
                user.email = $(this).find('td:eq(2)').text();
                user.role = $(this).find('td:eq(3)').text();
            }
        });
        localStorage.setItem('users', JSON.stringify(storedUsers));
    }
});
