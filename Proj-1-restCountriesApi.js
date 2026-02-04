const countriesList = document.getElementById("countriesList");


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
    // const contries = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,tld,currencies,languages,nativeName,subregion,borders");
    const contries = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,tld,currencies,languages,nativeName,subregion");
    if (!contries.ok) {
      throw new Error("Not OK");
    } else if (contries.status == 404) {
    } else {
      const users = await contries.json();
      console.log(users);
      console.log(contries.status);
      console.log(contries.statusText);
      console.log(contries.type.length);
      displayCountries(users);
    }
} catch (error) {
    console.error("Fetch error:", error);
  }

}
handleRequest();


function displayCountries(countries) {
    const countriesGrid = document.getElementById("countriesGrid"); // Define where to append the grid items

    countries.forEach(country => {
        // Create the card container
        const div = document.createElement("div");
        div.classList.add("col-md-3", "mb-4");  // This ensures the cards will be responsive with 4 columns

        // Create the card HTML structure
        div.innerHTML = `
            <div class="card">
             <a href="./country/" >
                    <img src="${country.flags.png}" class="card-img-top" alt="Country Flag: ${country.name.common}"></a>
                    <div class="card-body">
                    <h5 class="card-title">${country.name.common}</h5>
                    <p class="card-text">Population: ${country.population}</p>
                    <p class="card-text">Region: ${country.region}</p>
                    <p class="card-text">Capital: ${country.capital || 'N/A'}</p>
                </div>
            </div>
        `;

        // Append the created card to the grid
        countriesGrid.appendChild(div);
    });

    countries.forEach(element => {
        // <option value="">All Regions</option>
        
    });
}