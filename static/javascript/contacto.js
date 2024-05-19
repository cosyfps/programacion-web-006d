$(document).ready(function(){
    // Función para validar el formulario
    function validateForm() {
        var nombre = $('#nombre').val().trim();
        var apellido = $('#apellido').val().trim();
        var telefono = $('#telefono').val().trim();
        var correo = $('#correo').val().trim();

        // Validar que los campos no estén vacíos
        if (nombre === '' || apellido === '' || telefono === '' || correo === '') {
            alert("Por favor complete todos los campos del formulario.");
            return false;
        }

        // Validar formato de correo electrónico
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(correo)) {
            alert("Por favor ingrese un correo electrónico válido.");
            return false;
        }

        // Si pasa todas las validaciones
        return true;
    }

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
    
    // Al enviar el formulario, validar y guardar los datos en el Local Storage si la validación es exitosa
    $('#contactForm').submit(function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe normalmente

        // Validar el formulario antes de guardar los datos
        if (validateForm()) {
            saveContactDataToLocalStorage();
            alert("Datos de contacto guardados en el Local Storage.");
            // Aquí podrías redirigir a otra página o realizar otras acciones después de guardar los datos.
        }
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
