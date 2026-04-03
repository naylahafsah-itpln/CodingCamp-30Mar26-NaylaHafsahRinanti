# Implementation Tasks

## Tasks

- [x] 1. Project Setup & HTML Structure
  - [x] 1.1 Create `index.html` with semantic layout (header, form card, dashboard grid)
  - [x] 1.2 Link Chart.js via CDN
  - [x] 1.3 Link external `css/style.css` and `js/app.js`

- [x] 2. Core Transaction Management
  - [x] 2.1 Build the Add Transaction form with Item Name, Amount, and Category fields
  - [x] 2.2 Implement form submission handler with basic validation (empty name, non-positive amount)
  - [x] 2.3 Store transactions in `localStorage` and load on page init
  - [x] 2.4 Implement `deleteTransaction()` to remove an item by index and refresh UI

- [x] 3. Balance Display
  - [x] 3.1 Calculate and display total balance by summing all transaction amounts
  - [x] 3.2 Update balance dynamically on every add/delete

- [x] 4. Transaction List Rendering
  - [x] 4.1 Render each transaction as an `.item-row` with name, amount, category badge, and delete button
  - [x] 4.2 Make the list scrollable with a max height

- [x] 5. Pie Chart Visualization
  - [x] 5.1 Aggregate spending totals per category
  - [x] 5.2 Render a Chart.js pie chart with category labels and color palette
  - [x] 5.3 Destroy and re-render chart on every UI update to reflect latest data

- [x] 6. CSS Styling & Layout
  - [x] 6.1 Define CSS custom properties (variables) for colors and backgrounds
  - [x] 6.2 Style card components, form inputs, buttons, and category badges
  - [x] 6.3 Implement responsive dashboard grid using flexbox with `flex-wrap`

- [x]* 7. Custom Category (Optional Challenge)
  - [x]* 7.1 Add a `+ Add New Category...` option to the category `<select>`
  - [x]* 7.2 Show/hide a text input when the custom option is selected via `checkNewCategory()`
  - [x]* 7.3 On submit, inject the new category as a `<option>` into the dropdown for reuse
  - [x]* 7.4 Use the custom category name as the transaction's category value

- [x]* 8. Sorting (Optional Challenge)
  - [x]* 8.1 Add a sort `<select>` dropdown in the Transactions card header (Newest / Highest Amount)
  - [x]* 8.2 Implement sort logic in `updateUI()`: reverse array for newest, sort descending by amount for highest

- [x]* 9. Dark Mode (Optional Challenge)
  - [x]* 9.1 Define dark theme CSS variable overrides under `body.dark-theme`
  - [x]* 9.2 Apply `transition: background 0.3s ease` for smooth theme switching
  - [x]* 9.3 Wire up the theme toggle button to add/remove `dark-theme` class on `<body>`
  - [x]* 9.4 Update button label dynamically between `🌙 Dark` and `☀️ Light`
