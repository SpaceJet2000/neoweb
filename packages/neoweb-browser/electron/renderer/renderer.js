document.getElementById('go').addEventListener('click', async () => {
  const domain = document.getElementById('addressBar').value;
  if (domain.endsWith('.neo')) {
    const content = await electron.ipcRenderer.invoke('resolve-neo', domain);
    document.getElementById('neoContent').innerHTML = content;
  }
});
