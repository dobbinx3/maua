$(document).ready(function () {

  // Inicializando o portfolio plugin
  new GridScrollFx(document.getElementById('grid'), {
    viewportFactor : 0.4
  });

  // Previnindo ações de click nas imagens do portfolio
  $('#grid li a').on('click', function(e) {
    e.preventDefault();
  });

  // Formulario
  $(function () {
    $('#contatoModal .sendButton').on('click', function () {
        let url = "contact_form/contact_form.php";

        $.ajax({
          type: "POST",
          url: url,
          data: $('#contact-form').serialize(),
          success: function (data)
          {
            let messageAlert = 'alert-' + data.type;
            let messageText = data.message;

            let alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
            if (messageAlert && messageText) {
                $('#contatoModal').find('.messages').html(alertBox);
                if (messageAlert == "alert-success") {
                    $('#contact-form')[0].reset();
                }
            }
          }
        });
    });
  });

});