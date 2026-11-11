// Game payloads remain on the upstream repository. No global isolation headers
// or existing game loaders are changed by this standalone launcher.
const bases = [
  "https://cdn.jsdelivr.net/gh/web-ports/clover-pit@main/",
  "https://raw.githubusercontent.com/web-ports/clover-pit/main/",
];
const statusElement = document.getElementById("status");
const progressElement = document.getElementById("progress");
const canvas = document.getElementById("game");
const retry = document.getElementById("retry");
const downloads = new Map();
const objectUrls = [];
const totalBytes = 91180348;

function updateProgress(path, bytes) {
  downloads.set(path, bytes);
  const loaded = [...downloads.values()].reduce((sum, value) => sum + value, 0);
  statusElement.textContent = `Downloading ${(loaded / 1048576).toFixed(1)} / ${(totalBytes / 1048576).toFixed(1)} MB`;
  progressElement.value = loaded / totalBytes * 0.8;
}

async function download(path) {
  let lastError;
  for (const base of bases) {
    updateProgress(path, 0);
    try {
      const response = await fetch(base + path, { signal: AbortSignal.timeout(120000) });
      if (!response.ok || !response.body) throw new Error(`${path}: HTTP ${response.status}`);
      const reader = response.body.getReader();
      const chunks = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        chunks.push(value);
        updateProgress(path, received);
      }
      if (!received) throw new Error(`${path}: empty download`);
      return new Blob(chunks);
    } catch (error) { lastError = error; }
  }
  throw lastError || new Error(`Unable to download ${path}`);
}

async function merge(name, type) {
  const parts = await Promise.all([1, 2, 3].map(part => download(`Build/CloverPit.${name}.part${part}`)));
  const url = URL.createObjectURL(new Blob(parts, { type }));
  objectUrls.push(url);
  return url;
}

function loadScript(path) {
  return new Promise((resolve, reject) => {
    let index = 0;
    const attempt = () => {
      const script = document.createElement("script");
      script.src = bases[index] + path;
      script.onload = () => resolve(bases[index]);
      script.onerror = () => {
        script.remove();
        index += 1;
        if (index < bases.length) attempt();
        else reject(new Error("The Unity launcher could not be downloaded."));
      };
      document.body.append(script);
    };
    attempt();
  });
}

function showFailure(error) {
  document.getElementById("loading").hidden = false;
  canvas.hidden = true;
  statusElement.textContent = `Clover Pit could not start: ${error instanceof Error ? error.message : String(error)}`;
  retry.hidden = false;
}
retry.addEventListener("click", () => window.location.reload());
window.addEventListener("pagehide", () => objectUrls.forEach(url => URL.revokeObjectURL(url)));

(async () => {
  try {
    const [dataUrl, codeUrl, base] = await Promise.all([
      merge("data", "application/octet-stream"),
      merge("wasm", "application/wasm"),
      loadScript("Build/CloverPit.loader.js"),
    ]);
    statusElement.textContent = "Starting Clover Pit…";
    canvas.hidden = false;
    canvas.width = 960;
    canvas.height = 540;
    const timer = setTimeout(() => {
      statusElement.textContent = "Startup is taking longer than expected. You can retry.";
      retry.hidden = false;
    }, 90000);
    try {
      await createUnityInstance(canvas, {
        dataUrl, codeUrl,
        frameworkUrl: base + "Build/CloverPit.framework.js",
        streamingAssetsUrl: base + "StreamingAssets",
        companyName: "Panik Arcade", productName: "CloverPit", productVersion: "1.3",
        devicePixelRatio: 1,
        matchWebGLToCanvasSize: false,
        showBanner: (message, type) => { if (type === "error") showFailure(message); },
      }, progress => {
        progressElement.value = 0.8 + progress * 0.2;
        // Unity 6 calls progress(1) in postRun, once the runtime is active.
        // Its later WaitForInitialization promise can remain pending even
        // while the game renders; do not leave a loader covering that game.
        if (progress === 1) {
          document.getElementById("loading").hidden = true;
          clearTimeout(timer);
          canvas.focus();
        }
      });
      document.getElementById("loading").hidden = true;
      canvas.focus();
    } finally { clearTimeout(timer); }
  } catch (error) { showFailure(error); }
})();