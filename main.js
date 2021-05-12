/* Valores mínimos e máximos aceitos para os elementos */
var min = -10, max = 10, decimais=10;

function fx(x){
	var ret=0;qtJ=5;i=0,j=1;	
	for (i=0;i<x.length;i++){
		for(j=1;j<=qtJ;j++){
			ret += j * Math.cos((j+1)*x[i] +j);
		}		
	}	
	return ret;
}

function gerarVizinho(solucaoAtual){
    var N = [...solucaoAtual];
    N[Util.rand(0, (solucaoAtual.length - 1), 0)] = Util.rand(min,max,decimais);    
    return N;
}

function iniciarBusca(){	
	var S = [Util.rand(min,max,decimais), Util.rand(min,max,decimais), Util.rand(min,max,decimais), Util.rand(min,max,decimais)];
	var T = document.getElementById("T").value;
	var fatorResfriamento = document.getElementById("fatorResfriamento").value;
	var equilibrioT = document.getElementById("equilibrioT").value;
	var TEMPO = document.getElementById("TEMPO").value;
	
	var M = TemperaSimulada.buscar(S, T, fatorResfriamento, equilibrioT, TEMPO, fx, gerarVizinho);	
	document.getElementById("melhor").innerHTML = '<b>x1:</b>'+M[0]+'<br/><b>x2:</b>'+M[1]+'<br/><b>x3:</b>'+M[2]+'<br/><b>x4:</b>'+M[3]+' '+"<br><b>Resultado:</b>"+fx(M);
}