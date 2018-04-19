(function() {
   
    // Escutando Evento de Click
    document.getElementById('submitForm').addEventListener('click', function () {
        // Validando campos do formulário
        let nome = document.getElementById('nome');
        let email = document.getElementById('email');
        let mensagem = document.getElementById('mensagem');

        if (nome.value === '') {
            nome.style.borderColor = 'red';
        } else {
            nome.style.borderColor = '#666';
        }

        if (email.value === '') {
            email.style.borderColor = 'red';
        } else {
            email.style.borderColor = '#666';
        }

        if (mensagem.value === '') {
            mensagem.style.borderColor = 'red';
        } else {
            mensagem.style.borderColor = '#666';
        }
    });
 
 })();