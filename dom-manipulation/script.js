// activate strict mode
"use strict";

// selecting elements
const displayQuotesContainer = document.getElementById("quoteDisplay");
const showNewQuoteButton = document.getElementById("newQuote");
const quoteInput = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");

const quoteArr = [
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

const showRandomQuote = function (quotes = ["random"]) {
  // set innerHTML  of qoutesContainer = ''
  displayQuotesContainer.innerHTML = "";

  // get randomIndex
  const randomIndex = Math.floor(Math.random() * quotes.length);

  // get selectedQuote by using the randomIndex
  const selectedQuote = quotes[randomIndex];

  // create quote div to hold all qoutes
  const quoteDiv = document.createElement("div");

  // set it dataset attribute to randomIndex
  quoteDiv.dataset.index = randomIndex;

  // add class on attribute on quoteDiv
  quoteDiv.classList.add("quote--list");

  // create h3 element
  const h3 = document.createElement("h3");

  // set textContent of h3 to selectedQuote.category
  h3.textContent = selectedQuote.category;

  // create h3 element
  const p = document.createElement("p");

  // set textContent of p to selectedQuote.text
  p.textContent = selectedQuote.text;

  // append both h3 and p using appenChild because there is the requirement
  quoteDiv.appendChild(h3);
  quoteDiv.appendChild(p);

  // append quoteDiv to quotesContainer
  displayQuotesContainer.append(quoteDiv);
};

// add click eventListener to the showQuote button
showNewQuoteButton.addEventListener("click", function () {
  showRandomQuote(quoteArr);
});

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

  console.log(quoteArr.slice(-1));

  // show random quote
  showRandomQuote(quoteArr);
};
