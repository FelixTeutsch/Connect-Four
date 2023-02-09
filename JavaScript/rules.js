// This is self explaining
const rules = document.getElementById("rules");
const openRules = document.getElementById("showRules");
const closeRules = document.getElementById("closeRules");

openRules.addEventListener("click", function () {
    rules.style.display = "flex";

});
closeRules.addEventListener("click", function () {
    rules.style.display = "none";
});