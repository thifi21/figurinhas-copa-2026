/**
 * Figurinhas identificadas na tabela de conferência da Copa 2026
 * (células pintadas em laranja = figurinhas já possuídas)
 *
 * Cada ID corresponde a "<SIGLA> <NÚMERO>" conforme o sistema.
 * Atualizado em: 2026-05-29 com base na foto do controle de figurinhas.
 */

export const INITIAL_COLLECTED: string[] = [
  // === Página Inicial / FWC ===
  'FWC 1', 'FWC 2', 'FWC 7', 'FWC 8',
  'FWC 9', 'FWC 15', 'FWC 16', 'FWC 18', 'FWC 19',

  // === Grupo A ===
  // México: colunas 1, 2, 6, 7
  'MEX 1', 'MEX 2', 'MEX 6', 'MEX 7',
  // África do Sul: colunas 4, 7, 17, 20
  'RSA 4', 'RSA 7', 'RSA 17', 'RSA 20',
  // Coreia do Sul: colunas 8, 13
  'KOR 8', 'KOR 13',
  // Rep. Tcheca: colunas 1, 2, 11
  'CZE 1', 'CZE 2', 'CZE 11',

  // === Grupo B ===
  // Catar: colunas 1, 3, 7
  'QAT 1', 'QAT 3', 'QAT 7',
  // Bósnia: coluna 18
  'BIH 18',
  // Suíça: colunas 2, 3, 6, 7, 20
  'SUI 2', 'SUI 3', 'SUI 6', 'SUI 7', 'SUI 20',

  // === Grupo C ===
  // Brasil: colunas 6, 7, 8, 16, 20
  'BRA 6', 'BRA 7', 'BRA 8', 'BRA 16', 'BRA 20',
  // Marrocos: colunas 3, 4, 5, 8, 19
  'MAR 3', 'MAR 4', 'MAR 5', 'MAR 8', 'MAR 19',
  // Haiti: colunas 3, 4, 13, 20
  'HAI 3', 'HAI 4', 'HAI 13', 'HAI 20',
  // Escócia: colunas 4, 5, 18, 20
  'SCO 4', 'SCO 5', 'SCO 18', 'SCO 20',

  // === Grupo D ===
  // Estados Unidos: colunas 1, 2, 5, 6, 13, 14, 19
  'USA 1', 'USA 2', 'USA 5', 'USA 6', 'USA 13', 'USA 14', 'USA 19',
  // Paraguai: colunas 8, 18
  'PAR 8', 'PAR 18',
  // Austrália: colunas 2, 5, 8, 18
  'AUS 2', 'AUS 5', 'AUS 8', 'AUS 18',
  // Turquia: colunas 1, 15, 20
  'TUR 1', 'TUR 15', 'TUR 20',

  // === Grupo E ===
  // Alemanha: colunas 13, 16, 20
  'GER 13', 'GER 16', 'GER 20',
  // Curaçao: colunas 8, 14
  'CUW 8', 'CUW 14',
  // Costa do Marfim: colunas 4, 11, 16
  'CIV 4', 'CIV 11', 'CIV 16',
  // Equador: colunas 1, 8, 11
  'ECU 1', 'ECU 8', 'ECU 11',

  // === Grupo F ===
  // Holanda: colunas 1, 15, 16, 17, 20
  'NED 1', 'NED 15', 'NED 16', 'NED 17', 'NED 20',
  // Japão: colunas 2, 3, 5, 10, 13
  'JPN 2', 'JPN 3', 'JPN 5', 'JPN 10', 'JPN 13',
  // Suécia: colunas 2, 8, 9
  'SWE 2', 'SWE 8', 'SWE 9',
  // Tunísia: colunas 2, 12
  'TUN 2', 'TUN 12',

  // === Grupo G ===
  // Bélgica: colunas 8, 16, 18, 19, 20
  'BEL 8', 'BEL 16', 'BEL 18', 'BEL 19', 'BEL 20',
  // Egito: colunas 1, 4, 11, 16, 17
  'EGY 1', 'EGY 4', 'EGY 11', 'EGY 16', 'EGY 17',
  // Irã: coluna 8
  'IRN 8',
  // Nova Zelândia: colunas 3, 5, 12, 16
  'NZL 3', 'NZL 5', 'NZL 12', 'NZL 16',

  // === Grupo H ===
  // Espanha: colunas 1, 16, 17
  'ESP 1', 'ESP 16', 'ESP 17',
  // Cabo Verde: colunas 3, 12, 14
  'CPV 3', 'CPV 12', 'CPV 14',
  // Arábia Saudita: colunas 1, 2, 6, 18, 19, 20
  'KSA 1', 'KSA 2', 'KSA 6', 'KSA 18', 'KSA 19', 'KSA 20',
  // Uruguai: colunas 1, 12, 13, 20
  'URU 1', 'URU 12', 'URU 13', 'URU 20',

  // === Grupo I ===
  // França: colunas 1, 2, 8, 11
  'FRA 1', 'FRA 2', 'FRA 8', 'FRA 11',
  // Senegal: colunas 3, 4, 5, 8, 11, 13
  'SEN 3', 'SEN 4', 'SEN 5', 'SEN 8', 'SEN 11', 'SEN 13',
  // Iraque: colunas 1, 2, 5, 8, 9, 10
  'IRQ 1', 'IRQ 2', 'IRQ 5', 'IRQ 8', 'IRQ 9', 'IRQ 10',
  // Noruega: colunas 5, 19, 20
  'NOR 5', 'NOR 19', 'NOR 20',

  // === Grupo J ===
  // Argentina: colunas 16, 20
  'ARG 16', 'ARG 20',
  // Argélia: colunas 1, 2, 13, 16, 20
  'ALG 1', 'ALG 2', 'ALG 13', 'ALG 16', 'ALG 20',
  // Áustria: colunas 8, 12, 13
  'AUT 8', 'AUT 12', 'AUT 13',
  // Jordânia: colunas 1, 2, 3, 18
  'JOR 1', 'JOR 2', 'JOR 3', 'JOR 18',

  // === Grupo K ===
  // Portugal: colunas 8, 10, 18, 19
  'POR 8', 'POR 10', 'POR 18', 'POR 19',
  // Congo RD: colunas 2, 3, 15, 18, 19, 20
  'COD 2', 'COD 3', 'COD 15', 'COD 18', 'COD 19', 'COD 20',
  // Uzbequistão: colunas 3, 4, 15, 16, 18, 19
  'UZB 3', 'UZB 4', 'UZB 15', 'UZB 16', 'UZB 18', 'UZB 19',
  // Colômbia: colunas 2, 3, 15, 16, 17, 18, 20
  'COL 2', 'COL 3', 'COL 15', 'COL 16', 'COL 17', 'COL 18', 'COL 20',

  // === Grupo L ===
  // Inglaterra: colunas 7, 8, 11, 17, 18, 20
  'ENG 7', 'ENG 8', 'ENG 11', 'ENG 17', 'ENG 18', 'ENG 20',
  // Croácia: colunas 4, 11, 12
  'CRO 4', 'CRO 11', 'CRO 12',
  // Gana: colunas 1, 2, 3, 10, 11, 12, 13, 14, 15, 16
  'GHA 1', 'GHA 2', 'GHA 3', 'GHA 10', 'GHA 11', 'GHA 12',
  'GHA 13', 'GHA 14', 'GHA 15', 'GHA 16',
  // Panamá: colunas 10, 11
  'PAN 10', 'PAN 11',
];
