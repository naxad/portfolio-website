$(document).ready(function () {
  // Load navbar and footer first
  $("#navbar").load("navbar.html", function () {
    // Now that navbar is loaded, we can safely bind to the toggle
    const toggle = $('#darkModeToggle');

    // Set initial state
    if (localStorage.getItem('darkMode') === 'enabled') {
      $('body').addClass('dark-mode');
      toggle.prop('checked', true);
    }

    // On toggle click
    toggle.on('change', function () {
      if (this.checked) {
        $('body').addClass('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        $('body').removeClass('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  });

  $("#footer").load("footer.html");
});
