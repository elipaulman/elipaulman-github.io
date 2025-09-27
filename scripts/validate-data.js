#!/usr/bin/env node

/**
 * JSON Schema Validation for Portfolio Data Files
 * Validates the structure and content of JSON data files
 */

const fs = require('fs');
const path = require('path');

// Define schemas for each data file
const schemas = {
  'personal.json': {
    type: 'object',
    required: ['name', 'shortName', 'email', 'phone', 'schoolEmail', 'linkedIn', 'github', 'about'],
    properties: {
      name: { type: 'string' },
      shortName: { type: 'string' },
      email: { type: 'string', format: 'email' },
      phone: { type: 'string' },
      schoolEmail: { type: 'string', format: 'email' },
      linkedIn: { type: 'string', pattern: '^https://' },
      github: { type: 'string', pattern: '^https://' },
      about: {
        type: 'object',
        required: ['short', 'detailed'],
        properties: {
          short: { type: 'string' },
          detailed: { type: 'string' }
        }
      }
    }
  },
  'skills.json': {
    type: 'object',
    required: ['programmingLanguages', 'frameworks'],
    properties: {
      programmingLanguages: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'icon'],
          properties: {
            name: { type: 'string' },
            icon: { type: 'string' }
          }
        }
      },
      frameworks: {
        type: 'array',
        items: {
          type: 'object',
          required: ['name', 'icon'],
          properties: {
            name: { type: 'string' },
            icon: { type: 'string' }
          }
        }
      }
    }
  },
  'experience.json': {
    type: 'array',
    items: {
      type: 'object',
      required: ['title', 'company', 'date', 'logo', 'logoAlt', 'responsibilities'],
      properties: {
        title: { type: 'string' },
        company: { type: 'string' },
        date: { type: 'string' },
        logo: { type: 'string' },
        logoAlt: { type: 'string' },
        responsibilities: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    }
  },
  'projects.json': {
    type: 'array',
    items: {
      type: 'object',
      required: ['title', 'description', 'techUsed', 'link', 'linkText'],
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        techUsed: { type: 'string' },
        link: { type: 'string' },
        linkText: { type: 'string' }
      }
    }
  },
  'education.json': {
    type: 'array',
    items: {
      type: 'object',
      required: ['institution', 'degree', 'image', 'imageAlt', 'details'],
      properties: {
        institution: { type: 'string' },
        degree: { type: 'string' },
        image: { type: 'string' },
        imageAlt: { type: 'string' },
        details: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    }
  },
  'faq.json': {
    type: 'array',
    items: {
      type: 'object',
      required: ['id', 'question', 'answer', 'expanded'],
      properties: {
        id: { type: 'string' },
        question: { type: 'string' },
        answer: { type: ['string', 'object'] },
        expanded: { type: 'boolean' }
      }
    }
  }
};

/**
 * Simple JSON validation function
 */
function validateJson(data, schema, filename) {
  const errors = [];

  // Check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }

  // Validate structure based on type
  if (schema.type === 'object' && schema.properties) {
    for (const [key, value] of Object.entries(data)) {
      if (key in schema.properties) {
        const fieldSchema = schema.properties[key];
        if (fieldSchema.type === 'string' && typeof value !== 'string') {
          errors.push(`Field ${key} should be a string`);
        }
        if (fieldSchema.type === 'array' && !Array.isArray(value)) {
          errors.push(`Field ${key} should be an array`);
        }
        if (fieldSchema.format === 'email' && value && !isValidEmail(value)) {
          errors.push(`Field ${key} should be a valid email address`);
        }
        if (fieldSchema.pattern && value && !new RegExp(fieldSchema.pattern).test(value)) {
          errors.push(`Field ${key} should match pattern: ${fieldSchema.pattern}`);
        }
      }
    }
  }

  // Validate array items
  if (schema.type === 'array' && schema.items) {
    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        const itemErrors = validateJson(item, schema.items, `${filename}[${index}]`);
        errors.push(...itemErrors.map(error => `  ${error}`));
      });
    }
  }

  return errors;
}

/**
 * Simple email validation
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Main validation function
 */
function validateDataFiles() {
  const dataDir = path.join(__dirname, '..', 'data');
  let hasErrors = false;

  console.log('🔍 Validating JSON data files...\n');

  // Check if data directory exists
  if (!fs.existsSync(dataDir)) {
    console.error('❌ Data directory not found:', dataDir);
    process.exit(1);
  }

  // Validate each file
  for (const [filename, schema] of Object.entries(schemas)) {
    const filepath = path.join(dataDir, filename);

    if (!fs.existsSync(filepath)) {
      console.warn(`⚠️  File not found: ${filename}`);
      continue;
    }

    try {
      const content = fs.readFileSync(filepath, 'utf8');
      const data = JSON.parse(content);

      console.log(`📄 Validating ${filename}...`);
      const errors = validateJson(data, schema, filename);

      if (errors.length === 0) {
        console.log(`✅ ${filename} is valid`);
      } else {
        console.error(`❌ ${filename} has errors:`);
        errors.forEach(error => console.error(`   ${error}`));
        hasErrors = true;
      }
    } catch (error) {
      console.error(`❌ Failed to parse ${filename}:`, error.message);
      hasErrors = true;
    }
    console.log('');
  }

  if (hasErrors) {
    console.error('❌ Validation failed!');
    process.exit(1);
  } else {
    console.log('✅ All data files are valid!');
    process.exit(0);
  }
}

// Run validation if called directly
if (require.main === module) {
  validateDataFiles();
}

module.exports = { validateDataFiles, validateJson };
