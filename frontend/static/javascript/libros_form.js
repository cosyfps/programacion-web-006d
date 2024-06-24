$(document).ready(function () {
    $('#libroForm').on('submit', function (event) {
        event.preventDefault(); 
        
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
            url: 'http://localhost:8000/libro/',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log('Libro agregado correctamente:', response);
                window.location.href = '/frontend/templates/admin/libros_list.html';
            },
            error: function (error) {
                console.log('Error al agregar libro:', error);
            }
        });
    });
});
