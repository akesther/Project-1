// const countryName = localStorage.getItem("countryName");
// document.getElementById("countryDetails").textContent = countryName;

const cardTitle = document.getElementById("CrdTittle");

const params = new URLSearchParams(window.location.search);
const countryName = params.get("name");

console.log("++++++++++Country Name from URL:", countryName);

//   // Get the parameters from the URL
//   const flagUrl = params.get("flags");
//     console.log("Country flag from URL -------------------", flagUrl);
// Display the data
// document.getElementById("countryName").textContent = countryName;
//   document.getElementById("countryImgId").src = flagUrl;

// fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}`);

async function handleRequest() {
  try {
    // const contries = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,tld,currencies,languages,nativeName,subregion,borders");
    // tld,currencies,languages,nativeName,subregion
    // tld,currencies,languages,nativeName,subregion,borders
    const contries = await fetch(
      "https://restcountries.com/v3.1/all?fields=flags,region,population,capital,tld,currencies,languages,borders,subregion,name",
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

function appendDataToElement(elementId, value, defaultValue = "N/A") {
  const span = document.createElement("span");
  span.textContent = value ? value : defaultValue;
  document.getElementById(elementId).appendChild(span);
}
cardTitle.textContent = countryName;

function displayCountries(countries) {
  const countriesGrid = document.getElementById("countriesGrid"); // Define where to append the grid items

  countries.forEach((country) => {
    // Create the card container
    const div = document.createElement("div");
    // div.classList.add("col-md-3", "mb-4"); // This ensures the cards will be responsive with 4 columns
    // console.log("Country Name inside displayCountries:", country.capital);
    if (country.name.common == countryName) {
      console.log("Matched Country:", country.name.common);
      document.getElementById("countryImgId").src = country.flags.png;
    //   document.getElementById("cardTitleId").textContent = country.name.common;

      // Get TLD, Currency, Language, and ... other details
        console.dir(country);
    //   const nativeName = country.nativeName ? country.name.common.nativeName : null; /// Fix this line to get the proper native name
      const nativeName = country.name.common ? country.name.common : null; /// Fix this line to get the proper native name
    //   const nativeName = countryName; /// Fix this line to get the proper native name
      const population = country.population ? country.population : null;
      const region = country.region ? country.region : null;
      const subRegion = country.subregion ? country.subregion : null;
      const capital = country.capital ? country.capital[0] : null;
      const tld = country.tld ? country.tld[0] : null;
      const currency = country.currencies ? Object.values(country.currencies)[0].name: null;
      const language = country.languages ? Object.values(country.languages).join(" ") : null;
      const borders = country.borders ? country.borders.join(" ") : "None";
      
      // Append the data to the corresponding elements

      appendDataToElement("nativeNameId", nativeName);
      appendDataToElement("populationId", population);
      appendDataToElement("regionId", region);
      appendDataToElement("subRegionId", subRegion);
      appendDataToElement("capitalId", capital);
      appendDataToElement("tldId", tld);
      appendDataToElement("currenciesId", currency);
      appendDataToElement("languagesId", language);
      appendDataToElement("contriesBordersId", borders);
    }

  });

  countries.forEach((element) => {
    // <option value="">All Regions</option>
  });
}


document.getElementById("goBack-2").addEventListener("click", () => {
  window.location.href = "../Proj-1-restCountriesApi.html";
});

// console.log(` ------------- ${countriesList.value} -------------- `);


const themeToggle = document.getElementById('c2ThemeToggle');

// Check for saved theme preference or default to system preference
const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Set theme on page load
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update button text
  themeToggle.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
};

// Initialize theme
setTheme(getPreferredTheme());

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});
