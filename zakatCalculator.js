// Zakat Calculator Functions
function updateZakatFields() {
    const zakatType = document.getElementById('zakatType').value;
    const amountLabel = document.getElementById('zakatAmountLabel');
    const zakatAmount = document.getElementById('zakatAmount');
    const zakatPrice = document.getElementById('zakatPrice');
    const zakatCurrency = document.getElementById('zakatCurrency').value;
    
    switch(zakatType) {
        case 'gold':
            amountLabel.textContent = 'الوزن (جرام)';
            zakatAmount.placeholder = 'أدخل وزن الذهب بالجرام';
            zakatAmount.value = '';
            updateZakatPrice('XAU', zakatCurrency);
            break;
        case 'silver':
            amountLabel.textContent = 'الوزن (جرام)';
            zakatAmount.placeholder = 'أدخل وزن الفضة بالجرام';
            zakatAmount.value = '';
            updateZakatPrice('XAG', zakatCurrency);
            break;
        case 'currency':
            amountLabel.textContent = 'المبلغ';
            zakatAmount.placeholder = 'أدخل المبلغ بالعملة';
            zakatAmount.value = '';
            zakatPrice.value = '1';
            break;
        case 'crypto':
            amountLabel.textContent = 'الكمية';
            zakatAmount.placeholder = 'أدخل كمية العملة الرقمية';
            zakatAmount.value = '';
            updateZakatPrice('BTC', zakatCurrency);
            break;
    }
}

function updateZakatPrice(assetType, currency) {
    const zakatPrice = document.getElementById('zakatPrice');
    
    let price = 1;
    
    switch(assetType) {
        case 'XAU': // Gold
            price = metalsPrices.XAU?.price || 2000;
            price = price / 31.1034768; // Convert to per gram
            break;
        case 'XAG': // Silver
            price = metalsPrices.XAG?.price || 25;
            price = price / 31.1034768; // Convert to per gram
            break;
        case 'BTC': // Bitcoin
            price = cryptoPrices.BTC?.price || 45000;
            break;
    }
    
    // Convert to selected currency
    const exchangeRate = exchangeRates[currency]?.rate || 1;
    price = price * exchangeRate;
    
    zakatPrice.value = price.toFixed(2);
}

function calculateZakat() {
    const zakatType = document.getElementById('zakatType').value;
    const zakatCurrency = document.getElementById('zakatCurrency').value;
    const amount = parseFloat(document.getElementById('zakatAmount').value) || 0;
    const price = parseFloat(document.getElementById('zakatPrice').value) || 1;
    
    if (amount <= 0) {
        alert('الرجاء إدخال قيمة صحيحة');
        return;
    }
    
    try {
        // Calculate total value
        const totalValue = amount * price;
        
        // Calculate nisab based on zakat type
        let nisab = 0;
        let nisabDescription = '';
        
        switch(zakatType) {
            case 'gold':
                nisab = 85 * (metalsPrices.XAU?.price || 2000) / 31.1034768; // 85 grams of gold
                nisabDescription = '85 جرام ذهب';
                break;
            case 'silver':
                nisab = 595 * (metalsPrices.XAG?.price || 25) / 31.1034768; // 595 grams of silver
                nisabDescription = '595 جرام فضة';
                break;
            case 'currency':
            case 'crypto':
                nisab = 85 * (metalsPrices.XAU?.price || 2000) / 31.1034768; // Equivalent to 85 grams of gold
                nisabDescription = 'ما يعادل 85 جرام ذهب';
                break;
        }
        
        // Convert nisab to selected currency
        const exchangeRate = exchangeRates[zakatCurrency]?.rate || 1;
        const nisabInLocalCurrency = nisab * exchangeRate;
        
        // Calculate zakat amount (2.5%)
        const zakatAmount = totalValue >= nisabInLocalCurrency ? totalValue * 0.025 : 0;
        
        // Calculate percentage of nisab
        const nisabPercentage = totalValue > 0 ? (totalValue / nisabInLocalCurrency * 100) : 0;
        
        // Display results
        document.getElementById('zakatTotalValue').textContent = `${getCurrencySymbol(zakatCurrency)}${totalValue.toFixed(4)}`;
        document.getElementById('zakatNisab').textContent = `${getCurrencySymbol(zakatCurrency)}${nisabInLocalCurrency.toFixed(4)} (${nisabDescription})`;
        document.getElementById('zakatAmountDue').textContent = `${getCurrencySymbol(zakatCurrency)}${zakatAmount.toFixed(4)}`;
        
        // Add detailed breakdown
        const detailsContainer = document.getElementById('zakatDetails');
        if (!detailsContainer) {
            const details = document.createElement('div');
            details.id = 'zakatDetails';
            details.className = 'calculation-details';
            document.getElementById('zakatResult').appendChild(details);
        }
        
        detailsContainer.innerHTML = `
            <div class="detail-item">
                <span>النسبة المئوية للنصاب:</span>
                <span>${nisabPercentage.toFixed(1)}%</span>
            </div>
            <div class="detail-item">
                <span>حالة الزكاة:</span>
                <span>${totalValue >= nisabInLocalCurrency ? 'مستحق' : 'غير مستحق'}</span>
            </div>
            <div class="detail-item">
                <span>نصاب الزكاة بالدولار:</span>
                <span>$${nisab.toFixed(2)}</span>
            </div>
        `;
        
        // Show result container
        const resultContainer = document.getElementById('zakatResult');
        resultContainer.style.display = 'block';
        
        // Update status with professional design
        const statusDiv = document.getElementById('zakatStatus');
        if (totalValue >= nisabInLocalCurrency) {
            statusDiv.className = 'zakat-status eligible';
            statusDiv.innerHTML = `
                <div class="status-icon">✅</div>
                <div class="status-text">
                    <strong>مستحق للزكاة - الحمد لله</strong>
                    <div class="status-subtext">القيمة تتجاوز النصاب الشرعي</div>
                </div>
            `;
        } else {
            statusDiv.className = 'zakat-status not-eligible';
            statusDiv.innerHTML = `
                <div class="status-icon">⚠️</div>
                <div class="status-text">
                    <strong>غير مستحق للزكاة</strong>
                    <div class="status-subtext">القيمة أقل من النصاب (${nisabPercentage.toFixed(1)}% من النصاب)</div>
                </div>
            `;
        }
        
        // Add success animation
        resultContainer.classList.add('success-animation');
        setTimeout(() => {
            resultContainer.classList.remove('success-animation');
        }, 600);
        
    } catch (error) {
        console.error('Error calculating zakat:', error);
        alert('حدث خطأ في الحساب. يرجى المحاولة مرة أخرى.');
    }
}

function getCurrencySymbol(currencyCode) {
    const symbols = {
        'USD': '$', 'EUR': '€', 'GBP': '£', 'EGP': 'ج.م',
        'SAR': 'ر.س', 'AED': 'د.إ', 'KWD': 'د.ك', 'QAR': 'ر.ق',
        'BHD': 'د.ب', 'OMR': 'ر.ع', 'JOD': 'د.أ', 'CAD': 'C$',
        'AUD': 'A$', 'CHF': 'Fr', 'CNY': '¥', 'JPY': '¥',
        'INR': '₹', 'TRY': '₺', 'RUB': '₽', 'BRL': 'R$'
    };
    return symbols[currencyCode] || currencyCode;
}

// Initialize zakat calculator
document.addEventListener('DOMContentLoaded', function() {
    const zakatType = document.getElementById('zakatType');
    const zakatCurrency = document.getElementById('zakatCurrency');
    const zakatAmount = document.getElementById('zakatAmount');
    
    if (zakatType) {
        zakatType.addEventListener('change', updateZakatFields);
    }
    
    if (zakatCurrency) {
        zakatCurrency.addEventListener('change', () => {
            const currentType = zakatType.value;
            if (currentType === 'gold') updateZakatPrice('XAU', zakatCurrency.value);
            else if (currentType === 'silver') updateZakatPrice('XAG', zakatCurrency.value);
            else if (currentType === 'crypto') updateZakatPrice('BTC', zakatCurrency.value);
        });
    }
    
    if (zakatAmount) {
        zakatAmount.addEventListener('input', calculateZakat);
    }
    
    // Initialize fields
    updateZakatFields();
});
