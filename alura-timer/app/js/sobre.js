const { ipcRenderer, shell } = require('electron');
const process = require('process');

document.querySelector('#link-fechar')
	.addEventListener('click', () => ipcRenderer.send('fechar-janela-sobre'));

document.querySelector('#link-github')
	.addEventListener('click',() => shell.openExternal('https://github.com/MachadoAndre'));

window.onload = () => document.querySelector("#versao-electron")
						.textContent = process.versions.electron;