console.log("Auth Loaded");

/*==========================================
            LOCAL STORAGE
==========================================*/

let users = JSON.parse(

    localStorage.getItem("users")

) || [];


/*==========================================
            SIGNUP
==========================================*/

const signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("signupName").value.trim();

        const email =
            document.getElementById("signupEmail").value.trim();

        const password =
            document.getElementById("signupPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        /*==========================================
                PASSWORD VALIDATION
        ==========================================*/

        const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordPattern.test(password)) {

            showToast(

                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."

            );

            return;

        }


        /*==========================================
                PASSWORD MATCH
        ==========================================*/

        if (password !== confirmPassword) {

            showToast(

                "Passwords do not match."

            );

            return;

        }


        /*==========================================
                EMAIL EXISTS
        ==========================================*/

        const userExists = users.find(

            user => user.email === email

        );

        if (userExists) {

            showToast(

                "Email already registered."

            );

            return;

        }


        /*==========================================
                SAVE USER
        ==========================================*/

        users.push({

            name,
            email,
            password

        });

        localStorage.setItem(

            "users",

            JSON.stringify(users)

        );


        /*==========================================
                SUCCESS
        ==========================================*/

        localStorage.setItem(

            "toastMessage",

            "✅ Account Created Successfully"

        );

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

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const user = users.find(

            user =>

                user.email === email &&
                user.password === password

        );

        /*==========================================
                INVALID LOGIN
        ==========================================*/

        if (!user) {

            showToast(

                "❌ Invalid Email or Password"

            );

            return;

        }

        /*==========================================
                LOGIN SUCCESS
        ==========================================*/

        localStorage.setItem(

            "isLoggedIn",

            "true"

        );

        localStorage.setItem(

            "loggedInUser",

            JSON.stringify(user)

        );

        localStorage.setItem(

            "toastMessage",

            `🌱 Welcome ${user.name}`

        );

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

        localStorage.setItem(

            "toastMessage",

            "👋 Logged Out Successfully"

        );

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


/*==========================================
            SHOW USER
==========================================*/

if (isLoggedIn) {

    guestMenu?.classList.add("d-none");

    userMenu?.classList.remove("d-none");

    const user = JSON.parse(

        localStorage.getItem("loggedInUser")

    );

    if (user && userName) {

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

    localStorage.setItem(

        "toastMessage",

        "🔒 Please login first."

    );

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

            showToast(

                "❌ No account found with this email."

            );

            return;

        }

        showToast(

            "ℹ This demo uses LocalStorage only. Password reset email requires a backend."

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

        if (!input) return;

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


/*==========================================
            GLOBAL TOAST
==========================================*/

function showToast(message) {

    const toastElement =
        document.getElementById("liveToast");

    const toastMessage =
        document.getElementById("toastMessage");

    if (!toastElement || !toastMessage) {

        alert(message);

        return;

    }

    toastMessage.innerHTML = message;

    const toast = new bootstrap.Toast(

        toastElement,

        {

            delay:2500

        }

    );

    toast.show();

}


/*==========================================
        SHOW SAVED TOAST
==========================================*/

const savedToast =
    localStorage.getItem("toastMessage");

if (savedToast) {

    setTimeout(() => {

        showToast(savedToast);

        localStorage.removeItem("toastMessage");

    },300);

}