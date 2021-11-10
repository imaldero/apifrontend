const form = document.querySelector(`#input-form`);
const name = document.querySelector(`#name`);
const surname = document.querySelector(`#surname`);

form.addEventListener(`submit`, function (e) {
  e.preventDefault();
  const jsonData = JSON.stringify[(name.value, surname.value)];
  fetch(`deez.nuts/id`, {
    method: "POST",
    body: jsonData,
  });
});
