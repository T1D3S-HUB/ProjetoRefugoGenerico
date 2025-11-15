// =====================================================================
// 1. BANCO DE DADOS GLOBAL E VARIÁVEIS DE ESTADO
// =====================================================================

/**
 * Mapeamento dos códigos internos para Cliente e Código da Peça.
 * @type {Object<string, {cliente: string, codPeca: string}>}
 */
const pecasData = {
    "0007": { cliente: "TESTE", codPeca: "AGENTE SECRETO" },
  "002": { cliente: "CONTINETAL", codPeca: "CARCAÇA " },
    "003": { cliente: " CONTINETAL ", codPeca: "SUPORTE " },
    "004": { cliente: "METALSIDER", codPeca: "MANGA DE EIXO" },
    "005": { cliente: "OMR", codPeca: "MONTANTE" },
    "006": { cliente: "ANONIMO", codPeca: "EIXO " },

  
};

/**
 * Lista de defeitos completa.
 * @type {string[]}
 */
const listaDeDefeitos = [
    "1 Exc.de cola", "2 Modelo Defeituoso", "3 Porosidade", "4 Fervura", "5 Penetração Metálica", 
    "6 Escama", "7 Inc.de Areia", "8 Molde Quebrado", "9 Molde Esmagado", "10 Molde Mole", 
    "11 Desencontro", "12 Empenado", "13 Inchamento", "14 Molde Vazado", "15 Falta de Macho", 
    "16 Macho Vazado", "17 Macho Deslocado", "18 Macho Quebrado", "19 Macho Trocado", "20 Rebarba de Macho", 
    "21 Rechupe", "22 Inc.Cementita", "23 Dureza Alta", "24 Dureza Baixa", "25 Inc.de Escórea", 
    "26 Ferro Frio", "27 Vaz.Interrompido", "28 Vaz.Incompleto", "29 Trincado", "30 Quebra Manuseio", 
    "31 Gases", "32 Amassado Manuseio", "33 Amassado Desmoldamento", "34 Fratura Canal", "35 Junta Fria", 
    "36 Trinca Quente", "37 Gota Fria", "38 Nodulização Baixa", "39 Quebrana Desmoldagem", "40 Depressão", 
    "41 Exc.Limpeza", "42 Exc.Rebarbação", "43 Destruídap/Teste", "44 Inc.de Liga", "45 Molde Trincado", 
    "46 Explosão de Molde", "47 Furo Deslocado", "48 Matriz Fora", "49 Bola Bicuda", "50 Quebra Quente", 
    "51 Composição QuímicaFora", "52 Areia Sinterizada", "53 Furo Maior", "54 Tração Baixa", "55 Parede Fina", 
    "56 Alongamento Baixo", "57 Dimensional Fora", "58 Inc.de Grumos", "59 Olho de Peixe", "60 Faltade Material", 
    "61 Peça Deslocada", "62 Oxidação", "63 Rabode Cometa", "64 Excesso de Rebarba", "65 Diferença", 
    "66 Descontinuidade", "67 Areiade Macho", "68 Sanidade Interna", "69 Gravação Ilegivel", "70 Grafita Explodida", 
    "71 Suspeita de Cementita",
];

/**
 * Mapeamento dos defeitos para os índices das colunas na tabela de exportação.
 * @type {Object<string, number>}
 */
const mapaDefeitosParaIndiceCSV = {};
listaDeDefeitos.forEach((defeito, index) => {
    // Índice base zero
    mapaDefeitosParaIndiceCSV[defeito] = index;
});


// --- Variáveis de Estado Global ---

/**
 * Armazena os dados da PEÇA ATUAL (preenchidos em 'Dados Iniciais').
 * @type {Object}
 */
let dadosIniciais = {}; 

/**
 * Indica se os dados iniciais foram preenchidos pelo menos uma vez.
 * @type {boolean}
 */
let dadosIniciaisPreenchidos = false;

/**
 * Armazena o histórico completo de apontamentos (refugos e liberadas) de todas as peças.
 * Cada item contém o contexto da peça.
 * @type {Array<Object>}
 */
let apontamentos = [];

/**
 * A cavidade selecionada no momento.
 * @type {number | null}
 */
let cavidadeAtual = null;

/**
 * O defeito selecionado no modal.
 * @type {string | null}
 */
let defeitoAtual = null;

/**
 * A Data de Fundição ativa para o registro de apontamentos.
 * @type {string}
 */
let dataFundicaoAtiva = '';

/**
 * Lista de todas as datas de fundição disponíveis para a peça atual/sessão.
 * @type {string[]}
 */
let datasFundicaoDisponiveis = [];

/**
 * Ordem de exibição dos botões de defeito, com os mais usados no topo.
 * @type {string[]}
 */
let ordemDefeitosAtual = [...listaDeDefeitos];

/**
 * Variáveis globais para instâncias dos gráficos Chart.js.
 * @type {Chart | null}
 */
let graficoDefeitosInstance = null;
let graficoCavidadesInstance = null;

/**
 * ID do intervalo para o salvamento automático no Local Storage.
 * @type {number | null}
 */
let backupIntervalId = null;