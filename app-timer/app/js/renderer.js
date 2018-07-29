const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data');

document.querySelector("#link-sobre")
	.addEventListener('click', () => ipcRenderer.send('abrir-janela-sobre'));


let tempo = document.querySelector('.tempo');
let imgs = ['img/btn-play.png','img/btn-stop.png'];
let play = false;
let curso = document.querySelector('.curso');
let btnPlay = document.querySelector('.botao-play');

btnPlay.addEventListener('click', function(){
	if(play){
		timer.parar(curso.textContent);
		new Notification('Alura Timer',{
			body: `O curso ${curso.textContent} parado!`,
			icon: 'img/logo.png'
		});
	} else {
		timer.iniciar(tempo);
		new Notification('Alura Timer',{
			body: `O curso ${curso.textContent} iniciado!`,
			icon: 'img/logo.png'
		});
	}

	play = !play;
	imgs = imgs.reverse();
	btnPlay.src = imgs[0];	
});

window.onload = () => {
	data.carregaDados(curso.textContent)
		.then((dados)=> tempo.textContent = dados.tempo);
}

ipcRenderer.on('curso-trocado',(event,cur)=>{
	timer.parar(curso.textContent);
	data.carregaDados(cur)
		.then((dados)=> tempo.textContent = dados.tempo)
		.catch((err) => tempo.textContent = '00:00:00');
	curso.textContent = cur;
});

let campoAdd = document.querySelector('.campo-adicionar');
document.querySelector('.botao-adicionar').addEventListener('click',()=>{
	if(campoAdd.value == '')
		return;

	curso.textContent = campoAdd.value;
	tempo.textContent = "00:00:00";
	campoAdd.value = '';
	ipcRenderer.send('curso-adicionado',curso.textContent);
});

ipcRenderer.on('atalho-start-stop',() => {
	btnPlay.dispatchEvent(new MouseEvent('click'));
});