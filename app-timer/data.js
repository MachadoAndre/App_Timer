const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
	criaArquivoDeCurso(nome,conteudo){
		return jsonfile.writeFile(nome,conteudo)
			.then( () => {

			})
			.catch( (err) => {
				console.log(err);
			});
	},
	salvaDados(curso,tempoEstudado){
		let pathCurso = __dirname + '\\data\\' + curso + '.json';	
		if(fs.existsSync(pathCurso)){
			this.addTempoCurso(pathCurso,tempoEstudado);
		} else {
			this.criaArquivoDeCurso(pathCurso,{})
				.then( ()=>{
					this.addTempoCurso(pathCurso,tempoEstudado);
				})
		}
	},
	addTempoCurso(pathCurso,tempoEstudado){
		let dados = {
				ultimoAcesso: new Date().toString(),
				tempo: tempoEstudado
			};
		
		jsonfile.writeFile(pathCurso,dados,{spaces:2})
			.then( () => console.log("Adicionado com sucesso"))
			.catch((err)=> console.log(err));
	},
	carregaDados(curso){
		let pathCurso = __dirname + '\\data\\' + curso + '.json';
		return jsonfile.readFile(pathCurso);
	},
	pegaNomeCursos(){
		return fs.readdirSync(__dirname + '/data/')
				.map((arquivo) => arquivo.substr(0,arquivo.lastIndexOf('.')));
	}
}