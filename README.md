# 🖼️ n8n Data Table Image Preview

Chrome Extension สำหรับแปลง URL รูปภาพใน n8n Data Tables ให้แสดงเป็น Preview รูปภาพอัตโนมัติ

![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green)

## ✨ Features

- 🔄 แปลง Image URL เป็น Preview รูปภาพอัตโนมัติ
- 🔍 Hover เพื่อดูรูปขนาดใหญ่ขึ้น
- 🖱️ คลิกเพื่อเปิดรูปเต็มใน Tab ใหม่
- ⚡ รองรับ Dynamic Content ด้วย MutationObserver
- 🎨 รองรับหลายนามสกุลไฟล์: `.jpeg`, `.jpg`, `.gif`, `.png`, `.webp`, `.svg`
- 🌐 รองรับ Google Image URLs (`lh3.googleusercontent.com`, `streetviewpixels-pa.googleapis.com`)

---

## 📥 วิธีติดตั้ง (Developer Mode)

### ขั้นตอนที่ 1: ดาวน์โหลด Extension

```bash
# Clone จาก GitHub
git clone https://github.com/your-username/dom-manipulation-image-preview.git

# หรือดาวน์โหลดเป็น ZIP แล้วแตกไฟล์
```

### ขั้นตอนที่ 2: เปิด Chrome Extensions

1. เปิด Chrome Browser
2. พิมพ์ในแถบ Address Bar:
   ```
   chrome://extensions
   ```
3. กด **Enter**

### ขั้นตอนที่ 3: เปิด Developer Mode

1. มองหา Toggle **"Developer mode"** ที่มุมขวาบน
2. เปิด Toggle ให้เป็นสีฟ้า

![Developer Mode](https://user-images.githubusercontent.com/placeholder/developer-mode.png)

### ขั้นตอนที่ 4: โหลด Extension

1. คลิกปุ่ม **"Load unpacked"** ที่มุมซ้ายบน
2. เลือกโฟลเดอร์ที่เก็บไฟล์ Extension (โฟลเดอร์ที่มีไฟล์ `manifest.json`)
3. คลิก **"Select Folder"** (Windows) หรือ **"Open"** (Mac)

### ขั้นตอนที่ 5: เสร็จสิ้น! 🎉

Extension จะปรากฏในรายการ และพร้อมใช้งานทันที

---

## 🚀 วิธีใช้งาน

1. เปิดหน้าเว็บที่มี Data Table (เช่น n8n)
2. Extension จะทำงานอัตโนมัติ
3. URL รูปภาพในตารางจะถูกแปลงเป็น Preview รูป
4. **Hover** เพื่อดูรูปขนาดใหญ่
5. **Click** เพื่อเปิดรูปเต็มใน Tab ใหม่

---

## 🔧 การนำไปปรับใช้กับเว็บอื่น

### เปลี่ยน CSS Selector

แก้ไขไฟล์ `content.js` ที่บรรทัด:

```javascript
// เปลี่ยนจาก .ag-cell-value เป็น Selector ที่ต้องการ
const cells = document.querySelectorAll('.ag-cell-value:not(.n8n-processed)');
```

ตัวอย่าง Selector อื่นๆ:
```javascript
// สำหรับ HTML Table ปกติ
const cells = document.querySelectorAll('td:not(.n8n-processed)');

// สำหรับ Div ที่มี Class เฉพาะ
const cells = document.querySelectorAll('.your-class:not(.n8n-processed)');
```

### เพิ่มนามสกุลไฟล์ที่รองรับ

แก้ไขฟังก์ชัน `isImageUrl`:

```javascript
const isImageUrl = (url) => {
    return (url.match(/\.(jpeg|jpg|gif|png|webp|svg|bmp|ico)$/i) != null) || 
           (url.includes('lh3.googleusercontent.com')) || 
           (url.includes('streetviewpixels-pa.googleapis.com')) ||
           (url.includes('your-image-domain.com'));  // เพิ่ม Domain ที่ต้องการ
}
```

### จำกัดให้ทำงานเฉพาะบางเว็บ

แก้ไขไฟล์ `manifest.json`:

```json
"content_scripts": [
  {
    "matches": ["https://your-n8n-instance.com/*"],
    "css": ["styles.css"],
    "js": ["content.js"],
    "run_at": "document_idle"
  }
]
```

---

## 📁 โครงสร้างไฟล์

```
dom-manipulation-image-preview/
├── manifest.json     # ไฟล์กำหนดค่า Extension (Manifest V3)
├── content.js        # Script หลักที่แปลง URL เป็นรูป
├── styles.css        # CSS สำหรับจัดรูปแบบ Preview
├── README.md         # ไฟล์คู่มือนี้
└── LICENSE           # สัญญาอนุญาต
```

---

## ⚙️ Manifest V3 Permissions

| Permission | คำอธิบาย |
|------------|----------|
| `activeTab` | อนุญาตให้ทำงานบน Tab ที่เปิดอยู่ |

---

## 🐛 การ Debug

### วิธีดู Console Log

1. ไปที่หน้าเว็บที่ใช้ Extension
2. กด `F12` หรือ `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
3. ไปที่ Tab **Console**
4. ดู Log และ Error ที่เกิดขึ้น

### วิธี Reload Extension หลังแก้ไข

1. ไปที่ `chrome://extensions`
2. หา Extension ของเรา
3. คลิกไอคอน **🔄 Reload** (วงกลมลูกศร)

---

## 🎨 ปรับแต่งหน้าตา

แก้ไขไฟล์ `styles.css`:

```css
/* เปลี่ยนขนาด Preview ปกติ */
.n8n-img-preview {
    height: 50px;  /* ปรับความสูง */
}

/* เปลี่ยนขนาดตอน Hover */
.n8n-img-preview:hover {
    max-width: 500px;  /* ปรับขนาด Popup */
    max-height: 500px;
}
```

---

## 📝 License

MIT License - ดูรายละเอียดใน [LICENSE](LICENSE)

---

## 🤝 Contributing

ยินดีรับ Pull Requests และ Issues ทุกรูปแบบ!

1. Fork โปรเจค
2. สร้าง Branch ใหม่ (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add amazing feature'`)
4. Push ไป Branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request

---

Made with ❤️ for n8n community
