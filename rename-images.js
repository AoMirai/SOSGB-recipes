import { readdir, rename, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const recipesDir = './public/pictures';
const recipesFile = './src/assets/recipes.js';

async function renameImagesToLowercase() {
  try {
    // Renommer les fichiers JPG qui commencent par une majuscule
    const files = await readdir(recipesDir);
    const jpgFiles = files.filter(file => file.endsWith('.jpg') && file[0] === file[0].toUpperCase());
    
    console.log(`Found ${jpgFiles.length} JPG files to rename...`);
    
    for (const file of jpgFiles) {
      const newName = file.toLowerCase();
      const oldPath = join(recipesDir, file);
      const newPath = join(recipesDir, newName);
      await rename(oldPath, newPath);
      console.log(`✓ Renamed: ${file} -> ${newName}`);
    }
    
    // Mettre à jour le fichier recipes.js
    console.log('\nUpdating recipes.js...');
    let content = await readFile(recipesFile, 'utf-8');
    
    // Remplacer tous les noms d'images par leur version en minuscules
    jpgFiles.forEach(file => {
      const lowerFile = file.toLowerCase();
      const regex = new RegExp(`"${file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
      content = content.replace(regex, `"${lowerFile}"`);
    });
    
    await writeFile(recipesFile, content, 'utf-8');
    console.log('✓ recipes.js updated');
    
    console.log('\n✓ All files renamed and recipes.js updated successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

renameImagesToLowercase();
