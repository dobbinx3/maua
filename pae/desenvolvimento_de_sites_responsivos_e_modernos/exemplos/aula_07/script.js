$(function() {
  $('#teste').css('color', 'blue');

  $('#teste').on('click', function () {
    alert('Um link foi clicado');
  });

  $('#teste2').on('dblclick', function () {
    alert('Um link foi clicado duas vezes consecutivas');
  });

  $(document).scroll(function() {
    console.log('Scrolling');
  });
});