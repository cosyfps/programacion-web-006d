$(document).ready(function(){
    // Función para guardar los datos del formulario en el Local Storage
    function saveContactDataToLocalStorage() {
        var contactData = {
            nombre: $('#nombre').val(),
            apellido: $('#apellido').val(),
            telefono: $('#telefono').val(),
            correo: $('#correo').val()
        };
        console.log(contactData); // Agregar esta línea para mostrar los datos en la consola
        localStorage.setItem('contactData', JSON.stringify(contactData));
    }
    

    // Al enviar el formulario, guardar los datos en el Local Storage
    $('#contactForm').submit(function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe normalmente
        saveContactDataToLocalStorage();
        alert("Datos de contacto guardados en el Local Storage.");
        // Aquí podrías redirigir a otra página o realizar otras acciones después de guardar los datos.
    });

    // Al cargar la página, verificar si hay datos de contacto en el Local Storage y completar el formulario si los hay
    var storedContactData = JSON.parse(localStorage.getItem('contactData'));
    if (storedContactData) {
        $('#nombre').val(storedContactData.nombre);
        $('#apellido').val(storedContactData.apellido);
        $('#telefono').val(storedContactData.telefono);
        $('#correo').val(storedContactData.correo);
    }
});
