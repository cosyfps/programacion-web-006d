$(document).ready(function(){
    // Al cargar la página, verifica si hay libros en el Local Storage
    var storedBooks = JSON.parse(localStorage.getItem('books'));
    var bookCounter = 0; // Contador de libros

    if (storedBooks) {
        // Si hay libros almacenados, los agregamos a la tabla
        storedBooks.forEach(function(book) {
            addProduct(book.id, book.title, book.author, book.description, book.imageUrl);
            bookCounter++; // Incrementamos el contador de libros
        });
    }

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
                // Guardar los cambios en el Local Storage
                saveBooksToLocalStorage();
            }
        });
    });

    // Función para eliminar un libro
    $(document).on('click', '.delete-product', function(){
        var row = $(this).closest('tr');
        row.remove();
        // Guardar los cambios en el Local Storage
        saveBooksToLocalStorage();
    });

    // Función para agregar un nuevo libro
    $('#addBookBtn').click(function(){
        console.log("Se hizo clic en el botón de añadir libro.");
        var title = 'Nuevo libro';
        var author = 'Autor';
        var description = 'Descripción';
        var imageUrl = ''; // URL de la imagen predeterminada
        addProduct(++bookCounter, title, author, description, imageUrl); // Incrementa el contador y agrega el nuevo libro
        saveBooksToLocalStorage();
    });
    

    // Función para agregar un libro a la tabla
    function addProduct(id, title, author, description, imageUrl) {
        var newRow = `
            <tr id="row-${id}">
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${description}</td>
                <td>
                    <input type="file" id="file-${id}" accept="image/*" onchange="previewImage(${id})">
                    <img id="image-${id}" src="${imageUrl}" alt="Portada" style="max-width: 5vh;">
                </td>
                <td><button class="btn btn-primary edit-product">Editar</button></td>
                <td><button class="btn btn-danger delete-product">Eliminar</button></td>
            </tr>
        `;
        $('#productsTable tbody').append(newRow);
    }
    
    // Función para previsualizar la imagen seleccionada
    function previewImage(id) {
        var input = document.getElementById(`file-${id}`);
        var image = document.getElementById(`image-${id}`);
        var file = input.files[0];
        var reader = new FileReader();
    
        reader.onloadend = function() {
            image.src = reader.result;
        }
    
        if (file) {
            reader.readAsDataURL(file);
        } else {
            image.src = "";
        }
    }

    // Función para guardar los libros en el Local Storage
    function saveBooksToLocalStorage() {
        var books = [];
        $('#productsTable tbody tr').each(function() {
            var book = {
                id: $(this).find('td:eq(0)').text(),
                title: $(this).find('td:eq(1)').text(),
                author: $(this).find('td:eq(2)').text(),
                description: $(this).find('td:eq(3)').text(),
                imageUrl: $(this).find('img').attr('src') // Obtenemos la URL de la imagen
            };
            books.push(book);
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
});
