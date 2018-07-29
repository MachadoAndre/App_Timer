const { app, BrowserWindow, ipcMain, Tray, Menu, globalShortcut } = require('electron');
const data = require('./data');
const template = require('./template');

let tray = null;
let mainWindow = null;
app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600
	});

	tray = new Tray(__dirname + '/app/img/logo.png');
	let trayMenu = Menu.buildFromTemplate(template.gerarTemplates(mainWindow));
	tray.setContextMenu(trayMenu);
	
	let menuPrincipal = Menu.buildFromTemplate(template.gerarMenuPrncipal(app));
	Menu.setApplicationMenu(menuPrincipal);

	globalShortcut.register('CmdOrCtrl+j',() => mainWindow.send('atalho-start-stop'));

	mainWindow.loadURL(`file://${__dirname}/app/index.html`);
});

let sobreWindow = null;
ipcMain.on('abrir-janela-sobre', () => {
	if(sobreWindow == null){
		sobreWindow = new BrowserWindow({
			width: 300,
			height: 220,
			alwaysOnTop: true,
			frame: false
		});
		sobreWindow.on('closed',()=> sobreWindow = null);
	} 
	sobreWindow.loadURL(`file://${__dirname}/app/sobre.html`);
});

app.on('window-all-closed', () => app.quit());
ipcMain.on('fechar-janela-sobre',()=> sobreWindow.close());
ipcMain.on('curso-parado', (event,curso,tempoEstudado) => data.salvaDados(curso,tempoEstudado));

ipcMain.on('curso-adicionado',(event,novoCurso)=>{
	let novoTemplate = template.adicionaCursoNoTray(novoCurso,mainWindow);
	let novoTrayMenu = Menu.buildFromTemplate(novoTemplate);
	tray.setContextMenu(novoTrayMenu);
});