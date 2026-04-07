let input = document.getElementById("search");
let cardContainer = document.getElementById("card-container");
let btn = document.getElementById("btn");
let categories = document.querySelectorAll(".nav-item");

let APIKey = "pub_6056fc3e3cea4ade834d90ca66500dcf";

function inputValue() {
  if (input.value) {
    let encodedInput = encodeURIComponent(
      input.value.trim().toLocaleLowerCase(),
    );
    return encodedInput;
  } else {
    return null;
  }
}

function showSkeleton() {
  cardContainer.innerHTML = "";

  for (let i = 0; i < 10; i++) {
    cardContainer.innerHTML += `
      <div class="card-skeleton">
        <div class="image skeleton"></div>
        <div class="card-info">
          <div class="title-desc">
            <div class="card-title skeleton"></div>
            <div class="card-desc skeleton"></div>
          </div>
          <div class="card-details">
            <div class="D-H">
              <div class="Date skeleton"></div>
              <div class="Hours skeleton"></div>
            </div>
            <div class="C-I">
              <div class="category skeleton"></div>
              <div class="icon skeleton"></div>
            </div>
          </div>
        </div>
      </div>`;
  }
}

async function fetchData(value) {
  try {
    const res = await fetch(
      ` https://newsdata.io/api/1/latest?apikey=${APIKey}&q=${value}&language=fr`,
    );
    if (!res.ok) throw new Error("Request failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function render(d) {
  cardContainer.innerHTML = "";
  if (!d.results || d.results.length === 0) {
    cardContainer.innerHTML = "<p>Aucun résultat trouvé.</p>";
    return;
  }
  d.results.forEach((article) => {
    const newsImg =
      article.image_url && article.image_url !== "null"
        ? article.image_url
        : "/App_News/image-solid.svg";
    const description = article.description
      ? article.description
      : "Pas de description disponible.";
    cardContainer.innerHTML += `
    <a href="${article.link}" target="_blank" >
   <div class="card">
        <img class="newImage" src = "${newsImg}" alt="news-image">
        <div class="card-info">
          <div class="title-desc">
            <div class="Newtitle">${article.title}</div>
            <div class="newDesc">${description}</div>
          </div>
          <div class="card-details">
            <div class="Date">
              <div class="newDate">${article.pubDate.split(" ")[0]}</div>
            </div>
            <div class="C-I">
              <div class="newCategory">${article.category[0]}</div>
              <img class="newIcon" src="${article.source_icon || " "}">
            </div>
          </div>
        </div>
      </div>
      </a>`;
  });
}

async function search() {
  let searchTerm = inputValue();
  if (searchTerm) {
    showSkeleton();
    let data = await fetchData(searchTerm);
    render(data);
  } else {
    return null;
  }
}

async function searchInit() {
  const defaultTerm = "top";
  showSkeleton();
  let data = await fetchData(defaultTerm);
  render(data);
}

searchInit();

btn.addEventListener("click", search);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    categories.forEach((item) => item.classList.remove("active"));
    search();
  }
});

async function fetchByCat(value) {
  try {
    const res = await fetch(
      ` https://newsdata.io/api/1/latest?apikey=${APIKey}&category=${encodeURIComponent(value)}&language=fr`,
    );
    if (!res.ok) throw new Error("Request failed");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

categories.forEach((category) => {
  category.addEventListener("click", async () => {
    categories.forEach((item) => item.classList.remove("active"));
    category.classList.add("active");
    let catValue = category.dataset.category;
    if (catValue) {
      showSkeleton();
      let data = await fetchByCat(catValue);
      if (data && data.results) {
        render(data);
      }
    }
  });
});
