let input = document.getElementById("search");
let articleImg = document.getElementById("image");
let CardTitle = document.getElementById("card-title");
let cardDesc = document.getElementById("card-desc");
let date = document.getElementById("Date");
let hours = document.getElementById("Hours");
let category = document.getElementById("category");
let Icon = document.getElementById("icon");
let APIKey = "pub_5bc4392416d24d448263cf233ef1504b";

function searchTerm() {
  if (input.value) {
    let encodedInput = encodeURIComponent(input.value.trim());
    console.log(encodedInput);
    return true;
  } else {
    console.log(false);
    return false;
  }
}

// async function fetchData() {
//   const res = await fetch(
//     ` https://newsdata.io/api/1/latest?apikey=${APIKey}&q=${encodedInput}&language=fr`,
//   );
//   if (!res.ok) throw new Error("Request failed");
//   const data = await res.json();
//   return data
// }
