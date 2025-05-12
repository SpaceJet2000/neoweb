// Intercept .neo domains
chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = new URL(details.url);
    if (url.hostname.endsWith('.neo')) {
      const domain = url.hostname;
      const content = await resolveNeoDomain(domain); // Uses libp2p in WASM
      return { redirectUrl: `data:text/html,${encodeURIComponent(content)}` };
    }
  },
  { urls: ["*://*.neo/*"] },
  ["blocking"]
);

async function resolveNeoDomain(domain) {
  // Connect to local NeoWeb node or embedded libp2p-WASM
  const response = await fetch(`http://localhost:3001/resolve?domain=${domain}`);
  return response.text();
}
