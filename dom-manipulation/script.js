// activate strict mode
"use strict";

// selecting elements
const displayQuotesContainer = document.getElementById("quoteDisplay");
const showQuoteButton = document.getElementById("newQuote");
const quoteInput = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");

const quoteArr = [
  {
    quote: "For humans to go somewhere, he must leave something behind",
    category: "Motivation",
  },
  {
    quote: "Deep life is a good life",
    category: "Concentration",
  },
  {
    quote: "Failure cannot win over me when my determination to succeed is too strong",
    category: "Inspiration",
  },
];

const showRandomQuote = function (quotes) {
  // set innerHTML  of qoutesContainer = ''
  displayQuotesContainer.innerHTML = "";

  // loop over quotes
  quotes.forEach((quote, index) => {
    const markup = `
    <div class="quote--list" data="${index}">
    <h4>${quote.category}:</h4>
      <p>${quote.quote}</p>
    </div>
    `;

    displayQuotesContainer.insertAdjacentHTML("beforeend", markup);
  });
};

// add click eventListener to the showQuote button
showQuoteButton.addEventListener("click", function () {
  showRandomQuote(quoteArr);
});

// add quote
const addQuote = function () {
  const quoteText = quoteInput.value.trim();
  const categoryText = categoryInput.value.trim();

  const object = {
    quote: quoteText,
    category: categoryText,
  };

  quoteArr.push(object);

  showRandomQuote(quoteArr);

  console.log(quoteArr);

  // clear input fields
  quoteInput.value = categoryInput.value = "";
};
