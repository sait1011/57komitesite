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

/**
 * Yetki Belgesi Doğrudan İndirme Fonksiyonu
 * Sayfayı asla kapatmaz veya başka sekmeye yönlendirmez, doğrudan bilgisayara/telefona indirir.
 */
function triggerDirectDownload(e) {
    if (e && e.preventDefault) {
        e.preventDefault();
        e.stopPropagation();
    }

    try {
        if (window.PDF_BASE64) {
            const byteCharacters = atob(window.PDF_BASE64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);

            const tempLink = document.createElement('a');
            tempLink.href = blobUrl;
            tempLink.download = 'Yetki_Belgesi_Dilekce_Ornegi.pdf';
            tempLink.style.display = 'none';
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

            setTimeout(() => URL.revokeObjectURL(blobUrl), 2500);
        }
    } catch (err) {
        console.warn('Base64 blob download fallback:', err);
        const fallbackLink = document.createElement('a');
        fallbackLink.href = 'yetki-belgesi.pdf';
        fallbackLink.download = 'Yetki_Belgesi_Dilekce_Ornegi.pdf';
        fallbackLink.target = '_blank';
        fallbackLink.style.display = 'none';
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        document.body.removeChild(fallbackLink);
    }

    showToast('Yetki Belgesi indiriliyor... Adımları inceleyiniz.');

    // Kullanım kolaylığı açısından doğrudan en alttaki anlatım ve teslimat kısmına kaydır
    const targetSection = document.getElementById('belge-indir');
    if (targetSection) {
        setTimeout(() => {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const alertBox = document.getElementById('downloadInstructionAlert');
            if (alertBox) {
                alertBox.classList.add('section-highlight-active');
                setTimeout(() => alertBox.classList.remove('section-highlight-active'), 3200);
            }
        }, 100);
    }

    return false;
}

