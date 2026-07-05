-- Seed data for Figurinhas Copa 2026

-- Insert all sections
INSERT INTO sections (id, name, count, confederation, flag_colors, flag_emoji) VALUES
('FWC', 'Especiais FIFA', 11, 'FIFA', '["#1A3668","#D4AF37","#0d1b2a"]'::jsonb, '🏆'),
('MEX', 'México', 21, 'CONCACAF', '["#006847","#FFFFFF","#CE1126"]'::jsonb, '🇲🇽'),
('RSA', 'África do Sul', 21, 'CAF', '["#DE3831","#FFFFFF","#002B7F"]'::jsonb, '🇿🇦'),
('KOR', 'Coreia do Sul', 21, 'AFC', '["#FFFFFF","#003478","#E60000"]'::jsonb, '🇰🇷'),
('CZE', 'Tchéquia', 21, 'UEFA', '["#11457E","#FFFFFF","#D7141A"]'::jsonb, '🇨🇿'),
('CAN', 'Canadá', 21, 'CONCACAF', '["#FF0000","#FFFFFF","#1B1B1B"]'::jsonb, '🇨🇦'),
('QAT', 'Catar', 21, 'AFC', '["#8D1B3D","#FFFFFF","#5C0D26"]'::jsonb, '🇶🇦'),
('SUI', 'Suíça', 21, 'UEFA', '["#FF0000","#FFFFFF","#1B1B1B"]'::jsonb, '🇨🇭'),
('BIH', 'Bósnia e Herzegovina', 21, 'UEFA', '["#002395","#FCD116","#1B1B1B"]'::jsonb, '🇧🇦'),
('BRA', 'Brasil', 21, 'CONMEBOL', '["#009739","#FFD700","#002776"]'::jsonb, '🇧🇷'),
('MAR', 'Marrocos', 21, 'CAF', '["#C1272D","#FFFFFF","#006233"]'::jsonb, '🇲🇦'),
('SCO', 'Escócia', 21, 'UEFA', '["#005EB8","#FFFFFF","#1B1B1B"]'::jsonb, '🏴󠁧󠁢󠁳󠁣󠁴󠁿'),
('HAI', 'Haiti', 21, 'CONCACAF', '["#00209F","#FFFFFF","#D21034"]'::jsonb, '🇭🇹'),
('USA', 'Estados Unidos', 21, 'CONCACAF', '["#B22234","#FFFFFF","#3C3B6E"]'::jsonb, '🇺🇸'),
('PAR', 'Paraguai', 21, 'CONMEBOL', '["#D52B1E","#FFFFFF","#0038A8"]'::jsonb, '🇵🇾'),
('TUR', 'Turquia', 21, 'UEFA', '["#E30A17","#FFFFFF","#1B1B1B"]'::jsonb, '🇹🇷'),
('AUS', 'Austrália', 21, 'AFC', '["#00843D","#FFCD00","#002664"]'::jsonb, '🇦🇺'),
('GER', 'Alemanha', 21, 'UEFA', '["#000000","#DD0000","#FFCE00"]'::jsonb, '🇩🇪'),
('CIV', 'Costa do Marfim', 21, 'CAF', '["#F77F00","#FFFFFF","#009E60"]'::jsonb, '🇨🇮'),
('CUW', 'Curaçao', 21, 'CONCACAF', '["#002B7F","#FFFFFF","#FEDA00"]'::jsonb, '🇨🇼'),
('ECU', 'Equador', 21, 'CONMEBOL', '["#FFD100","#003893","#ED1C24"]'::jsonb, '🇪🇨'),
('NED', 'Holanda', 21, 'UEFA', '["#FF6600","#FFFFFF","#21468B"]'::jsonb, '🇳🇱'),
('JPN', 'Japão', 21, 'AFC', '["#FFFFFF","#BC002D","#1B1B1B"]'::jsonb, '🇯🇵'),
('SWE', 'Suécia', 21, 'UEFA', '["#005B99","#FECC02","#1B1B1B"]'::jsonb, '🇸🇪'),
('TUN', 'Tunísia', 21, 'CAF', '["#E70013","#FFFFFF","#1B3A8B"]'::jsonb, '🇹🇳'),
('BEL', 'Bélgica', 21, 'UEFA', '["#000000","#FFD700","#EF3340"]'::jsonb, '🇧🇪'),
('EGY', 'Egito', 21, 'CAF', '["#CE1126","#FFFFFF","#000000"]'::jsonb, '🇪🇬'),
('IRN', 'Irã', 21, 'AFC', '["#239F40","#FFFFFF","#DA0000"]'::jsonb, '🇮🇷'),
('NZL', 'Nova Zelândia', 21, 'OFC', '["#FFFFFF","#00247D","#CC142B"]'::jsonb, '🇳🇿'),
('ESP', 'Espanha', 21, 'UEFA', '["#C60B1E","#FFC400","#1B1B1B"]'::jsonb, '🇪🇸'),
('CPV', 'Cabo Verde', 21, 'CAF', '["#003893","#FFFFFF","#CF2027"]'::jsonb, '🇨🇻'),
('KSA', 'Arábia Saudita', 21, 'AFC', '["#006C35","#FFFFFF","#1E3A2B"]'::jsonb, '🇸🇦'),
('URU', 'Uruguai', 21, 'CONMEBOL', '["#0038A8","#FFFFFF","#FFD700"]'::jsonb, '🇺🇾'),
('FRA', 'França', 21, 'UEFA', '["#002395","#FFFFFF","#ED2939"]'::jsonb, '🇫🇷'),
('SEN', 'Senegal', 21, 'CAF', '["#00853F","#FDEF42","#E31B23"]'::jsonb, '🇸🇳'),
('IRQ', 'Iraque', 21, 'AFC', '["#CE1126","#FFFFFF","#007B3A"]'::jsonb, '🇮🇶'),
('NOR', 'Noruega', 21, 'UEFA', '["#BA0C2F","#FFFFFF","#003087"]'::jsonb, '🇳🇴'),
('ARG', 'Argentina', 21, 'CONMEBOL', '["#75AADB","#FFFFFF","#FCBF49"]'::jsonb, '🇦🇷'),
('ALG', 'Argélia', 21, 'CAF', '["#006B3F","#FFFFFF","#D21034"]'::jsonb, '🇩🇿'),
('JOR', 'Jordânia', 21, 'AFC', '["#CE1126","#FFFFFF","#007B3A"]'::jsonb, '🇯🇴'),
('AUT', 'Áustria', 21, 'UEFA', '["#ED2939","#FFFFFF","#1B1B1B"]'::jsonb, '🇦🇹'),
('POR', 'Portugal', 21, 'UEFA', '["#006600","#FF0000","#FFD700"]'::jsonb, '🇵🇹'),
('COD', 'RD Congo', 21, 'CAF', '["#007FFF","#F7D618","#CE1126"]'::jsonb, '🇨🇩'),
('UZB', 'Uzbequistão', 21, 'AFC', '["#0099B5","#FFFFFF","#1EB53A"]'::jsonb, '🇺🇿'),
('COL', 'Colômbia', 21, 'CONMEBOL', '["#FCD116","#003893","#CE1126"]'::jsonb, '🇨🇴'),
('ENG', 'Inglaterra', 21, 'UEFA', '["#FFFFFF","#CF142B","#1D1D1D"]'::jsonb, '🏴󠁧󠁢󠁥󠁮󠁧󠁿'),
('GHA', 'Gana', 21, 'CAF', '["#CE1126","#FFD700","#006B3F"]'::jsonb, '🇬🇭'),
('CRO', 'Croácia', 21, 'UEFA', '["#FF0000","#FFFFFF","#171796"]'::jsonb, '🇭🇷'),
('PAN', 'Panamá', 21, 'CONCACAF', '["#005293","#FFFFFF","#D21034"]'::jsonb, '🇵🇦')
ON CONFLICT (id) DO UPDATE SET count = EXCLUDED.count;

-- Generate all stickers
DO $$
DECLARE
  sec RECORD;
  i INTEGER;
BEGIN
  FOR sec IN SELECT * FROM sections LOOP
    FOR i IN 1..sec.count LOOP
      INSERT INTO stickers (id, section_id, number)
      VALUES (sec.id || ' ' || i, sec.id, i)
      ON CONFLICT (id) DO NOTHING;
    END LOOP;
  END LOOP;
END $$;
