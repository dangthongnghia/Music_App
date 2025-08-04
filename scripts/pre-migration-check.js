// scripts/pre-migration-check.mjs
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function checkProject() {
  console.log('🔍 Pre-migration checklist...\n');
  
  const checks = [
    {
      name: 'Git status clean',
      check: () => {
        try {
          const status = execSync('git status --porcelain', { encoding: 'utf8' });
          return status.trim() === '';
        } catch {
          return false;
        }
      },
      fix: 'Run: git add . && git commit -m "Pre-migration commit"'
    },
    {
      name: 'Source directory exists',
      check: () => fs.existsSync('src'),
      fix: 'Create src directory'
    },
    {
      name: 'Package.json exists',
      check: () => fs.existsSync('package.json'),
      fix: 'Run: npm init'
    },
    {
      name: 'Node modules installed',
      check: () => fs.existsSync('node_modules'),
      fix: 'Run: npm install'
    },
    {
      name: 'Backup branch created',
      check: () => {
        try {
          const branches = execSync('git branch', { encoding: 'utf8' });
          return branches.includes('backup-');
        } catch {
          return false;
        }
      },
      fix: 'Will create backup branch during migration'
    }
  ];

  let allPassed = true;
  
  checks.forEach(({ name, check, fix }) => {
    const passed = check();
    console.log(`${passed ? '✅' : '❌'} ${name}`);
    if (!passed) {
      console.log(`   Fix: ${fix}`);
      if (name !== 'Backup branch created') {
        allPassed = false;
      }
    }
  });

  if (allPassed) {
    console.log('\n🎉 Ready for migration!');
    console.log('Run: npm run migrate');
  } else {
    console.log('\n⚠️  Please fix issues above before migration');
  }
}

checkProject();