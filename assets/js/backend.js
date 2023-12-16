var vibes = [];
const maxVibes = 10; // Maximum number of vibes

function updateVibeList() {
    let listElement = document.getElementById('vibe-list');
    listElement.innerText = vibes.join(', '); // Join the vibes with a comma & space
}


function addVibe() {
    let input = document.getElementById('vibe-input');
    let word = input.value.trim();

    // Split the string into an array of words
    let words = word.split(' ');

    for (const element of words) {
        // Check if the word is not empty and if the list isn't full
        if (element !== '' && vibes.length < maxVibes) {
            vibes.push(element);
            updateVibeList();
        }
    }

    input.value = ''; // Clear the input field after adding
}


// New submit function to send data to the API and update the output container
function submit() {
    const selectedColor = document.getElementById('selected-color').value;
    const vibesList = vibes.join(', ');

    console.log(`Selected color: ${selectedColor}`);
    console.log(`Vibes: ${vibesList}`);

    // Show the loading animation when the submit button is pressed
    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.display = 'block';

    $.ajax({
        url: 'https://api.vinnie.emmetts.dev/generate_palette',
        type: 'POST',
        data: {
            base_color: selectedColor,
            vibes: vibesList
        },
        success: function(data) {
            console.log(data); // Log the JSON data
            displayResult(data); // Call displayResult with the JSON data
            loadingContainer.style.display = 'none'; // Hide the loading animation
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
            loadingContainer.style.display = 'none'; // Hide the loading animation
        }
    });
}



function displayResult(jsonData) {
    console.log("JSON DATA: \n", jsonData);
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = ''; // Clear previous contents

    // Directly iterate through the colors array and create elements to display the data
    jsonData["Vinnie"].colors.forEach((color) => {
        const colorItem = document.createElement('li');
        colorItem.innerText = `${color.Name} (${color["Hex Code"]}) - ${color.Usage}`;
        outputContainer.appendChild(colorItem);
    });
}




