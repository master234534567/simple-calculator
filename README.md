


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


```
