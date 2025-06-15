document.addEventListener("DOMContentLoaded", () => {
  const hour = new Date().getHours();
  let greeting = "";
  if (hour < 12) {
    greeting = "🌅 Good morning!";
  } else if (hour < 18) {
    greeting = "🌞 Good afternoon!";
  } else {
    greeting = "🌙 Good evening!";
  }
  const greetingElement = document.querySelector("#greeting");
  if (greetingElement) greetingElement.textContent = greeting;
});
