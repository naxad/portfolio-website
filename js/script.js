$(document).ready(function () {
  // Load navbar and footer
  $("#navbar").load("navbar.html");
  $("#footer").load("footer.html");

  // Apply saved dark mode
  if (localStorage.getItem('darkMode') === 'enabled') {
    $('body').addClass('dark-mode');
    $('#darkModeToggle').prop('checked', true);
  }

  // Toggle dark mode and save to localStorage
  $('#darkModeToggle').on('change', function () {
    if (this.checked) {
      $('body').addClass('dark-mode');
      localStorage.setItem('darkMode', 'enabled');
    } else {
      $('body').removeClass('dark-mode');
      localStorage.setItem('darkMode', 'disabled');
    }
  });
});
