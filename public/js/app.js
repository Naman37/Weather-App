console.log("Client side Javascript file loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#p1"); //document.getElementById("p1")
const msgTwo = document.querySelector("#p2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  msgOne.textContent = "Loading message";
  const location = search.value;
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
        msgTwo.textContent = " ";
      } else {
        msgOne.textContent = data.location;
        msgTwo.textContent = data.forecast;
      }
    });
  });
});
