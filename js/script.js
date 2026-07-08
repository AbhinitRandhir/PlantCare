

//==========================================
// Featured Plants (Home Page)
//==========================================

const featuredPlants = document.getElementById("featuredPlants");

if (featuredPlants && typeof plants !== "undefined") {

    let cards = "";

    plants.slice(0,4).forEach((plant,index)=>{

        cards += `
            <div class="col-md-6 col-lg-3" data-aos="zoom-in"
                data-aos-delay="${index * 100}">

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
    AOS.refresh();

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
const themeIcon = document.querySelector("#themeBtn i");
const navbar = document.querySelector(".navbar");

//==========================================
// APPLY SAVED THEME
//==========================================

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

    navbar?.classList.remove("navbar-light");
    navbar?.classList.add("navbar-dark");

    if (themeIcon) {

        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");

    }

}
else {

    document.body.classList.remove("dark-mode");

    navbar?.classList.remove("navbar-dark");
    navbar?.classList.add("navbar-light");

    if (themeIcon) {

        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");

    }

}

//==========================================
// THEME BUTTON
//==========================================

themeBtn?.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

        navbar?.classList.remove("navbar-light");
        navbar?.classList.add("navbar-dark");

        themeIcon?.classList.remove("fa-moon");
        themeIcon?.classList.add("fa-sun");

    }
    else {

        localStorage.setItem("theme", "light");

        navbar?.classList.remove("navbar-dark");
        navbar?.classList.add("navbar-light");

        themeIcon?.classList.remove("fa-sun");
        themeIcon?.classList.add("fa-moon");

    }

});

//==========================================
// PAGE LOADER
//==========================================

window.addEventListener("load",()=>{

    const loader=document.getElementById("loader");

    if(loader){

        setTimeout(()=>{

            loader.style.opacity="0";

            loader.style.visibility="hidden";

        },1000);

    }

});
//==========================================
// TOAST
//==========================================

function showToast(message) {

    const toastMessage = document.getElementById("toastMessage");

    if (!toastMessage) return;

    toastMessage.textContent = message;

    const toast = new bootstrap.Toast(

        document.getElementById("liveToast"),

        {

            delay:2500

        }

    );

    toast.show();

}


//==========================================
// CARE LIST COUNTER
//==========================================

function updateCareCount() {

    const badge = document.getElementById("careCount");

    if (!badge) return;

    const careList = JSON.parse(

        localStorage.getItem("careList")

    ) || [];

    badge.textContent = careList.length;

}

document.addEventListener(

    "DOMContentLoaded",

    updateCareCount

);


//==========================================
// ANIMATED COUNTER
//==========================================

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = +counter.dataset.target;

            let count = 0;

            const speed = target / 60;

            const updateCounter = () => {

                count += speed;

                if (count < target) {

                    counter.textContent = Math.ceil(count);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            };

            updateCounter();

            observer.unobserve(counter);

        }

    });

}, {

    threshold:0.5

});

counters.forEach(counter => {

    observer.observe(counter);

});



