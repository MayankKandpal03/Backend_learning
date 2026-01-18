# Level 01: Backend Setup

## 1. Initialize the Project

### 1.1 Initialize npm and Git

```bash
npm init -y
git init
```

### 1.2 Configure Git

Set username, email, and remote repository:

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
git remote add origin <remote-url>
```

---

## 2. Create Folder Structure

Create root directories and essential files:

```bash
mkdir src public
touch .gitignore .env
```

Create internal project structure:

```bash
mkdir src/controllers src/db src/middlewares src/models src/routes src/services src/utils
touch src/app.js src/constants.js src/index.js
```

---

## 3. Update `package.json`

### 3.1 Enable ES Modules

```json
{
  "type": "module"
}
```

### 3.2 Add Development Script

```json
"scripts": {
  "dev": "nodemon src/index.js"
}
```

Ensure Git remote and identity are configured correctly.

---

## 4. Code Formatting with Prettier

Install Prettier:

```bash
npm install --save-dev prettier
```

Create `.prettierrc`:

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

Create `.prettierignore`:

```
node_modules
dist
build
.env
```

---

## 5. Git Ignore Configuration

Add to `.gitignore`:

```
node_modules/
.env
.env.local
.env.development
.env.production
logs/
*.log
dist/
build/
coverage/
.cache/
.tmp/
.DS_Store
Thumbs.db
.vscode/
.idea/
pids/
```

Do not ignore configuration files such as `.prettierrc`, `package.json`, or lockfiles.

---

## 6. Install packages

``` bash
npm install 
```

### 6.2 Load Environment Variables

Install dotenv:

```bash
npm install dotenv
```

In `src/index.js` or `src/app.js`:

```js
import 'dotenv/config';
const port = process.env.PORT || 5000;
```

---

## Quick Checklist

* [ ] npm and Git initialized
* [ ] Git configured with username, email, and remote
* [ ] Folder structure created
* [ ] ES Modules enabled
* [ ] Nodemon dev script added
* [ ] Prettier configured
* [ ] Packages installed