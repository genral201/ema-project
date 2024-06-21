// renderer.js
const { ipcRenderer } = require('electron')

document.getElementById('input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    let message = e.target.value
    document.getElementById('messages').innerHTML += `<div class="message user">${message}</div>`
    ipcRenderer.invoke('chat-message', message).then(response => {
      document.getElementById('messages').innerHTML += `<div class="message">${response}</div>`
    })
    e.target.value = ''
  }
})
