$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var libroId = urlParams.get('id'); // Obtiene el ID del libro de los parámetros de la URL

    $.ajax({
        url: 'http://localhost:8000/api/libro/' + libroId + '/', 
        type: 'GET',
        success: function (response) {
            console.log('Detalles del libro:');
            console.log(response);
            mostrarDetallesLibro(response);
        },
        error: function (error) {
            console.log('Error al obtener los detalles del libro:');
            console.log('URL de la solicitud:', 'http://localhost:8000/api/libro/' + libroId + '/');
            console.log(error);
        }
    });

    function mostrarDetallesLibro(libro) {
        var detallesLibroDiv = $('#infotxt');

        var detallesHtml = '<h1 class="tittlebk">' + libro.tituloLibro + '</h1>';
        detallesHtml += '<h4 class="autorbk">' + libro.autorLibro + '<br>' + libro.anioLibro + '</h4>';
        detallesHtml += '<p class="reviewbk">' + libro.descripcionLibro + '</p>';
        detallesHtml += '<h4 class="tittlebk" style="color: rgb(255, 255, 255);">$' + libro.precioLibro + ' ';
        detallesHtml += libro.stock ? '| Stock en Tienda: Si' : '| Stock en Tienda: No';
        detallesHtml += '</h4>';

        detallesLibroDiv.html(detallesHtml);

        var portadaImg = $('#portadaImg');
        portadaImg.attr('src', libro.portadaLibro);
        portadaImg.attr('alt', libro.tituloLibro);
    }
});
