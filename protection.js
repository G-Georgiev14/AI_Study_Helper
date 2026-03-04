// JavaScript Obfuscation Tool
// Този инструмент скрива сложността на кода

function obfuscateCode(code) {
    // Basic obfuscation techniques
    return code
        .replace(/console\.log/g, 'window["\\x63\\x6f\\x6e\\x73\\x6f\\x6c\\x65"]["\\x6c\\x6f\\x67"]')
        .replace(/alert/g, 'window["\\x61\\x6c\\x65\\x72\\x74"]')
        .replace(/function/g, 'window["\\x66\\x75\\x6e\\x63\\x74\\x69\\x6f\\x6e"]')
        .replace(/var/g, 'window["\\x76\\x61\\x72"]')
        .replace(/let/g, 'window["\\x6c\\x65\\x74"]');
}

// Watermark function
function addWatermark() {
    const watermark = '© AI Study Helper 2026';
    console.log('%c' + watermark, 'color: #3b82f6; font-size: 16px; font-weight: bold;');
}

// Protection against direct copying
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// Add watermark on load
window.addEventListener('load', addWatermark);
