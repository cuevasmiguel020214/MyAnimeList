-- ============================================================================
-- Datos de prueba para AniVault
-- Ejecutar DESPUÉS de schema.sql
-- ============================================================================

USE animelistmejorado;

-- ─── Animes de prueba ───────────────────────────────────────────────────────
INSERT INTO anime (title, description, image, score, genres, episodes, status) VALUES
('Solo Leveling', 'Sung Jinwoo es el cazador más débil de rango E. Después de un evento en una mazmorra peligrosa, despierta con un sistema único que le permite subir de nivel sin límite.', 'https://cdn.myanimelist.net/images/anime/1926/141012.jpg', 8.35, 'Acción, Aventura, Fantasía', 12, 'Finalizado'),

('Demon Slayer: Castillo Infinito', 'Tanjiro y sus compañeros se enfrentan a nuevos demonios en el arco del Castillo Infinito, mientras buscan la cura para Nezuko.', 'https://cdn.myanimelist.net/images/anime/1765/135099.jpg', 9.12, 'Acción, Sobrenatural, Drama', 26, 'En emisión'),

('Chainsaw Man Temporada 2', 'Denji continúa su vida como el Chainsaw Man mientras nuevas amenazas demoníacas surgen y su pasado comienza a revelarse.', 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg', 8.54, 'Acción, Sobrenatural', 12, 'En emisión'),

('Frieren: Más Allá del Final del Viaje T2', 'La elfa maga Frieren continúa su viaje para entender las emociones humanas, explorando nuevas tierras y enfrentando magos poderosos.', 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg', 9.25, 'Aventura, Drama, Fantasía', 28, 'Finalizado'),

('Spy × Family Temporada 3', 'La familia Forger enfrenta nuevas misiones mientras Loid mantiene su identidad secreta y Anya intenta aprobar sus exámenes.', 'https://cdn.myanimelist.net/images/anime/1506/138982.jpg', 8.67, 'Acción, Comedia', 25, 'En emisión'),

('Vinland Saga Temporada 3', 'Thorfinn busca crear una tierra pacífica libre de guerra y esclavitud mientras enfrenta los conflictos del mundo vikingo.', 'https://cdn.myanimelist.net/images/anime/1988/135834.jpg', 8.82, 'Acción, Aventura, Drama', 24, 'Finalizado'),

('Jujutsu Kaisen Temporada 3', 'Yuji Itadori y los hechiceros enfrentan la batalla decisiva contra Sukuna y las maldiciones más poderosas en el arco del Culling Game.', 'https://cdn.myanimelist.net/images/anime/1792/138022.jpg', 8.90, 'Acción, Sobrenatural', 23, 'En emisión'),

('One Piece', 'Monkey D. Luffy y los Sombrero de Paja continúan su aventura hacia el One Piece en el arco de Egghead.', 'https://cdn.myanimelist.net/images/anime/1244/138851.jpg', 8.95, 'Acción, Aventura, Comedia', 1100, 'En emisión'),

('Attack on Titan: Final', 'Eren Jaeger desata el Retumbar mientras sus amigos deben decidir si detenerlo para salvar al mundo o apoyar su plan.', 'https://cdn.myanimelist.net/images/anime/1279/131078.jpg', 9.05, 'Acción, Drama, Militar', 87, 'Finalizado'),

('My Hero Academia Temporada 7', 'Los héroes se enfrentan a la batalla final contra All For One y Shigaraki mientras Deku utiliza todo el poder del One For All.', 'https://cdn.myanimelist.net/images/anime/1234/141345.jpg', 8.15, 'Acción, Superhéroes', 21, 'Finalizado');

-- ─── Mangas de prueba ───────────────────────────────────────────────────────
INSERT INTO manga (title, description, image, score, genres, chapters, status) VALUES
('One Piece', 'La épica aventura pirata de Monkey D. Luffy para encontrar el tesoro legendario y convertirse en el Rey de los Piratas.', 'https://cdn.myanimelist.net/images/manga/2/253146.jpg', 9.21, 'Acción, Aventura, Comedia', 1120, 'En publicación'),

('Jujutsu Kaisen', 'Yuji Itadori se convierte en recipiente de Sukuna y se une a la Escuela de Hechicería para combatir maldiciones.', 'https://cdn.myanimelist.net/images/manga/3/210341.jpg', 8.55, 'Acción, Sobrenatural', 271, 'Finalizado'),

('Chainsaw Man', 'Denji, un joven endeudado, se fusiona con su demonio motosierra y se convierte en un cazador de demonios para el gobierno.', 'https://cdn.myanimelist.net/images/manga/3/216464.jpg', 8.80, 'Acción, Sobrenatural, Gore', 180, 'En publicación'),

('Berserk', 'Guts, un guerrero solitario marcado por la tragedia, lucha contra demonios y el destino en un mundo medieval oscuro.', 'https://cdn.myanimelist.net/images/manga/1/157897.jpg', 9.48, 'Acción, Aventura, Drama, Fantasía', 375, 'En publicación'),

('Vagabond', 'La historia de Miyamoto Musashi, el espadachín más famoso de Japón, en su búsqueda de convertirse en el más fuerte.', 'https://cdn.myanimelist.net/images/manga/1/1a1.jpg', 9.25, 'Acción, Drama, Histórico', 327, 'En pausa'),

('Spy × Family', 'Un espía, una asesina y una telépata forman una familia falsa sin conocer los secretos del otro.', 'https://cdn.myanimelist.net/images/manga/2/260630.jpg', 8.60, 'Acción, Comedia', 102, 'En publicación'),

('Dandadan', 'Momo y Okarun exploran fenómenos paranormales y extraterrestres en esta historia llena de acción y comedia absurda.', 'https://cdn.myanimelist.net/images/manga/1/259279.jpg', 8.75, 'Acción, Comedia, Sobrenatural', 165, 'En publicación'),

('Blue Lock', 'Trescientos delanteros compiten en un programa radical para crear al mejor delantero del mundo para la selección japonesa.', 'https://cdn.myanimelist.net/images/manga/2/249725.jpg', 8.20, 'Deportes, Acción', 280, 'En publicación'),

('Sakamoto Days', 'Un ex-asesino legendario ahora dueño de una tienda de conveniencia debe proteger a su familia de su pasado.', 'https://cdn.myanimelist.net/images/manga/1/257873.jpg', 8.45, 'Acción, Comedia', 175, 'En publicación'),

('Kaiju No. 8', 'Kafka Hibino, un limpiador de restos de kaiju, se transforma accidentalmente en un kaiju y se une a las fuerzas de defensa.', 'https://cdn.myanimelist.net/images/manga/3/252341.jpg', 8.30, 'Acción, Ciencia ficción', 113, 'En publicación');

-- ─── Usuario de prueba ──────────────────────────────────────────────────────
-- password: test123 (hasheada con bcrypt)
INSERT INTO users (username, email, password, avatar) VALUES
('usuario_demo', 'demo@anivault.com', '$2a$10$8KzQx3B5G9yXzJ5Z1JKXO.K3M7Y6Z9X8Y2B4Q1W3E5R7T9U0I2O4A6', NULL);
