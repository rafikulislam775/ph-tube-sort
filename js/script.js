const loadData = async () => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/categories`
    );
    const mainData = await response.json();
    const data = mainData.data;
    console.log(data);

    const tabContainer = document.getElementById("tab-container");
    data.forEach((x) => {
      // tab container
      const div = document.createElement("div");
      div.innerHTML = `
      <a onclick="getData('${x.category_id}')" class="tab hover:bg-red-500">${x.category}</a>
      
      `;
      tabContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

const getData = async (id) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

loadData();
