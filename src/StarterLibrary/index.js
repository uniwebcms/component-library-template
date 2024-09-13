// Import custom CSS
import './index.css';

// Import the components from the auto-generated dynamicExports.js file
import * as dynamicExports from './dynamicExports';

// Export selectable components under the module's "default" property
export default dynamicExports;

// Export site-level components and settings under the module's "site" property
// Example:

// export const site = {
//     Layout: MyLayoutComponent       // take control of the site's layout
//     props: { disableTheming: true } // eg, disable auto theming
//     report: { ... }                 // for document rendering (eg, Word/Excel/JSON)
// };
