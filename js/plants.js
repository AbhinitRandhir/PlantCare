

//==========================================
// Plants Page
//==========================================

const allPlants = document.getElementById("allPlants");

if (allPlants) {

    displayPlants(plants);

}

//==========================================
// Display Plants
//==========================================

function displayPlants(plantList) {

    let cards = "";

    plantList.forEach((plant) => {

        cards += `

        <div class="col-md-6 col-lg-3">

            <div class="plant-card">

                <img src="${plant.image}" alt="${plant.name}">

                <div class="plant-info">

    <h4>${plant.name}</h4>

    <div class="plant-btn">

        <button class="details-btn" data-id="${plant.id}">
            Care Guide
        </button>

        <button class="care-btn" data-id="${plant.id}">
            + Add
        </button>

    </div>

</div>

                </div>

            </div>

        </div>

        `;

    });

    allPlants.innerHTML = cards;

}


//==========================================
// Live Search
//==========================================

const searchPlant = document.getElementById("searchPlant");

if (searchPlant) {

    searchPlant.addEventListener("keyup", function () {

        const searchValue = this.value.toLowerCase();

        const filteredPlants = plants.filter((plant) =>
            plant.name.toLowerCase().includes(searchValue)
        );

        displayPlants(filteredPlants);

    });

}


//==========================================
// Category Filter
//==========================================

const categoryFilter = document.getElementById("categoryFilter");

if (categoryFilter) {

    categoryFilter.addEventListener("change", function () {

        const category = this.value;

        if (category === "all") {

            displayPlants(plants);

        } else {

            const filteredPlants = plants.filter((plant) =>
                plant.category === category
            );

            displayPlants(filteredPlants);

        }

    });

}

//==========================================
// Add To Care List
//==========================================

document.addEventListener("click", function (e) {

    const btn = e.target.closest(".care-btn");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    const plant = plants.find(item => item.id === id);

    let careList = JSON.parse(localStorage.getItem("careList")) || [];

    const exists = careList.some(item => item.id === id);

    if (exists) {

        showToast("Plant already exists in Care List.");

        return;

    }

    careList.push(plant);

    localStorage.setItem("careList", JSON.stringify(careList));

    showToast("Plant added to Care List 🌱");

});


//==========================================
// Toast Function
//==========================================

function showToast(message){

    const toastMessage = document.getElementById("toastMessage");

    toastMessage.textContent = message;

    const toast = new bootstrap.Toast(
        document.getElementById("liveToast"),
        {
            delay:3000
        }
    );

    toast.show();

}
