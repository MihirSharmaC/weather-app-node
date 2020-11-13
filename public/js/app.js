const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";

weatherForm.addEventListener("submit", (e) => {
  messageOne.innerHTML = `<p>LOADING.......</p>`;
  e.preventDefault();
  fetch(
    `http://localhost:3000/weather?address=${encodeURIComponent(input.value)}`
  ).then((res) => {
    res.json().then((data) => {
      if (data.forecast && data.temp && data.location) {
        messageOne.innerHTML = `<h2>Data:</h2>
      <h4>Forecast: ${data.forecast}</h4>
      <h4>Temperature: ${data.temp}</h4>
      <h4>Measurement Location: ${data.location}</h4>
      `;
      } else {
        messageOne.innerHTML = `<h3>Something went wrong</h3>`;
      }
    });
  });
});
