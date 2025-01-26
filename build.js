const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const FEATURES_DIR = path.join(__dirname, 'src', 'features');
const DIST_DIR = path.join(__dirname, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

async function buildFeature(featurePath) {
  const featureName = path.basename(featurePath);
  const jsFile = path.join(featurePath, `${featureName}.js`);
  
  if (!fs.existsSync(jsFile)) {
    console.warn(`No JS file found for feature: ${featureName}`);
    return;
  }
  
  const source = fs.readFileSync(jsFile, 'utf8');
  
  try {
    const minified = await minify(source, {
      compress: true,
      mangle: true,
      output: {
        comments: 'some'
      }
    });
    
    const outputPath = path.join(DIST_DIR, `${featureName}.js`);
    fs.writeFileSync(outputPath, minified.code);
    console.log(`✓ Built ${featureName}`);
    
  } catch (err) {
    console.error(`× Error building ${featureName}:`, err);
  }
}

async function build() {
  console.log('Building features...');
  
  const features = fs.readdirSync(FEATURES_DIR)
    .map(name => path.join(FEATURES_DIR, name))
    .filter(path => fs.statSync(path).isDirectory());
    
  await Promise.all(features.map(buildFeature));
  
  console.log('\nBuild complete! 🎉');
}

build().catch(console.error); 