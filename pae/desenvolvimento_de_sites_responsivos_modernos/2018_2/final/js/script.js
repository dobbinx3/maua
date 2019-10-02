$(document).ready(function () {

  // Inicializando o portfolio plugin
  new GridScrollFx(document.getElementById('grid'), {
    viewportFactor : 0.4
  });

  // Previnindo ações de click nas imagens do portfolio
  $('#grid li a').on('click', function(e) {
    e.preventDefault();
  });
  
  // Parametrizando queryString
  function getUrlVars(variavel){
    var vars = [], hash;
    var hashes = variavel.slice(variavel.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

  // Formulario
  $(function () {
    $('#contatoModal .sendButton').on('click', function () {
        // let url = "contact_form/contact_form.php";

        // $.ajax({
        //   type: "POST",
        //   url: url,
        //   data: $('#contact-form').serialize(),
        //   success: function (data)
        //   {
        //     let messageAlert = 'alert-' + data.type;
        //     let messageText = data.message;

        //     let alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
        //     if (messageAlert && messageText) {
        //         $('#contatoModal').find('.messages').html(alertBox);
        //         if (messageAlert == "alert-success") {
        //             $('#contact-form')[0].reset();
        //         }
        //     }
        //   }
        // });

        // Lambda Version
        var url = "https://lx4vlicjkb.execute-api.sa-east-1.amazonaws.com/prod/send-email";

        var obj = {
          name: $('#contact-form input[name="name"]').val(),
          email: $('#contact-form input[name="email"]').val(),
          message: $('#contact-form textarea[name="message"]').val(),
          'g-recaptcha-response': getUrlVars($('#contact-form').serialize())['g-recaptcha-response']
        }

        $.ajax({
          type: "POST",
          url: url,
          data: JSON.stringify(obj),
          success: function (data)
          {
            data = JSON.parse(data);
            var alertBox = '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + data.message + '</div>';
            $('#contatoModal').find('.messages').html(alertBox);
            $('#contact-form')[0].reset();
          },
          error: function (err)
          {
            const errorMessage = JSON.parse(err.responseJSON.errorMessage);
            var alertBox = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + errorMessage.message + '</div>';
            $('#contatoModal').find('.messages').html(alertBox);
          }
        });
    });
  });

});