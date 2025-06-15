
$(function () {
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    alert("Message sent");
    this.reset();
  });
});
