"use strict";

const tbody = document.querySelector("tbody");
const reloadButton = document.querySelector(".reload");
const cleanButton = document.querySelector(".clean");
const deleteButton = document.querySelector(".delete");
const getButton = document.querySelector(".get-btn");
const postInput = document.querySelector(".post-inp");
const userInput = document.querySelector(".user-inp");

const getData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  tbody.innerHTML = "";

  displayData(data);
  hideRemainingRows();
  console.log(data);
};

const displayData = (data) => {
  data.forEach((dat) => {
    const trow = document.createElement("tr");
    const postId = document.createElement("td");
    postId.textContent = dat.id;
    const userId = document.createElement("td");
    userId.textContent = dat.userId;
    const title = document.createElement("td");
    title.textContent = dat.title;
    const tick = document.createElement("td");
    const tickInp = document.createElement("input");
    tickInp.type = "checkbox";
    tick.append(tickInp);
    trow.append(postId, userId, title, tick);
    tbody.append(trow);
  });
};

const hideRemainingRows = () => {
  const rows = tbody.querySelectorAll("tr");
  for (let i = 6; i < rows.length; i++) {
    rows[i].classList.add("hidden");
  }
};

reloadButton.addEventListener("click", getData);
cleanButton.addEventListener("click", cleanData);
deleteButton.addEventListener("click", deleteSelectedRows);
getButton.addEventListener("click", searchData);

function cleanData() {
  tbody.innerHTML = "";
}

function deleteSelectedRows() {
  const rows = tbody.querySelectorAll("tr");
  rows.forEach((row) => {
    const checkbox = row.querySelector("input[type='checkbox']");
    if (checkbox.checked) {
      row.remove();
    }
  });
}

function searchData() {
  const postValue = postInput.value.trim();
  const userValue = userInput.value.trim();

  const rows = tbody.querySelectorAll("tr");

  rows.forEach((row) => {
    row.classList.remove("hidden");
    const postId = row.querySelector("td:nth-child(1)").textContent;
    const userId = row.querySelector("td:nth-child(2)").textContent;

    if (
      (postValue !== "" && postId !== postValue) ||
      (userValue !== "" && userId !== userValue)
    ) {
      row.classList.add("hidden");
    }
  });
}

getData();
