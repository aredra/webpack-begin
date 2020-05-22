/* eslint-disable no-undef */
import axios from "axios";

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get("/api/users");
  console.log(res);

  document.body.innerHTML = (res.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name} </div>`;
    })
    .join("");
});

if (module.hot) {
  console.log("HMR on");
}

console.log(process.env.NODE_ENV);

console.log(
  "---------------------------Too Looooooooooooooong Setence------------------------------------------------- "
);

// eslint-disable-next-line no-unused-vars
var foo = "";

console.log();
