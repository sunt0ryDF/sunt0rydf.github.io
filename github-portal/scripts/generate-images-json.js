const fs = require('fs');
const path = require('path');

const showcaseDir = path.join(__dirname, '../../Images/showcase/MAY2025');
const outputFile = path.join(__dirname, '../public/showcase/images.json');

// Read the showcase directory
fs.readdir(showcaseDir, (err, folders) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const images = [];

  // Process each folder (Collection Log, Achievements, Photos)
  folders.forEach(folder => {
    const folderPath = path.join(showcaseDir, folder);
    
    // Skip if not a directory
    if (!fs.statSync(folderPath).isDirectory()) return;

    // Read files in the folder
    const files = fs.readdirSync(folderPath);
    
    // Add each image to the array with its category
    files.forEach(file => {
      if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
        images.push({
          src: `/showcase/MAY2025/${folder}/${file}`,
          alt: file.split('.')[0].replace(/_/g, ' '),
          category: folder.toLowerCase()
        });
      }
    });
  });

  // Create the output directory if it doesn't exist
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the JSON file
  fs.writeFile(outputFile, JSON.stringify(images, null, 2), err => {
    if (err) {
      console.error('Error writing JSON file:', err);
      return;
    }
    console.log('Successfully generated images.json');
  });
}); 