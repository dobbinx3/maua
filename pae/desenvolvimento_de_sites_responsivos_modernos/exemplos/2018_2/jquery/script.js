$(document).ready(function () {

  document.getElementById('teste').addEventListener('click', function () {
    this.classList.add('hinge');
  });
  
  $('ul li').on('click', function () {
    $(this).addClass('hinge');
  });

  $('#teste').click(function () {
    $(this).addClass('hinge');
  });

});