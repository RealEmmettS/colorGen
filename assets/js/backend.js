let vibes = [];
const maxVibes = 15; // Maximum number of vibes

function addVibe() {
    let input = document.getElementById('vibe-input');
    let word = input.value.trim();

    // Check if it's a single word, and if the list isn't full
    if (word.indexOf(' ') === -1 && vibes.length < maxVibes) {
        vibes.push(word);
        updateVibeList();
    }

    input.value = ''; // Clear the input field after adding
}

function updateVibeList() {
    let listElement = document.getElementById('vibe-list');
    listElement.innerText = vibes.join(', '); // Join the vibes with a comma & space
}

// New submit function to send data to the API and update the output container
function submit() {
    const selectedColor = document.getElementById('selected-color').value;
    console.log(`Selected color: ${selectedColor}`);
    const vibesList = vibes.join(', ');
    console.log(`Vibes: ${vibesList}`);

    // Show the loading animation when the submit button is pressed
    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.display = 'block';

    fetch('https://api.vinnie.emmetts.dev/generate_palette', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            base_color: selectedColor, // Changed to base_color to match Flask API
            vibes: vibesList
        })
    })
    .then(response => {
        console.log(response); // Log the raw response
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // Parse the response as JSON
    })
    .then(jsonData => {
        console.log(jsonData); // Log the parsed JSON data
    
        // Call displayResult with the parsed JSON data
        displayResult(jsonData);
    
        // Hide the loading animation once the response is processed
        loadingContainer.style.display = 'none';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function displayResult(jsonData) {
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = ''; // Clear previous contents

    // Directly iterate through the colors array and create elements to display the data
    jsonData["Vinnie"].colors.forEach((color) => {
        const colorItem = document.createElement('li');
        colorItem.innerText = `${color.Name} (${color["Hex Code"]}) - ${color.Usage}`;
        outputContainer.appendChild(colorItem);
    });
}




