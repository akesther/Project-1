const countriesList = document.getElementById("countriesList");
const cardImgTop = document.getElementById("cardImgTop");
const filterRegion = document.getElementById("filterRegion");

export class NetworkError extends Error {
  //  class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = "NetworkError";
  }
}

export class DataError extends Error {
  //  class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataError";
  }
}

async function handleRequest() {
  try {
    const contries = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital",
    );
    if (!contries.ok) {
      throw new Error("Not OK");
    } else if (contries.status == 404) {
    } else {
      const countriesJson = await contries.json();
      console.log(countriesJson);
      console.log(contries.status);
      console.log(contries.statusText);
      console.log(contries.type.length);
      displayCountries(countriesJson);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
handleRequest();

function displayCountries(countries) {
  const countriesGrid = document.getElementById("countriesGrid"); // Define where to append the grid items

  countries.forEach((country) => {
    // Create the card container
    const div = document.createElement("div");
    const option = document.createElement("option");
    div.classList.add("col-md-3", "mb-4"); // This ensures the cards will be responsive with 4 columns

    // Create the card HTML structure
    //  <a href="./country/${country.name.common.toLowerCase().replace(/\s+/g, '-')}" ></a>
    //  <a href="./country/${country.name.common.toLowerCase().replace(/\s+/g, '-')}" >
    //  <a href="./country/country.html?name=${encodeURIComponent(country.name.common)}" >
    div.innerHTML = `
            <div class="card">
            <a href="./country/country.html?name=${encodeURIComponent(country.name.common)}" >
                    <img src="${country.flags.png}" class="cardImgTop" alt="Country Flag: ${country.name.common}"></a>
                    <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text">Population: ${country.population}</p>
                    <p class="card-text">Region: ${country.region}</p>
                    <p class="card-text">Capital: ${country.capital || "N/A"}</p>
                </div>
            </div>
        `;

    // option.innerHTML = `<option >${country.region}</option>`;

    // Append the created card to the grid
    countriesGrid.appendChild(div);
    filterRegion.appendChild(option);
  });

  countries.forEach((element) => {
    // <option value="">All Regions</option>
  });
}

const themeToggle = document.getElementById("themeToggle");

// Check for saved theme preference or default to system preference
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

// Set theme on page load
const setTheme = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update button text
  themeToggle.textContent =
    theme === "dark" ? "☀️ Light Mode" : "🌙 Darkkk Mode";
};

// Initialize theme
setTheme(getPreferredTheme());

// Toggle theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});
