# Requirements Document

## Introduction

The Expense & Budget Visualizer is a single-page web application built with plain HTML, CSS, and Vanilla JavaScript. It enables users to track daily spending by entering transactions with a name, amount, and category. The app displays a running balance, a scrollable transaction history with delete capability, and a pie/donut chart visualizing spending by category — all persisted in the browser's LocalStorage with no backend required.

Additional features include custom categories, transaction sorting, and a dark/light mode toggle.

## Glossary

- **App**: The Expense & Budget Visualizer single-page application
- **Transaction**: A single financial entry with a name (description), amount, category, type (income or expense), and date
- **Balance_Display**: The UI card at the top of the page showing total income, total expenses, and net balance
- **Transaction_List**: The scrollable list of all recorded transactions, each with a delete button
- **Input_Form**: The HTML form used to enter new transactions
- **Chart**: The pie/donut chart rendered on an HTML5 `<canvas>` element showing spending by category
- **Chart_Aggregator**: The function that groups expense transactions by category and sums their amounts
- **Storage_Module**: The set of functions that read and write data to the browser's LocalStorage API
- **Validator**: The function that checks whether form data meets all required constraints before a transaction is created
- **Category**: A label classifying a transaction (e.g., Food, Transport, Fun, or a user-defined custom value)
- **CATEGORIES**: The full list of allowed category values, including predefined and user-added custom categories
- **AppState**: The in-memory representation of all transactions and settings for the current session

---

## Requirements

### Requirement 1: Transaction Input Form

**User Story:** As a user, I want to fill in a form with an item name, amount, and category so that I can record a new expense or income transaction.

#### Acceptance Criteria

1. THE Input_Form SHALL include fields for item name (description), amount, and category.
2. THE Input_Form SHALL include a category selector populated with all values in CATEGORIES.
3. WHEN a user submits the Input_Form with all required fields filled in correctly, THE App SHALL create a new Transaction and add it to the Transaction_List.
4. WHEN a user submits the Input_Form with any required field empty or blank, THE Validator SHALL prevent the submission and display an inline validation error message.
5. WHEN a user submits the Input_Form with an amount that is zero, negative, or non-numeric, THE Validator SHALL reject the submission and display a validation error.
6. WHEN a transaction is successfully added, THE App SHALL clear all Input_Form fields to prepare for the next entry.
7. WHEN a transaction is successfully added, THE App SHALL persist the new Transaction to LocalStorage immediately.

---

### Requirement 2: Transaction List

**User Story:** As a user, I want to see a scrollable list of all my transactions so that I can review my spending history and remove entries I no longer need.

#### Acceptance Criteria

1. THE Transaction_List SHALL display each transaction's item name, amount, category, and a delete button.
2. WHEN the number of transactions exceeds the visible area, THE Transaction_List SHALL be scrollable.
3. WHEN a user clicks the delete button on a transaction, THE App SHALL remove that transaction from the Transaction_List and from LocalStorage.
4. WHEN no transactions exist, THE App SHALL display an empty state message in place of the Transaction_List.

---

### Requirement 3: Balance Display

**User Story:** As a user, I want to see my current balance at the top of the page so that I always know my financial standing at a glance.

#### Acceptance Criteria

1. THE Balance_Display SHALL show total income, total expenses, and net balance computed from all stored transactions.
2. WHEN a transaction is added or deleted, THE Balance_Display SHALL automatically update to reflect the new totals.
3. THE Balance_Display SHALL compute net balance as total income minus total expenses.
4. WHEN the transaction list is empty, THE Balance_Display SHALL show zero for all three values.

---

### Requirement 4: Spending Chart

**User Story:** As a user, I want to see a visual pie chart of my spending by category so that I can understand where my money is going.

#### Acceptance Criteria

1. THE Chart SHALL render a pie or donut chart on an HTML5 `<canvas>` element showing spending distribution by category.
2. THE Chart_Aggregator SHALL only include expense-type transactions when computing category totals for the chart.
3. WHEN a transaction is added or deleted, THE Chart SHALL automatically update to reflect the current spending distribution.
4. WHEN there are no expense transactions, THE Chart SHALL display an empty state placeholder instead of a chart.
5. THE Chart SHALL include a legend mapping each color segment to its category name and total amount.

---

### Requirement 5: LocalStorage Persistence

**User Story:** As a user, I want my transactions to be saved in the browser so that my data is not lost when I close or refresh the page.

#### Acceptance Criteria

1. WHEN the App starts, THE Storage_Module SHALL load all previously persisted transactions from LocalStorage and populate the AppState.
2. WHEN LocalStorage data for transactions is missing or contains invalid JSON, THE Storage_Module SHALL return an empty transaction array and SHALL NOT throw an unhandled error.
3. WHEN a LocalStorage write operation fails due to quota being exceeded, THE App SHALL display a user-facing error notification informing the user that storage is full.
4. THE Storage_Module SHALL use the key `ebv_transactions` to store the JSON-serialized array of Transaction objects.

---

### Requirement 6: Custom Categories

**User Story:** As a user, I want to add my own custom categories so that I can classify transactions beyond the predefined options.

#### Acceptance Criteria

1. THE App SHALL provide a mechanism for users to add a new custom category name.
2. WHEN a custom category is added, THE App SHALL append it to CATEGORIES and make it immediately available in the Input_Form category selector.
3. WHEN a custom category is added, THE App SHALL persist the updated CATEGORIES list to LocalStorage so that custom categories survive page refresh.
4. IF a user attempts to add a custom category with an empty or duplicate name, THEN THE App SHALL reject the input and display a validation error.

---

### Requirement 7: Transaction Sorting

**User Story:** As a user, I want to sort my transaction list by amount or category so that I can quickly find and analyze specific entries.

#### Acceptance Criteria

1. THE Transaction_List SHALL provide controls to sort transactions by amount in ascending order.
2. THE Transaction_List SHALL provide controls to sort transactions by amount in descending order.
3. THE Transaction_List SHALL provide a control to sort transactions by category in alphabetical order.
4. WHEN a sort option is selected, THE Transaction_List SHALL re-render immediately with transactions ordered according to the selected sort criterion.
5. WHEN no sort option is selected, THE Transaction_List SHALL display transactions in reverse chronological order (most recent first).

---

### Requirement 8: Dark/Light Mode Toggle

**User Story:** As a user, I want to switch between dark and light themes so that I can use the app comfortably in different lighting conditions.

#### Acceptance Criteria

1. THE App SHALL provide a toggle control to switch between dark mode and light mode.
2. WHEN the toggle is activated, THE App SHALL apply the selected theme to the entire UI immediately without a page reload.
3. WHEN a theme preference is set, THE App SHALL persist the preference to LocalStorage so that the chosen theme is restored on the next visit.
4. WHEN the App starts, THE App SHALL read the persisted theme preference from LocalStorage and apply it before rendering the UI.

---

### Requirement 9: Input Validation

**User Story:** As a user, I want the app to validate my input so that only well-formed transactions are stored and my data remains consistent.

#### Acceptance Criteria

1. THE Validator SHALL reject any transaction where the amount is not a finite positive number greater than zero.
2. THE Validator SHALL reject any transaction where the item name (description) is empty, whitespace-only, or exceeds 100 characters.
3. THE Validator SHALL reject any transaction where the category is not a value present in CATEGORIES.
4. THE Validator SHALL accept a transaction only when all fields pass all validation rules simultaneously.
5. WHEN validation fails, THE App SHALL display a specific error message identifying which field failed and why.

---

### Requirement 10: Data Integrity and Storage Correctness

**User Story:** As a developer, I want the storage layer to correctly serialize and deserialize transaction data so that no data is lost or corrupted between sessions.

#### Acceptance Criteria

1. THE Storage_Module SHALL serialize Transaction objects to JSON before writing to LocalStorage.
2. WHEN a transaction is saved and then loaded, THE Storage_Module SHALL return a Transaction object equivalent to the one that was saved (round-trip correctness).
3. WHEN a transaction is deleted by its id, THE Storage_Module SHALL remove exactly that transaction and SHALL leave all other stored transactions unchanged.
4. IF no transaction with the given id exists in storage, THEN THE Storage_Module SHALL leave the stored transaction list unchanged.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Balance Identity

*For any* array of transactions, the net balance computed by the App always equals the sum of all income amounts minus the sum of all expense amounts.

**Validates: Requirements 3.1, 3.3**

---

### Property 2: Transaction Addition Round-Trip

*For any* valid transaction object, after saving it to LocalStorage and loading transactions back, the loaded array contains a transaction with the same id, amount, category, and description as the saved one.

**Validates: Requirements 1.7, 10.1, 10.2**

---

### Property 3: Delete Removes Exactly One Item

*For any* transaction list and any transaction id present in that list, deleting by that id produces a list that is exactly one item shorter and does not contain the deleted transaction.

**Validates: Requirements 2.3, 10.3**

---

### Property 4: Delete Does Not Affect Other Transactions

*For any* transaction list, deleting a transaction by id leaves all other transactions in the list unchanged (same ids, amounts, categories, and descriptions).

**Validates: Requirements 10.3, 10.4**

---

### Property 5: Chart Totals Equal Expense Sum

*For any* array of transactions, the sum of all values in the category map produced by Chart_Aggregator equals the sum of the amounts of all expense-type transactions in the array.

**Validates: Requirements 4.2, 4.3**

---

### Property 6: Validator Rejects Non-Positive Amounts

*For any* form data where the amount is zero, negative, or non-numeric, the Validator returns false.

**Validates: Requirements 1.5, 9.1**

---

### Property 7: Validator Rejects Blank or Oversized Descriptions

*For any* string that is empty, composed entirely of whitespace, or longer than 100 characters, the Validator rejects it as an item name.

**Validates: Requirements 1.4, 9.2**

---

### Property 8: Validator Rejects Unknown Categories

*For any* category string not present in CATEGORIES, the Validator returns false.

**Validates: Requirements 9.3**

---

### Property 9: Sort by Amount Ascending Produces Ordered List

*For any* non-empty transaction list sorted by amount ascending, each transaction's amount is greater than or equal to the amount of the preceding transaction.

**Validates: Requirements 7.1**

---

### Property 10: Sort by Category Produces Alphabetical Order

*For any* non-empty transaction list sorted by category, each transaction's category is alphabetically greater than or equal to the category of the preceding transaction.

**Validates: Requirements 7.3**

---

### Property 11: Custom Category Persists Across Reload

*For any* custom category string that is non-empty and not already in CATEGORIES, after adding it and reloading the App, the category appears in CATEGORIES and in the Input_Form category selector.

**Validates: Requirements 6.2, 6.3**

---

### Property 12: Theme Preference Round-Trip

*For any* theme preference (dark or light), after setting it and reloading the App, the App applies that same theme on startup.

**Validates: Requirements 8.3, 8.4**
