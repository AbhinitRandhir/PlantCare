

//==========================================
// Featured Plants (Home Page)
//==========================================

const featuredPlants = document.getElementById("featuredPlants");

if (featuredPlants && typeof plants !== "undefined") {

    let cards = "";

    plants.slice(0, 4).forEach((plant) => {

        cards += `
            <div class="col-md-6 col-lg-3">

                <div class="plant-card">

                    <img src="${plant.image}" alt="${plant.name}">

                    <div class="plant-info">

                        <h4>${plant.name}</h4>

                        <p>${plant.description}</p>

                        <a href="plants.html" class="explore-btn">
                            Explore Plant
                        </a>

                    </div>

                </div>

            </div>
        `;

    });

    featuredPlants.innerHTML = cards;

}

//==========================================
// Back To Top
//==========================================

const topBtn = document.getElementById("topBtn");

if(topBtn){

    window.addEventListener("scroll",()=>{

        topBtn.style.display =
            window.scrollY > 300 ? "block" : "none";

    });

    topBtn.addEventListener("click",()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    });

}

//==========================================
// DARK MODE
//==========================================

const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn?.querySelector("i");

// Page load
if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

    if (themeIcon) {

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }

}

themeBtn?.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    } else {

        localStorage.setItem("theme", "light");

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

});