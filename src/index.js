const state = {
  breweries: [],
  searchedBreweries: [],
}

const breweryResult = document.querySelector("#breweries-list")
const search = document.querySelector("#select-state-form")
const searchBarHidden = document.querySelector(".search-bar")
const searchEl = document.querySelector("#select-state")
const dropDown = document.querySelector("#filter-by-type")
const searchByBreweryName = document.querySelector("#search-breweries")
// const main = document.querySelector("mainEl")
// main.hidden = true
searchBarHidden.hidden = true

function fetchBreweries() {
  let url = `https://api.openbrewerydb.org/breweries?by_state=${searchEl.value}&per_page=50`
  if (dropDown.value) {
    url += `&per_page=50&by_type=${dropDown.value}`
  }
  fetch(url)
    .then((response) => response.json())
    .then(function (breweries) {
      state.breweries = breweries
      console.log("BREWERIES", state.breweries)
      renderBreweries(breweries)
    })
}

function getBreweriesByState() {
  search.addEventListener("submit", function (event) {
    event.preventDefault()
    searchBarHidden.hidden = false
    fetchBreweries()
  })
}

function filterBreweriesByType() {
  dropDown.addEventListener("change", function (event) {
    if (searchEl.value === "") return
    fetchBreweries()
  })
}

function searchByName() {
  searchByBreweryName.addEventListener("input", function (event) {
    // event.preventDefault()
    state.breweries = state.breweries.filter((brewery) =>
      brewery.name.includes(searchByBreweryName.value)
    )
    console.log(state.breweries)
    renderBreweries(state.breweries)
  })
}

function renderBreweries() {
  breweryResult.innerHTML = ""
  for (const brewery of state.breweries) {
    if (
      brewery.brewery_type === "micro" ||
      brewery.brewery_type === "regional" ||
      brewery.brewery_type === "brewpub"
    ) {
      const breweryListItem = document.createElement("li")
      breweryListItem.innerHTML = `<h2>${brewery.name}</h2>
            <div class="type">${brewery.brewery_type}</div>
            <section class="address">
              <h3>Address:</h3>
              <p>${brewery.street}</p>
              <p><strong>${brewery.city}, ${brewery.postal_code}</strong></p>
            </section>
            <section class="phone">
              <h3>Phone:</h3>
              <p>${brewery.phone}</p>
            </section>
            <section class="link">
              <a href="${brewery.website_url}">Visit Website</a>
            </section>`
      breweryResult.append(breweryListItem)
    }
  }
}

getBreweriesByState()
searchByName()
filterBreweriesByType()
