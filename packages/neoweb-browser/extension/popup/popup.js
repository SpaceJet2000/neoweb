document.getElementById('go').addEventListener('click', () => {
  const url = document.getElementById('neoUrl').value;
  if (url.includes('.neo')) {
    chrome.tabs.create({ url: `http://${url}` });
  }
});
