CREATE TABLE [Comment]
(
[id] INT NOT NULL PRIMARY KEY,
[mainid] INT NOT NULL,
[nodeid] INT NOT NULL,
[name] NVARCHAR (250),
[email] NVARCHAR (250),
[website] NVARCHAR (250),
[comment] NTEXT,
[spam] BIT,
[ham] BIT,
[created] DATETIME
);

ALTER TABLE [Comment]
ALTER COLUMN [id] INT NOT NULL IDENTITY (1, 1);
