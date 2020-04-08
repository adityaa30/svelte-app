# svelte app

## Get started

**[Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)** the repository

```bash
# Clone the forked repository
git clone https://github.com/<git-username>/check-commit.git

# Enter project directory
cd svelte-app

# Install dependencies
npm install

# Build & run the project (uses webpack)
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see your app running.

## Deploying to the web

### With [now](https://zeit.co/now)

Install `now` if you haven't already:

```bash
npm install -g now
```

Then, from within your project folder:

```bash
now
```

As an alternative, use the [Now desktop client](https://zeit.co/download) and simply drag the unzipped project folder to the taskbar icon.

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public
```
