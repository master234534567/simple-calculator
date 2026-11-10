# Simple Calculator

Imported website: http://master234534567.github.io/calc

This project was built with [Lovable](https://lovable.dev).

## Deploy to your GitHub site

1. Sync this project to GitHub in Lovable's **Project settings → Git**.
2. In that repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. Push to `main` or `master`, or run **Actions → Deploy GitHub Pages → Run workflow**.

The workflow exports the calculator as static HTML and deploys only `dist/client`;
GitHub Pages does not need to run a server. The repository path is detected
automatically, so both `/calc/` repository sites and root/custom-domain sites work.
Typing `0000` still opens the same `about:blank` library popup. Manifests are loaded
from this deployment; existing game files and artwork still use the original game
host. Embedding restrictions imposed by external game sites still apply.

The GitHub Pages workflow publishes to the repository connected here. To replace
an existing site in a different repository, transfer the source files (excluding
`.git`, dependencies, and generated output) into that repository first.

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4d15e1a7-393b-4623-b2d0-f814e31694ad).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
