$(document).ready(function () {
    $.ajax({
        url: 'http://localhost:8000/api/libro/', 
        type: 'GET',
        success: function (response) {
            console.log('Listado de libros:');
            console.log(response);
            mostrarLibros(response);
        },
        error: function (error) {
            console.log('Error al obtener el listado de libros:');
            console.log(error);
        }
    });

    function mostrarLibros(libros) {
        var tbody = $('#tablaLibros tbody');
        tbody.empty();
        libros.forEach(function (libro) {
            var row = '<tr style="border: 1px solid black;" >' +
                '<td style="border: 1px solid black;" >' + libro.tituloLibro + '</td>' +
                '<td style="border: 1px solid black;" >' + libro.autorLibro + '</td>' +
                '<td style="border: 1px solid black;" >' + libro.generoLibro + '</td>' +
                '<td style="border: 1px solid black;" >' + libro.anioLibro + '</td>' +
                '<td style="border: 1px solid black;" >' + libro.descripcionLibro + '</td>' +
                '<td style="border: 1px solid black;" >' + libro.precioLibro + '</td>' +
                '<td style="border: 1px solid black;" >' + libro.digital + '</td>' +
                '<td style="border: 1px solid black;" >' + (libro.stock ? 'Sí' : 'No') + '</td>' +
                '<td style="border: 1px solid black;" ><img src="' + libro.portadaLibro + '" alt="Portada" style="width: 100px;"></td>' +
                '<td style="border: 1px solid black;" ><button class="btn btn-primary">Editar</button></td>' +
                '<td style="border: 1px solid black;" ><button class="btn btn-danger">Eliminar</button></td>' +
                '</tr style="border: 1px solid black;" >';
            tbody.append(row);
        });
    }
});
