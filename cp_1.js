const form = document.getElementById("feedback-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const commentsInput = document.getElementById("comments");
const charCount = document.getElementById("char-count");
const tooltip = document.getElementById("tooltip");
const feedbackDisplay = document.getElementById("feedback-display");
const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const commentsError = document.getElementById("comments-error");
// Stops clicks inside the form from bubbling to the background
form.addEventListener("click", function(event) {
  event.stopPropagation();
});
// Background click event
document.body.addEventListener("click", function() {
  tooltip.style.display = "none";
});
// Event delegation for input fields
form.addEventListener("input", function(event) {
  if (event.target.id === "comments") {
    charCount.textContent = "Characters: " + event.target.value.length;
  }
});
// Event delegation for tooltips
form.addEventListener("mouseover", function(event) {
  if (event.target.matches("input, textarea")) {
    tooltip.textContent = event.target.dataset.tooltip;
    tooltip.style.display = "block";
  }
});
form.addEventListener("mousemove", function(event) {
  tooltip.style.left = event.pageX + 12 + "px";
  tooltip.style.top = event.pageY + 12 + "px";
});
form.addEventListener("mouseout", function(event) {
  if (event.target.matches("input, textarea")) {
    tooltip.style.display = "none";
  }
});
// Form validation and submission
form.addEventListener("submit", function(event) {
  event.preventDefault();
  nameError.textContent = "";
  emailError.textContent = "";
  commentsError.textContent = "";
  let isValid = true;
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required.";
    isValid = false;
  }
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  }
  if (commentsInput.value.trim() === "") {
    commentsError.textContent = "Comments are required.";
    isValid = false;
  }
  if (isValid) {
    const feedbackEntry = document.createElement("div");
    feedbackEntry.classList.add("feedback-entry");
    feedbackEntry.innerHTML = `
      <p><strong>Name:</strong> ${nameInput.value}</p>
      <p><strong>Email:</strong> ${emailInput.value}</p>
      <p><strong>Comments:</strong> ${commentsInput.value}</p>
    `;
    feedbackDisplay.appendChild(feedbackEntry);

    form.reset();
    charCount.textContent = "Characters: 0";
  }
});
