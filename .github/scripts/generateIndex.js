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
            <li>
                <div class="flex items-center gap-x-3"><span class="collapsible cursor-pointer text-blue-600 hover:text-blue-800">${item}</span><button id="copy">Copy to clipboard</button></div>
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
                const collapibles = document.querySelectorAll('.collapsible');
                collapibles.forEach(collapsible => {
                    collapsible.addEventListener('click', function() {
                        this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none';
                    });
                });
            </script>

            <script>
                // Function to copy text to clipboard
                function copyTextToClipboard(text) {
                    navigator.clipboard.writeText(text)
                        .then(() => {
                            alert('path copied to clipboard!');
                        })
                        .catch(err => {
                            console.error('Failed to copy path: ', err);
                        });
                }

                // Find all buttons with id="copy"
                const buttons = document.querySelectorAll('button[id="copy"]');

                // Loop through each button and add an onclick event listener
                buttons.forEach(button => {
                    button.addEventListener('click', () => {
                        // Find the previous sibling element (the span element)
                        const spanText = button.previousElementSibling.innerText;

                        // Get the current website URL
                        const currentUrl = window.location.href;

                        // Merge the span text with the URL
                        const textToCopy = ${currentUrl}/${spanText};

                        // Copy the merged text to clipboard
                        copyTextToClipboard(textToCopy);
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
