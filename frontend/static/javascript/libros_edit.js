$(document).ready(function () {
    var libroId = obtenerParametroUrl('id');

    if (libroId) {
        obtenerLibro(libroId);
    }

    $('#editLibroForm').submit(function (event) {
        event.preventDefault();
        editarLibro(libroId);
    });

    function obtenerParametroUrl(parametro) {
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(parametro);
    }

    function obtenerLibro(libroId) {
        $.ajax({
            url: 'http://localhost:8000/libro/' + libroId + '/',
            type: 'GET',
            success: function (libro) {
                $('#libroId').val(libro.id);
                $('#titulo').val(libro.tituloLibro);
                $('#autor').val(libro.autorLibro);
                $('#genero').val(libro.generoLibro);
                $('#anio').val(libro.anioLibro);
                $('#descripcion').val(libro.descripcionLibro);
                $('#precio').val(libro.precioLibro);
                $('#stock').prop('checked', libro.stock);
                $('#portadaLibro').val(libro.portadaLibro);
            },
            error: function (error) {
                console.log('Error al obtener los detalles del libro:');
                console.log(error);
            }
        });
    }

    function editarLibro(libroId) {

        var formData = new FormData();

        formData.append('tituloLibro', $('#titulo').val());
        formData.append('autorLibro', $('#autor').val());
        formData.append('generoLibro', $('#genero').val());
        formData.append('anioLibro', $('#anio').val());
        formData.append('descripcionLibro', $('#descripcion').val());
        formData.append('precioLibro', $('#precio').val());
        formData.append('stock', $('#stock').val());
        formData.append('portadaLibro', $('#portadaLibro')[0].files[0]);

        $.ajax({
        url: 'http://localhost:8000/libro/' + libroId + '/',
        type: 'PUT',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log('Libro actualizado correctamente');
            window.location.href = '/frontend/templates/admin/libros_list.html';
        },
        error: function (error) {
            console.log('Error al actualizar el libro:', error.responseJSON);
        }
    });
    }
});
