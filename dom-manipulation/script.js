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

  // generate markup
  const markup = `
    <div class="quote--list" data="${randomIndex}">
    <h4>${selectedQuote.category}:</h4>
      <p>${selectedQuote.text}</p>
    </div>
    `;

  displayQuotesContainer.insertAdjacentHTML("beforeend", markup);
};

// add click eventListener to the showQuote button
showNewQuoteButton.addEventListener("click", function () {
  showRandomQuote(quoteArr);
});

// add quote
const addQuote = function () {
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
};
