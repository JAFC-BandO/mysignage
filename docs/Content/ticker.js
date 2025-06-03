// docs/Content/ticker.js

// Since we’re using the Angular-based DR ticker (iframe) as on the other side, this file is no longer needed.
// You may remove or archive the ticker.js file.

document.addEventListener('DOMContentLoaded', () => {
  // Removed all functionality as the ticker is now handled by the Angular iframe.
});

async function loadNewsTicker() {
  // Use AllOrigins to bypass CORS
  const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  const RSS_URL = 'https://www.dr.dk/nyheder/service/feeds/allenyheder';

  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(RSS_URL));
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'application/xml');

    // Extract up to 10 headlines
    const items = Array.from(xml.querySelectorAll('item > title')).slice(0, 10);
    const headlines = items.map(el => el.textContent);

    // Set the ticker text with label
    const label = 'News Ticker App: Nyheds-streamer (DR)  •  ';
    document.getElementById('ticker').textContent = label + headlines.join('  •  ');
  } catch (e) {
    document.getElementById('ticker').textContent = 'Failed to load news.';
    console.error(e);
  }
}
loadNewsTicker();
setInterval(loadNewsTicker, 600000); // refresh every 10 minutes
