$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var libroId = urlParams.get('id'); 

    // Obtener detalles del libro mediante AJAX al cargar la página
    $.ajax({
        url: 'http://localhost:8000/libro/' + libroId + '/', 
        type: 'GET',
        success: function (response) {
            console.log('Detalles del libro:');
            console.log(response);
            mostrarDetallesLibro(response);
            agregarBotonCarrito(response); // Pasa la respuesta completa
        },
        error: function (error) {
            console.log('Error al obtener los detalles del libro:');
            console.log('URL de la solicitud:', 'http://localhost:8000/libro/' + libroId + '/');
            console.log(error);
        }
    });

    // Función para mostrar los detalles del libro en la página
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

    // Función para agregar el botón "Añadir al carrito" dinámicamente
    function agregarBotonCarrito(libro) {
        var botonHTML = '<div class="row" id="downloadbtn" style="margin-top: 15px">';
        botonHTML += '<div class="col"></div>';
        botonHTML += '<div class="col" style="display: flex; justify-content: center; align-items: center">';
        botonHTML += '<button id="addToCartBtn" data-libro="' + libro.id + '" class="btn btn-success add-btn">Añadir al carrito</button>';
        botonHTML += '</div>';
        botonHTML += '<div class="col"></div>';
        botonHTML += '</div>';

        $('#downloadbtn').html(botonHTML); 

        $(document).on('click', '#addToCartBtn', function () {
            agregarAlCarrito(libro);
        });
    }

    // Función para manejar la adición de libros al carrito
    function agregarAlCarrito(libro) {
        console.log('Agregando libro al carrito con ID:', libro.id);

        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        var existingBookIndex = cart.findIndex(function (item) {
            return item.id === libro.id;
        });

        if (existingBookIndex === -1) {
            cart.push({
                id: libro.id,
                tituloLibro: libro.tituloLibro,
                autorLibro: libro.autorLibro,
                generoLibro: libro.generoLibro,
                anioLibro: libro.anioLibro,
                precio: libro.precioLibro,
                portada: libro.portadaLibro,
                cantidad: 1
            });
        } else {
            cart[existingBookIndex].cantidad += 1;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Libro agregado al carrito:', libro);

        // Actualizar la burbuja de cantidad en el icono de carrito
        actualizarContadorCarrito();
    }

    // Función para actualizar el contador de cantidad en el icono de carrito
    function actualizarContadorCarrito() {
        var cart = JSON.parse(localStorage.getItem('cart')) || [];
        var totalItems = cart.reduce(function (total, item) {
            return total + item.cantidad;
        }, 0);

        $('#cart-total').text(totalItems);
    }
});
