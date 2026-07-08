//==========================================
// CARE LIST PAGE
//==========================================

const careListContainer = document.getElementById("careListContainer");

let careList = JSON.parse(

    localStorage.getItem("careList")

) || [];

displayCareList();


//==========================================
// DISPLAY CARE LIST
//==========================================

function displayCareList() {

    if (!careListContainer) return;

    careList = JSON.parse(

        localStorage.getItem("careList")

    ) || [];

    updateCareCount();

    //======================================
    // EMPTY STATE
    //======================================

    if (careList.length === 0) {

        careListContainer.innerHTML = `

            <div class="col-12 text-center py-5">

                <i class="fa-solid fa-seedling fa-4x text-success mb-3"></i>

                <h3>Your Care List is Empty 🌱</h3>

                <p class="text-muted">

                    Add your favorite plants from the Plants page.

                </p>

                <a href="plants.html" class="details-btn">

                    Explore Plants

                </a>

            </div>

        `;

        return;

    }

    //======================================
    // PLANT CARDS
    //======================================

    let cards = "";

    careList.forEach((plant, index) => {

        cards += `

        <div
            class="col-md-6 col-lg-3"
            data-aos="zoom-in"
            data-aos-delay="${index * 100}">

            <div class="plant-card">

                <img src="${plant.image}" alt="${plant.name}">

                <div class="plant-info">

                    <h4>${plant.name}</h4>

                    <div class="plant-btn">

                        <button
                            class="details-btn"
                            data-id="${plant.id}">

                            Care Guide

                        </button>

                        <button
                            class="remove-btn"
                            data-id="${plant.id}">

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

    if (typeof AOS !== "undefined") {

        AOS.refresh();

    }

}


//==========================================
// REMOVE PLANT
//==========================================

document.addEventListener("click", function (e) {

    const btn = e.target.closest(".remove-btn");

    if (!btn) return;

    const id = Number(btn.dataset.id);

    careList = careList.filter(

        plant => plant.id !== id

    );

    localStorage.setItem(

        "careList",

        JSON.stringify(careList)

    );

    updateCareCount();

    displayCareList();

    if (typeof showToast === "function") {

        showToast("🗑️ Plant removed from Care List");

    }

});


//==========================================
// CARE LIST COUNTER
//==========================================

function updateCareCount() {

    const badge = document.getElementById("careCount");

    if (!badge) return;

    badge.textContent = careList.length;

    // Hide badge if empty

    if (careList.length === 0) {

        badge.style.display = "none";

    }
    else {

        badge.style.display = "inline-flex";

    }

}


//==========================================
// INITIALIZE
//==========================================

updateCareCount();