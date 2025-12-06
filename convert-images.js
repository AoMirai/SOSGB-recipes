import { readdir } from 'fs/promises';
import { join } from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const recipesDir = './public/pictures/recipes';

async function convertAvifToJpg() {
  try {
    // Vérifier si ffmpeg est installé
    try {
      await execAsync('ffmpeg -version');
    } catch (error) {
      console.error('FFmpeg n\'est pas installé. Installez-le avec: winget install FFmpeg');
      return;
    }

    const files = await readdir(recipesDir);
    const avifFiles = files.filter(file => file.endsWith('.avif'));
    
    console.log(`Found ${avifFiles.length} AVIF files to convert...`);
    
    let converted = 0;
    let failed = 0;
    
    for (const file of avifFiles) {
      const inputPath = join(recipesDir, file);
      const outputPath = join(recipesDir, file.replace('.avif', '.jpg'));
      
      try {
        await execAsync(`ffmpeg -i "${inputPath}" -y "${outputPath}"`);
        console.log(`✓ Converted: ${file}`);
        converted++;
      } catch (error) {
        console.error(`✗ Failed: ${file}`);
        failed++;
      }
    }
    
    console.log(`\n✓ Conversion complete: ${converted} succeeded, ${failed} failed`);
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

convertAvifToJpg();
