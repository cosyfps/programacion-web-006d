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
        var portadasDiv = $('#portadasLibro');
        portadasDiv.empty();
        libros.forEach(function (libro) {
            var portada = '<a href="/frontend/templates/catalogue_detail.html?id=' + libro.id + '">' +
                '<img src="' + libro.portadaLibro + '" alt="' + libro.tituloLibro + '" style="max-width: 300px; width: 200px; max-height: 300px; height: 300px;">' +
                '</a>';
            portadasDiv.append(portada);
        });
    }
});
