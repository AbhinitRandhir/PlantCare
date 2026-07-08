//==========================================
// Plant Care Guide Modal
//==========================================

document.addEventListener("click", function (e) {

    const btn = e.target.closest(".details-btn");

    if (!btn) return;

    const plantId = Number(btn.dataset.id);

    const plant = plants.find(item => item.id === plantId);

    if (!plant) return;

    // Change Modal Title
    document.getElementById("plantModalLabel").textContent =
        `${plant.name} Care Guide`;

    // Modal Body
    const modalBody = document.getElementById("modalBody");

    modalBody.innerHTML = `

        <div class="text-center">

            <img src="${plant.image}"
                alt="${plant.name}"
                class="img-fluid rounded mb-3 modal-img">

            <h3 class="text-success fw-bold">
                ${plant.name}
            </h3>

        </div>

        <p class="mt-3">
            ${plant.description}
        </p>

        <hr>

        <p>
            <i class="fa-solid fa-droplet text-primary"></i>
            <strong> Water :</strong>
            ${plant.water}
        </p>

        <p>
            <i class="fa-solid fa-sun text-warning"></i>
            <strong> Sunlight :</strong>
            ${plant.sunlight}
        </p>

        <p>
            <i class="fa-solid fa-seedling text-success"></i>
            <strong> Fertilizer :</strong>
            ${plant.fertilizer}
        </p>

        <p>
            <i class="fa-solid fa-mound text-secondary"></i>
            <strong> Soil :</strong>
            ${plant.soil}
        </p>

        <hr>

        <h5 class="mb-3">
            ⭐ Care Tips
        </h5>

        <ul class="ps-3">

            ${plant.careTips.map(tip => `
                <li class="mb-2">${tip}</li>
            `).join("")}

        </ul>

    `;

    const modal = new bootstrap.Modal(
        document.getElementById("plantModal")
    );

    modal.show();

});