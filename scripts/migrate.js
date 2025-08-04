// scripts/migrate.mjs
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MigrationTool {
  constructor() {
    this.rootPath = path.join(__dirname, '..');
    this.srcPath = path.join(this.rootPath, 'src');
    this.migrations = [];
    this.importMappings = new Map();
  }

  // Create backup branch
  async createBackup() {
    console.log('💾 Creating backup...');
    try {
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const branchName = `backup-pre-migration-${timestamp}`;
      
      execSync('git add .', { cwd: this.rootPath });
      execSync('git commit -m "Pre-migration backup" || true', { cwd: this.rootPath });
      execSync(`git branch ${branchName}`, { cwd: this.rootPath });
      
      console.log(`✅ Created backup branch: ${branchName}`);
    } catch (error) {
      console.log('⚠️  Could not create git backup:', error.message);
    }
  }

  // File migration mapping
  getFileMigrations() {
    return [
      // Components
      { from: 'component/Icon.tsx', to: 'components/common/Icon.tsx' },
      { from: 'component/Sidebar.tsx', to: 'components/layout/Sidebar.tsx' },
      { from: 'component/Navigation.tsx', to: 'components/layout/Navigation.tsx' },
      { from: 'component/MusicPlayer.tsx', to: 'components/player/MusicPlayer.tsx' },
      
      // Pages - Home
      { from: 'page/Home.tsx', to: 'pages/home/HomePage.tsx' },
      { from: 'page/Home', to: 'pages/home', isDirectory: true },
      
      // Pages - Auth  
      { from: 'page/auth/login.tsx', to: 'pages/auth/LoginPage.tsx' },
      { from: 'page/auth/signup.tsx', to: 'pages/auth/SignupPage.tsx' },
      
      // Pages - Music
      { from: 'page/Playlist.tsx', to: 'pages/music/PlaylistPage.tsx' },
      { from: 'page/InfoSong.tsx', to: 'pages/music/SongPage.tsx' },
      { from: 'page/Artist.tsx', to: 'pages/music/ArtistPage.tsx' },
      
      // Pages - Other
      { from: 'page/Video.tsx', to: 'pages/video/VideoPage.tsx' },
      { from: 'page/Search.tsx', to: 'pages/search/SearchPage.tsx' },
      
      // Hooks
      { from: 'Hook', to: 'hooks', isDirectory: true },
    ];
  }

  // Import mappings
  getImportMappings() {
    return new Map([
      // Components
      ['../component/Icon', '@/components/common/Icon'],
      ['../../component/Icon', '@/components/common/Icon'],
      ['../../../component/Icon', '@/components/common/Icon'],
      ['../component/Sidebar', '@/components/layout/Sidebar'],
      ['../component/Navigation', '@/components/layout/Navigation'],
      ['../component/MusicPlayer', '@/components/player/MusicPlayer'],
      
      // Pages
      ['./Home', './home/HomePage'],
      ['../page/Home', '@/pages/home/HomePage'],
      ['./auth/login', './auth/LoginPage'],
      ['./auth/signup', './auth/SignupPage'],
      ['../page/Playlist', '@/pages/music/PlaylistPage'],
      ['../page/InfoSong', '@/pages/music/SongPage'],
      ['../page/Artist', '@/pages/music/ArtistPage'],
      ['../page/Video', '@/pages/video/VideoPage'],
      ['../page/Search', '@/pages/search/SearchPage'],
      
      // Hooks
      ['../Hook/useProvidePlayer', '@/hooks/usePlayer'],
      ['../../Hook/useProvidePlayer', '@/hooks/usePlayer'],
      ['../Hook/', '@/hooks/'],
      
      // Other services
      ['../services/', '@/services/'],
      ['../../services/', '@/services/'],
      ['../utils/', '@/utils/'],
      ['../../utils/', '@/utils/'],
      ['../types/', '@/types/'],
      ['../../types/', '@/types/'],
      ['../contexts/', '@/contexts/'],
      ['../../contexts/', '@/contexts/'],
    ]);
  }

  // Create directories
  async createDirectories() {
    const directories = [
      'components/ui',
      'components/common',
      'components/layout', 
      'components/player',
      'components/cards',
      'pages/home',
      'pages/auth',
      'pages/music',
      'pages/video', 
      'pages/search',
      'pages/error',
      'hooks',
      'config',
      'styles'
    ];

    console.log('📁 Creating directory structure...');
    
    for (const dir of directories) {
      const fullPath = path.join(this.srcPath, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`✅ Created: ${dir}/`);
      }
    }
  }

  // Move files
  async moveFiles() {
    console.log('\n📦 Moving files...');
    const migrations = this.getFileMigrations();
    
    for (const migration of migrations) {
      const fromPath = path.join(this.srcPath, migration.from);
      const toPath = path.join(this.srcPath, migration.to);
      
      if (!fs.existsSync(fromPath)) {
        console.log(`⚠️  Source not found: ${migration.from}`);
        continue;
      }

      // Create target directory
      const targetDir = path.dirname(toPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      try {
        if (migration.isDirectory) {
          await this.moveDirectory(fromPath, toPath);
        } else {
          await this.moveFile(fromPath, toPath);
        }
        console.log(`✅ Moved: ${migration.from} → ${migration.to}`);
      } catch (error) {
        console.log(`❌ Error moving ${migration.from}: ${error.message}`);
      }
    }
  }

  async moveFile(from, to) {
    if (fs.existsSync(to)) {
      console.log(`⚠️  Target exists, skipping: ${to}`);
      return;
    }
    fs.renameSync(from, to);
  }

  async moveDirectory(from, to) {
    if (fs.existsSync(to)) {
      console.log(`⚠️  Target directory exists, skipping: ${to}`);
      return;
    }
    fs.renameSync(from, to);
  }

  // Fix imports
  async fixImports() {
    console.log('\n🔧 Fixing imports...');
    const mappings = this.getImportMappings();
    
    await this.walkDirectory(this.srcPath, async (filePath) => {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        await this.updateImportsInFile(filePath, mappings);
      }
    });
  }

  async updateImportsInFile(filePath, mappings) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let hasChanges = false;

      for (const [oldPath, newPath] of mappings) {
        const patterns = [
          new RegExp(`from\\s+['"]${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g'),
          new RegExp(`import\\s*\\(\\s*['"]${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]\\s*\\)`, 'g')
        ];

        patterns.forEach(pattern => {
          if (pattern.test(content)) {
            content = content.replace(pattern, (match) => {
              return match.replace(oldPath, newPath);
            });
            hasChanges = true;
          }
        });
      }

      // Rename specific hooks
      if (content.includes('useProvidePlayer')) {
        content = content.replace(/useProvidePlayer/g, 'usePlayer');
        hasChanges = true;
      }

      if (hasChanges) {
        fs.writeFileSync(filePath, content);
        console.log(`✅ Updated imports in: ${path.relative(this.srcPath, filePath)}`);
      }
    } catch (error) {
      console.log(`❌ Error updating ${filePath}: ${error.message}`);
    }
  }

  async walkDirectory(dir, callback) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        await this.walkDirectory(filePath, callback);
      } else {
        await callback(filePath);
      }
    }
  }

  // Create index files
  async createIndexFiles() {
    console.log('\n📝 Creating index files...');

    const indexFiles = [
      {
        path: 'components/index.ts',
        content: `// Common exports
export { default as Icon } from './common/Icon'

// Layout exports
export { default as Sidebar } from './layout/Sidebar'
export { default as Navigation } from './layout/Navigation'

// Player exports
export { default as MusicPlayer } from './player/MusicPlayer'

// UI exports
export * from './ui'
`
      },
      {
        path: 'pages/index.ts', 
        content: `// Home pages
export { default as HomePage } from './home/HomePage'

// Auth pages
export { default as LoginPage } from './auth/LoginPage'
export { default as SignupPage } from './auth/SignupPage'

// Music pages
export { default as PlaylistPage } from './music/PlaylistPage'
export { default as SongPage } from './music/SongPage'
export { default as ArtistPage } from './music/ArtistPage'

// Other pages
export { default as VideoPage } from './video/VideoPage'
export { default as SearchPage } from './search/SearchPage'
`
      },
      {
        path: 'hooks/index.ts',
        content: `export { usePlayer } from './usePlayer'
export { useAuth } from './useAuth'
export { useLocalStorage } from './useLocalStorage'
export { useDebounce } from './useDebounce'
`
      }
    ];

    for (const indexFile of indexFiles) {
      const fullPath = path.join(this.srcPath, indexFile.path);
      const dir = path.dirname(fullPath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(fullPath, indexFile.content);
      console.log(`✅ Created: ${indexFile.path}`);
    }
  }

  // Update vite config
  async updateViteConfig() {
    console.log('\n⚙️  Updating vite.config.ts...');
    
    const viteConfigPath = path.join(this.rootPath, 'vite.config.ts');
    
    if (!fs.existsSync(viteConfigPath)) {
      console.log('❌ vite.config.ts not found');
      return;
    }

    let content = fs.readFileSync(viteConfigPath, 'utf8');
    
    // Add path import
    if (!content.includes('import path from')) {
      content = `import path from 'path'\n${content}`;
    }

    // Add resolve alias
    const aliasConfig = `    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/pages': path.resolve(__dirname, './src/pages'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/services': path.resolve(__dirname, './src/services'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/types': path.resolve(__dirname, './src/types'),
        '@/contexts': path.resolve(__dirname, './src/contexts'),
        '@/config': path.resolve(__dirname, './src/config'),
      }
    },`;

    if (!content.includes('resolve:')) {
      content = content.replace(
        /plugins:\s*\[[^\]]*\],?/,
        `$&\n${aliasConfig}`
      );
    }

    fs.writeFileSync(viteConfigPath, content);
    console.log('✅ Updated vite.config.ts with path aliases');
  }

  // Update tsconfig
  async updateTsConfig() {
    console.log('\n📄 Updating tsconfig.json...');
    
    const tsconfigPath = path.join(this.rootPath, 'tsconfig.json');
    
    if (!fs.existsSync(tsconfigPath)) {
      console.log('❌ tsconfig.json not found');
      return;
    }

    try {
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
      
      if (!tsconfig.compilerOptions) {
        tsconfig.compilerOptions = {};
      }
      
      tsconfig.compilerOptions.baseUrl = '.';
      tsconfig.compilerOptions.paths = {
        '@/*': ['src/*'],
        '@/components/*': ['src/components/*'],
        '@/pages/*': ['src/pages/*'],
        '@/hooks/*': ['src/hooks/*'],
        '@/services/*': ['src/services/*'],
        '@/utils/*': ['src/utils/*'],
        '@/types/*': ['src/types/*'],
        '@/contexts/*': ['src/contexts/*'],
        '@/config/*': ['src/config/*'],
      };

      fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
      console.log('✅ Updated tsconfig.json with path mapping');
    } catch (error) {
      console.log(`❌ Error updating tsconfig.json: ${error.message}`);
    }
  }

  // Cleanup empty directories
  async cleanup() {
    console.log('\n🧹 Cleaning up...');
    
    const emptyDirs = ['component', 'page', 'Hook'];
    
    for (const dir of emptyDirs) {
      const dirPath = path.join(this.srcPath, dir);
      if (fs.existsSync(dirPath)) {
        try {
          const files = fs.readdirSync(dirPath);
          if (files.length === 0) {
            fs.rmdirSync(dirPath);
            console.log(`✅ Removed empty directory: ${dir}/`);
          } else {
            console.log(`⚠️  Directory not empty, keeping: ${dir}/ (${files.length} files)`);
          }
        } catch (error) {
          console.log(`❌ Could not remove ${dir}: ${error.message}`);
        }
      }
    }
  }

  // Main migration runner
  async run() {
    console.log('🚀 Starting Music App Migration...\n');
    
    try {
      await this.createBackup();
      await this.createDirectories();
      await this.moveFiles();
      await this.fixImports();
      await this.createIndexFiles();
      await this.updateViteConfig();
      await this.updateTsConfig();
      await this.cleanup();
      
      console.log('\n🎉 Migration completed successfully!');
      console.log('\nNext steps:');
      console.log('1. npm run dev (test the app)');
      console.log('2. Fix any remaining import issues manually');
      console.log('3. Create UI components');
      console.log('4. Update any hardcoded paths');
      
    } catch (error) {
      console.error('❌ Migration failed:', error);
      console.log('\n🔄 You can rollback using the backup branch created');
    }
  }
}

// Run migration
const migrator = new MigrationTool();
migrator.run();