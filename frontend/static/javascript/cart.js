$(document).ready(function () {
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    function actualizarCarrito() {
        var cartItemsDiv = $('#cartItemsDiv');
        var checkoutBtnDiv = $('#checkoutBtnDiv');
        var cartTotalSpan = $('#cart-total');
        cartItemsDiv.empty();
        checkoutBtnDiv.empty();

        if (cart.length === 0) {
            cartItemsDiv.html('<h3 class="text-center">Tu carrito está vacío</h3>');
            cartTotalSpan.text(0);
            return;
        }

        var cartTotal = 0;
        var totalItems = 0;
        cart.forEach(function (item) {
            var itemHtml = '<div class="cart-row">';
            itemHtml += '<div style="flex:2"><img class="row-image" src="' + item.portada + '" alt="' + item.tituloLibro + '"></div>';
            itemHtml += '<div style="flex:2"><p>' + item.tituloLibro + '</p></div>';
            itemHtml += '<div style="flex:1">$' + item.precio + '</div>';
            itemHtml += '<div style="flex:1">';
            itemHtml += '<p class="quantity">x' + item.cantidad + '</p>';
            itemHtml += '<div class="quantity">';
            itemHtml += '<img data-id="' + item.id + '" data-action="add" class="chg-quantity update-cart" src="/frontend/static/assets/img/arrow-up.png" alt="Increase">';
            itemHtml += '<img data-id="' + item.id + '" data-action="remove" class="chg-quantity update-cart" src="/frontend/static/assets/img/arrow-down.png" alt="Decrease">';
            itemHtml += '</div>';
            itemHtml += '</div>';
            itemHtml += '<div style="flex:1">$' + (item.precio * item.cantidad).toFixed(2) + '</div>';
            itemHtml += '</div>';

            cartItemsDiv.append(itemHtml);

            cartTotal += item.precio * item.cantidad;
            totalItems += item.cantidad;
        });

        var checkoutBtnHtml =
        checkoutBtnDiv.html(checkoutBtnHtml);

        $('#totalItems').text(totalItems);
        $('#totalPrice').text(cartTotal.toFixed(2));
        cartTotalSpan.text(totalItems);
    }

    $(document).on('click', '.update-cart', function () {
        var libroId = $(this).data('id');
        var action = $(this).data('action');
        actualizarCantidad(libroId, action);
    });

    $(document).on('click', '.checkout-btn', function () {
        window.location.href = '/checkout'; // Redireccionar al checkout
    });

    function actualizarCantidad(libroId, action) {
        var index = cart.findIndex(item => item.id === libroId);

        if (index !== -1) {
            if (action === 'add') {
                cart[index].cantidad += 1;
            } else if (action === 'remove') {
                cart[index].cantidad -= 1;
                if (cart[index].cantidad <= 0) {
                    cart.splice(index, 1);
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            actualizarCarrito();
        }
    }

    // Escuchar cambios en el localStorage
    $(window).on('storage', function (e) {
        if (e.originalEvent.key === 'cart') {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
            actualizarCarrito();
        }
    });

    // Llamar a actualizarCarrito() al cargar la página
    actualizarCarrito();
});
