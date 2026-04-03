let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let expenseChart;

const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalBalance = document.getElementById('total-balance');

// Toggle Dark Mode
document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    document.getElementById('theme-toggle').innerText = isDark ? '☀️ Light' : '🌙 Dark';
});

// input kategori baru kalau pilih 'custom'
window.checkNewCategory = function(select) {
    const customInput = document.getElementById('new-category-input');
    customInput.style.display = select.value === 'custom' ? 'block' : 'none';
};

function updateUI() {
    transactionList.innerHTML = '';
    const sortBy = document.getElementById('sort-by').value;
    
    // Fitur Sorting
    let displayData = [...transactions];
    if (sortBy === 'highest') {
        displayData.sort((a, b) => b.amount - a.amount);
    } else {
        // (default)
        displayData.reverse(); 
    }

    let total = 0;
    const categoryTotals = {};

    displayData.forEach((item) => {
        const amount = parseFloat(item.amount);
        total += amount;
        
        // custom category
        categoryTotals[item.category] = (categoryTotals[item.category] || 0) + amount;

        const row = document.createElement('div');
        row.className = 'item-row';
        row.innerHTML = `
            <div class="item-info">
                <b>${item.name}</b>
                <span class="amount">$${amount.toFixed(2)}</span><br>
                <span class="category-badge">${item.category}</span>
            </div>
            <button class="btn-delete" onclick="deleteTransaction(${transactions.indexOf(item)})">Delete</button>
        `;
        transactionList.appendChild(row);
    });

    totalBalance.innerText = `$${total.toFixed(2)}`;
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderChart(categoryTotals);
}

transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('item-name').value;
    const amount = document.getElementById('amount').value;
    let category = document.getElementById('category').value;

    if (name.trim() === '' || amount <= 0) {
        alert("Data nggak valid!");
        return;
    }

    // Logika Custom Category
    if (category === 'custom') {
        const customName = document.getElementById('custom-cat-name').value;
        if (!customName) {
            alert("Isi nama kategori barunya!");
            return;
        }
        category = customName;
        
        // Tambah ke dropdown biar bisa dipilih lagi nanti
        const select = document.getElementById('category');
        const newOption = new Option(customName, customName);
        select.add(newOption, select.options[select.options.length - 1]);
    }

    transactions.push({ name, amount: parseFloat(amount), category });
    
    document.getElementById('new-category-input').style.display = 'none';
    transactionForm.reset();
    updateUI();
});

window.deleteTransaction = function(index) {
    transactions.splice(index, 1);
    updateUI();
};

function renderChart(data) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    if (expenseChart) expenseChart.destroy();

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ['#2ecc71', '#3498db', '#e67e22', '#9b59b6', '#f1c40f', '#e74c3c'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

updateUI();