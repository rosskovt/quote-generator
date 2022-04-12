function init() {
    const quoteContainer = document.getElementById('quote-container');
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const twitterBtn = document.getElementById('twitter');
    const newQuoteBtn = document.getElementById('new-quote');
    const loaderEl = document.getElementById('loader');


    let APIQUOTES = [];

    //  Show Loading

    function loadSpinner() {
        loaderEl.hidden = false;
        quoteContainer.hidden = true;
    }

    // Hide Loading

    function completeLoading() {
        quoteContainer.hidden = false;
        loaderEl.hidden = true;
    }

    // Get new quote
    function newQuote() {
        loadSpinner();
        const quote = APIQUOTES[Math.floor(Math.random() * APIQUOTES.length)];
        if (quote.author === null) {
            authorText.textContent = 'Unknown';
        } else {
            authorText.textContent = quote.author;
        }
        // quote length check
        if (quote.text.length > 50) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.textContent = quote.text;
        completeLoading();
    }

    // Get Quotes From API
    async function getQuotes() {
        const apiUrl = 'https://type.fit/api/quotes';
        try {
            const response = await fetch(apiUrl);
            APIQUOTES = await response.json();
            newQuote();
        } catch (error) {
            // catch error here
            alert(error);
            console.log('The error is...', error);
        }
    }

    function tweetQuote() {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
        window.open(twitterUrl, '_blank');
    }

    //Event Listeners

    newQuoteBtn.addEventListener('click', newQuote);
    twitterBtn.addEventListener('click', tweetQuote);

    getQuotes();
}
// on Load check if all DOM loaded
document.addEventListener('readystatechange', function () {
    if (document.readyState === "complete") {
        init();
    }
});