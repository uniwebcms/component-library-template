const fs = require('fs');
const path = require('path');

const generateDirectoryContent = (dirPath) => {
    let items = fs.readdirSync(dirPath).filter((item) => item !== '.gitkeep'); // Exclude .gitkeep

    // Sort by creation time (newest first)
    items.sort((a, b) => {
        return fs.statSync(path.join(dirPath, b)).birthtime - fs.statSync(path.join(dirPath, a)).birthtime;
    });

    let content = '<ul class="mt-4">';

    for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const isDirectory = fs.statSync(itemPath).isDirectory();

        if (isDirectory) {
            content += `
            <li>
                <span class="collapsible cursor-pointer text-blue-600 hover:text-blue-800">${item}</span>
                <div class="content ml-4 mt-2" style="display: none;">${generateDirectoryContent(itemPath)}</div>
            </li>`;
        } else {
            content += `<li class="mt-1"><a href="${path.relative('dist', itemPath)}" class="text-gray-700 hover:text-gray-900">${item}</a></li>`;
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

            <a href="./_site" class="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-full">View tutorial</a>
            
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
        </body>
    </html>
    `;

    fs.writeFileSync(path.join(dirPath, 'index.html'), htmlTemplate);
};

// Get the repo name from command line arguments
const repoName = process.argv[2];
generateIndex('dist', repoName);
