// Hamburger menu toggle for mobile
const menuBtn = document.getElementById("menu");
const navigation = document.querySelector(".navigation");

if (menuBtn && navigation) {
  menuBtn.addEventListener("click", () => {
    navigation.classList.toggle("show");
    const expanded = navigation.classList.contains("show");
    menuBtn.setAttribute("aria-expanded", expanded);
  });
}
