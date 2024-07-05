// Client-side routing with page.js
page('/', displayForm);
page('/results', displayResults);
page();

function displayForm() {
    // Fetch and display form view
    fetch('/form')
        .then(response => response.text())
        .then(html => {
            document.querySelector('.container').innerHTML = html;
            // Add event listeners and form validation as needed
        });
}

function displayResults() {
    // Fetch and display results view
    fetch('/results')
        .then(response => response.text())
        .then(html => {
            document.querySelector('.container').innerHTML = html;
        });
}
