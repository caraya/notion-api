const getDataFromBackend = async () => {
  const rest = await fetch("http://localhost:8000/users");
  const data = await rest.json();

  return data;
};

const container = document.querySelector(".container");

// Add data to HTML
const addData = async () => {
  const data = await getDataFromBackend();

  data.forEach((value) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <h2><a href="${value.url}">${value.name}</a></h2>
        <h3>Summary</h3>
        <p>${value.summary} </p>
        <p class="small">Created on: ${value.created}
        <p class="small">Last modified on: ${value.modified}
    `;
    container.append(div);
  });
};

addData();
