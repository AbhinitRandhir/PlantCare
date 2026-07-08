
//==========================================
// Care List Page
//==========================================

const careListContainer = document.getElementById("careListContainer");

const careList = JSON.parse(localStorage.getItem("careList")) || [];

displayCareList();

function displayCareList() {

    if (!careListContainer) return;

    // Empty State
    if (careList.length === 0) {

        careListContainer.innerHTML = `

            <div class="text-center">

                <h3>Your Care List is Empty 🌱</h3>

                <p>Add some plants from the Plants page.</p>

                <a href="plants.html" class="details-btn">
                    Explore Plants
                </a>

            </div>

        `;

        return;
    }

    let cards = "";

    careList.forEach((plant) => {

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

        <button class="remove-btn" data-id="${plant.id}">
            <i class="fa-solid fa-trash"></i>
            Remove
        </button>

    </div>

</div>

            </div>

        </div>

        `;

    });

    careListContainer.innerHTML = cards;

}



//==========================================
// Remove Plant
//==========================================

document.addEventListener("click", function (e) {

    const btn = e.target.closest(".remove-btn");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    const updatedCareList = careList.filter(plant => plant.id !== id);

    localStorage.setItem("careList", JSON.stringify(updatedCareList));

    location.reload();

});