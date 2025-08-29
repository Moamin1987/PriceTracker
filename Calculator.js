// Gold Calculator Functions
async function calculateGold() {
    const country = document.getElementById('goldCountry').value;
    const karat = parseInt(document.getElementById('goldKarat').value);
    const weight = parseFloat(document.getElementById('goldWeight').value) || 0;
    
    if (weight <= 0) {
        alert(t('invalidWeight'));
        return;
    }
    
    try {
        // Get current gold price with high precision
        const globalGoldPrice = metalsPrices.XAU?.price || 2000;
        const pricePerGramUSD = globalGoldPrice / 31.1034768; // Ounce = 31.1034768 grams
        
        document.getElementById('globalGoldPrice').value = globalGoldPrice.toFixed(2);
        
        // Calculate pure gold content
        const pureGoldContent = (karat / 24) * weight;
        
        // Calculate value in USD
        const valueUSD = pureGoldContent * pricePerGramUSD;
        
        // Get exchange rate for selected country
        const exchangeRate = exchangeRates[country]?.rate || 1;
        
        // Calculate value in local currency
        const valueLocal = valueUSD * exchangeRate;
        
        // Calculate price per gram in local currency for each karat
        const pricePerGramLocal = pricePerGramUSD * exchangeRate * (karat / 24);
        
        // Display results with high precision
        document.getElementById('goldValueUSD').textContent = `$${valueUSD.toFixed(4)}`;
        document.getElementById('goldValueLocal').textContent = `${getCurrencySymbol(country)}${valueLocal.toFixed(4)}`;
        document.getElementById('pricePerGram').textContent = `${getCurrencySymbol(country)}${pricePerGramLocal.toFixed(4)} ${t('perGram')}`;
        
        // Add detailed breakdown
        const detailsContainer = document.getElementById('goldDetails');
        if (!detailsContainer) {
            const details = document.createElement('div');
            details.id = 'goldDetails';
            details.className = 'calculation-details';
            document.getElementById('goldResult').appendChild(details);
        } else {
            // Update existing details
            detailsContainer.innerHTML = `
                <div class="detail-item">
                    <span>${t('goldPurity')}:</span>
                    <span>${((karat/24)*100).toFixed(1)}%</span>
                </div>
                <div class="detail-item">
                    <span>${t('pureGoldWeight')}:</span>
                    <span>${pureGoldContent.toFixed(4)} ${t('grams')}</span>
                </div>
                <div class="detail-item">
                    <span>${t('globalOuncePrice')}:</span>
                    <span>$${globalGoldPrice.toFixed(2)}</span>
                </div>
                <div class="detail-item">
                    <span>${t('globalGramPrice')}:</span>
                    <span>$${pricePerGramUSD.toFixed(4)}</span>
                </div>
            `;
        }
        
        // Show results with professional animation
        showResultsWithAnimation('goldResult');
        
    } catch (error) {
        console.error('Error calculating gold:', error);
        alert(t('calculationError'));
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

// Update gold price when data changes
function updateGoldPriceInCalculator() {
    if (metalsPrices.XAU) {
        const globalPriceInput = document.getElementById('globalGoldPrice');
        if (globalPriceInput) {
            globalPriceInput.value = metalsPrices.XAU.price.toFixed(2);
        }
    }
}

// Show results with animation
function showResultsWithAnimation(containerId) {
    const container = document.getElementById(containerId);
    container.style.display = 'block';
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
}

// Initialize gold calculator
document.addEventListener('DOMContentLoaded', function() {
    // Set initial gold price
    updateGoldPriceInCalculator();
    
    // Add event listeners
    const goldCountry = document.getElementById('goldCountry');
    const goldKarat = document.getElementById('goldKarat');
    const goldWeight = document.getElementById('goldWeight');
    
    if (goldCountry) goldCountry.addEventListener('change', updateGoldPriceInCalculator);
    if (goldKarat) goldKarat.addEventListener('change', calculateGold);
    if (goldWeight) goldWeight.addEventListener('input', calculateGold);
});