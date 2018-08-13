$(function () {

  // ajustando altura da imagem do carousel
  $('.carousel-item img').css('height', $(window).height());

  // Quando tiver resize na tela também ajusta altura da imagem
  $(window).resize(function () {
    $('.carousel-item img').css('height', $(window).height());
  });

  // Efeito de flip no produto
  $('.flipProduto').on('click', function (evt) {
    evt.preventDefault();

    $(this).parents('.front').siblings('.back').children().children('.card-body').children('img').css('height', $(this).parent().height());
    $(this).parents('.flip-container').addClass('hover');
  });

  $('.flipBack').on('click', function (evt) {
    evt.preventDefault();

    $(this).parents('.flip-container').removeClass('hover');
  });

});