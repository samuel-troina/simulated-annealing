## Objetivo

Este projeto foi criado para o trabalho da disciplina de Fundamentos de Inteligência Artificial do Doutorado em Ciências da Computação do Programa de Pós-Graduação em Ciências da Computação da Universidade Federal de Pelotas (UFPEL)

O objetivo deste projeto é MINIMIZAR a função:

<img src="https://render.githubusercontent.com/render/math?math=f(x1,...,xn)=\displaystyle\sum_{i=1}^n\displaystyle\sum_{j=1}^5jcos((j+1)xi+j)" />

Deve-se considerada que <img src="https://render.githubusercontent.com/render/math?math=n_1"> devem estar entre [-10, 10] para todo i e são valores reais, e que <img src="https://render.githubusercontent.com/render/math?math=n=4">.

## Solução

Para solução do trabalho foi utilizado o algoritmo de otimização Tempera simulada (ou Simulated Annealing) é uma meta-heurística para otimização, é uma técnica que consiste em busca local probabilística, se fundamenta em uma analogia com a termodinâmica.

Uma das principais vantagens deste algoritmo é permitir testar soluções mais distantes da solução inicial e possibilitar exploração de pontos distantes ao ponto inicial da pesquisa.

## Descrição do algoritmo

O algoritmo começa sua busca a partir de uma solução inicial S gerada de forma aleatória. O procedimento principal consiste em uma repetição que a cada iteração, gera aleatoriamente um único vizinho s’ da solução corrente S.

A cada geração de um novo vizinho s’ de S, é testada a variação ∆ do valor da função objetivo, isto é, ∆ = f (s’) – f (S), onde temos as seguintes situações:

∆ < 0: Há uma redução de energia, a qual implica que a nova solução é melhor que a anterior. O método aceita a solução e s’ passa a ser a nova solução corrente.
∆ = 0: Caso de estabilidade, não havendo redução de energia. Na verdade, situação pouco provável de acontecer na prática. A aceitação da solução é, portanto, indiferente.
∆ > 0: Houve um aumento do estado de energia. A aceitação desse tipo de solução é mais provável a altas temperaturas e bastante improvável a temperaturas reduzidas. Para reproduzir essas características, geralmente usa-se, para calcular a probabilidade de se aceitar a nova solução, uma função conhecida por fator de Boltzmann, que é dada por e^(-∆/T), onde T é um parâmetro do método, chamado de temperatura e que regula a probabilidade de soluções com pior custo. Por exemplo, esta poderá ser:
* Gera-se um número aleatório retirado de uma distribuição uniforme no intervalo [0, 1].
* Se este número for menor ou igual a “p”, aceita-se a solução.
Se*  for maior que “p”, rejeita-se a solução.

A temperatura T assume inicialmente um valor elevado, T0. Após um número fixo de iterações (o qual representa o número de iterações para o sistema atingir o equilíbrio térmico em uma dada temperatura), a temperatura é gradativamente diminuída por uma razão de resfriamento α, tal que Tn ← α * Tn -1, sendo 0 < α < 1. Como esse procedimento se dá no início, há uma chance maior de se escapar de mínimos locais e, à medida que T se aproxima de zero, o algoritmo se comporta como o método de descida, uma vez que diminui a probabilidade de se aceitar movimentos que possa piorar (T → 0 => e-∆/T → 0).

O procedimento é finalizado quando a temperatura chega a um valor próximo de zero e nenhuma solução que piore o valor da melhor solução seja mais aceita, ou seja, quando o sistema estiver estável. A solução é obtida quando o sistema encontra-se nesta situação evidenciando o encontro de um mínimo local.
