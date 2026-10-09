import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Folder direktori gambar (sesuaikan jika lokasi aset kamu berbeda)
const targetDir = './src/assets';

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

async function convertImagesToWebp() {
  if (!fs.existsSync(targetDir)) {
    console.error(`Folder ${targetDir} tidak ditemukan!`);
    return;
  }

  const allFiles = getAllFiles(targetDir);
  const imageFiles = allFiles.filter((file) =>
    /\.(jpg|jpeg|png)$/i.test(file)
  );

  console.log(`Ditemukan ${imageFiles.length} file gambar untuk dikonversi...\n`);

  for (const filePath of imageFiles) {
    const ext = path.extname(filePath);
    const outputPath = filePath.replace(new RegExp(`${ext}$`), '.webp');

    try {
      const originalStats = fs.statSync(filePath);
      const originalSize = (originalStats.size / 1024).toFixed(2);

      // Konversi ke format WebP
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024).toFixed(2);

      // Hapus gambar asli setelah konversi berhasil
      fs.unlinkSync(filePath);

      console.log(`[BERHASIL] ${path.basename(filePath)} -> ${path.basename(outputPath)}`);
      console.log(`  Ukuran: ${originalSize} KB -> ${newSize} KB\n`);
    } catch (err) {
      console.error(`[GAGAL] Gagal mengonversi ${filePath}:`, err.message);
    }
  }

  console.log('Konversi selesai!');
}

convertImagesToWebp();