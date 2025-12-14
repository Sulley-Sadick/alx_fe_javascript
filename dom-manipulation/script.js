// activate strict mode
"use strict";

// selecting elements
const displayQuotesContainer = document.getElementById("quoteDisplay");
const showNewQuoteButton = document.getElementById("newQuote");
const quoteInput = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");

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

// add click eventListener to the showQuoteButton
showNewQuoteButton.addEventListener("click", function () {
  showRandomQuote(quoteArr);
});

// call showRandomQuote and pass in quotesArr when the page loads
showRandomQuote(quoteArr);

// add quote
const addQuote = function (quote = ["createAddQuoteForm"]) {
  // get inputFields
  const quoteText = quoteInput.value.trim();
  const categoryText = categoryInput.value.trim();

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

  // store quoteArr in localStorage
  localStorage.setItem("quote", JSON.stringify(quoteArr));
};

// storing  lastViewQuote in sessionStorage
sessionStorage.setItem("lastView", JSON.stringify(quoteArr.slice(-1)));
