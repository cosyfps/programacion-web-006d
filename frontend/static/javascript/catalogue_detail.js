$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var libroId = urlParams.get('id'); 

    $.ajax({
        url: 'http://localhost:8000/libro/' + libroId + '/', 
        type: 'GET',
        success: function (response) {
            console.log('Detalles del libro:');
            console.log(response);
            mostrarDetallesLibro(response);
            agregarBotonCarrito(libroId); 
        },
        error: function (error) {
            console.log('Error al obtener los detalles del libro:');
            console.log('URL de la solicitud:', 'http://localhost:8000/libro/' + libroId + '/');
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

    function agregarBotonCarrito(libroId) {
        var botonHTML = '<div class="row" id="downloadbtn" style="margin-top: 15px">';
        botonHTML += '<div class="col"></div>';
        botonHTML += '<div class="col" style="display: flex; justify-content: center; align-items: center">';
        botonHTML += '<button id="addToCartBtn" data-libro="' + libroId + '" class="btn btn-success add-btn">Añadir al carrito</button>';
        botonHTML += '</div>';
        botonHTML += '<div class="col"></div>';
        botonHTML += '</div>';

        $('#downloadbtn').html(botonHTML); 
    }

    $(document).on('click', '#addToCartBtn', function () {
        var libroId = $(this).data('libro');
        agregarAlCarrito(libroId);
    });

    function agregarAlCarrito(libroId) {
        console.log('Agregando libro al carrito con ID:', libroId);
    }
});
