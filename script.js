const form = document.querySelector(`#input-form`);
const first = document.querySelector(`#q1`);
const second = document.querySelector(`#q2`);
const third = document.querySelector(`#q3`);
const submit = document.querySelector(`#submit`);
const table = document.querySelector(`#table`);

const validate = function () {
  const arr = [first, second, third];
  const msgArr = [`Pirmais`, `Otrais`, `Trešais`];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === "") {
      alert(`${msgArr[i]} lauks nedrīkst būt tukšs!`);
    }
  }
};

const delReq = async (id) => {
  fetch(`https://api-aptauja.herokuapp.com/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => pageReload());
};

submit.addEventListener(`click`, function () {
  const first = document.querySelector(`#q1`);
  const second = document.querySelector(`#q2`);
  const third = document.querySelector(`#q3`);
  fetch(`mongodb+srv://imaldero2:imaldero123@cluster0.xgcor.mongodb.net/test`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question1: first.value,
      question2: second.value,
      question3: third.value,
    }),
    // body: JSON.stringify({ test: "deez" }),
  })
    .then((res) => res.json())
    .then((res) => pageReload());

  validate();
});

// fetch("http://127.0.0.1:3000/")
//   .then((D) => D.json())
//   .then((N) => {
//     document.body.insertAdjacentHTML(
//       "beforeend",
//       `
//     <h1>${N.data[0][0]}</h1>
//     `
//     );
//   });

const pageReload = async () => {
  table.innerHTML = "";
  table.innerHTML = "<tr><th>1.</th><th>2.</th><th>3.</th><th>Dzēst</th></tr>";
  fetch("https://api-aptauja.herokuapp.com/")
    .then((res) => res.json())
    .then((res) =>
      res.data.map((e) => {
        table.innerHTML += `<tr><td>${e.question1}</td><td>${e.question2}</td><td>${e.question3}</td><td><button class="del" id="${e._id}">Dzēst</button></td></tr>`;
      })
    )
    .then((res) => {
      const del = document.querySelectorAll(".del");
      del.forEach((element) => {
        element.addEventListener("click", (e) => {
          delReq(element.id);
        });
      });
    });
};
pageReload();
