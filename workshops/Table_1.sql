CREATE TABLE Контейнеры (
    ИД UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Номер INT NOT NULL,
    Тип NVARCHAR(255) NOT NULL,
    Длина INT NOT NULL,
    Ширина INT NOT NULL,
    Высота INT NOT NULL,
    Вес INT NOT NULL,
    Пустой BIT NOT NULL,
    ДатаПоступления DATETIME NOT NULL
);
