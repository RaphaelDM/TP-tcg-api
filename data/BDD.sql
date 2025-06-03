-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 03 juin 2025 à 00:50
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tp_tcg`
--

-- --------------------------------------------------------

--
-- Structure de la table `auctions`
--

DROP TABLE IF EXISTS `auctions`;
CREATE TABLE IF NOT EXISTS `auctions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `card_id` int NOT NULL,
  `seller_id` int NOT NULL,
  `end_date` datetime(3) NOT NULL,
  `bidder_id` int DEFAULT NULL,
  `bid` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `auctions_card_id_fkey` (`card_id`),
  KEY `auctions_seller_id_fkey` (`seller_id`),
  KEY `auctions_bidder_id_fkey` (`bidder_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `auctions`
--

INSERT INTO `auctions` (`id`, `card_id`, `seller_id`, `end_date`, `bidder_id`, `bid`) VALUES
(16, 147, 4, '2025-06-03 01:30:14.706', NULL, 500);

-- --------------------------------------------------------

--
-- Structure de la table `card`
--

DROP TABLE IF EXISTS `card`;
CREATE TABLE IF NOT EXISTS `card` (
  `id` int NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rarity` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `card`
--

INSERT INTO `card` (`id`, `name`, `rarity`, `image`) VALUES
(1, 'Bulbizarre', 'common', 'https://img.pokemondb.net/artwork/large/bulbasaur.jpg'),
(2, 'Herbizarre', 'common', 'https://img.pokemondb.net/artwork/large/ivysaur.jpg'),
(3, 'Florizarre', 'rare', 'https://img.pokemondb.net/artwork/large/venusaur.jpg'),
(4, 'Salamèche', 'common', 'https://img.pokemondb.net/artwork/large/charmander.jpg'),
(5, 'Reptincel', 'common', 'https://img.pokemondb.net/artwork/large/charmeleon.jpg'),
(6, 'Dracaufeu', 'rare', 'https://img.pokemondb.net/artwork/large/charizard.jpg'),
(7, 'Carapuce', 'common', 'https://img.pokemondb.net/artwork/large/squirtle.jpg'),
(8, 'Carabaffe', 'common', 'https://img.pokemondb.net/artwork/large/wartortle.jpg'),
(9, 'Tortank', 'rare', 'https://img.pokemondb.net/artwork/large/blastoise.jpg'),
(10, 'Chenipan', 'common', 'https://img.pokemondb.net/artwork/large/caterpie.jpg'),
(11, 'Chrysacier', 'common', 'https://img.pokemondb.net/artwork/large/metapod.jpg'),
(12, 'Papilusion', 'common', 'https://img.pokemondb.net/artwork/large/butterfree.jpg'),
(13, 'Aspicot', 'common', 'https://img.pokemondb.net/artwork/large/weedle.jpg'),
(14, 'Coconfort', 'common', 'https://img.pokemondb.net/artwork/large/kakuna.jpg'),
(15, 'Dardargnan', 'common', 'https://img.pokemondb.net/artwork/large/beedrill.jpg'),
(16, 'Roucool', 'common', 'https://img.pokemondb.net/artwork/large/pidgey.jpg'),
(17, 'Roucoups', 'common', 'https://img.pokemondb.net/artwork/large/pidgeotto.jpg'),
(18, 'Roucarnage', 'common', 'https://img.pokemondb.net/artwork/large/pidgeot.jpg'),
(19, 'Rattata', 'common', 'https://img.pokemondb.net/artwork/large/rattata.jpg'),
(20, 'Rattatac', 'common', 'https://img.pokemondb.net/artwork/large/raticate.jpg'),
(21, 'Piafabec', 'common', 'https://img.pokemondb.net/artwork/large/spearow.jpg'),
(22, 'Rapasdepic', 'common', 'https://img.pokemondb.net/artwork/large/fearow.jpg'),
(23, 'Abo', 'common', 'https://img.pokemondb.net/artwork/large/ekans.jpg'),
(24, 'Arbok', 'common', 'https://img.pokemondb.net/artwork/large/arbok.jpg'),
(25, 'Pikachu', 'common', 'https://img.pokemondb.net/artwork/large/pikachu.jpg'),
(26, 'Raichu', 'rare', 'https://img.pokemondb.net/artwork/large/raichu.jpg'),
(27, 'Sabelette', 'common', 'https://img.pokemondb.net/artwork/large/sandshrew.jpg'),
(28, 'Sablaireau', 'common', 'https://img.pokemondb.net/artwork/large/sandslash.jpg'),
(29, 'Nidoran♀', 'common', 'https://img.pokemondb.net/artwork/large/nidoran-f.jpg'),
(30, 'Nidorina', 'common', 'https://img.pokemondb.net/artwork/large/nidorina.jpg'),
(31, 'Nidoqueen', 'common', 'https://img.pokemondb.net/artwork/large/nidoqueen.jpg'),
(32, 'Nidoran♂', 'common', 'https://img.pokemondb.net/artwork/large/nidoran-m.jpg'),
(33, 'Nidorino', 'common', 'https://img.pokemondb.net/artwork/large/nidorino.jpg'),
(34, 'Nidoking', 'common', 'https://img.pokemondb.net/artwork/large/nidoking.jpg'),
(35, 'Mélofée', 'common', 'https://img.pokemondb.net/artwork/large/clefairy.jpg'),
(36, 'Mélodelfe', 'common', 'https://img.pokemondb.net/artwork/large/clefable.jpg'),
(37, 'Goupix', 'common', 'https://img.pokemondb.net/artwork/large/vulpix.jpg'),
(38, 'Feunard', 'rare', 'https://img.pokemondb.net/artwork/large/ninetales.jpg'),
(39, 'Rondoudou', 'common', 'https://img.pokemondb.net/artwork/large/jigglypuff.jpg'),
(40, 'Grodoudou', 'common', 'https://img.pokemondb.net/artwork/large/wigglytuff.jpg'),
(41, 'Nosferapti', 'common', 'https://img.pokemondb.net/artwork/large/zubat.jpg'),
(42, 'Nosferalto', 'common', 'https://img.pokemondb.net/artwork/large/golbat.jpg'),
(43, 'Mystherbe', 'common', 'https://img.pokemondb.net/artwork/large/oddish.jpg'),
(44, 'Ortide', 'common', 'https://img.pokemondb.net/artwork/large/gloom.jpg'),
(45, 'Rafflesia', 'rare', 'https://img.pokemondb.net/artwork/large/vileplume.jpg'),
(46, 'Paras', 'common', 'https://img.pokemondb.net/artwork/large/paras.jpg'),
(47, 'Parasect', 'common', 'https://img.pokemondb.net/artwork/large/parasect.jpg'),
(48, 'Mimitoss', 'common', 'https://img.pokemondb.net/artwork/large/venonat.jpg'),
(49, 'Aéromite', 'common', 'https://img.pokemondb.net/artwork/large/venomoth.jpg'),
(50, 'Taupiqueur', 'common', 'https://img.pokemondb.net/artwork/large/diglett.jpg'),
(51, 'Triopikeur', 'common', 'https://img.pokemondb.net/artwork/large/dugtrio.jpg'),
(52, 'Miaouss', 'common', 'https://img.pokemondb.net/artwork/large/meowth.jpg'),
(53, 'Persian', 'common', 'https://img.pokemondb.net/artwork/large/persian.jpg'),
(54, 'Psykokwak', 'common', 'https://img.pokemondb.net/artwork/large/psyduck.jpg'),
(55, 'Akwakwak', 'common', 'https://img.pokemondb.net/artwork/large/golduck.jpg'),
(56, 'Férosinge', 'common', 'https://img.pokemondb.net/artwork/large/mankey.jpg'),
(57, 'Colossinge', 'common', 'https://img.pokemondb.net/artwork/large/primeape.jpg'),
(58, 'Caninos', 'common', 'https://img.pokemondb.net/artwork/large/growlithe.jpg'),
(59, 'Arcanin', 'rare', 'https://img.pokemondb.net/artwork/large/arcanine.jpg'),
(60, 'Ptitard', 'common', 'https://img.pokemondb.net/artwork/large/poliwag.jpg'),
(61, 'Têtarte', 'common', 'https://img.pokemondb.net/artwork/large/poliwhirl.jpg'),
(62, 'Tartard', 'common', 'https://img.pokemondb.net/artwork/large/poliwrath.jpg'),
(63, 'Abra', 'common', 'https://img.pokemondb.net/artwork/large/abra.jpg'),
(64, 'Kadabra', 'common', 'https://img.pokemondb.net/artwork/large/kadabra.jpg'),
(65, 'Alakazam', 'rare', 'https://img.pokemondb.net/artwork/large/alakazam.jpg'),
(66, 'Machoc', 'common', 'https://img.pokemondb.net/artwork/large/machop.jpg'),
(67, 'Machopeur', 'common', 'https://img.pokemondb.net/artwork/large/machoke.jpg'),
(68, 'Mackogneur', 'rare', 'https://img.pokemondb.net/artwork/large/machamp.jpg'),
(69, 'Chétiflor', 'common', 'https://img.pokemondb.net/artwork/large/bellsprout.jpg'),
(70, 'Boustiflor', 'common', 'https://img.pokemondb.net/artwork/large/weepinbell.jpg'),
(71, 'Empiflor', 'common', 'https://img.pokemondb.net/artwork/large/victreebel.jpg'),
(72, 'Tentacool', 'common', 'https://img.pokemondb.net/artwork/large/tentacool.jpg'),
(73, 'Tentacruel', 'common', 'https://img.pokemondb.net/artwork/large/tentacruel.jpg'),
(74, 'Racaillou', 'common', 'https://img.pokemondb.net/artwork/large/geodude.jpg'),
(75, 'Gravalanch', 'common', 'https://img.pokemondb.net/artwork/large/graveler.jpg'),
(76, 'Grolem', 'common', 'https://img.pokemondb.net/artwork/large/golem.jpg'),
(77, 'Ponyta', 'common', 'https://img.pokemondb.net/artwork/large/ponyta.jpg'),
(78, 'Galopa', 'common', 'https://img.pokemondb.net/artwork/large/rapidash.jpg'),
(79, 'Ramoloss', 'common', 'https://img.pokemondb.net/artwork/large/slowpoke.jpg'),
(80, 'Flagadoss', 'common', 'https://img.pokemondb.net/artwork/large/slowbro.jpg'),
(81, 'Magnéti', 'common', 'https://img.pokemondb.net/artwork/large/magnemite.jpg'),
(82, 'Magnéton', 'common', 'https://img.pokemondb.net/artwork/large/magneton.jpg'),
(83, 'Canarticho', 'common', 'https://img.pokemondb.net/artwork/large/farfetchd.jpg'),
(84, 'Doduo', 'common', 'https://img.pokemondb.net/artwork/large/doduo.jpg'),
(85, 'Dodrio', 'common', 'https://img.pokemondb.net/artwork/large/dodrio.jpg'),
(86, 'Otaria', 'common', 'https://img.pokemondb.net/artwork/large/seel.jpg'),
(87, 'Lamantine', 'common', 'https://img.pokemondb.net/artwork/large/dewgong.jpg'),
(88, 'Tadmorv', 'common', 'https://img.pokemondb.net/artwork/large/grimer.jpg'),
(89, 'Grotadmorv', 'common', 'https://img.pokemondb.net/artwork/large/muk.jpg'),
(90, 'Kokiyas', 'common', 'https://img.pokemondb.net/artwork/large/shellder.jpg'),
(91, 'Crustabri', 'common', 'https://img.pokemondb.net/artwork/large/cloyster.jpg'),
(92, 'Fantominus', 'common', 'https://img.pokemondb.net/artwork/large/gastly.jpg'),
(93, 'Spectrum', 'common', 'https://img.pokemondb.net/artwork/large/haunter.jpg'),
(94, 'Ectoplasma', 'rare', 'https://img.pokemondb.net/artwork/large/gengar.jpg'),
(95, 'Onix', 'common', 'https://img.pokemondb.net/artwork/large/onix.jpg'),
(96, 'Soporifik', 'common', 'https://img.pokemondb.net/artwork/large/drowzee.jpg'),
(97, 'Hypnomade', 'common', 'https://img.pokemondb.net/artwork/large/hypno.jpg'),
(98, 'Krabby', 'common', 'https://img.pokemondb.net/artwork/large/krabby.jpg'),
(99, 'Krabboss', 'common', 'https://img.pokemondb.net/artwork/large/kingler.jpg'),
(100, 'Voltorbe', 'common', 'https://img.pokemondb.net/artwork/large/voltorbe.jpg'),
(101, 'Électrode', 'common', 'https://img.pokemondb.net/artwork/large/electrode.jpg'),
(102, 'Noeunoeuf', 'common', 'https://img.pokemondb.net/artwork/large/exeggcute.jpg'),
(103, 'Noadkoko', 'common', 'https://img.pokemondb.net/artwork/large/exeggutor.jpg'),
(104, 'Osselait', 'common', 'https://img.pokemondb.net/artwork/large/cubone.jpg'),
(105, 'Ossatueur', 'common', 'https://img.pokemondb.net/artwork/large/marowak.jpg'),
(106, 'Kicklee', 'common', 'https://img.pokemondb.net/artwork/large/hitmonlee.jpg'),
(107, 'Tygnon', 'common', 'https://img.pokemondb.net/artwork/large/hitmonchan.jpg'),
(108, 'Excelangue', 'common', 'https://img.pokemondb.net/artwork/large/lickitung.jpg'),
(109, 'Smogo', 'common', 'https://img.pokemondb.net/artwork/large/koffing.jpg'),
(110, 'Smogogo', 'common', 'https://img.pokemondb.net/artwork/large/weezing.jpg'),
(111, 'Rhinocorne', 'common', 'https://img.pokemondb.net/artwork/large/rhyhorn.jpg'),
(112, 'Rhinoféros', 'common', 'https://img.pokemondb.net/artwork/large/rhydon.jpg'),
(113, 'Leveinard', 'common', 'https://img.pokemondb.net/artwork/large/chansey.jpg'),
(114, 'Saquedeneu', 'common', 'https://img.pokemondb.net/artwork/large/tangela.jpg'),
(115, 'Kangourex', 'common', 'https://img.pokemondb.net/artwork/large/kangaskhan.jpg'),
(116, 'Hypotrempe', 'common', 'https://img.pokemondb.net/artwork/large/horsea.jpg'),
(117, 'Hypocéan', 'common', 'https://img.pokemondb.net/artwork/large/seadra.jpg'),
(118, 'Poissirène', 'common', 'https://img.pokemondb.net/artwork/large/goldeen.jpg'),
(119, 'Poissoroy', 'common', 'https://img.pokemondb.net/artwork/large/seaking.jpg'),
(120, 'Stari', 'common', 'https://img.pokemondb.net/artwork/large/staryu.jpg'),
(121, 'Staross', 'common', 'https://img.pokemondb.net/artwork/large/starmie.jpg'),
(122, 'M. Mime', 'common', 'https://img.pokemondb.net/artwork/large/mr-mime.jpg'),
(123, 'Insécateur', 'common', 'https://img.pokemondb.net/artwork/large/scyther.jpg'),
(124, 'Lippoutou', 'common', 'https://img.pokemondb.net/artwork/large/jynx.jpg'),
(125, 'Élektek', 'common', 'https://img.pokemondb.net/artwork/large/electabuzz.jpg'),
(126, 'Magmar', 'common', 'https://img.pokemondb.net/artwork/large/magmar.jpg'),
(127, 'Scarabrute', 'common', 'https://img.pokemondb.net/artwork/large/pinsir.jpg'),
(128, 'Tauros', 'common', 'https://img.pokemondb.net/artwork/large/tauros.jpg'),
(129, 'Magicarpe', 'common', 'https://img.pokemondb.net/artwork/large/magikarp.jpg'),
(130, 'Léviator', 'rare', 'https://img.pokemondb.net/artwork/large/gyarados.jpg'),
(131, 'Lokhlass', 'rare', 'https://img.pokemondb.net/artwork/large/lapras.jpg'),
(132, 'Métamorph', 'rare', 'https://img.pokemondb.net/artwork/large/ditto.jpg'),
(133, 'Évoli', 'common', 'https://img.pokemondb.net/artwork/large/eevee.jpg'),
(134, 'Aquali', 'rare', 'https://img.pokemondb.net/artwork/large/vaporeon.jpg'),
(135, 'Voltali', 'rare', 'https://img.pokemondb.net/artwork/large/jolteon.jpg'),
(136, 'Pyroli', 'rare', 'https://img.pokemondb.net/artwork/large/flareon.jpg'),
(137, 'Porygon', 'common', 'https://img.pokemondb.net/artwork/large/porygon.jpg'),
(138, 'Amonita', 'common', 'https://img.pokemondb.net/artwork/large/omanyte.jpg'),
(139, 'Amonistar', 'common', 'https://img.pokemondb.net/artwork/large/omastar.jpg'),
(140, 'Kabuto', 'common', 'https://img.pokemondb.net/artwork/large/kabuto.jpg'),
(141, 'Kabutops', 'common', 'https://img.pokemondb.net/artwork/large/kabutops.jpg'),
(142, 'Ptéra', 'common', 'https://img.pokemondb.net/artwork/large/aerodactyl.jpg'),
(143, 'Ronflex', 'rare', 'https://img.pokemondb.net/artwork/large/snorlax.jpg'),
(144, 'Artikodin', 'legendary', 'https://img.pokemondb.net/artwork/large/articuno.jpg'),
(145, 'Électhor', 'legendary', 'https://img.pokemondb.net/artwork/large/zapdos.jpg'),
(146, 'Sulfura', 'legendary', 'https://img.pokemondb.net/artwork/large/moltres.jpg'),
(147, 'Minidraco', 'common', 'https://img.pokemondb.net/artwork/large/dratini.jpg'),
(148, 'Draco', 'common', 'https://img.pokemondb.net/artwork/large/dragonair.jpg'),
(149, 'Dracolosse', 'rare', 'https://img.pokemondb.net/artwork/large/dragonite.jpg'),
(150, 'Mewtwo', 'legendary', 'https://img.pokemondb.net/artwork/large/mewtwo.jpg'),
(151, 'Mew', 'legendary', 'https://img.pokemondb.net/artwork/large/mew.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `collection` json NOT NULL,
  `lastBooster` bigint DEFAULT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `currency` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_username_key` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `collection`, `lastBooster`, `token`, `currency`) VALUES
(3, 'Rachrach', 'ui', '[{\"id\": 25, \"name\": \"Pikachu\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/pikachu.jpg\", \"rarity\": \"common\"}, {\"id\": 40, \"name\": \"Grodoudou\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/wigglytuff.jpg\", \"rarity\": \"common\"}, {\"id\": 148, \"name\": \"Draco\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/dragonair.jpg\", \"rarity\": \"common\"}, {\"id\": 61, \"name\": \"Têtarte\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/poliwhirl.jpg\", \"rarity\": \"common\"}, {\"id\": 63, \"name\": \"Abra\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/abra.jpg\", \"rarity\": \"common\"}, {\"id\": 141, \"name\": \"Kabutops\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/kabutops.jpg\", \"rarity\": \"common\"}, {\"id\": 94, \"name\": \"Ectoplasma\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/gengar.jpg\", \"rarity\": \"rare\"}, {\"id\": 43, \"name\": \"Mystherbe\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/oddish.jpg\", \"rarity\": \"common\"}, {\"id\": 149, \"name\": \"Dracolosse\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/dragonite.jpg\", \"rarity\": \"rare\"}, {\"id\": 6, \"name\": \"Dracaufeu\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/charizard.jpg\", \"rarity\": \"rare\"}, {\"id\": 115, \"name\": \"Kangourex\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/kangaskhan.jpg\", \"rarity\": \"common\"}, {\"id\": 134, \"name\": \"Aquali\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/vaporeon.jpg\", \"rarity\": \"rare\"}, {\"id\": 18, \"name\": \"Roucarnage\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/pidgeot.jpg\", \"rarity\": \"common\"}, {\"id\": 76, \"name\": \"Grolem\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/golem.jpg\", \"rarity\": \"common\"}, {\"id\": 99, \"count\": 2}, {\"id\": 131, \"name\": \"Lokhlass\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/lapras.jpg\", \"rarity\": \"rare\"}, {\"id\": 65, \"name\": \"Alakazam\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/alakazam.jpg\", \"rarity\": \"rare\"}, {\"id\": 54, \"name\": \"Psykokwak\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/psyduck.jpg\", \"rarity\": \"common\"}, {\"id\": 51, \"name\": \"Triopikeur\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/dugtrio.jpg\", \"rarity\": \"common\"}]', 1748909818872, NULL, 2360),
(4, 'Raph', '1', '[{\"id\": 56, \"name\": \"Férosinge\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/mankey.jpg\", \"rarity\": \"common\"}, {\"id\": 61, \"name\": \"Têtarte\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/poliwhirl.jpg\", \"rarity\": \"common\"}, {\"id\": 66, \"name\": \"Machoc\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/machop.jpg\", \"rarity\": \"common\"}, {\"id\": 102, \"name\": \"Noeunoeuf\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/exeggcute.jpg\", \"rarity\": \"common\"}, {\"id\": 99, \"name\": \"Krabboss\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/kingler.jpg\", \"rarity\": \"common\"}, {\"id\": 137, \"name\": \"Porygon\", \"count\": 8, \"image\": \"https://img.pokemondb.net/artwork/large/porygon.jpg\", \"rarity\": \"common\"}, {\"id\": 94, \"name\": \"Ectoplasma\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/gengar.jpg\", \"rarity\": \"rare\"}, {\"id\": 74, \"name\": \"Racaillou\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/geodude.jpg\", \"rarity\": \"common\"}, {\"id\": 2, \"name\": \"Herbizarre\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/ivysaur.jpg\", \"rarity\": \"common\"}, {\"id\": 38, \"name\": \"Feunard\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/ninetales.jpg\", \"rarity\": \"rare\"}, {\"id\": 65, \"name\": \"Alakazam\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/alakazam.jpg\", \"rarity\": \"rare\"}, {\"id\": 69, \"name\": \"Chétiflor\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/bellsprout.jpg\", \"rarity\": \"common\"}, {\"id\": 8, \"name\": \"Carabaffe\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/wartortle.jpg\", \"rarity\": \"common\"}, {\"id\": 47, \"name\": \"Parasect\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/parasect.jpg\", \"rarity\": \"common\"}, {\"id\": 33, \"name\": \"Nidorino\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/nidorino.jpg\", \"rarity\": \"common\"}, {\"id\": 82, \"name\": \"Magnéton\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/magneton.jpg\", \"rarity\": \"common\"}, {\"id\": 25, \"name\": \"Pikachu\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/pikachu.jpg\", \"rarity\": \"common\"}, {\"id\": 116, \"name\": \"Hypotrempe\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/horsea.jpg\", \"rarity\": \"common\"}, {\"id\": 85, \"name\": \"Dodrio\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/dodrio.jpg\", \"rarity\": \"common\"}, {\"id\": 11, \"name\": \"Chrysacier\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/metapod.jpg\", \"rarity\": \"common\"}, {\"id\": 42, \"name\": \"Nosferalto\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/golbat.jpg\", \"rarity\": \"common\"}, {\"id\": 53, \"name\": \"Persian\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/persian.jpg\", \"rarity\": \"common\"}, {\"id\": 67, \"name\": \"Machopeur\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/machoke.jpg\", \"rarity\": \"common\"}, {\"id\": 3, \"name\": \"Florizarre\", \"count\": 8, \"image\": \"https://img.pokemondb.net/artwork/large/venusaur.jpg\", \"rarity\": \"rare\"}, {\"id\": 19, \"name\": \"Rattata\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/rattata.jpg\", \"rarity\": \"common\"}, {\"id\": 76, \"name\": \"Grolem\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/golem.jpg\", \"rarity\": \"common\"}, {\"id\": 121, \"name\": \"Staross\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/starmie.jpg\", \"rarity\": \"common\"}, {\"id\": 103, \"name\": \"Noadkoko\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/exeggutor.jpg\", \"rarity\": \"common\"}, {\"id\": 37, \"name\": \"Goupix\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/vulpix.jpg\", \"rarity\": \"common\"}, {\"id\": 144, \"name\": \"Artikodin\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/articuno.jpg\", \"rarity\": \"legendary\"}, {\"id\": 12, \"name\": \"Papilusion\", \"count\": 8, \"image\": \"https://img.pokemondb.net/artwork/large/butterfree.jpg\", \"rarity\": \"common\"}, {\"id\": 16, \"name\": \"Roucool\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/pidgey.jpg\", \"rarity\": \"common\"}, {\"id\": 50, \"name\": \"Taupiqueur\", \"count\": 8, \"image\": \"https://img.pokemondb.net/artwork/large/diglett.jpg\", \"rarity\": \"common\"}, {\"id\": 96, \"name\": \"Soporifik\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/drowzee.jpg\", \"rarity\": \"common\"}, {\"id\": 133, \"name\": \"Évoli\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/eevee.jpg\", \"rarity\": \"common\"}, {\"id\": 90, \"name\": \"Kokiyas\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/shellder.jpg\", \"rarity\": \"common\"}, {\"id\": 136, \"name\": \"Pyroli\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/flareon.jpg\", \"rarity\": \"rare\"}, {\"id\": 46, \"name\": \"Paras\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/paras.jpg\", \"rarity\": \"common\"}, {\"id\": 138, \"name\": \"Amonita\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/omanyte.jpg\", \"rarity\": \"common\"}, {\"id\": 32, \"name\": \"Nidoran♂\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/nidoran-m.jpg\", \"rarity\": \"common\"}, {\"id\": 24, \"name\": \"Arbok\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/arbok.jpg\", \"rarity\": \"common\"}, {\"id\": 114, \"name\": \"Saquedeneu\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/tangela.jpg\", \"rarity\": \"common\"}, {\"id\": 113, \"name\": \"Leveinard\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/chansey.jpg\", \"rarity\": \"common\"}, {\"id\": 35, \"name\": \"Mélofée\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/clefairy.jpg\", \"rarity\": \"common\"}, {\"id\": 143, \"name\": \"Ronflex\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/snorlax.jpg\", \"rarity\": \"rare\"}, {\"id\": 26, \"name\": \"Raichu\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/raichu.jpg\", \"rarity\": \"rare\"}, {\"id\": 139, \"name\": \"Amonistar\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/omastar.jpg\", \"rarity\": \"common\"}, {\"id\": 39, \"name\": \"Rondoudou\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/jigglypuff.jpg\", \"rarity\": \"common\"}, {\"id\": 45, \"name\": \"Rafflesia\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/vileplume.jpg\", \"rarity\": \"rare\"}, {\"id\": 14, \"name\": \"Coconfort\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/kakuna.jpg\", \"rarity\": \"common\"}, {\"id\": 5, \"name\": \"Reptincel\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/charmeleon.jpg\", \"rarity\": \"common\"}, {\"id\": 142, \"name\": \"Ptéra\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/aerodactyl.jpg\", \"rarity\": \"common\"}, {\"id\": 130, \"name\": \"Léviator\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/gyarados.jpg\", \"rarity\": \"rare\"}, {\"id\": 105, \"name\": \"Ossatueur\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/marowak.jpg\", \"rarity\": \"common\"}, {\"id\": 77, \"name\": \"Ponyta\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/ponyta.jpg\", \"rarity\": \"common\"}, {\"id\": 30, \"name\": \"Nidorina\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/nidorina.jpg\", \"rarity\": \"common\"}, {\"id\": 140, \"name\": \"Kabuto\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/kabuto.jpg\", \"rarity\": \"common\"}, {\"id\": 151, \"name\": \"Mew\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/mew.jpg\", \"rarity\": \"legendary\"}, {\"id\": 36, \"name\": \"Mélodelfe\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/clefable.jpg\", \"rarity\": \"common\"}, {\"id\": 13, \"name\": \"Aspicot\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/weedle.jpg\", \"rarity\": \"common\"}, {\"id\": 91, \"name\": \"Crustabri\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/cloyster.jpg\", \"rarity\": \"common\"}, {\"id\": 41, \"name\": \"Nosferapti\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/zubat.jpg\", \"rarity\": \"common\"}, {\"id\": 1, \"name\": \"Bulbizarre\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/bulbasaur.jpg\", \"rarity\": \"common\"}, {\"id\": 128, \"name\": \"Tauros\", \"count\": 11, \"image\": \"https://img.pokemondb.net/artwork/large/tauros.jpg\", \"rarity\": \"common\"}, {\"id\": 110, \"name\": \"Smogogo\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/weezing.jpg\", \"rarity\": \"common\"}, {\"id\": 115, \"name\": \"Kangourex\", \"count\": 10, \"image\": \"https://img.pokemondb.net/artwork/large/kangaskhan.jpg\", \"rarity\": \"common\"}, {\"id\": 72, \"name\": \"Tentacool\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/tentacool.jpg\", \"rarity\": \"common\"}, {\"id\": 64, \"name\": \"Kadabra\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/kadabra.jpg\", \"rarity\": \"common\"}, {\"id\": 80, \"name\": \"Flagadoss\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/slowbro.jpg\", \"rarity\": \"common\"}, {\"id\": 9, \"name\": \"Tortank\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/blastoise.jpg\", \"rarity\": \"rare\"}, {\"id\": 141, \"name\": \"Kabutops\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/kabutops.jpg\", \"rarity\": \"common\"}, {\"id\": 84, \"name\": \"Doduo\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/doduo.jpg\", \"rarity\": \"common\"}, {\"id\": 10, \"name\": \"Chenipan\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/caterpie.jpg\", \"rarity\": \"common\"}, {\"id\": 125, \"name\": \"Élektek\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/electabuzz.jpg\", \"rarity\": \"common\"}, {\"id\": 58, \"name\": \"Caninos\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/growlithe.jpg\", \"rarity\": \"common\"}, {\"id\": 81, \"name\": \"Magnéti\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/magnemite.jpg\", \"rarity\": \"common\"}, {\"id\": 100, \"name\": \"Voltorbe\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/voltorbe.jpg\", \"rarity\": \"common\"}, {\"id\": 106, \"name\": \"Kicklee\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/hitmonlee.jpg\", \"rarity\": \"common\"}, {\"id\": 48, \"name\": \"Mimitoss\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/venonat.jpg\", \"rarity\": \"common\"}, {\"id\": 111, \"name\": \"Rhinocorne\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/rhyhorn.jpg\", \"rarity\": \"common\"}, {\"id\": 54, \"name\": \"Psykokwak\", \"count\": 10, \"image\": \"https://img.pokemondb.net/artwork/large/psyduck.jpg\", \"rarity\": \"common\"}, {\"id\": 63, \"name\": \"Abra\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/abra.jpg\", \"rarity\": \"common\"}, {\"id\": 59, \"name\": \"Arcanin\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/arcanine.jpg\", \"rarity\": \"rare\"}, {\"id\": 21, \"name\": \"Piafabec\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/spearow.jpg\", \"rarity\": \"common\"}, {\"id\": 60, \"name\": \"Ptitard\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/poliwag.jpg\", \"rarity\": \"common\"}, {\"id\": 108, \"name\": \"Excelangue\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/lickitung.jpg\", \"rarity\": \"common\"}, {\"id\": 134, \"name\": \"Aquali\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/vaporeon.jpg\", \"rarity\": \"rare\"}, {\"id\": 148, \"name\": \"Draco\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/dragonair.jpg\", \"rarity\": \"common\"}, {\"id\": 89, \"name\": \"Grotadmorv\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/muk.jpg\", \"rarity\": \"common\"}, {\"id\": 43, \"name\": \"Mystherbe\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/oddish.jpg\", \"rarity\": \"common\"}, {\"id\": 88, \"name\": \"Tadmorv\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/grimer.jpg\", \"rarity\": \"common\"}, {\"id\": 124, \"name\": \"Lippoutou\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/jynx.jpg\", \"rarity\": \"common\"}, {\"id\": 95, \"name\": \"Onix\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/onix.jpg\", \"rarity\": \"common\"}, {\"id\": 98, \"name\": \"Krabby\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/krabby.jpg\", \"rarity\": \"common\"}, {\"id\": 135, \"name\": \"Voltali\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/jolteon.jpg\", \"rarity\": \"rare\"}, {\"id\": 29, \"name\": \"Nidoran♀\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/nidoran-f.jpg\", \"rarity\": \"common\"}, {\"id\": 28, \"name\": \"Sablaireau\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/sandslash.jpg\", \"rarity\": \"common\"}, {\"id\": 15, \"name\": \"Dardargnan\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/beedrill.jpg\", \"rarity\": \"common\"}, {\"id\": 123, \"name\": \"Insécateur\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/scyther.jpg\", \"rarity\": \"common\"}, {\"id\": 83, \"name\": \"Canarticho\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/farfetchd.jpg\", \"rarity\": \"common\"}, {\"id\": 34, \"name\": \"Nidoking\", \"count\": 7, \"image\": \"https://img.pokemondb.net/artwork/large/nidoking.jpg\", \"rarity\": \"common\"}, {\"id\": 52, \"name\": \"Miaouss\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/meowth.jpg\", \"rarity\": \"common\"}, {\"id\": 51, \"name\": \"Triopikeur\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/dugtrio.jpg\", \"rarity\": \"common\"}, {\"id\": 146, \"name\": \"Sulfura\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/moltres.jpg\", \"rarity\": \"legendary\"}, {\"id\": 118, \"name\": \"Poissirène\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/goldeen.jpg\", \"rarity\": \"common\"}, {\"id\": 49, \"name\": \"Aéromite\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/venomoth.jpg\", \"rarity\": \"common\"}, {\"id\": 104, \"name\": \"Osselait\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/cubone.jpg\", \"rarity\": \"common\"}, {\"id\": 62, \"name\": \"Tartard\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/poliwrath.jpg\", \"rarity\": \"common\"}, {\"id\": 31, \"name\": \"Nidoqueen\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/nidoqueen.jpg\", \"rarity\": \"common\"}, {\"id\": 23, \"name\": \"Abo\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/ekans.jpg\", \"rarity\": \"common\"}, {\"id\": 40, \"name\": \"Grodoudou\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/wigglytuff.jpg\", \"rarity\": \"common\"}, {\"id\": 57, \"name\": \"Colossinge\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/primeape.jpg\", \"rarity\": \"common\"}, {\"id\": 68, \"name\": \"Mackogneur\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/machamp.jpg\", \"rarity\": \"rare\"}, {\"id\": 79, \"name\": \"Ramoloss\", \"count\": 8, \"image\": \"https://img.pokemondb.net/artwork/large/slowpoke.jpg\", \"rarity\": \"common\"}, {\"id\": 119, \"name\": \"Poissoroy\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/seaking.jpg\", \"rarity\": \"common\"}, {\"id\": 55, \"name\": \"Akwakwak\", \"count\": 11, \"image\": \"https://img.pokemondb.net/artwork/large/golduck.jpg\", \"rarity\": \"common\"}, {\"id\": 117, \"name\": \"Hypocéan\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/seadra.jpg\", \"rarity\": \"common\"}, {\"id\": 87, \"name\": \"Lamantine\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/dewgong.jpg\", \"rarity\": \"common\"}, {\"id\": 44, \"name\": \"Ortide\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/gloom.jpg\", \"rarity\": \"common\"}, {\"id\": 78, \"name\": \"Galopa\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/rapidash.jpg\", \"rarity\": \"common\"}, {\"id\": 149, \"name\": \"Dracolosse\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/dragonite.jpg\", \"rarity\": \"rare\"}, {\"id\": 109, \"name\": \"Smogo\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/koffing.jpg\", \"rarity\": \"common\"}, {\"id\": 27, \"name\": \"Sabelette\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/sandshrew.jpg\", \"rarity\": \"common\"}, {\"id\": 4, \"name\": \"Salamèche\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/charmander.jpg\", \"rarity\": \"common\"}, {\"id\": 17, \"name\": \"Roucoups\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/pidgeotto.jpg\", \"rarity\": \"common\"}, {\"id\": 101, \"name\": \"Électrode\", \"count\": 5, \"image\": \"https://img.pokemondb.net/artwork/large/electrode.jpg\", \"rarity\": \"common\"}, {\"id\": 71, \"name\": \"Empiflor\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/victreebel.jpg\", \"rarity\": \"common\"}, {\"id\": 97, \"name\": \"Hypnomade\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/hypno.jpg\", \"rarity\": \"common\"}, {\"id\": 126, \"name\": \"Magmar\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/magmar.jpg\", \"rarity\": \"common\"}, {\"id\": 93, \"name\": \"Spectrum\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/haunter.jpg\", \"rarity\": \"common\"}, {\"id\": 132, \"name\": \"Métamorph\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/ditto.jpg\", \"rarity\": \"rare\"}, {\"id\": 7, \"name\": \"Carapuce\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/squirtle.jpg\", \"rarity\": \"common\"}, {\"id\": 86, \"name\": \"Otaria\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/seel.jpg\", \"rarity\": \"common\"}, {\"id\": 73, \"name\": \"Tentacruel\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/tentacruel.jpg\", \"rarity\": \"common\"}, {\"id\": 120, \"name\": \"Stari\", \"count\": 6, \"image\": \"https://img.pokemondb.net/artwork/large/staryu.jpg\", \"rarity\": \"common\"}, {\"id\": 131, \"name\": \"Lokhlass\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/lapras.jpg\", \"rarity\": \"rare\"}, {\"id\": 22, \"name\": \"Rapasdepic\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/fearow.jpg\", \"rarity\": \"common\"}, {\"id\": 129, \"name\": \"Magicarpe\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/magikarp.jpg\", \"rarity\": \"common\"}, {\"id\": 107, \"name\": \"Tygnon\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/hitmonchan.jpg\", \"rarity\": \"common\"}, {\"id\": 112, \"name\": \"Rhinoféros\", \"count\": 4, \"image\": \"https://img.pokemondb.net/artwork/large/rhydon.jpg\", \"rarity\": \"common\"}, {\"id\": 18, \"name\": \"Roucarnage\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/pidgeot.jpg\", \"rarity\": \"common\"}, {\"id\": 122, \"name\": \"M. Mime\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/mr-mime.jpg\", \"rarity\": \"common\"}, {\"id\": 147, \"name\": \"Minidraco\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/dratini.jpg\", \"rarity\": \"common\"}, {\"id\": 145, \"name\": \"Électhor\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/zapdos.jpg\", \"rarity\": \"legendary\"}, {\"id\": 70, \"name\": \"Boustiflor\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/weepinbell.jpg\", \"rarity\": \"common\"}, {\"id\": 127, \"name\": \"Scarabrute\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/pinsir.jpg\", \"rarity\": \"common\"}, {\"id\": 6, \"name\": \"Dracaufeu\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/charizard.jpg\", \"rarity\": \"rare\"}, {\"id\": 75, \"name\": \"Gravalanch\", \"count\": 3, \"image\": \"https://img.pokemondb.net/artwork/large/graveler.jpg\", \"rarity\": \"common\"}, {\"id\": 92, \"name\": \"Fantominus\", \"count\": 2, \"image\": \"https://img.pokemondb.net/artwork/large/gastly.jpg\", \"rarity\": \"common\"}, {\"id\": 150, \"name\": \"Mewtwo\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/mewtwo.jpg\", \"rarity\": \"legendary\"}]', 1748910662953, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJSYXBoIiwiaWF0IjoxNzQ4OTEwNTY5LCJleHAiOjE3NDg5NDY1Njl9.wSOdXntJ3aaUMrGyNdu0_JbDS5KvDHcXi-UZTq6rb60', 1670),
(5, 'Raph2', '1', '[{\"id\": 97, \"count\": 1}, {\"id\": 64, \"name\": \"Kadabra\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/kadabra.jpg\", \"rarity\": \"common\"}, {\"id\": 7, \"name\": \"Carapuce\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/squirtle.jpg\", \"rarity\": \"common\"}, {\"id\": 135, \"name\": \"Voltali\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/jolteon.jpg\", \"rarity\": \"rare\"}, {\"id\": 73, \"name\": \"Tentacruel\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/tentacruel.jpg\", \"rarity\": \"common\"}, {\"id\": 44, \"name\": \"Ortide\", \"count\": 1, \"image\": \"https://img.pokemondb.net/artwork/large/gloom.jpg\", \"rarity\": \"common\"}]', 1748902915491, NULL, 9500);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
