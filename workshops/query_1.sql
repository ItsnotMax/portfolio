SELECT
    '{' +
    '"ИД": "' + CAST(ИД AS NVARCHAR(50)) + '", ' +
    '"Номер": ' + CAST(Номер AS NVARCHAR(10)) + ', ' +
    '"Тип": "' + Тип + '", ' +
    '"Длина": ' + CAST(Длина AS NVARCHAR(10)) + ', ' +
    '"Ширина": ' + CAST(Ширина AS NVARCHAR(10)) + ', ' +
    '"Высота": ' + CAST(Высота AS NVARCHAR(10)) + ', ' +
    '"Вес": ' + CAST(Вес AS NVARCHAR(10)) + ', ' +
    '"Пустой": ' + CASE WHEN Пустой = 1 THEN 'true' ELSE 'false' END + ', ' +
    '"ДатаПоступления": "' + FORMAT(ДатаПоступления, 'yyyy-MM-ddTHH:mm:ss') + '"' +
    '}' AS JSONData
FROM Контейнеры;
