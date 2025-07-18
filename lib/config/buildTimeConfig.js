// Build-time script to generate client-side Firebase config from YAML
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

function generateClientConfig() {
  try {
    // Path to the google-service.yaml file
    const yamlPath = path.join(process.cwd(), 'google-service.yaml');
    
    console.log('🔧 Generating client-side Firebase config from:', yamlPath);
    
    // Read and parse the YAML file
    const fileContents = fs.readFileSync(yamlPath, 'utf8');
    const config = yaml.load(fileContents);
    
    // Generate TypeScript/JavaScript config file
    const configContent = `// Auto-generated from google-service.yaml - DO NOT EDIT MANUALLY
export const firebaseConfig = ${JSON.stringify(config.firebase, null, 2)};

export default firebaseConfig;
`;
    
    // Write the config file
    const outputPath = path.join(process.cwd(), 'lib', 'config', 'firebaseConfig.ts');
    fs.writeFileSync(outputPath, configContent);
    
    console.log('✅ Client-side Firebase config generated at:', outputPath);
    
  } catch (error) {
    console.error('❌ Error generating client-side Firebase config:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  generateClientConfig();
}

module.exports = { generateClientConfig }; 