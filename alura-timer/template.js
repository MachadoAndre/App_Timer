const data = require('./data');
const { ipcMain } = require('electron');
module.exports = {
	templateInicial: null,
	gerarTemplates(win){
		let templ = [
				{'label':'Cursos'},
				{'type':'separator'}
			];
		let cursos = data.pegaNomeCursos();
		cursos.forEach((curso)=>{
			templ.push( { label:curso, type:'radio', click: () => win.send('curso-trocado',curso) } );
		});
		this.templateInicial = templ;
		return templ;
	},
	adicionaCursoNoTray(curso,win){
		this.templateInicial.push(
			{
				label:curso, 
				type:'radio',
				checked: true, 
				click: () => win.send('curso-trocado',curso) 
			});
		return this.templateInicial;
	}, 
	gerarMenuPrncipal(app){
		let templateMenu = [
			{
				label: 'View',
				submenu:[ 
					{ role:'reload' },{ role: 'toggledevtools' }
				]
			},
			{
				label: 'Window',
				submenu: [
					{ 
						role:'togglefullscreen'
					},
					{ 
						role:'minimize',
						accelerator:'Alt+m' 
					},
					{ 
						role:'close' 
					}
				]
			},
			{
				label: 'Sobre',
				submenu: [
					{ 
						label:'Sobre o Alura Timer', 
						click: () => ipcMain.emit('abrir-janela-sobre'),
						accelerator: 'CommandOrControl+i'
					}
				]
			}
		];

		if(process.platform == 'darwin'){
			this.templateMenu.unshift({
				label: app.getName(),
				submenu: [
					{label:'Item Mac 1'}
				]
			});
		}
		return templateMenu;
	}
}