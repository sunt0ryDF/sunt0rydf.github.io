const fs = require('fs');
const path = require('path');

const showcaseDir = path.join(__dirname, '../../Images/showcase/MAY2025');
const outputFile = path.join(__dirname, '../public/showcase/images.json');

// Read the showcase directory
fs.readdir(showcaseDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Filter for image files and create image objects
  const images = files
    .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
    .map(file => {
      // Extract category from filename or use default
      const category = file.split('_')[0].toLowerCase() || 'all';
      
      return {
        src: `/showcase/MAY2025/${file}`,
        alt: file.split('.')[0].replace(/_/g, ' '),
        category
      };
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