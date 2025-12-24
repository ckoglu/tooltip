// Kopyalama fonksiyonları
function copyUrl() {
    const urlInput = document.getElementById('jsUrlInput');
    const copyIcon = document.querySelector('[data-ust-title="kopyala"][onclick="copyUrl()"]');
    
    urlInput.select();
    
    navigator.clipboard.writeText(urlInput.value).then(() => {
        // Başarı animasyonu
        copyIcon.classList.add('copy-success', 'copied');
        
        setTimeout(() => {
            copyIcon.classList.remove('copy-success');
        }, 400);
        
        setTimeout(() => {
            copyIcon.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
}

function selectAllCode(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

// data-alt-title kopyala
function copyCodeAlt() {
    const textToCopy = 'data-alt-title=""';
    const copyIcon = document.querySelector('[data-ust-title="kopyala"][onclick="copyCodeAlt()"]');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Başarı animasyonu
        copyIcon.classList.add('copy-success', 'copied');
        
        setTimeout(() => {
            copyIcon.classList.remove('copy-success');
        }, 400);
        
        setTimeout(() => {
            copyIcon.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
}

// data-ust-title kopyala
function copyCodeUst() {
    const textToCopy = 'data-ust-title=""';
    const copyIcon = document.querySelector('[data-ust-title="kopyala"][onclick="copyCodeUst()"]');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Başarı animasyonu
        copyIcon.classList.add('copy-success', 'copied');
        
        setTimeout(() => {
            copyIcon.classList.remove('copy-success');
        }, 400);
        
        setTimeout(() => {
            copyIcon.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
}

// data-sag-title kopyala
function copyCodeSag() {
    const textToCopy = 'data-sag-title=""';
    const copyIcon = document.querySelector('[data-ust-title="kopyala"][onclick="copyCodeSag()"]');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Başarı animasyonu
        copyIcon.classList.add('copy-success', 'copied');
        
        setTimeout(() => {
            copyIcon.classList.remove('copy-success');
        }, 400);
        
        setTimeout(() => {
            copyIcon.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
}

// data-sol-title kopyala
function copyCodeSol() {
    const textToCopy = 'data-sol-title=""';
    const copyIcon = document.querySelector('[data-ust-title="kopyala"][onclick="copyCodeSol()"]');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Başarı animasyonu
        copyIcon.classList.add('copy-success', 'copied');
        
        setTimeout(() => {
            copyIcon.classList.remove('copy-success');
        }, 400);
        
        setTimeout(() => {
            copyIcon.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Kopyalama hatası:', err);
    });
}

// Event listener'lar
document.addEventListener('DOMContentLoaded', function() {

    // URL input event listener'ları
    const urlInput = document.getElementById('jsUrlInput');
    if (urlInput) {
        urlInput.addEventListener('click', function() {
            this.select();
        });
        
        urlInput.addEventListener('dblclick', copyUrl);
    }
    
    // Code block event listener'ları
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach((block) => {
        block.addEventListener('click', function() {
            selectAllCode(this);
        });
    });
    
    // Kopyalama ikonlarına tıklanınca tooltip göstermeyi engelle
    const copyIcons = document.querySelectorAll('[data-ust-title="kopyala"]');
    copyIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function(e) {
            e.stopPropagation();
        });
        icon.addEventListener('mouseleave', function(e) {
            e.stopPropagation();
        });
    });
});
