const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { GPT2LMHeadModel, GPT2Tokenizer } = require('@huggingface/transformers')

let model, tokenizer

async function loadModel() {
  try {
    model = await GPT2LMHeadModel.from_pretrained('gpt2')
    tokenizer = await GPT2Tokenizer.from_pretrained('gpt2')
    console.log("Model and tokenizer loaded successfully.")
  } catch (error) {
    console.error("Error loading model and tokenizer:", error)
  }
}

async function generateResponse(prompt) {
  try {
    const inputs = tokenizer.encode(prompt, { return_tensors: "pt" })
    const outputs = await model.generate(inputs, { max_length: 150, do_sample: true })
    const response = tokenizer.decode(outputs[0], { skip_special_tokens: true })
    return response
  } catch (error) {
    console.error("Error generating response:", error)
    return "An error occurred while generating the response."
  }
}

ipcMain.handle('chat-message', async (event, message) => {
  const response = await generateResponse(message)
  return response
})

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.loadFile('index.html')
}

app.on('ready', async () => {
  await loadModel()
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
