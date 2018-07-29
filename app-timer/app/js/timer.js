const moment = require('moment');
const { ipcRenderer } = require('electron');

let segundos = 0;
let timer;
let tempo;

module.exports = {
	iniciar(elemento){
		tempo = moment.duration(elemento.textContent);
		segundos = tempo.asSeconds();
		clearInterval(timer);
		timer = setInterval(()=>{
			segundos++;
			elemento.textContent = this.segundoParaTempo(segundos);
		},1000);
	}, 
	segundoParaTempo(segundos){
		return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
	},
	parar(curso){
		clearInterval(timer);
		let tempoEstudado = this.segundoParaTempo(segundos);
		ipcRenderer.send('curso-parado',curso,tempoEstudado);
	}
}