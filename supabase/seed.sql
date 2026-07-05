-- Seed data for Figurinhas Copa 2026

-- Insert all sections
INSERT INTO sections (id, name, count, confederation, flag_colors, flag_emoji) VALUES
('FWC', 'Especiais FIFA', 17, 'FIFA', '["#1A3668","#D4AF37","#0d1b2a"]'::jsonb, '🏆'),
('MEX', 'México', 20, 'CONCACAF', '["#006847","#FFFFFF","#CE1126"]'::jsonb, '🇲🇽'),
('RSA', 'África do Sul', 20, 'CAF', '["#DE3831","#FFFFFF","#002B7F"]'::jsonb, '🇿🇦'),
('KOR', 'Coreia do Sul', 20, 'AFC', '["#FFFFFF","#003478","#E60000"]'::jsonb, '🇰🇷'),
('CZE', 'Tchéquia', 20, 'UEFA', '["#11457E","#FFFFFF","#D7141A"]'::jsonb, '🇨🇿'),
('CAN', 'Canadá', 20, 'CONCACAF', '["#FF0000","#FFFFFF","#1B1B1B"]'::jsonb, '🇨🇦'),
('QAT', 'Catar', 20, 'AFC', '["#8D1B3D","#FFFFFF","#5C0D26"]'::jsonb, '🇶🇦'),
('SUI', 'Suíça', 20, 'UEFA', '["#FF0000","#FFFFFF","#1B1B1B"]'::jsonb, '🇨🇭'),
('BIH', 'Bósnia e Herzegovina', 20, 'UEFA', '["#002395","#FCD116","#1B1B1B"]'::jsonb, '🇧🇦'),
('BRA', 'Brasil', 20, 'CONMEBOL', '["#009739","#FFD700","#002776"]'::jsonb, '🇧🇷'),
('MAR', 'Marrocos', 20, 'CAF', '["#C1272D","#FFFFFF","#006233"]'::jsonb, '🇲🇦'),
('SCO', 'Escócia', 20, 'UEFA', '["#005EB8","#FFFFFF","#1B1B1B"]'::jsonb, '🏴󠁧󠁢󠁳󠁣󠁴󠁿'),
('HAI', 'Haiti', 20, 'CONCACAF', '["#00209F","#FFFFFF","#D21034"]'::jsonb, '🇭🇹'),
('USA', 'Estados Unidos', 20, 'CONCACAF', '["#B22234","#FFFFFF","#3C3B6E"]'::jsonb, '🇺🇸'),
('PAR', 'Paraguai', 20, 'CONMEBOL', '["#D52B1E","#FFFFFF","#0038A8"]'::jsonb, '🇵🇾'),
('TUR', 'Turquia', 20, 'UEFA', '["#E30A17","#FFFFFF","#1B1B1B"]'::jsonb, '🇹🇷'),
('AUS', 'Austrália', 20, 'AFC', '["#00843D","#FFCD00","#002664"]'::jsonb, '🇦🇺'),
('GER', 'Alemanha', 20, 'UEFA', '["#000000","#DD0000","#FFCE00"]'::jsonb, '🇩🇪'),
('CIV', 'Costa do Marfim', 20, 'CAF', '["#F77F00","#FFFFFF","#009E60"]'::jsonb, '🇨🇮'),
('ECU', 'Equador', 20, 'CONMEBOL', '["#FFD100","#003893","#ED1C24"]'::jsonb, '🇪🇨'),
('CUW', 'Curaçao', 20, 'CONCACAF', '["#002B7F","#FFFFFF","#FEDA00"]'::jsonb, '🇨🇼'),
('NED', 'Holanda', 20, 'UEFA', '["#FF6600","#FFFFFF","#21468B"]'::jsonb, '🇳🇱'),
('SWE', 'Suécia', 20, 'UEFA', '["#005B99","#FECC02","#1B1B1B"]'::jsonb, '🇸🇪'),
('TUN', 'Tunísia', 20, 'CAF', '["#E70013","#FFFFFF","#1B3A8B"]'::jsonb, '🇹🇳'),
('JPN', 'Japão', 20, 'AFC', '["#FFFFFF","#BC002D","#1B1B1B"]'::jsonb, '🇯🇵'),
('BEL', 'Bélgica', 20, 'UEFA', '["#000000","#FFD700","#EF3340"]'::jsonb, '🇧🇪'),
('NZL', 'Nova Zelândia', 20, 'OFC', '["#FFFFFF","#00247D","#CC142B"]'::jsonb, '🇳🇿'),
('EGY', 'Egito', 20, 'CAF', '["#CE1126","#FFFFFF","#000000"]'::jsonb, '🇪🇬'),
('IRN', 'Irã', 20, 'AFC', '["#239F40","#FFFFFF","#DA0000"]'::jsonb, '🇮🇷'),
('ESP', 'Espanha', 20, 'UEFA', '["#C60B1E","#FFC400","#1B1B1B"]'::jsonb, '🇪🇸'),
('KSA', 'Arábia Saudita', 20, 'AFC', '["#006C35","#FFFFFF","#1E3A2B"]'::jsonb, '🇸🇦'),
('CPV', 'Cabo Verde', 20, 'CAF', '["#003893","#FFFFFF","#CF2027"]'::jsonb, '🇨🇻'),
('URU', 'Uruguai', 20, 'CONMEBOL', '["#0038A8","#FFFFFF","#FFD700"]'::jsonb, '🇺🇾'),
('FRA', 'França', 20, 'UEFA', '["#002395","#FFFFFF","#ED2939"]'::jsonb, '🇫🇷'),
('IRQ', 'Iraque', 20, 'AFC', '["#CE1126","#FFFFFF","#007B3A"]'::jsonb, '🇮🇶'),
('SEN', 'Senegal', 20, 'CAF', '["#00853F","#FDEF42","#E31B23"]'::jsonb, '🇸🇳'),
('NOR', 'Noruega', 20, 'UEFA', '["#BA0C2F","#FFFFFF","#003087"]'::jsonb, '🇳🇴'),
('ARG', 'Argentina', 20, 'CONMEBOL', '["#75AADB","#FFFFFF","#FCBF49"]'::jsonb, '🇦🇷'),
('ALG', 'Argélia', 20, 'CAF', '["#006B3F","#FFFFFF","#D21034"]'::jsonb, '🇩🇿'),
('JOR', 'Jordânia', 20, 'AFC', '["#CE1126","#FFFFFF","#007B3A"]'::jsonb, '🇯🇴'),
('AUT', 'Áustria', 20, 'UEFA', '["#ED2939","#FFFFFF","#1B1B1B"]'::jsonb, '🇦🇹'),
('POR', 'Portugal', 20, 'UEFA', '["#006600","#FF0000","#FFD700"]'::jsonb, '🇵🇹'),
('COD', 'RD Congo', 20, 'CAF', '["#007FFF","#F7D618","#CE1126"]'::jsonb, '🇨🇩'),
('UZB', 'Uzbequistão', 20, 'AFC', '["#0099B5","#FFFFFF","#1EB53A"]'::jsonb, '🇺🇿'),
('COL', 'Colômbia', 20, 'CONMEBOL', '["#FCD116","#003893","#CE1126"]'::jsonb, '🇨🇴'),
('ENG', 'Inglaterra', 20, 'UEFA', '["#FFFFFF","#CF142B","#1D1D1D"]'::jsonb, '🏴󠁧󠁢󠁥󠁮󠁧󠁿'),
('PAN', 'Panamá', 20, 'CONCACAF', '["#005293","#FFFFFF","#D21034"]'::jsonb, '🇵🇦'),
('CRO', 'Croácia', 20, 'UEFA', '["#FF0000","#FFFFFF","#171796"]'::jsonb, '🇭🇷'),
('GHA', 'Gana', 20, 'CAF', '["#CE1126","#FFD700","#006B3F"]'::jsonb, '🇬🇭'),
('CC', 'Coca-Cola', 14, 'FIFA', '["#F40009","#FFFFFF","#000000"]'::jsonb, '🥤')
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
