// Content/ticker.js

async function loadNewsTicker() {
  // Use AllOrigins to bypass CORS
  const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
  const RSS_URL = 'http://feeds.bbci.co.uk/news/world/rss.xml';

  try {
    const response = await fetch(CORS_PROXY + encodeURIComponent(RSS_URL));
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, 'application/xml');

    // Extract up to 10 headlines
    const items = Array.from(xml.querySelectorAll('item > title')).slice(0, 10);
    const headlines = items.map(el => el.textContent);

    // Update the ticker’s text
    document.getElementById('ticker').textContent = headlines.join('  •  ');
  } catch (e) {
    document.getElementById('ticker').textContent = 'Unable to load news feed.';
    console.error(e);
  }
}

// Initialize on DOM load and refresh every 10 minutes
document.addEventListener('DOMContentLoaded', () => {
  loadNewsTicker();
  setInterval(loadNewsTicker, 600000);
});
