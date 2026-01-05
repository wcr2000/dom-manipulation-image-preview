// Regex สำหรับเช็คว่าเป็น URL รูปภาพ หรือ Google Image URLs (ตาม HTML ของคุณ)
const isImageUrl = (url) => {
    return (url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i) != null) || 
           (url.includes('lh3.googleusercontent.com')) || 
           (url.includes('streetviewpixels-pa.googleapis.com'));
}

function processGridCells() {
    // 1. หา Cell ทั้งหมดใน AG Grid (class .ag-cell-value)
    // ใส่ :not(.n8n-processed) เพื่อไม่ให้ทำซ้ำกับอันที่ทำไปแล้ว
    const cells = document.querySelectorAll('.ag-cell-value:not(.n8n-processed)');

    cells.forEach(cell => {
        const textContent = cell.innerText.trim();

        // 2. ถ้าข้อความเป็น URL รูปภาพ
        if (textContent && isImageUrl(textContent)) {
            // สร้าง Element รูปภาพ
            const imgContainer = document.createElement('div');
            imgContainer.className = 'n8n-img-preview-container';
            
            const img = document.createElement('img');
            img.src = textContent;
            img.className = 'n8n-img-preview';
            
            // กรณีรูปโหลดไม่ได้ (Broken link) ให้กลับไปเป็น Link เดิม
            img.onerror = () => {
                cell.classList.remove('n8n-processed'); // Revert logic if needed or just leave as text
                cell.innerHTML = `<a href="${textContent}" target="_blank">${textContent}</a>`;
            };

            // คลิกเพื่อเปิดรูปเต็มใน Tab ใหม่
            img.onclick = (e) => {
                e.stopPropagation(); // กันไม่ให้ไป trigger row selection ของ n8n
                window.open(textContent, '_blank');
            };

            imgContainer.appendChild(img);

            // 3. เคลียร์ Text เดิมแล้วใส่รูปเข้าไปแทน
            cell.innerHTML = ''; 
            cell.appendChild(imgContainer);
        }

        // 4. แปะป้ายว่า "ตรวจแล้ว" (.n8n-processed) จะได้ไม่ Loop ซ้ำให้เปลือง CPU
        cell.classList.add('n8n-processed');
    });
}

// --- ส่วน Observer (คอยเฝ้ามองการเปลี่ยนแปลง DOM) ---

// ใช้ Debounce นิดหน่อยเพื่อไม่ให้ทำงานถี่ยิบเกินไปตอน scroll เร็วๆ
let timeout;
const observer = new MutationObserver((mutations) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
        processGridCells();
    }, 100); // รอ 100ms หลังจาก DOM หยุดขยับค่อยทำ
});

// เริ่มเฝ้าดูที่ body (หรือจะเจาะจงไปที่ .ag-root-wrapper ก็ได้ถ้าอยาก optimize สุดๆ)
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// รันครั้งแรกเผื่อหน้าเว็บโหลดเสร็จแล้ว
processGridCells();