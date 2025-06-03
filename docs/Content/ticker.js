// docs/Content/ticker.js

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
    document.getElementById('ticker-text').textContent = label + headlines.join('  •  ');
  } catch (e) {
    document.getElementById('ticker-text').textContent = 'Unable to load news feed.';
    console.error(e);
  }
}

// Initialize on DOM load and refresh every 10 minutes
document.addEventListener('DOMContentLoaded', () => {
  loadNewsTicker();
  setInterval(loadNewsTicker, 600000); // 10 minutes

  // Start the ticker scroll effect
  startTickerScroll();
});

function startTickerScroll() {
  const container = document.getElementById('ticker');
  const text = document.getElementById('ticker-text');
  let pos = container.offsetWidth;

  function scroll() {
    pos--;
    if (text.offsetWidth + pos < 0) {
      pos = container.offsetWidth;
    }
    text.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(scroll);
  }
  scroll();
}
