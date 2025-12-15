// activate strict mode
"use strict";

// selecting elements
const displayQuotesContainer = document.getElementById("quoteDisplay");
const showNewQuoteButton = document.getElementById("newQuote");
const quoteInput = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");
const addQuoteButton = document.getElementById("addQuote");
const exportButton = document.getElementById("export--btn");
const importInput = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");
// create p element
const syncStatus = document.createElement("p");

// constant variable
const API_URL = "https://jsonplaceholder.typicode.com/posts";

// quoteArr holding text and category
let quoteArr = [
  {
    text: "For humans to go somewhere, he must leave something behind",
    category: "Motivation",
  },
  {
    text: "Deep life is a good life",
    category: "Concentration",
  },
  {
    text: "Failure cannot win over me when my determination to succeed is too strong",
    category: "Inspiration",
  },
];

// load quoteArr from localStorage when page loads and convert it to object using the JSON.Parse
quoteArr = JSON.parse(localStorage.getItem("quote")) || [];

//////////////////////////////////  FUNCTIONS ////////////////////////////////
const showRandomQuote = function (quotes = ["random"]) {
  // set innerHTML  of qoutesContainer = ''
  displayQuotesContainer.innerHTML = "";

  // quotes does not have any element within, return the showRandomQuote function
  if (!quotes || (Array.isArray(quotes) && quotes.length === 0)) return;

  // get randomIndex
  const randomIndex = Math.floor(Math.random() * quotes.length);

  // get selectedQuote by using the randomIndex
  const selectedQuote = quotes[randomIndex];

  // create quote div to hold all qoutes
  const quoteDiv = document.createElement("div");

  // set it dataset attribute to randomIndex
  quoteDiv.dataset.index = randomIndex;

  // add class attribute on quoteDiv
  quoteDiv.classList.add("quote--list");

  // create h3 element
  const h3 = document.createElement("h3");

  // set textContent of h3 to selectedQuote.category
  h3.textContent = selectedQuote.category;

  // create p element
  const p = document.createElement("p");

  // set textContent of p to selectedQuote.text
  p.textContent = selectedQuote.text;

  // append both h3 and p using appenChild because that is the requirement
  quoteDiv.appendChild(h3);
  quoteDiv.appendChild(p);

  // append quoteDiv to quotesContainer
  displayQuotesContainer.append(quoteDiv);
};

// call showRandomQuote and pass in quotesArr when the page loads
showRandomQuote(quoteArr);

// add quote
const addQuote = function (quote = ["createAddQuoteForm"]) {
  // get inputFields
  const quoteText = quoteInput.value.trim().toLowerCase();
  const categoryText = categoryInput.value.trim().toLowerCase();

  // create object out of retrieved input fields
  const object = {
    text: quoteText,
    category: categoryText,
  };

  // clear input fields
  quoteInput.value = categoryInput.value = "";

  // before pushing to the quoteArr, if object.text === any of the object within quotesArr, likewise with the the category, return the function(stop execution)
  if (quoteArr.some((quote) => quote.text === object.text && quote.category === object.category)) return;

  // push object to quoteArr
  quoteArr.push(object);

  // show random quote
  showRandomQuote(quoteArr);

  // populate categories
  populateCategories(quoteArr);

  saveQuotes();
};

const saveQuotes = function () {
  // store quoteArr in localStorage
  localStorage.setItem("quote", JSON.stringify(quoteArr));
};

// storing  lastViewQuote in sessionStorage
sessionStorage.setItem("lastView", JSON.stringify(quoteArr.slice(-1)));

// export to JSON
const exportToJsonFile = function () {
  // get quote from localStorage
  const jsonString = localStorage.getItem("quote");

  // convert to blob object
  const blob = new Blob([jsonString], { type: "application/json" });

  // create URL using URL.createObject URL
  const url = URL.createObjectURL(blob);

  // create anchor element
  const a = document.createElement("a");

  // set href = url
  a.href = url;

  // the desired file name
  a.download = "data/json";

  // this will trigger the download
  a.click();

  // clear up url after download starts
  URL.revokeObjectURL(url);
};

// import json file
const importFromJsonFile = function (event) {
  // create fileReader object
  const fileReader = new FileReader();

  // load the data when data is successfully retreived
  fileReader.onload = function (event) {
    // get the json result and convert to real object
    const storedQuotes = JSON.parse(event.target.result);

    if (quoteArr.some((quote) => quote.text === storedQuotes[0].text)) return;

    // push to quoteArr
    quoteArr.push(storedQuotes[0]);

    // save quotes to localStorage
    saveQuotes();
  };

  // read the file received as a text
  fileReader.readAsText(event.target.files[0]);
};

// populate categories
const populateCategories = function (quotes) {
  // loop over quotes and return  only category properties array
  const categories = [...quotes.map((quote) => quote.category)];

  // set categoryFilter innerHTML = ""
  categoryFilter.innerHTML = "";

  // loop over categories
  categories.forEach((category, index) => {
    const option = `
    <option data-index="${index}" value="${category}">${category[0].replace(category[0], category[0].toUpperCase())}${category.slice(1)}</option>
    `;

    // insert html element at the end of categoryFilter
    categoryFilter.insertAdjacentHTML("beforeend", option);
  });
};

// populate dropdown when page loads
populateCategories(quoteArr);

const filterQuotes = function (event) {
  // select element
  const selectedElement = event.target.value;

  // fliter element within the quotesArr with a category that matches the selectedElement
  const selectedCategory = quoteArr.filter((quote) => quote.category === selectedElement);

  // show selectedCategory
  showRandomQuote(selectedCategory);

  // store last selected Element in the localStorage
  localStorage.setItem("lastSelectedFilter", JSON.stringify(selectedCategory));
};

// get last selectedFilter from localStorage
const lastSelectedFilter = JSON.parse(localStorage.getItem("lastSelectedFilter"));

// show last filtered element as random quote
showRandomQuote(lastSelectedFilter);

// fetch quote from server
const fetchQuotesFromServer = async function () {
  try {
    // get response object when data is being fetched successfully and get it's resolved value using the await keyword
    const response = await fetch(`${API_URL}`);

    // get resolved value using the await keyword
    const quotes = await response.json();

    return quotes.slice(0, 5).map((quote) => {
      return {
        id: quote.id,
        text: quote.quote,
        category: "server",
      };
    });
  } catch (err) {
    console.error(`💥 ${err}`);
  }
};

fetchQuotesFromServer();

// post quote to server
const postQuoteToServer = async function (quote) {
  try {
    const postedQuote = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(quote) });

    const receivedQuote = await postedQuote.json();
  } catch (err) {
    console.error(`💥${err}`);
  }
};

postQuoteToServer();

const syncQuotes = async function (quotes) {
  // clear quotes before any push
  quotes = [];

  // get the return value from fetchQuotesFromServer and store in serverQuotes
  const serverQuotes = await fetchQuotesFromServer();

  // loop over returnQuotes
  serverQuotes.forEach((serverQuote) => {
    // find a matching element that has the same index
    const index = quotes.findIndex((qoute) => serverQuote.id === qoute.id);

    let conflicts = 0;

    // push serverQuote to quotes array if there is no matching element that has the same index
    if (index === -1) {
      quotes.push(serverQuote);
    } else {
      // change element at the particular index that we got.
      quotes[index] = serverQuote;

      conflicts++;
    }
  });

  // save quotes to localStorage
  saveQuotes();

  // populate categories
  populateCategories(quotes);

  // filter quotes
  filterQuotes();

  // if conflict existed as in two element had the same id
  syncStatus.textContent = conflicts ? "confilct resolved using server data" : "Quotes synced with server!";

  // set time out
  setTimeout(() => {
    syncStatus.textContent = "";
  }, 4000);
};

syncQuotes(quoteArr);
setInterval(syncQuotes(quoteArr), 15000);

//////////////////////////////// EVENTLISTENERS /////////////////////////////////

// show quote
showNewQuoteButton.addEventListener("click", function () {
  showRandomQuote(quoteArr);
});

// add quote
addQuoteButton.addEventListener("click", addQuote);

// export string into json
exportButton.addEventListener("click", exportToJsonFile);

// import file from json
importInput.addEventListener("change", importFromJsonFile);

// filter quotes
categoryFilter.addEventListener("change", filterQuotes);
