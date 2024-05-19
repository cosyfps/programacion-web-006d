
    $(document).ready(function(){
        // Función para cargar los datos del formulario desde localStorage
        function cargarDatosFormulario() {
            var nombre = localStorage.getItem('nombre');
            var apellido = localStorage.getItem('apellido');
            var telefono = localStorage.getItem('telefono');
            var correo = localStorage.getItem('correo');

            if (nombre) $('#nombre').val(nombre);
            if (apellido) $('#apellido').val(apellido);
            if (telefono) $('#telefono').val(telefono);
            if (correo) $('#correo').val(correo);
        }

        // Cargar datos del formulario al cargar la página
        cargarDatosFormulario();

        $('#contactForm').validate({
            rules: {
                nombre: {
                    required: true
                },
                apellido: {
                    required: true
                },
                telefono: {
                    required: true,
                    minlength: 9,
                    digits: true
                },
                correo: {
                    required: true,
                    email: true
                }
            },
            messages: {
                nombre: {
                    required: "Por favor, ingresa tu nombre."
                },
                apellido: {
                    required: "Por favor, ingresa tu apellido."
                },
                telefono: {
                    required: "Por favor, ingresa tu número de teléfono.",
                    minlength: "El número de teléfono debe tener al menos 9 dígitos.",
                    digits: "Por favor, introduce solo dígitos."
                },
                correo: {
                    required: "Por favor, ingresa tu correo electrónico.",
                    email: "Por favor, ingresa un correo electrónico válido."
                }
            },
            errorElement: 'label',
            errorPlacement: function(error, element) {
                error.addClass('error');
                error.insertAfter(element);
            },
            submitHandler: function(form) {
                // Guardar los datos del formulario en localStorage
                localStorage.setItem('nombre', $('#nombre').val());
                localStorage.setItem('apellido', $('#apellido').val());
                localStorage.setItem('telefono', $('#telefono').val());
                localStorage.setItem('correo', $('#correo').val());

                alert("Formulario válido. Se enviará...");
                form.submit();
            }
        });
    });


