CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `mainid` int(11) NOT NULL,
  `nodeid` int(11) NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `email` varchar(250) DEFAULT NULL,
  `website` varchar(250) DEFAULT NULL,
  `comment` text,
  `spam` bit(1) DEFAULT NULL,
  `ham` bit(1) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
)
