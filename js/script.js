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
    const emptyContainer = document.getElementById("empty-container");
    emptyContainer.innerHTML = ""; // Clear
    if (data.length === 0) {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="hero  min-h-fit  bg-base-200">
      <div class="hero-content  text-center">
        <div class="max-w-md ">
          <img src="./logo/Icon.png" alt="" class="pl-20" />
          <p class="py-6 text-3xl font-bold">
            Oops!! Sorry, There is no <br />
            content here
          </p>
        </div>
      </div>
    </div>
      `;
      emptyContainer.appendChild(div);
    } else {
      data.forEach((x) => {
        // converting strings seconds to hours and minutes
        const seconds = parseInt(x.others.posted_date);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        const div = document.createElement("div");
        div.innerHTML = `
         <div class="card  bg-base-100 shadow-xl">
          <div class="relative">
              <figure>
              <img
                src="${x.thumbnail}"
                alt="picture"
                class ="rounded-xl h-52 w-full object-cover object-center"
              />
              </figure>
              <div class="absolute p-2 rounded-xl text-white bottom-5 right-4
               ${x.others.posted_date ? "bg-black" : ""}">
               ${x.others.posted_date ? `${hours} hrs ${minutes} min ago` : ""}
              </div>
            </div>        
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
              <div class="flex gap-2">
                    <div><p>${x.authors[0].profile_name}</p></div>
                    <div> ${
                      x.authors[0].verified
                        ? `<img src="./logo/tik.png" alt="Verified Image">`
                        : " "
                    }</div>
              </div>                
                <p>${x.others.views}</p>
              </div>
            </div>
          </div>
        `;
        cardContainer.appendChild(div);
      });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

loadData();
// for default all displaying
getData("1000");
