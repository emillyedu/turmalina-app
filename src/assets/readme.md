# Turmalina

## Executar programa

Execute em um terminal `npm install`, para que sejam instaladas todas as dependências necessárias.

Logo após, execute `ng serve` para rodar o site Turmalina

## Packages utilizados

- Leaflef

- D3

- Materials

- Bootstrap

- Roud-Progress

- Moment

- Chart.js

## Rotas do site

Existem, no total, cinco rotas no Turmalina: Mapa, Ranking, Relatório, Avaliações e Documentação. Cada uma delas possui diferentes funções que serão sitadas a seguir.

### Mapa

A rota "Mapa", contém um mapa leaflet do estado da Paraíba. Nele, também é possível observar a pontuação de cada município do estado, que difere conforme a cor que está sendo fornecida, que são baseadas nos dados adquiridos.

### Ranking

No ranking, há uma tabela para apresentar as posições dos municípios em relação a quantidade de pontos que foram obtidos. Além da colocação, também são dispostos o nome, a entidade pública, a data de avaliação, a pontuação, o link do portal de cada cidade.

### Relatório

No relatório é onde estão três tipos de gráficos sobre a avaliação (gráfico de progressão circular, gráfico de barras e gráfico de linhas), o que traz mais informações sobre a pontuação que foi mostrada do ranking. 
Os gráficos de prograssão circular expõem a pontuação dos parâmetros que formam a pontuação geral. Já no de barras, está uma comparação entre a pontuação do município que foi selecionado com a média do estado. E, finalmente no de linhas, é mostrado o histórico de pontuações do município.

### Avaliação

Nessa rota, ao selecionar um município e uma data, serão exibidas tabelas com as pontuações dos sub parâmetros, as quais compõem a pontuação de cada parâmetro, que foram mostrados no gráfico de progressão circular. Assim, é possível ter acesso a detalhes sobre o assunto.

### Documentação

Por fim, na documentação é onde estão todas as informações referentes ao Turmalina e como os portais dos municipios podem implementar, corretamente, a estrutura do código, para que seja exibida a pontuação apropriada.