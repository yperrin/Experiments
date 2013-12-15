CREATE TABLE [Comment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[mainid] [int] NOT NULL,
	[nodeid] [int] NOT NULL,
	[name] [nvarchar](250) NULL,
	[email] [nvarchar](250) NULL,
	[website] [nvarchar](250) NULL,
	[comment] [ntext] NULL,
	[spam] [bit] NULL,
	[ham] [bit] NULL,
	[created] [datetime] NULL
 CONSTRAINT [PK_Comment] PRIMARY KEY CLUSTERED 
(
	[id] ASC
));