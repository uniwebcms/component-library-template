const fs = require('fs');
const path = require('path');

const generateDirectoryContent = (dirPath) => {
    let items = fs.readdirSync(dirPath).filter((item) => item !== '.gitkeep'); // Exclude .gitkeep

    // Sort by creation time (newest first)
    items.sort((a, b) => {
        return (
            fs.statSync(path.join(dirPath, b)).birthtime -
            fs.statSync(path.join(dirPath, a)).birthtime
        );
    });

    let content = '<ul class="mt-4">';

    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        if (isDirectory) {
            content += `
            <li id="collapsible">
                <div class="flex items-center gap-x-3 group"><span class="cursor-pointer text-blue-600 hover:text-blue-800">⏵ ${item}</span><button id="copy" class="text-gray-500 hover:text-gray-700 text-sm" title="Copy to clipboard">📋 Copy</button></div>
                <div class="content ml-4 mt-2" style="display: none;">${generateDirectoryContent(
                    itemPath
                )}</div>
            </li>`;
        } else {
            content += `<li class="mt-1"><a href="${path.relative(
                'dist',
                itemPath
            )}" class="text-gray-700 hover:text-gray-900">${item}</a></li>`;
        }
    }

    content += '</ul>';
    return content;
};

const generateIndex = (dirPath = '.', repoName = 'Unknown Repository') => {
    const htmlTemplate = `
    <html>
        <head>
            <script type="module" src="https://cdn.skypack.dev/twind/shim"></script>
        </head>
        <body class="bg-gray-100 p-10">

            <h1 class="text-3xl font-semibold mb-6">${repoName}</h1>
            
            <h2 class="text-2xl font-semibold mt-10 mb-4">Contents</h2>
            ${generateDirectoryContent(dirPath)}

            <script>
                // Select all li elements with id "collapsible"
                const collapsibleElements = document.querySelectorAll('li[id="collapsible"]');

                // Loop through each collapsible element
                collapsibleElements.forEach((collapsible) => {
                    // Handle the name toggle
                    const nameDiv = collapsible.firstElementChild;
                    const nameElement = nameDiv.querySelector('span');

                    // Add a click event listener to the name span to toggle nested items
                    nameElement.addEventListener('click', function () {
                        const nestedItemsDiv = nameDiv.nextElementSibling;
                        nestedItemsDiv.style.display =
                            nestedItemsDiv.style.display === 'none' ? 'block' : 'none';
                    });

                    // Ensure it's a root-level li by checking if it has no parent li
                    if (collapsible.closest('li li')) {
                        // Hide the copy button for nested li elements (non-root level)
                        const copyButton = nameDiv.querySelector('button[id="copy"]');
                        if (copyButton) {
                            copyButton.style.display = 'none'; // Hide the copy button for nested li elements
                        }
                    }
                });
            </script>

            <script>
                // Function to copy text to clipboard
                function copyTextToClipboard(text) {
                    navigator.clipboard
                        .writeText(text)
                        .then(() => {
                            alert('Path copied to clipboard!');
                        })
                        .catch((err) => {
                            console.error('Failed to copy path: ', err);
                        });
                }

                // Wait for the DOM to load
                document.addEventListener('DOMContentLoaded', function () {
                    // Get the current URL
                    const currentUrl = window.location.href;

                    // Find all buttons with id="copy"
                    const buttons = document.querySelectorAll('button[id="copy"]');

                    // Loop through each button and add an onclick event listener
                    buttons.forEach((button) => {
                        button.addEventListener('click', (event) => {
                            // Prevent the click event from bubbling up to the parent elements
                            event.stopPropagation();

                            // Find the previous sibling element (the span element)
                            const spanText = button.previousElementSibling.innerText;

                            // Merge the span text with the current URL
                            const textToCopy = currentUrl + '/' + spanText;

                            // Copy the merged text to clipboard
                            copyTextToClipboard(textToCopy);
                        });
                    });
                });
            </script>
        </body>
    </html>
    `;

    fs.writeFileSync(path.join(dirPath, 'index.html'), htmlTemplate);
};

// Get the repo name from command line arguments
const repoName = process.argv[2];
generateIndex('dist', repoName);
