$(document).ready(function(){
    var storedBooks = JSON.parse(localStorage.getItem('books')) || [];
    var bookCounter = storedBooks.length;

    storedBooks.forEach(function(book) {
        addProduct(book.id, book.title, book.author, book.description, book.imageUrl);
    });

    $('#addBookBtn').click(function(){
        var newBook = {
            id: ++bookCounter,
            title: 'Nuevo libro',
            author: 'Autor',
            description: 'Descripción',
            imageUrl: ''
        };
        addProduct(newBook.id, newBook.title, newBook.author, newBook.description, newBook.imageUrl);
        storedBooks.push(newBook);
        saveBooksToLocalStorage();
    });

    $(document).on('click', '.edit-product', function(){
        var row = $(this).closest('tr');
        var cols = row.find('td');
        var isEditing = $(this).text() === 'Editar';

        cols.each(function(index){
            if (index < 4) {
                $(this).attr('contenteditable', isEditing);
            } else if (index === 4) {
                $(this).find('input[type="file"]').toggle(isEditing);
                $(this).find('img').toggle(!isEditing);
            }
        });

        $(this).text(isEditing ? 'Guardar' : 'Editar');
        if (!isEditing) saveBooksToLocalStorage();
    });

    $(document).on('click', '.delete-product', function(){
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text();
        row.remove();
        storedBooks = storedBooks.filter(book => book.id != id);
        saveBooksToLocalStorage();
    });

    function addProduct(id, title, author, description, imageUrl) {
        var newRow = `
            <tr id="row-${id}">
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${description}</td>
                <td>
                    <input type="file" id="file-${id}" accept="image/*" style="display: none;">
                    <img id="image-${id}" src="${imageUrl}" alt="Portada" style="max-width: 5vh; display: ${imageUrl ? 'block' : 'none'};">
                </td>
                <td>
                    <button class="btn btn-primary edit-product"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger delete-product"><i class="bi bi-trash3-fill"></i></button>
                </td>
            </tr>
        `;
        $('#productsTable tbody').append(newRow);

        $(`#file-${id}`).change(function() {
            previewImage(id);
        });
    }

    function previewImage(id) {
        var input = document.getElementById(`file-${id}`);
        var image = document.getElementById(`image-${id}`);
        var file = input.files[0];
        var reader = new FileReader();

        reader.onloadend = function() {
            image.src = reader.result;
            image.style.display = 'block';
            updateImageUrl(id, reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            image.src = "";
            image.style.display = 'none';
        }
    }

    function updateImageUrl(id, imageUrl) {
        var book = storedBooks.find(book => book.id == id);
        if (book) {
            book.imageUrl = imageUrl;
            saveBooksToLocalStorage();
        }
    }

    function saveBooksToLocalStorage() {
        $('#productsTable tbody tr').each(function() {
            var id = $(this).find('td:eq(0)').text();
            var book = storedBooks.find(book => book.id == id);
            if (book) {
                book.title = $(this).find('td:eq(1)').text();
                book.author = $(this).find('td:eq(2)').text();
                book.description = $(this).find('td:eq(3)').text();
            }
        });
        localStorage.setItem('books', JSON.stringify(storedBooks));
    }
});
