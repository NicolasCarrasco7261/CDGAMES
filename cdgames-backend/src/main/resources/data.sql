
-- CDGAMES DATA SEED

-- Usuario admin
INSERT INTO usuarios (nombre, email, password, rol, estado, created_at)
VALUES ('Carlos López', 'carc.lopez@cdgames.cl',
        '$2a$10$SjzDrVGr6eNFikDu.WgldeH2qmITtsQ44HM5x/uvoN9e7crRuHzJa',
        'ADMINISTRADOR', 'ACTIVO', NOW());

-- Categorías base
INSERT INTO categorias (nombre, activo) VALUES
('Nintendo', 1),
('PlayStation', 1),
('Xbox', 1),
('PC', 1),
('Retro', 1);

-- Productos (tabla en SINGULAR: producto)
INSERT INTO producto (codigo, nombre, descripcion, precio, stock, stock_critico, imagen_url, categoria_id, activo, fecha_creacion)
VALUES
('NIN001', 'The Legend of Zelda: Tears of the Kingdom', 'Aventura épica para Nintendo Switch', 54990, 12, 3, 'https://th.bing.com/th/id/R.def196325cbf271a9e6c2890a967c62b?rik=xt2m5D2G8r2Wdg&pid=ImgRaw&r=0', 1, 1, NOW()),
('NIN002', 'Super Smash Bros Ultimate', 'Juego de lucha con personajes clásicos', 49990, 8, 2, 'https://th.bing.com/th/id/R.9657ee64a27a20485659ce7956a42bcb?rik=Cuk2laRA9Cp0Mg&riu=http%3a%2f%2fcdn02.nintendo-europe.com%2fmedia%2fimages%2f11_square_images%2fgames_18%2fnintendo_switch_5%2fSQ_NSwitch_SuperSmashBrosUltimate_02.jpg&ehk=4C69NFitkMzFnAyxeYl7f6OZ8AuDC%2fOL2zJATFYQQg4%3d&risl=&pid=ImgRaw&r=0', 1, 1, NOW()),
('NIN003', 'Mario Kart 8 Deluxe', 'Carreras frenéticas', 45990, 6, 2, 'https://tse4.mm.bing.net/th/id/OIP.BBZPWZKM6akjJWy3Vb8apQHaK9?rs=1&pid=ImgDetMain&o=7&rm=3', 1, 1, NOW()),

('PS001', 'God of War: Ragnarök', 'Acción y mitología nórdica en PS5', 59990, 10, 3, 'https://tse3.mm.bing.net/th/id/OIP.6m0Ln4TBVeqjaDg9bscHLAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', 2, 1, NOW()),
('PS002', 'The Last of Us Part II', 'Aventura y drama postapocalíptico', 49990, 7, 2, 'https://gamingbolt.com/wp-content/uploads/2023/12/the-last-of-us-part-2-remastered-key-art.jpg', 2, 1, NOW()),
('PS003', 'Spider-Man: Miles Morales', 'Acción y exploración en NY', 46990, 9, 2, 'https://tse2.mm.bing.net/th/id/OIP.-PMUg2ecJ_9HYJFaDq4DdQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', 2, 1, NOW()),

('XBX001', 'Halo Infinite', 'Shooter icónico de Xbox', 52990, 8, 3, 'https://tse3.mm.bing.net/th/id/OIP.J94YulO3z3hnN92e-vQNAAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3', 3, 1, NOW()),
('XBX002', 'Forza Horizon 5', 'Conducción en mundo abierto', 49990, 11, 4, 'https://store-images.s-microsoft.com/image/apps.49800.13718773309227929.bebdcc0e-1ed5-4778-8732-f4ef65a2f445.9ac09d39-064d-466c-81ca-2f1b6f0b95c5', 3, 1, NOW()),
('XBX003', 'Gears 5', 'Acción táctica en tercera persona', 45990, 5, 2, 'https://th.bing.com/th/id/R.5c2ba98abae7069e9659c9ee08ca0ce7?rik=b4J%2bkHJWVfGSIg&pid=ImgRaw&r=0', 3, 1, NOW()),

('PC001', 'Cyberpunk 2077', 'Acción futurista en Night City', 39990, 10, 3, 'https://tse1.mm.bing.net/th/id/OIP.NSlU9gXGETC-UJGhdMRJUwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3', 4, 1, NOW()),
('PC002', 'Baldur’s Gate 3', 'RPG basado en D&D', 59990, 6, 2, 'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/ba706e54d68d10a0eb6ab7c36cdad9178c58b7fb7bb03d28.png', 4, 1, NOW()),
('PC003', 'Counter-Strike 2', 'Shooter competitivo multijugador', 60000, 20, 5, 'https://www.gaming.net/wp-content/uploads/2023/03/Counter-Strike-2-1.jpg', 4, 1, NOW()),

('NIN004', 'Super Mario Bros Wonder', 'Plataformas familiar', 49990, 15, 3, 'https://assets-prd.ignimgs.com/2023/06/22/1x1-supermariobroswonder-1687454112497.jpg', 1, 1, NOW()),
('PS004', 'Resident Evil 4 Remake', 'Terror y acción', 56990, 4, 1, 'https://bayanbox.ir/view/234174512839235324/Resident-Evil-4-Remake-cover-small.jpg', 2, 1, NOW()),
('PC004', 'Elden Ring', 'Fantasía oscura', 59990, 7, 2, 'https://th.bing.com/th/id/R.4639fed79ca6fd43c1050efceeb62017?rik=md6w5YJbvgZEDw&pid=ImgRaw&r=0', 4, 1, NOW());
