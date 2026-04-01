let APIKey = "pub_5bc4392416d24d448263cf233ef1504b";
async function News() {
  const res = await fetch(
    ` https://newsdata.io/api/1/latest?apikey=${APIKey}&q=ia&language=fr`,
  );
  if (!res.ok) throw new Error("Request failed");
  const data = await res.json();
  console.log(data);
}

News();
