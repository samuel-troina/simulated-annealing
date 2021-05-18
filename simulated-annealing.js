/* 
	S = Solução inicial 
	T = Valor inicial da tempera 
	fatorResfriamento = Fator de resfriamento da tempera valor entre 0 e 1 
	equilibrioT = Nr. de interações para o sistema atingir o equilíbrio térmico da tempera
	TEMPO = Tempo máximo de execução do algoritmo em segundos 
	f = função a ser minimizada
    fv = função responsável por gerar o proximo vizinho
*/
var TemperaSimulada = {

	buscar : function (S, T, fatorResfriamento, equilibrioT, TEMPO, f, fv){
		/* Ótimo Local/Global */
		var M = [...S], N = [];        

		var start = new Date().getTime();

		do {	
			var equilibrio = 0;			
			while(equilibrio < equilibrioT){	
				var nS = null, N = null;
				
				/* Gera um vizinho */ 	
				N = fv(S);
				
				/*A cada geração de um novo vizinho s' de s, é testada a variação Δ do valor da função objetivo, isto é, Δ = f (s') ? f (s), onde temos as seguintes situações:*/
				var delta = f(N) - f(S);
				
				/* Δ < 0: Há uma redução de energia, a qual implica que a nova solução é melhor que a anterior. O método aceita a solução e s' passa a ser a nova solução corrente. */
				if (delta < 0){ nS = [...N]; }
				
				/* Δ = 0: Caso de estabilidade, não havendo redução de energia. Na verdade, situação pouco provável de acontecer na prática. A aceitação da solução é, portanto, indiferente. */
				if (delta == 0){ nS = [...N]; }
				
				/* Δ > 0: Houve um aumento do estado de energia. A aceitação desse tipo de solução é mais provável a altas temperaturas e bastante improvável a temperaturas reduzidas. 
					Para reproduzir essas características, geralmente usa-se, para calcular a probabilidade de se aceitar a nova solução, uma função conhecida por fator de Boltzmann, 
					que é dada por e^(-Δ/T), onde T é um parâmetro do método, chamado de temperatura e que regula a probabilidade de soluções com pior custo. 
					Por exemplo, esta poderá ser:
						- Gera-se um número aleatório retirado de uma distribuição uniforme no intervalo [0, 1].
						- Se este número for menor ou igual a "p", aceita-se a solução. 
						- Se for maior que "p", rejeita-se a solução.
				*/	
				if (delta > 0 && Math.random() <= Math.pow(1, (delta * -1)/ T)){ nS = [...N]; }		
				
				if (nS) { 
					S = [...nS];
					
					/* Testa se é o melhor caso o último vizinho */
					if (f(S) < f(M)){ M = [...S]; }

					equilibrio++;
				}
			}
			
			/* reduz a temperatura baseado no fator de resfriamento */
			T -= fatorResfriamento;
			
			tempo = (new Date().getTime() - start) / 1000;
			
		} while(tempo <= TEMPO && T > 0)
		
		return M;
	}
}