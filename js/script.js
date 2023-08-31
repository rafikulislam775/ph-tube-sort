const loadData = async () => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/videos/categories`
    );
    const mainData = await response.json();
    const data = mainData.data;
    // console.log(data);

    const tabContainer = document.getElementById("tab-container");
    data.forEach((x) => {
      // tab container
      const div = document.createElement("div");
      div.innerHTML = `
      <a onclick="getData('${x.category_id}')" class="tab hover:bg-red-500 hover:text-white rounded-sm">${x.category}</a>
      
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
    const mainData = await response.json();
    const data = mainData.data;

    console.log(data);

    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = ""; // Clear previous cards
    data.forEach((x) => {
      const div = document.createElement("div");
      div.innerHTML = `
         <div class="card  bg-base-100 shadow-xl">
            <figure>
              <img
                src="${x.thumbnail}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <div class="avatar gap-4">
                <div class="w-10  rounded-full">
                  <img
                    src="${x.authors[0].profile_picture}"
                  />
                </div>
                <h2 class="card-title">${x.title}</h2>
              </div>
              <div class="ml-14">
                <p>${x.authors[0].profile_name}</p>
                <p>${x.others.views}</p>
              </div>
            </div>
          </div>
        `;
      cardContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

loadData();
// for default all displaying
getData("1001");
