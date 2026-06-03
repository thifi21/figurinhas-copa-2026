/**
 * Figurinhas identificadas na tabela de conferência da Copa 2026
 * (células pintadas em laranja = figurinhas já possuídas)
 *
 * Cada ID corresponde a "<SIGLA> <NÚMERO>" conforme o sistema.
 * Atualizado em: 2026-05-29 com base na foto do controle de figurinhas.
 */

export const INITIAL_COLLECTED: string[] = [
  // === Página Inicial / FWC ===
  'FWC 1', 'FWC 3', 'FWC 4', 'FWC 7', 'FWC 9', 'FWC 10', 'FWC 11', 'FWC 13', 'FWC 14', 'FWC 18', 'FWC 19',

  // === Grupo A ===
  // México
  'MEX 1', 'MEX 2', 'MEX 3', 'MEX 7',
  // África do Sul
  'RSA 2', 'RSA 4', 'RSA 7', 'RSA 9', 'RSA 10', 'RSA 11', 'RSA 13', 'RSA 14', 'RSA 17', 'RSA 20',
  // Coreia do Sul
  'KOR 5', 'KOR 9', 'KOR 11', 'KOR 12', 'KOR 13', 'KOR 14', 'KOR 15', 'KOR 18', 'KOR 20',
  // Rep. Tcheca
  'CZE 1', 'CZE 2', 'CZE 11', 'CZE 17',

  // === Grupo B ===
  // Canadá
  'CAN 5', 'CAN 6', 'CAN 8', 'CAN 13', 'CAN 14', 'CAN 15',
  // Bósnia
  'BIH 11', 'BIH 13', 'BIH 17',
  // Catar
  'QAT 1', 'QAT 3', 'QAT 4', 'QAT 6', 'QAT 8', 'QAT 12', 'QAT 13', 'QAT 17', 'QAT 18',
  // Suíça
  'SUI 2', 'SUI 3', 'SUI 7', 'SUI 10', 'SUI 13',

  // === Grupo C ===
  // Brasil
  'BRA 6', 'BRA 7', 'BRA 16', 'BRA 20',
  // Marrocos
  'MAR 1', 'MAR 7', 'MAR 9', 'MAR 12', 'MAR 20',
  // Haiti
  'HAI 1', 'HAI 3', 'HAI 4', 'HAI 5', 'HAI 8', 'HAI 12', 'HAI 20',
  // Escócia
  'SCO 1', 'SCO 2', 'SCO 4', 'SCO 7', 'SCO 8', 'SCO 12',

  // === Grupo D ===
  // Estados Unidos
  'USA 1', 'USA 5', 'USA 11', 'USA 12', 'USA 13', 'USA 14', 'USA 16', 'USA 19',
  // Paraguai
  'PAR 6', 'PAR 8', 'PAR 9', 'PAR 12', 'PAR 16',
  // Austrália
  'AUS 2', 'AUS 5', 'AUS 8', 'AUS 12', 'AUS 16', 'AUS 17', 'AUS 19',
  // Turquia
  'TUR 1', 'TUR 4', 'TUR 13', 'TUR 15',

  // === Grupo E ===
  // Alemanha
  'GER 13', 'GER 15', 'GER 20',
  // Curaçao
  'CUW 7', 'CUW 8', 'CUW 9', 'CUW 12', 'CUW 13', 'CUW 14', 'CUW 18',
  // Costa do Marfim
  'CIV 4', 'CIV 5', 'CIV 14', 'CIV 17',
  // Equador
  'ECU 1', 'ECU 5', 'ECU 6', 'ECU 7', 'ECU 9', 'ECU 11',

  // === Grupo F ===
  // Holanda
  'NED 12', 'NED 16',
  // Japão
  'JPN 5', 'JPN 7', 'JPN 9', 'JPN 10',
  // Suécia
  'SWE 2', 'SWE 6', 'SWE 12',
  // Tunísia
  'TUN 12', 'TUN 13',

  // === Grupo G ===
  // Bélgica
  'BEL 12', 'BEL 13', 'BEL 18', 'BEL 19',
  // Egito
  'EGY 4', 'EGY 11', 'EGY 16', 'EGY 17',
  // Irã
  'IRN 7', 'IRN 8', 'IRN 12', 'IRN 13',
  // Nova Zelândia
  'NZL 3', 'NZL 6', 'NZL 12', 'NZL 13', 'NZL 19', 'NZL 20',

  // === Grupo H ===
  // Espanha
  'ESP 3', 'ESP 16',
  // Cabo Verde
  'CPV 3', 'CPV 11', 'CPV 12', 'CPV 17',
  // Arábia Saudita
  'KSA 1', 'KSA 4', 'KSA 6', 'KSA 7', 'KSA 10', 'KSA 11', 'KSA 12', 'KSA 13', 'KSA 14', 'KSA 16', 'KSA 18', 'KSA 20',
  // Uruguai
  'URU 1', 'URU 11', 'URU 13', 'URU 14', 'URU 15', 'URU 18', 'URU 20',

  // === Grupo I ===
  // França (Nenhuma marcada)
  // Senegal
  'SEN 5', 'SEN 15', 'SEN 17', 'SEN 18', 'SEN 19',
  // Iraque
  'IRQ 1', 'IRQ 8', 'IRQ 9', 'IRQ 10', 'IRQ 13', 'IRQ 14', 'IRQ 18', 'IRQ 19',
  // Noruega
  'NOR 5', 'NOR 11', 'NOR 13',

  // === Grupo J ===
  // Argentina
  'ARG 13', 'ARG 16', 'ARG 17', 'ARG 20',
  // Argélia
  'ALG 1', 'ALG 4', 'ALG 6', 'ALG 11', 'ALG 13', 'ALG 14',
  // Áustria
  'AUT 8', 'AUT 12', 'AUT 13', 'AUT 19',
  // Jordânia
  'JOR 3', 'JOR 8', 'JOR 9', 'JOR 13', 'JOR 15', 'JOR 18', 'JOR 19',

  // === Grupo K ===
  // Portugal
  'POR 8', 'POR 9', 'POR 12', 'POR 13', 'POR 16', 'POR 19', 'POR 20',
  // Congo RD
  'COD 13', 'COD 14', 'COD 17', 'COD 18',
  // Uzbequistão
  'UZB 2', 'UZB 5', 'UZB 9', 'UZB 13', 'UZB 15', 'UZB 17', 'UZB 19',
  // Colômbia
  'COL 2', 'COL 6', 'COL 19',

  // === Grupo L ===
  // Inglaterra
  'ENG 6', 'ENG 7', 'ENG 17', 'ENG 18',
  // Croácia
  'CRO 1', 'CRO 3', 'CRO 4', 'CRO 7', 'CRO 8', 'CRO 9', 'CRO 11', 'CRO 12', 'CRO 20',
  // Gana
  'GHA 1', 'GHA 2', 'GHA 10', 'GHA 13', 'GHA 14', 'GHA 15', 'GHA 18', 'GHA 20',
  // Panamá
  'PAN 3', 'PAN 10', 'PAN 12', 'PAN 19', 'PAN 20',
];

