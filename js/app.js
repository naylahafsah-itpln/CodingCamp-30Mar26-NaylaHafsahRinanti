// 1. Inisialisasi Data dari Local Storage (TC-2)
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let expenseChart;

// 2. Seleksi Elemen DOM
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');
const totalBalance = document.getElementById('total-balance');

// 3. Fungsi untuk Update Antarmuka (UI)
function updateUI() {
    // Kosongkan list sebelum render ulang
    transactionList.innerHTML = '';
    
    let total = 0;
    const categoryTotals = { Food: 0, Transport: 0, Fun: 0 };

    transactions.forEach((item, index) => {
        // Hitung Total Balance (MVP)
        total += parseFloat(item.amount);
        
        // Hitung per kategori untuk Chart (MVP)
        if (categoryTotals.hasOwnProperty(item.category)) {
            categoryTotals[item.category] += parseFloat(item.amount);
        }

        // Render Baris Transaksi
        const row = document.createElement('div');
        row.className = 'item-row';
        row.innerHTML = `
            <div class="item-info">
                <b>${item.name}</b>
                <span class="amount">$${parseFloat(item.amount).toFixed(2)}</span><br>
                <span class="category-badge">${item.category}</span>
            </div>
            <button class="btn-delete" onclick="deleteTransaction(${index})">Delete</button>
        `;
        transactionList.appendChild(row);
    });

    // Update Tampilan Saldo (MVP)
    totalBalance.innerText = `$${total.toFixed(2)}`;

    // Simpan ke Local Storage (TC-2)
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Update Grafik (MVP)
    renderChart(categoryTotals);
}

// 4. Fungsi Tambah Transaksi (MVP)
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('item-name').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;

    // Validasi Form (MVP)
    if (name.trim() === '' || amount <= 0) {
        alert("Please fill all fields with valid data!");
        return;
    }

    const newTransaction = {
        name,
        amount: parseFloat(amount),
        category
    };

    transactions.push(newTransaction);
    updateUI();
    transactionForm.reset();
});

// 5. Fungsi Hapus Transaksi (MVP)
window.deleteTransaction = function(index) {
    transactions.splice(index, 1);
    updateUI();
};

// 6. Fungsi Render Grafik (Chart.js)
function renderChart(data) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    // Hapus chart lama sebelum membuat yang baru agar tidak tumpang tindih
    if (expenseChart) {
        expenseChart.destroy();
    }

    expenseChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ['#2ecc71', '#3498db', '#e67e22'], // Hijau (Food), Biru (Transport), Oranye (Fun)
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

// Jalankan UI pertama kali saat halaman dimuat
updateUI();