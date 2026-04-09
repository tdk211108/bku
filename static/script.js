// SAT Conversion Table
const SAT_TABLE = {
    1600: 100, 1590: 99, 1580: 98, 1570: 97, 1560: 96,
    1550: 95, 1540: 94, 1530: 93, 1520: 92, 1510: 91,
    1500: 90, 1490: 89, 1480: 88, 1470: 87, 1460: 86,
    1450: 85, 1440: 84, 1430: 83, 1420: 82, 1410: 81,
    1400: 80, 1390: 79, 1380: 78, 1370: 77, 1360: 76,
    1350: 75, 1340: 74, 1330: 73, 1320: 72, 1310: 71,
    1300: 70, 1280: 69, 1260: 68, 1240: 67, 1220: 66,
    1200: 65
};

const IELTS_TABLE = {
    6.0: 8, 6.5: 8.5, 7.0: 9, 7.5: 9.5, 8.0: 10, 8.5: 10, 9.0: 10
};

// Local Storage Keys
const STORAGE_KEYS = {
    TB_TOAN: 'tb_toan',
    TB_LY: 'tb_ly',
    TB_ANH: 'tb_anh',
    IELTS: 'ielts',
    IELTS_OPTION: 'ielts_option'
};

// ==================== DEBOUNCE FUNCTION ====================
let debounceTimer;
function debounce(callback, delay = 150) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, delay);
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadFromLocalStorage();
    setupAutoCalculation();
});

// ==================== EVENT LISTENERS ====================
function initializeEventListeners() {
    // Method selection
    document.querySelectorAll('input[name="method"]').forEach(radio => {
        radio.addEventListener('change', toggleMethod);
    });

    // IELTS option
    document.querySelectorAll('input[name="ielts-option"]').forEach(radio => {
        radio.addEventListener('change', toggleIELTS);
    });

    // All inputs
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            debounce(calculateResults, 150);
        });
        input.addEventListener('input', saveToLocalStorage);
        
        // Enter key to move to next input
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                // Find next enabled input
                for (let i = index + 1; i < numberInputs.length; i++) {
                    if (!numberInputs[i].disabled) {
                        numberInputs[i].focus();
                        numberInputs[i].select();
                        break;
                    }
                }
            }
        });
    });
}

function setupAutoCalculation() {
    calculateResults();
}

// ==================== TOGGLE METHODS ====================
function toggleMethod(e) {
    const method = e.target.value;
    
    document.getElementById('dgnl-form').classList.toggle('active', method === 'dgnl');
    document.getElementById('sat-form').classList.toggle('active', method === 'sat');
    
    debounce(calculateResults, 150);
}

function toggleIELTS(e) {
    const hasIELTS = e.target.value === 'yes';
    document.getElementById('ielts-input').style.display = hasIELTS ? 'block' : 'none';
    
    if (hasIELTS) {
        document.getElementById('anh-tn').disabled = true;
        document.querySelectorAll('[id^="tb-anh-"]').forEach(el => el.disabled = true);
    } else {
        document.getElementById('anh-tn').disabled = false;
        document.querySelectorAll('[id^="tb-anh-"]').forEach(el => el.disabled = false);
    }
    
    debounce(calculateResults, 150);
}

// ==================== VALIDATION FUNCTIONS ====================
function validateInputs() {
    const errors = [];
    const method = document.querySelector('input[name="method"]:checked').value;
    const ieltsOption = document.querySelector('input[name="ielts-option"]:checked').value;

    // Helper function to check range
    const checkRange = (value, min, max) => {
        const num = parseFloat(value);
        return !isNaN(num) && (num < min || num > max);
    };

    // Validate ĐGNL scores (0-300 each)
    if (method === 'dgnl') {
        const tvVal = document.getElementById('tv').value;
        const taVal = document.getElementById('ta').value;
        const toanVal = document.getElementById('toan-dgnl').value;
        const tdVal = document.getElementById('td').value;

        if (tvVal && checkRange(tvVal, 0, 300)) errors.push('TV phải từ 0 đến 300');
        if (taVal && checkRange(taVal, 0, 300)) errors.push('TA phải từ 0 đến 300');
        if (toanVal && checkRange(toanVal, 0, 300)) errors.push('Toán ĐGNL phải từ 0 đến 300');
        if (tdVal && checkRange(tdVal, 0, 300)) errors.push('TDKH phải từ 0 đến 300');
    } else {
        // Validate SAT (1200-1600)
        const satVal = document.getElementById('sat-score').value;
        if (satVal && checkRange(satVal, 1200, 1600)) {
            errors.push('SAT phải từ 1200 đến 1600');
        }
    }

    // Validate IELTS if used (6.0-9.0)
    if (ieltsOption === 'yes') {
        const ieltsVal = document.getElementById('ielts').value;
        if (ieltsVal && checkRange(ieltsVal, 6, 9)) {
            errors.push('IELTS phải từ 6.0 đến 9.0');
        }
    }

    // Validate TN THPT scores (0-10 each)
    const toanTnVal = document.getElementById('toan-tn').value;
    const lyTnVal = document.getElementById('ly-tn').value;
    const anhTnVal = document.getElementById('anh-tn').value;

    if (toanTnVal && checkRange(toanTnVal, 0, 10)) {
        errors.push('Toán TNTHPT phải từ 0 đến 10');
    }
    if (lyTnVal && checkRange(lyTnVal, 0, 10)) {
        errors.push('Lý TNTHPT phải từ 0 đến 10');
    }
    if (anhTnVal && !document.getElementById('anh-tn').disabled && checkRange(anhTnVal, 0, 10)) {
        errors.push('Anh TNTHPT phải từ 0 đến 10');
    }

    // Validate TB Học bạ scores (0-10 each)
    for (let i = 10; i <= 12; i++) {
        const tbToanVal = document.getElementById(`tb-toan-${i}`).value;
        const tbLyVal = document.getElementById(`tb-ly-${i}`).value;
        const tbAnhVal = document.getElementById(`tb-anh-${i}`).value;

        if (tbToanVal && checkRange(tbToanVal, 0, 10)) {
            errors.push(`Toán TB lớp ${i} phải từ 0 đến 10`);
        }
        if (tbLyVal && checkRange(tbLyVal, 0, 10)) {
            errors.push(`Lý TB lớp ${i} phải từ 0 đến 10`);
        }
        if (tbAnhVal && !document.getElementById(`tb-anh-${i}`).disabled && checkRange(tbAnhVal, 0, 10)) {
            errors.push(`Anh TB lớp ${i} phải từ 0 đến 10`);
        }
    }

    return errors;
}

function showValidationError(errors) {
    const errorContainer = document.getElementById('error-container');
    if (!errorContainer) return;

    if (errors.length === 0) {
        errorContainer.style.display = 'none';
        errorContainer.innerHTML = '';
    } else {
        errorContainer.style.display = 'block';
        errorContainer.innerHTML = '<strong>Lỗi:</strong> ' + errors.join(' • ');
    }
}

// ==================== CALCULATION FUNCTIONS ====================
function calculateResults() {
    // Validate inputs first
    const validationErrors = validateInputs();
    showValidationError(validationErrors);
    
    if (validationErrors.length > 0) {
        // Clear results if there are validation errors
        document.getElementById('result-nl-m1').textContent = '—';
        document.getElementById('result-tn-m1').textContent = '—';
        document.getElementById('result-hb-m1').textContent = '—';
        document.getElementById('result-total-m1').textContent = '—';
        document.getElementById('result-nl-m3').textContent = '—';
        document.getElementById('result-tn-m3').textContent = '—';
        document.getElementById('result-hb-m3').textContent = '—';
        document.getElementById('result-total-m3').textContent = '—';
        updateFinalScore(0, 0);
        return;
    }

    try {
        // Get method selection
        const method = document.querySelector('input[name="method"]:checked').value;
        
        // Calculate diem_nl (Năng lực)
        let diem_nl = 0;
        if (method === 'dgnl') {
            const tv = parseFloat(document.getElementById('tv').value) || 0;
            const ta = parseFloat(document.getElementById('ta').value) || 0;
            const toan_dgnl = parseFloat(document.getElementById('toan-dgnl').value) || 0;
            const td = parseFloat(document.getElementById('td').value) || 0;
            
            diem_nl = (toan_dgnl * 2 + tv + ta + td) / 15;
        } else {
            const sat = parseInt(document.getElementById('sat-score').value) || 0;
            diem_nl = SAT_TABLE[sat] || 0;
        }

        // Get IELTS and calculate diem_anh
        let diem_anh = null;
        const ieltsOption = document.querySelector('input[name="ielts-option"]:checked').value;
        
        if (ieltsOption === 'yes') {
            const ielts = parseFloat(document.getElementById('ielts').value);
            if (ielts >= 6 && ielts <= 9) {
                diem_anh = ielts >= 8 ? 10 : IELTS_TABLE[ielts] || null;
                updateANHFields(diem_anh);
            }
        }

        // Get TN THPT scores
        const toan_tn = parseFloat(document.getElementById('toan-tn').value) || 0;
        const ly_tn = parseFloat(document.getElementById('ly-tn').value) || 0;
        let anh_tn = parseFloat(document.getElementById('anh-tn').value) || 0;
        
        // If IELTS is used, update anh_tn
        if (diem_anh !== null && ieltsOption === 'yes') {
            anh_tn = diem_anh;
            document.getElementById('anh-tn').value = diem_anh.toFixed(2);
        }

        // Calculate diem_tn (TN THPT)
        const diem_tn = (toan_tn * 2 + ly_tn + anh_tn) / 40 * 100;

        // Get TB Học bạ
        const tb_toan = calculateTB('toan');
        const tb_ly = calculateTB('ly');
        let tb_anh = 0;
        
        if (ieltsOption === 'yes' && diem_anh !== null) {
            tb_anh = diem_anh;
        } else {
            tb_anh = calculateTB('anh');
        }

        // Calculate diem_hb (Học bạ)
        const diem_hb = ((tb_toan * 2 + tb_ly + tb_anh) / 4) * 10;

        // ==================== PHƯƠNG THỨC 1 ====================
        const tong_1 = diem_nl * 0.7 + diem_tn * 0.2 + diem_hb * 0.1;

        // ==================== PHƯƠNG THỨC 3 ====================
        const diem_hb_3 = ((tb_toan * 2 + tb_ly + tb_anh) / 4) * 10;
        const tong_3 = (diem_tn * 0.75) * 0.7 + diem_tn * 0.2 + diem_hb_3 * 0.1;

        // Display results
        displayResults(diem_nl, diem_tn, diem_hb, tong_1, diem_tn * 0.75, diem_hb_3, tong_3);

    } catch (error) {
        console.error('Error in calculation:', error);
    }
}

function calculateTB(subject) {
    let k10 = 0, k11 = 0, k12 = 0;
    
    if (subject === 'toan') {
        k10 = parseFloat(document.getElementById('tb-toan-10').value) || 0;
        k11 = parseFloat(document.getElementById('tb-toan-11').value) || 0;
        k12 = parseFloat(document.getElementById('tb-toan-12').value) || 0;
    } else if (subject === 'ly') {
        k10 = parseFloat(document.getElementById('tb-ly-10').value) || 0;
        k11 = parseFloat(document.getElementById('tb-ly-11').value) || 0;
        k12 = parseFloat(document.getElementById('tb-ly-12').value) || 0;
    } else if (subject === 'anh') {
        k10 = parseFloat(document.getElementById('tb-anh-10').value) || 0;
        k11 = parseFloat(document.getElementById('tb-anh-11').value) || 0;
        k12 = parseFloat(document.getElementById('tb-anh-12').value) || 0;
    }
    
    return (k10 + k11 + k12) / 3;
}

function updateANHFields(value) {
    if (value !== null) {
        document.getElementById('anh-tn').value = value.toFixed(2);
        document.getElementById('tb-anh-10').value = value.toFixed(2);
        document.getElementById('tb-anh-11').value = value.toFixed(2);
        document.getElementById('tb-anh-12').value = value.toFixed(2);
    }
}

// ==================== DISPLAY RESULTS ====================
function displayResults(nl1, tn1, hb1, total1, nl3, hb3, total3) {
    // Format values (show "—" if 0 or NaN)
    const format = (val) => {
        val = parseFloat(val);
        return isNaN(val) || val === 0 ? '—' : val.toFixed(2);
    };

    // Phương thức 1
    document.getElementById('result-nl-m1').textContent = format(nl1);
    document.getElementById('result-tn-m1').textContent = format(tn1);
    document.getElementById('result-hb-m1').textContent = format(hb1);
    document.getElementById('result-total-m1').textContent = format(total1);

    // Phương thức 3
    document.getElementById('result-nl-m3').textContent = format(nl3);
    document.getElementById('result-tn-m3').textContent = format(tn1); // Same TN THPT
    document.getElementById('result-hb-m3').textContent = format(hb3);
    document.getElementById('result-total-m3').textContent = format(total3);

    // Final score
    updateFinalScore(total1, total3);
}

function updateFinalScore(total1, total3) {
    const final = Math.max(parseFloat(total1) || 0, parseFloat(total3) || 0);
    const finalScoreEl = document.getElementById('final-score');
    const scoreBarEl = document.getElementById('score-fill');

    if (isNaN(final) || final === 0) {
        finalScoreEl.textContent = '—';
        scoreBarEl.style.width = '0%';
    } else {
        finalScoreEl.textContent = final.toFixed(2);
        const percentage = Math.min((final / 100) * 100, 100);
        scoreBarEl.style.width = percentage + '%';
    }
}

// ==================== LOCAL STORAGE ====================
function saveToLocalStorage() {
    try {
        // Save TB Học bạ
        for (let i = 10; i <= 12; i++) {
            localStorage.setItem(`tb_toan_${i}`, document.getElementById(`tb-toan-${i}`).value);
            localStorage.setItem(`tb_ly_${i}`, document.getElementById(`tb-ly-${i}`).value);
            localStorage.setItem(`tb_anh_${i}`, document.getElementById(`tb-anh-${i}`).value);
        }

        // Save IELTS
        localStorage.setItem(STORAGE_KEYS.IELTS, document.getElementById('ielts').value);
        localStorage.setItem(STORAGE_KEYS.IELTS_OPTION, document.querySelector('input[name="ielts-option"]:checked').value);

    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadFromLocalStorage() {
    try {
        // Load TB Học bạ
        for (let i = 10; i <= 12; i++) {
            const tbToaN = localStorage.getItem(`tb_toan_${i}`);
            const tbLy = localStorage.getItem(`tb_ly_${i}`);
            const tbAnh = localStorage.getItem(`tb_anh_${i}`);

            if (tbToaN) document.getElementById(`tb-toan-${i}`).value = tbToaN;
            if (tbLy) document.getElementById(`tb-ly-${i}`).value = tbLy;
            if (tbAnh) document.getElementById(`tb-anh-${i}`).value = tbAnh;
        }

        // Load IELTS
        const ielts = localStorage.getItem(STORAGE_KEYS.IELTS);
        const ieltsOption = localStorage.getItem(STORAGE_KEYS.IELTS_OPTION);

        if (ielts) {
            document.getElementById('ielts').value = ielts;
        }

        if (ieltsOption) {
            document.querySelector(`input[name="ielts-option"][value="${ieltsOption}"]`).checked = true;
        }

        // Trigger toggleIELTS to update fields
        toggleIELTS({ target: document.querySelector('input[name="ielts-option"]:checked') });

    } catch (error) {
        console.error('Error loading from localStorage:', error);
    }
}

// ==================== RESET FORM ====================
function resetForm() {
    // Ask for confirmation
    if (!confirm('Bạn có chắc muốn xóa dữ liệu nhập liệu?\n(Học bạ và IELTS sẽ được giữ lại)')) {
        return;
    }

    // Clear method selection inputs
    document.getElementById('tv').value = '';
    document.getElementById('ta').value = '';
    document.getElementById('toan-dgnl').value = '';
    document.getElementById('td').value = '';
    document.getElementById('sat-score').value = '';

    // Clear TN THPT inputs
    document.getElementById('anh-tn').value = '';
    document.getElementById('toan-tn').value = '';
    document.getElementById('ly-tn').value = '';

    // Reset method to ĐGNL
    document.getElementById('dgnl-form').classList.add('active');
    document.getElementById('sat-form').classList.remove('active');
    document.querySelector('input[name="method"][value="dgnl"]').checked = true;

    // Show reset animation
    const container = document.querySelector('.container');
    container.style.opacity = '0.8';
    setTimeout(() => {
        container.style.opacity = '1';
    }, 200);

    // Recalculate
    calculateResults();
}

// ==================== INPUT VALIDATION ====================
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('blur', function() {
        // Validate and clamp values
        const min = parseFloat(this.min) || 0;
        const max = parseFloat(this.max) || Infinity;
        let value = parseFloat(this.value) || 0;

        if (value < min) {
            this.value = '';
        } else if (value > max) {
            this.value = max;
        }
    });
});

// Auto-save on any change with debounce
let saveTimeout;
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
            saveToLocalStorage();
        }, 500);
    });
});

// Auto-save IELTS option
document.querySelectorAll('input[name="ielts-option"]').forEach(radio => {
    radio.addEventListener('change', function() {
        localStorage.setItem(STORAGE_KEYS.IELTS_OPTION, this.value);
    });
});
