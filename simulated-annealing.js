/* 
	S = Solu��o inicial 
	T = Valor inicial da tempera 
	fatorResfriamento = Fator de resfriamento da tempera valor entre 0 e 1 
	equilibrioT = Nr. de intera��es para o sistema atingir o equil�brio t�rmico da tempera
	TEMPO = Tempo m�ximo de execu��o do algoritmo em segundos 
	f = fun��o a ser minimizada
    fv = fun��o respons�vel por gerar o proximo vizinho
*/
var TemperaSimulada = {

	buscar : function (S, T, fatorResfriamento, equilibrioT, TEMPO, f, fv){
		/* �timo Local/Global */
		var M = [...S], N = [];        

		var start = new Date().getTime();

		do {	
			var equilibrio = 0;			
			while(equilibrio < equilibrioT){	
				var nS = null, N = null;
				
				/* Gera um vizinho */ 	
				N = fv(S);
				
				/*A cada gera��o de um novo vizinho s? de s, � testada a varia��o ? do valor da fun��o objetivo, isto �, ? = f (s?) ? f (s), onde temos as seguintes situa��es:*/
				var delta = f(N) - f(S);
				
				/* ? < 0: H� uma redu��o de energia, a qual implica que a nova solu��o � melhor que a anterior. O m�todo aceita a solu��o e s? passa a ser a nova solu��o corrente. */
				if (delta < 0){ nS = [...N]; }
				
				/* ? = 0: Caso de estabilidade, n�o havendo redu��o de energia. Na verdade, situa��o pouco prov�vel de acontecer na pr�tica. A aceita��o da solu��o �, portanto, indiferente. */
				if (delta == 0){ nS = [...N]; }
				
				/* ? > 0: Houve um aumento do estado de energia. A aceita��o desse tipo de solu��o � mais prov�vel a altas temperaturas e bastante improv�vel a temperaturas reduzidas. 
					Para reproduzir essas caracter�sticas, geralmente usa-se, para calcular a probabilidade de se aceitar a nova solu��o, uma fun��o conhecida por fator de Boltzmann, 
					que � dada por e^(-?/T), onde T � um par�metro do m�todo, chamado de temperatura e que regula a probabilidade de solu��es com pior custo. 
					Por exemplo, esta poder� ser:
						- Gera-se um n�mero aleat�rio retirado de uma distribui��o uniforme no intervalo [0, 1].
						- Se este n�mero for menor ou igual a ?p?, aceita-se a solu��o. 
						- Se for maior que ?p?, rejeita-se a solu��o.
				*/	
				if (delta > 0 && Math.random() <= Math.pow(1, (delta * -1)/ T)){ nS = [...N]; }		
				
				if (nS) { 
					S = [...nS];
					
					/* Testa se � o melhor caso o �ltimo vizinho */
					if (f(S) < f(M)){ M = [...S]; }

					equilibrio++;
				}
			}
			
			/* reduz a temperatura baseado no fator de resfriamento */
			T -= (fatorResfriamento * T);
			
			tempo = (new Date().getTime() - start) / 1000;
			
		} while(tempo <= TEMPO && T > 0)
		
		return M;
	}
}