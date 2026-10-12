/**
 * İTO 57. Komite Seçimleri - Beyaz Liste
 * Sayfa Etkileşim ve Dinamik İşlevler
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobil Menü Aç/Kapat
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileDropdown = document.getElementById('mobileDropdown');

    if (mobileMenuBtn && mobileDropdown) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDropdown.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileDropdown.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Menü linklerine tıklanınca dropdown menüyü kapat
        const mobileLinks = mobileDropdown.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDropdown.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 2. ESC Tuşu ile Modalı Kapatma
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePosterModal();
        }
    });
});

/**
 * Afiş Önizleme Modalını Aç
 */
function openPosterModal() {
    const modal = document.getElementById('posterModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Afiş Önizleme Modalını Kapat
 */
function closePosterModal() {
    const modal = document.getElementById('posterModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Adresi Panoya Kopyala ve Toast Bildirimi Göster
 */
function copyAddress() {
    const addressElement = document.getElementById('addressText');
    if (!addressElement) return;

    const addressText = addressElement.innerText.trim();

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(addressText)
            .then(() => showToast('Adres panoya kopyalandı!'))
            .catch(() => fallbackCopy(addressText));
    } else {
        fallbackCopy(addressText);
    }
}

/**
 * Panoya Kopyalama Fallback Yöntemi
 */
function fallbackCopy(text) {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = text;
    tempTextArea.style.position = 'fixed';
    tempTextArea.style.opacity = '0';
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
        document.execCommand('copy');
        showToast('Adres panoya kopyalandı!');
    } catch (err) {
        showToast('Lütfen adresi manuel olarak kopyalayınız.');
    }
    document.body.removeChild(tempTextArea);
}

/**
 * Toast Bildirimi Göster
 */
let toastTimeout;
function showToast(message) {
    const toast = document.getElementById('toastNotice');
    if (!toast) return;

    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${message}`;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}
