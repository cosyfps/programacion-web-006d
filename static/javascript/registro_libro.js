

$(document).ready(function(){
    // Función para editar un libro
    $(document).on('click', '.edit-product', function(){
        var row = $(this).closest('tr');
        var cols = row.find('td');

        cols.each(function(){
            if (!$(this).hasClass('edit-mode')) {
                // Al hacer clic en el botón Editar
                $(this).addClass('edit-mode');
                $(this).attr('contenteditable', true);
            } else {
                // Al hacer clic en el botón Guardar
                $(this).removeClass('edit-mode');
                $(this).attr('contenteditable', false);
            }
        });
    });

    // Función para eliminar un libro
    $(document).on('click', '.delete-product', function(){
        var row = $(this).closest('tr');
        row.remove();
    });

    // Función para agregar un nuevo libro
    $('#addBookBtn').click(function(){
        addProduct();
    });

    // Función para agregar un nuevo libro
    function addProduct() {
        var newId = $('#productsTable tbody tr').length + 1;
        var newRow = `
            <tr>
                <td>${newId}</td>
                <td contenteditable="true">Nuevo libro</td>
                <td contenteditable="true">Autor</td>
                <td contenteditable="true">Descripción</td>
                <td><img src="/static/assets/img/PORTADAS/default-cover.png" alt="" style="max-width: 5vh;"></td>
                <td><button class="btn btn-primary edit-product">Editar</button></td>
                <td><button class="btn btn-danger delete-product">Eliminar</button></td>
            </tr>
        `;
        $('#productsTable tbody').append(newRow);
    }
});