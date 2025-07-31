// index.js

// Function to update content based on selected language
function updateContent(lang) {
  document.getElementById("title").textContent = translations[lang].title;
  document.getElementById("greeting").textContent = translations[lang].greeting;
  document.getElementById("question1").textContent = translations[lang].question1;
  document.getElementById("question2").textContent = translations[lang].question2;
  document.getElementById("question3").textContent = translations[lang].question3;
}

// Function to set the language
function setLanguage(lang) {
  updateContent(lang);
  localStorage.setItem("preferredLang", lang); // Optional: Save to localStorage
}

// On page load, detect language or default to English
window.onload = function () {
  const savedLang = localStorage.getItem("preferredLang") || "en";
  updateContent(savedLang);
};