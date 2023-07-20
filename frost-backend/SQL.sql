
-- Вставка данных в таблицу users (Пользователи)
INSERT INTO users (email, first_name, second_name, last_name, telephone, region, city, street, home, number_home, pass,
                   "createdAt", "updatedAt")
VALUES ('user@example.com', 'John', 'Doe', 'Smith', '123456789', 'Region 1', 'City 1', 'Street 1', 'Home 1', '123',
        'password1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Вставка данных в таблицу baskets (Корзины)
INSERT INTO baskets ("userId", "createdAt", "updatedAt")
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Вставка данных в таблицу categories (Категории)
INSERT INTO categories (name, "createdAt", "updatedAt")
VALUES ('Легковые автомобили', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Грузовые автомобили', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Вставка данных в таблицу brands (Бренды)
INSERT INTO brands (name, "createdAt", "updatedAt")
VALUES ('Chevrolet', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Hyundai', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Kia', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Вставка данных в таблицу models (Модели)
INSERT INTO models (name, "brandId", "createdAt", "updatedAt")
VALUES ('Elantra', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Tucson', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Accent', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Sonata', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Captiva', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Cobalt', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Malibu', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Optima', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Sportage', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Rio', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Вставка данных в таблицу generations (Поколения)
INSERT INTO generations (name, "createdAt", "updatedAt")
VALUES ('Небула (1994-1999)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Аура (2000-2005)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Квантум (2006-2010)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Турбинекс (2011-2015)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Вортекс (2016-2020)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Галакси (2021-2023)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Спектра (1994-1999)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Инфинити (2000-2005)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Энергон (2006-2010)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Электра (2011-2015)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Пульсар (2016-2020)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Фузион (2021-2023)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Айрис (1994-1999)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Хелиос (2000-2005)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Терраплекс (2006-2010)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Мегапульс (2011-2015)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Ультранекс (2016-2020)', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Вставка данных в таблицу orders (Заказы)
INSERT INTO orders ("basketId", "createdAt", "updatedAt")
VALUES (1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Вставка данных в таблицу devices (Устройства)
INSERT INTO devices (name, price, code, manufacturer, description, available, "modelId", "brandId", "categoryId",
                     "createdAt", "updatedAt")
VALUES ('СуперКомп X10', 91999, 'CMPSR-SUPX10', 'SuperPower',
        'Мощный компрессор СуперКомп X10 с высокой производительностью и надежностью.', true, 3, 2, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('КомпактМастер 500', 92999, 'CMPSR-KMP500', 'CompactTech',
        'Компактный компрессор КомпактМастер 500 с удобной транспортировкой.', false, 5, 3, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('Ультра SilentAir 2000', 93999, 'CMPSR-SLT2000', 'SilentPower',
        'Тихий и мощный компрессор Ультра SilentAir 2000 с длительным сроком службы.', true, 9, 1, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('ЭкоКомп ECO400', 94999, 'CMPSR-EKO400', 'EcoPower',
        'Экологичный компрессор ЭкоКомп ECO400 с низким уровнем шума и высокой эффективностью.', false, 6, 2, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('ТурбоМах 1500', 95999, 'CMPSR-TBM1500', 'TurboTech',
        'Мощный и быстрый компрессор ТурбоМах 1500 для интенсивного использования.', true, 2, 1, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('ПрофиКомп X8', 96999, 'CMPSR-PFKX8', 'ProTools',
        'Профессиональный компрессор ПрофиКомп X8 с высоким крутящим моментом.', false, 7, 3, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('МегаКомпресс 3000', 97999, 'CMPSR-MGK3000', 'MegaPower',
        'Мощный компрессор МегаКомпресс 3000 для большегрузных автомобилей и промышленных приложений.', true, 8, 1, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('АвтоТурбо 1000', 98999, 'CMPSR-ATB1000', 'AutoPower',
        'Компрессор АвтоТурбо 1000 с высокой скоростью накачки шин.', false, 4, 2, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('СуперБластер 2000', 99999, 'CMPSR-SBL2000', 'SuperTech',
        'Мощный и компактный компрессор СуперБластер 2000 с быстрой подкачкой шин.', true, 10, 3, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('ЭкоВоздух ECO800', 10000, 'CMPSR-EKV800', 'EcoAir',
        'Энергоэффективный компрессор ЭкоВоздух ECO800 с низким энергопотреблением.', true, 1, 1, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('БыстроКомп 500', 11000, 'CMPSR-BKMP500', 'SpeedTech',
        'Компактный и быстродействующий компрессор БыстроКомп 500 для быстрой подкачки шин.', true, 3, 2, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('МегаБластер 3000', 12000, 'CMPSR-MBL3000', 'MegaTech',
        'Мощный компрессор МегаБластер 3000 с высокой производительностью и долгим сроком службы.', true, 7, 1, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('ТурбоПауэр 1200', 13000, 'CMPSR-TBP1200', 'TurboPower',
        'Компрессор ТурбоПауэр 1200 с высоким давлением и компактным дизайном.', true, 5, 3, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('ПрофиКомпакт 600', 13000, 'CMPSR-PRK600', 'ProCompact',
        'Профессиональный компрессор ПрофиКомпакт 600 с высокой производительностью и малыми габаритами.', true, 9, 2,
        1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('МощныйВоздух 1800', 14000, 'CMPSR-MSHV1800', 'PowerAir',
        'Мощный компрессор МощныйВоздух 1800 для интенсивного использования в автомастерских.', true, 2, 1, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('ЭкоКомпакт ECO600', 15000, 'CMPSR-EKK600', 'EcoCompact',
        'Энергоэффективный компрессор ЭкоКомпакт ECO600 с компактным и легким корпусом.', true, 8, 3, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('ТурбоBlitz 2500', 16000, 'CMPSR-TBZ2500', 'TurboBlitz',
        'Мощный и быстрый компрессор ТурбоBlitz 2500 с высокой производительностью.', true, 4, 1, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('Ультра SilentPower 2200', 17000, 'CMPSR-SLP2200', 'SilentPower',
        'Тихий и мощный компрессор Ультра SilentPower 2200 для профессионального использования.', true, 6, 2, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Профессионал X6', 18000, 'CMPSR-PRFX6', 'ProTech',
        'Профессиональный компрессор Профессионал X6 с высоким качеством сборки и надежностью.', true, 1, 3, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('ЭнергоБластер EBL4000', 19000, 'CMPSR-ENGBL4000', 'EnergyTech',
        'Мощный компрессор ЭнергоБластер EBL4000 с высоким давлением и производительностью.', true, 10, 2, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('СуперКомпакт 700', 20000, 'CMPSR-SUPK700', 'SuperCompact',
        'Мощный и компактный компрессор СуперКомпакт 700 с высокой производительностью.', true, 3, 1, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('УльтраSilentAir 2400', 21000, 'CMPSR-SLT2400', 'SilentAir',
        'Тихий и мощный компрессор УльтраSilentAir 2400 с продолжительным сроком службы.', true, 9, 3, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('ЭкоPower ECO1200', 22000, 'CMPSR-EKP1200', 'EcoPower',
        'Энергоэффективный компрессор ЭкоPower ECO1200 с низким энергопотреблением и высокой производительностью.',
        true, 6, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('ТурбоМастер 1800', 23000, 'CMPSR-TBM1800', 'TurboMaster',
        'Мощный и компактный компрессор ТурбоМастер 1800 с быстрой подкачкой шин.', true, 2, 1, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('ПрофиБластер 2800', 24000, 'CMPSR-PRBL2800', 'ProBlaster',
        'Профессиональный компрессор ПрофиБластер 2800 с высокой производительностью и долгим сроком службы.', true, 7,
        3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('МегаКомпресс 3200', 25000, 'CMPSR-MGK3200', 'MegaPower',
        'Мощный компрессор МегаКомпресс 3200 для большегрузных автомобилей и промышленных приложений.', true, 8, 1, 1,
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('АвтоТурбо 1200', 26000, 'CMPSR-ATB1200', 'AutoPower',
        'Компрессор АвтоТурбо 1200 с высокой скоростью накачки шин.', true, 4, 2, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('СуперБластер 2200', 27000, 'CMPSR-SBL2200', 'SuperTech',
        'Мощный и компактный компрессор СуперБластер 2200 с быстрой подкачкой шин.', true, 10, 3, 2, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('СуперБластер 2300', 28000, 'CMPSR-SBL2200', 'SuperTech',
        'Мощный и компактный компрессор СуперБластер 2200 с быстрой подкачкой шин.', true, 10, 3, 2, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('СуперБластер 2400', 29000, 'CMPSR-SBL2200', 'SuperTech',
        'Мощный и компактный компрессор СуперБластер 2200 с быстрой подкачкой шин.', true, 10, 3, 2, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('СуперБластер 2500', 30000, 'CMPSR-SBL2200', 'SuperTech',
        'Мощный и компактный компрессор СуперБластер 2200 с быстрой подкачкой шин.', true, 10, 3, 2, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       ('СуперБластер 2600', 31000, 'CMPSR-SBL2200', 'SuperTech',
        'Мощный и компактный компрессор СуперБластер 2200 с быстрой подкачкой шин.', true, 10, 3, 2, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP);


-- Вставка данных в таблицу reviews (Отзывы)
INSERT INTO reviews ("userId", "deviceId", "text", "createdAt", "updatedAt")
VALUES (1, 1, 'Отличный компрессор, работает безупречно!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 2, 'Небольшой и удобный компрессор, идеально подходит для путешествий.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       (1, 3, 'Мощный и надежный компрессор, рекомендую!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 4, 'Очень тихий и эффективный компрессор, доволен покупкой.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 5, 'Быстро накачивает шины, отличный выбор!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 6, 'Профессиональный компрессор, справляется с любыми задачами.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 7, 'Идеальный компрессор для больших автомобилей и промышленного использования.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       (1, 8, 'Компрессор с высокой скоростью накачки шин, рекомендую.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 9, 'Мощный и компактный компрессор, отличное соотношение цена-качество.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       (1, 10, 'Тихий и мощный компрессор, идеально подходит для использования дома.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       (1, 11, 'Компактный и мощный компрессор, удобно брать с собой в поездки.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 12, 'Профессиональный компрессор с высокой производительностью, очень доволен.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       (1, 13, 'Быстрый и надежный компрессор, рекомендую всем автовладельцам.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 14, 'Компактный и легкий компрессор, отлично подходит для мобильного использования.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       (1, 15, 'Мощный компрессор с высоким давлением, идеально подходит для интенсивного использования.',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 16, 'Тихий и мощный компрессор, идеально подходит для профессионального использования.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       (1, 17, 'Профессиональный компрессор с высоким качеством сборки, рекомендую.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       (1, 18, 'Мощный компрессор для большегрузных автомобилей и промышленных приложений.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP),
       (1, 19, 'Быстрая подкачка шин, очень удобно в использовании.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 20, 'Компактный и мощный компрессор, идеально подходит для автомастерских.', CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP);


-- Вставка данных в таблицу images (Изображения)
INSERT INTO images (path, "deviceId", "createdAt", "updatedAt")
VALUES
        ('image1.png', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('image2.png', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('image3.png', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('image4.png', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('image5.png', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('image6.png', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('image7.png', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)

;

-- Вставка данных в таблицу generations_type (Типы поколений)
INSERT INTO generation_types ("createdAt", "updatedAt", "generationId", "modelId", "deviceId")
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, 1),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 2, 2),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3, 3, 3),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 4, 4, 4),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 5, 5, 5),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 6, 6, 6),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 7, 7, 7),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 8, 8, 8),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 3, 9, 9),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 10, 10, 10),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 11, 1, 11),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 4, 2, 12),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 13, 3, 13),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 14, 4, 14),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 15, 5, 15),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 16, 6, 16),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 9, 7, 17),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 13, 8, 18),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 8, 9, 19),
       (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 13, 10, 20);


-- Вставка данных в таблицу basketDevices (Устройства в корзине)


INSERT INTO countries (name, "createdAt", "updatedAt")
VALUES ('Казахстан', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Создание записи о регионе Алматы
INSERT INTO regions (name, "countryId", "createdAt", "updatedAt")
VALUES ('Алматы', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- 1 - идентификатор страны Казахстан

-- Создание записи о регионе Нур-Султан
INSERT INTO regions (name, "countryId", "createdAt", "updatedAt")
VALUES ('Нур-Султан', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- 1 - идентификатор страны Казахстан

-- Создание записи о регионе Шымкент
INSERT INTO regions (name, "countryId", "createdAt", "updatedAt")
VALUES ('Шымкент', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP); -- 1 - идентификатор страны Казахстан


