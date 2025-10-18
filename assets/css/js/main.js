// Fast, minimal main.js for cyber neon site

// Set current year in footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Delegate smooth scroll for nav links (single event listener)
document.body.addEventListener("click", e => {
  const target = e.target;
  if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
    e.preventDefault();
    const section = document.getElementById(target.getAttribute("href").substring(1));
    if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
// Add glow effect on section when in viewport
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("in-view");
    } else {
      entry.target.classList.remove("in-view");
    }
  });
}, { threshold: 0.25 });

sections.forEach(s => observer.observe(s));
