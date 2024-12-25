CREATE TABLE Операции (
    ИД UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ИДКонтейнера UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES Контейнеры(ИД),
    ДатаНачалаОперации DATETIME NOT NULL,
    ДатаОкончанияОперации DATETIME NOT NULL,
    ТипОперации NVARCHAR(255) NOT NULL,
    ФИООператора NVARCHAR(255) NOT NULL,
    МестоИнспекции NVARCHAR(255) NOT NULL
);
