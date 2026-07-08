console.log("Auth Loaded");

/*==========================================
            LOCAL STORAGE
==========================================*/

let users = JSON.parse(localStorage.getItem("users")) || [];

/*==========================================
            SIGNUP
==========================================*/

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name = document.getElementById("signupName").value.trim();

        const email = document.getElementById("signupEmail").value.trim();

        const password = document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(password)) {

            alert(
                "Password must contain:\n\n" +
                "• At least 8 characters\n" +
                "• One uppercase letter\n" +
                "• One lowercase letter\n" +
                "• One number\n" +
                "• One special character"
            );

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        const userExists = users.find(user => user.email === email);

        if (userExists) {

            alert("Email already registered.");

            return;

        }

        users.push({

            name,
            email,
            password

        });

        localStorage.setItem("users", JSON.stringify(users));

        alert("Account Created Successfully 🌱");

        window.location.href = "login.html";

    });

}

/*==========================================
            LOGIN
==========================================*/

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();

        const password = document.getElementById("loginPassword").value;

        const user = users.find(

            user =>

                user.email === email &&
                user.password === password

        );

        if (!user) {

            alert("Invalid Email or Password.");

            return;

        }

        localStorage.setItem("isLoggedIn", "true");

        localStorage.setItem(

            "loggedInUser",

            JSON.stringify(user)

        );

        alert(`Welcome ${user.name} 🌱`);

        window.location.href = "index.html";

    });

}

/*==========================================
            LOGOUT
==========================================*/

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        localStorage.removeItem("isLoggedIn");

        localStorage.removeItem("loggedInUser");

        alert("Logged Out Successfully.");

        window.location.href = "index.html";

    });

}

/*==========================================
            NAVBAR
==========================================*/

const guestMenu = document.getElementById("guestMenu");

const userMenu = document.getElementById("userMenu");

const userName = document.getElementById("userName");

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn) {

    guestMenu?.classList.add("d-none");

    userMenu?.classList.remove("d-none");

    const user = JSON.parse(

        localStorage.getItem("loggedInUser")

    );

    if (userName) {

        userName.textContent = user.name;

    }

}
else {

    guestMenu?.classList.remove("d-none");

    userMenu?.classList.add("d-none");

}

/*==========================================
        PROTECTED PAGES
==========================================*/

const protectedPages = [

    "plants.html",

    "care-list.html"

];

const currentPage =
    window.location.pathname.split("/").pop();

if (

    protectedPages.includes(currentPage)

    &&

    !isLoggedIn

) {

    alert("Please login to access this page.");

    window.location.href = "login.html";

}

/*==========================================
        FORGOT PASSWORD
==========================================*/

const forgotForm =
    document.getElementById("forgotForm");

if (forgotForm) {

    forgotForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("forgotEmail").value.trim();

        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        const user =
            users.find(item => item.email === email);

        if (!user) {

            alert("No account found with this email.");

            return;

        }

        alert(

            "This project uses LocalStorage only.\n\n" +

            "Password reset by email requires a backend."

        );

    });

}

/*==========================================
        SHOW / HIDE PASSWORD
==========================================*/

const toggleButtons =
    document.querySelectorAll(".togglePassword");

toggleButtons.forEach(button => {

    button.addEventListener("click", function () {

        const input =
            document.getElementById(

                this.dataset.target

            );

        const icon =
            this.querySelector("i");

        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

        }
        else {

            input.type = "password";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

        }

    });

});