console.log("Script has intialized!!")

//ALL VARIABLES AND DOCS SELECTION


let add = document.querySelector(".add")
let close = document.querySelector(".close-btn")
let main = document.querySelector(".main")
let stack = document.querySelector(".stack")
let UPbtn = document.querySelector(".upbtn")
let DNbtn = document.querySelector(".dnbtn")

// Form element
const form = document.querySelector('.form-box');

// Input fields
const profileImgInput = document.querySelector('#profile-img');
const nameInput = document.querySelector('#name');
const townInput = document.querySelector('#town');
const purposeInput = document.querySelector('#purpose');

// Radio buttons (all with name="requirement")
const requirementRadios = document.querySelectorAll('input[name="requirement"]');

// Buttons
const submitBtn = document.querySelector('.submit-btn');
const closeBtn = document.querySelector('.close-btn');



//CODE STARTS FROM HERE
function SaveLocalStorage(Object) {
    //FETCH EXIST LOCAL STORAGE DATA    
    if (localStorage.getItem("task") === null) {
        let OldTask = [];
        OldTask.push(Object);
        localStorage.setItem("task", JSON.stringify(OldTask))

    }
    else {
        let OldTask = localStorage.getItem("task");
        OldTask = JSON.parse(OldTask);
        OldTask.push(Object)
        localStorage.setItem("task", JSON.stringify(OldTask))
    }
}

add.addEventListener("click", function () {
    form.style.display = "initial"
    main.style.display = "none"
})

close.addEventListener("click", function () {
    form.style.display = "none"
    main.style.display = "flex"
})

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const profileImg = profileImgInput.value.trim();
    const name = nameInput.value.trim();
    const town = townInput.value.trim();
    const purpose = purposeInput.value.trim();

    let selected = false;
    requirementRadios.forEach(function (cat) {
        if (cat.checked) {
            selected = cat.id
        }
    })

    if (profileImg === "") {
        alert("Please enter a profile image link.");
        profileImgInput.focus();
        return;
    }

    if (name === "") {
        alert("Please enter the name.");
        nameInput.focus();
        return;
    }

    if (town === "") {
        alert("Please enter the home town.");
        townInput.focus();
        return;
    }

    if (purpose === "") {
        alert("Please enter the purpose of the call.");
        purposeInput.focus();
        return;
    }
    if (!selected) {
        alert("Please select the catagrie.");
        requirementRadios.focus();
        return;
    }
    SaveLocalStorage({
        profileImg,
        name,
        town,
        purpose,
        selected,
    });
    form.reset();
    form.style.display = "none"
    main.style.display = "flex"
    ShowCards();
});

function ShowCards() {
    let AllCards = JSON.parse(localStorage.getItem("task"))

    AllCards.forEach(function (task) {
        // Create the main card wrapper
        const cardWrapper = document.createElement("div");
        cardWrapper.className = "card-wrapper";

        // Profile pic container
        const profilePic = document.createElement("div");
        profilePic.className = "profile-pic";

        // Image element
        const img = document.createElement("img");
        img.src = task.profileImg;
        img.alt = "profile-Photo";
        profilePic.appendChild(img);

        // Info section
        const infoSection = document.createElement("div");
        infoSection.className = "info-section";

        // Name
        const nameHeading = document.createElement("h2");
        nameHeading.textContent = task.name;

        // Hometown
        const hometownPara = document.createElement("p");
        hometownPara.textContent = `Home Town: ${task.town}`;

        // Bookings
        const bookingsPara = document.createElement("p");
        bookingsPara.textContent = `Purpose: ${task.purpose}`;

        // Action buttons container
        const actionButtons = document.createElement("div");
        actionButtons.className = "action-buttons";

        // Call button
        const callButton = document.createElement("button");
        callButton.className = "call";
        callButton.textContent = `Call`;

        // Message button
        const messageButton = document.createElement("button");
        messageButton.className = "message";
        messageButton.textContent = "Message";

        // Append buttons
        actionButtons.appendChild(callButton);
        actionButtons.appendChild(messageButton);

        // Assemble the info section
        infoSection.appendChild(nameHeading);
        infoSection.appendChild(hometownPara);
        infoSection.appendChild(bookingsPara);
        infoSection.appendChild(actionButtons);

        // Final assembly
        cardWrapper.appendChild(profilePic);
        cardWrapper.appendChild(infoSection);

        // Add the card to the document (e.g., body or some container)
        stack.appendChild(cardWrapper);
    })
}
ShowCards()

UPbtn.addEventListener("click", function () {
    let lastchild = stack.lastElementChild;
    if (lastchild) {
        stack.prepend(lastchild, stack.firstElementChild)
    }
})


DNbtn.addEventListener("click", function () {
    let firstchild = stack.firstElementChild;
    if (firstchild) {
        stack.append(firstchild)
    }
})