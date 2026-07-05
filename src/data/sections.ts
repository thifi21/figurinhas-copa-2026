export interface Section {
  id: string;
  name: string;
  count: number;
  confederation: string;
  colors: string[];
  flag: string;
  group?: string;
  page?: number;
}

export const SECTIONS: Section[] = [
  { id: 'FWC', name: 'Especiais FIFA', count: 17, confederation: 'FIFA', colors: ["#1A3668","#D4AF37","#0d1b2a"], flag: '🏆', group: 'FWC', page: 106 },
  { id: 'MEX', name: 'México', count: 20, confederation: 'CONCACAF', colors: ["#006847","#FFFFFF","#CE1126"], flag: '🇲🇽', group: 'A', page: 8 },
  { id: 'RSA', name: 'África do Sul', count: 20, confederation: 'CAF', colors: ["#DE3831","#FFFFFF","#002B7F"], flag: '🇿🇦', group: 'A', page: 10 },
  { id: 'KOR', name: 'Coreia do Sul', count: 20, confederation: 'AFC', colors: ["#FFFFFF","#003478","#E60000"], flag: '🇰🇷', group: 'A', page: 12 },
  { id: 'CZE', name: 'Tchéquia', count: 20, confederation: 'UEFA', colors: ["#11457E","#FFFFFF","#D7141A"], flag: '🇨🇿', group: 'A', page: 14 },
  { id: 'CAN', name: 'Canadá', count: 20, confederation: 'CONCACAF', colors: ["#FF0000","#FFFFFF","#1B1B1B"], flag: '🇨🇦', group: 'B', page: 16 },
  { id: 'QAT', name: 'Catar', count: 20, confederation: 'AFC', colors: ["#8D1B3D","#FFFFFF","#5C0D26"], flag: '🇶🇦', group: 'B', page: 18 },
  { id: 'SUI', name: 'Suíça', count: 20, confederation: 'UEFA', colors: ["#FF0000","#FFFFFF","#1B1B1B"], flag: '🇨🇭', group: 'B', page: 20 },
  { id: 'BIH', name: 'Bósnia e Herzegovina', count: 20, confederation: 'UEFA', colors: ["#002395","#FCD116","#1B1B1B"], flag: '🇧🇦', group: 'B', page: 22 },
  { id: 'BRA', name: 'Brasil', count: 20, confederation: 'CONMEBOL', colors: ["#009739","#FFD700","#002776"], flag: '🇧🇷', group: 'C', page: 24 },
  { id: 'MAR', name: 'Marrocos', count: 20, confederation: 'CAF', colors: ["#C1272D","#FFFFFF","#006233"], flag: '🇲🇦', group: 'C', page: 26 },
  { id: 'SCO', name: 'Escócia', count: 20, confederation: 'UEFA', colors: ["#005EB8","#FFFFFF","#1B1B1B"], flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C', page: 28 },
  { id: 'HAI', name: 'Haiti', count: 20, confederation: 'CONCACAF', colors: ["#00209F","#FFFFFF","#D21034"], flag: '🇭🇹', group: 'C', page: 30 },
  { id: 'USA', name: 'Estados Unidos', count: 20, confederation: 'CONCACAF', colors: ["#B22234","#FFFFFF","#3C3B6E"], flag: '🇺🇸', group: 'D', page: 32 },
  { id: 'PAR', name: 'Paraguai', count: 20, confederation: 'CONMEBOL', colors: ["#D52B1E","#FFFFFF","#0038A8"], flag: '🇵🇾', group: 'D', page: 34 },
  { id: 'TUR', name: 'Turquia', count: 20, confederation: 'UEFA', colors: ["#E30A17","#FFFFFF","#1B1B1B"], flag: '🇹🇷', group: 'D', page: 36 },
  { id: 'AUS', name: 'Austrália', count: 20, confederation: 'AFC', colors: ["#00843D","#FFCD00","#002664"], flag: '🇦🇺', group: 'D', page: 38 },
  { id: 'GER', name: 'Alemanha', count: 20, confederation: 'UEFA', colors: ["#000000","#DD0000","#FFCE00"], flag: '🇩🇪', group: 'E', page: 40 },
  { id: 'CIV', name: 'Costa do Marfim', count: 20, confederation: 'CAF', colors: ["#F77F00","#FFFFFF","#009E60"], flag: '🇨🇮', group: 'E', page: 42 },
  { id: 'ECU', name: 'Equador', count: 20, confederation: 'CONMEBOL', colors: ["#FFD100","#003893","#ED1C24"], flag: '🇪🇨', group: 'E', page: 44 },
  { id: 'CUW', name: 'Curaçao', count: 20, confederation: 'CONCACAF', colors: ["#002B7F","#FFFFFF","#FEDA00"], flag: '🇨🇼', group: 'E', page: 46 },
  { id: 'NED', name: 'Holanda', count: 20, confederation: 'UEFA', colors: ["#FF6600","#FFFFFF","#21468B"], flag: '🇳🇱', group: 'F', page: 48 },
  { id: 'SWE', name: 'Suécia', count: 20, confederation: 'UEFA', colors: ["#005B99","#FECC02","#1B1B1B"], flag: '🇸🇪', group: 'F', page: 50 },
  { id: 'TUN', name: 'Tunísia', count: 20, confederation: 'CAF', colors: ["#E70013","#FFFFFF","#1B3A8B"], flag: '🇹🇳', group: 'F', page: 52 },
  { id: 'JPN', name: 'Japão', count: 20, confederation: 'AFC', colors: ["#FFFFFF","#BC002D","#1B1B1B"], flag: '🇯🇵', group: 'F', page: 54 },
  { id: 'BEL', name: 'Bélgica', count: 20, confederation: 'UEFA', colors: ["#000000","#FFD700","#EF3340"], flag: '🇧🇪', group: 'G', page: 56 },
  { id: 'NZL', name: 'Nova Zelândia', count: 20, confederation: 'OFC', colors: ["#FFFFFF","#00247D","#CC142B"], flag: '🇳🇿', group: 'G', page: 58 },
  { id: 'EGY', name: 'Egito', count: 20, confederation: 'CAF', colors: ["#CE1126","#FFFFFF","#000000"], flag: '🇪🇬', group: 'G', page: 60 },
  { id: 'IRN', name: 'Irã', count: 20, confederation: 'AFC', colors: ["#239F40","#FFFFFF","#DA0000"], flag: '🇮🇷', group: 'G', page: 62 },
  { id: 'ESP', name: 'Espanha', count: 20, confederation: 'UEFA', colors: ["#C60B1E","#FFC400","#1B1B1B"], flag: '🇪🇸', group: 'H', page: 64 },
  { id: 'KSA', name: 'Arábia Saudita', count: 20, confederation: 'AFC', colors: ["#006C35","#FFFFFF","#1E3A2B"], flag: '🇸🇦', group: 'H', page: 66 },
  { id: 'CPV', name: 'Cabo Verde', count: 20, confederation: 'CAF', colors: ["#003893","#FFFFFF","#CF2027"], flag: '🇨🇻', group: 'H', page: 68 },
  { id: 'URU', name: 'Uruguai', count: 20, confederation: 'CONMEBOL', colors: ["#0038A8","#FFFFFF","#FFD700"], flag: '🇺🇾', group: 'H', page: 70 },
  { id: 'FRA', name: 'França', count: 20, confederation: 'UEFA', colors: ["#002395","#FFFFFF","#ED2939"], flag: '🇫🇷', group: 'I', page: 72 },
  { id: 'IRQ', name: 'Iraque', count: 20, confederation: 'AFC', colors: ["#CE1126","#FFFFFF","#007B3A"], flag: '🇮🇶', group: 'I', page: 74 },
  { id: 'SEN', name: 'Senegal', count: 20, confederation: 'CAF', colors: ["#00853F","#FDEF42","#E31B23"], flag: '🇸🇳', group: 'I', page: 76 },
  { id: 'NOR', name: 'Noruega', count: 20, confederation: 'UEFA', colors: ["#BA0C2F","#FFFFFF","#003087"], flag: '🇳🇴', group: 'I', page: 78 },
  { id: 'ARG', name: 'Argentina', count: 20, confederation: 'CONMEBOL', colors: ["#75AADB","#FFFFFF","#FCBF49"], flag: '🇦🇷', group: 'J', page: 80 },
  { id: 'ALG', name: 'Argélia', count: 20, confederation: 'CAF', colors: ["#006B3F","#FFFFFF","#D21034"], flag: '🇩🇿', group: 'J', page: 82 },
  { id: 'JOR', name: 'Jordânia', count: 20, confederation: 'AFC', colors: ["#CE1126","#FFFFFF","#007B3A"], flag: '🇯🇴', group: 'J', page: 84 },
  { id: 'AUT', name: 'Áustria', count: 20, confederation: 'UEFA', colors: ["#ED2939","#FFFFFF","#1B1B1B"], flag: '🇦🇹', group: 'J', page: 86 },
  { id: 'POR', name: 'Portugal', count: 20, confederation: 'UEFA', colors: ["#006600","#FF0000","#FFD700"], flag: '🇵🇹', group: 'K', page: 88 },
  { id: 'COD', name: 'RD Congo', count: 20, confederation: 'CAF', colors: ["#007FFF","#F7D618","#CE1126"], flag: '🇨🇩', group: 'K', page: 90 },
  { id: 'UZB', name: 'Uzbequistão', count: 20, confederation: 'AFC', colors: ["#0099B5","#FFFFFF","#1EB53A"], flag: '🇺🇿', group: 'K', page: 92 },
  { id: 'COL', name: 'Colômbia', count: 20, confederation: 'CONMEBOL', colors: ["#FCD116","#003893","#CE1126"], flag: '🇨🇴', group: 'K', page: 94 },
  { id: 'ENG', name: 'Inglaterra', count: 20, confederation: 'UEFA', colors: ["#FFFFFF","#CF142B","#1D1D1D"], flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L', page: 96 },
  { id: 'PAN', name: 'Panamá', count: 20, confederation: 'CONCACAF', colors: ["#005293","#FFFFFF","#D21034"], flag: '🇵🇦', group: 'L', page: 98 },
  { id: 'CRO', name: 'Croácia', count: 20, confederation: 'UEFA', colors: ["#FF0000","#FFFFFF","#171796"], flag: '🇭🇷', group: 'L', page: 100 },
  { id: 'GHA', name: 'Gana', count: 20, confederation: 'CAF', colors: ["#CE1126","#FFD700","#006B3F"], flag: '🇬🇭', group: 'L', page: 102 },
  { id: 'CC', name: 'Coca-Cola', count: 14, confederation: 'FIFA', colors: ["#F40009","#FFFFFF","#000000"], flag: '🥤', group: 'CC' }
];

export const TOTAL_STICKERS = SECTIONS.reduce((acc, s) => acc + s.count, 0);

export function getSection(id: string): Section {
  return SECTIONS.find(s => s.id === id) || SECTIONS[0];
}

export function getStickerId(sectionId: string, num: number): string {
  return `${sectionId} ${num}`;
}

export function parseStickerId(id: string): { sectionId: string; number: number } {
  const parts = id.split(' ');
  return { sectionId: parts[0], number: parseInt(parts[1]) };
}
