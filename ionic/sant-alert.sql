-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 25, 2018 at 06:53 AM
-- Server version: 5.7.19
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sant-alert`
--

-- --------------------------------------------------------

--
-- Table structure for table `auto_med`
--

DROP TABLE IF EXISTS `auto_med`;
CREATE TABLE IF NOT EXISTS `auto_med` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datecreate` datetime NOT NULL,
  `symtome` longtext COLLATE utf8_unicode_ci NOT NULL,
  `traitement` longtext COLLATE utf8_unicode_ci NOT NULL,
  `evaluation` longtext COLLATE utf8_unicode_ci,
  `observation` longtext COLLATE utf8_unicode_ci,
  `cout_traitement` double DEFAULT NULL,
  `patients_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_CDD652AFCEC3FD2F` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bilan`
--

DROP TABLE IF EXISTS `bilan`;
CREATE TABLE IF NOT EXISTS `bilan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `intitule` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `temperature` double DEFAULT NULL,
  `taille` double DEFAULT NULL,
  `tension` double DEFAULT NULL,
  `dateCreate` datetime DEFAULT NULL,
  `patients_id` int(11) NOT NULL,
  `poidsActuel` double DEFAULT NULL,
  `poidsNormal` double DEFAULT NULL,
  `imc` double DEFAULT NULL,
  `tgc` double DEFAULT NULL,
  `masseMinEraleOsseuse` double DEFAULT NULL,
  `pourcentageEau` double DEFAULT NULL,
  `masseMusculaire` double DEFAULT NULL,
  `evaluationSihouette` double DEFAULT NULL,
  `tgViscerale` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_F4DF4F44CEC3FD2F` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `etablissement`
--

DROP TABLE IF EXISTS `etablissement`;
CREATE TABLE IF NOT EXISTS `etablissement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `param_regime`
--

DROP TABLE IF EXISTS `param_regime`;
CREATE TABLE IF NOT EXISTS `param_regime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `regime_id` int(11) NOT NULL,
  `poids` double NOT NULL,
  `dateParam` datetime NOT NULL,
  `temperature` double DEFAULT NULL,
  `tension` double DEFAULT NULL,
  `observation` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_F25609CA35E7D534` (`regime_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

DROP TABLE IF EXISTS `patients`;
CREATE TABLE IF NOT EXISTS `patients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `prenom` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `nom`, `password`, `telephone`, `email`, `prenom`) VALUES
(1, 'deval', '2valere', '23651', 'deval', 'deval'),
(2, 'marie', 'elleclaire', '864532', 'elle', 'claire'),
(3, 'ffffffff', 'ffffff', '685332', 'ffffff', 'fffffff'),
(4, 'yibhkj', 'hk  kn', 'vhbkj', 'hbikj', 'vuhjbk');

-- --------------------------------------------------------

--
-- Table structure for table `patientscom`
--

DROP TABLE IF EXISTS `patientscom`;
CREATE TABLE IF NOT EXISTS `patientscom` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `anneeNais` date DEFAULT NULL,
  `lieuNais` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `profession` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `filename` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lieuService` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dateCreate` datetime DEFAULT NULL,
  `telBureau` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `residencePrincipal` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `residenceSecondaire` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nomPere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telPere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emailPere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `professionPere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quartierPere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ruePere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nomMere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telMere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emailMere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `professionMere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quartierMere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rueMere` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nomTuteur` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telTuteur` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emailTuteur` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `professionTuteur` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `quartierTuteur` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rueTuteur` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `proche1` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel_proche1` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emailProche1` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `residenceProche1` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `professionProche1` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `proche2` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel_proche2` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emailProche2` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `residenceProche2` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `professionProche2` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `proche3` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tel_proche3` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emailProche3` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `residenceProche3` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `professionProche3` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `groupeSanguin` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `allergie` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `incapacite` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `medecinFamille` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `assurance` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `rhesus` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `observationPhisyque` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `signeParticulier` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personel_ets`
--

DROP TABLE IF EXISTS `personel_ets`;
CREATE TABLE IF NOT EXISTS `personel_ets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `etablissement_id` int(11) NOT NULL,
  `nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `premon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `telephone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `type_personnel` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_CC1ADC15FF631228` (`etablissement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `regime`
--

DROP TABLE IF EXISTS `regime`;
CREATE TABLE IF NOT EXISTS `regime` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type_regime` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `datedebut` datetime NOT NULL,
  `poidsDepart` double NOT NULL,
  `imc` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `restrictions` longtext COLLATE utf8_unicode_ci,
  `taille` double DEFAULT NULL,
  `patients_id` int(11) NOT NULL,
  `natureRegime` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `alimentationRecommande` longtext COLLATE utf8_unicode_ci,
  `typeTraitement` longtext COLLATE utf8_unicode_ci,
  `dateFin` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_AA864A7CCEC3FD2F` (`patients_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(180) COLLATE utf8_unicode_ci NOT NULL,
  `username_canonical` varchar(180) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(180) COLLATE utf8_unicode_ci NOT NULL,
  `email_canonical` varchar(180) COLLATE utf8_unicode_ci NOT NULL,
  `enabled` tinyint(1) NOT NULL,
  `salt` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `last_login` datetime DEFAULT NULL,
  `confirmation_token` varchar(180) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password_requested_at` datetime DEFAULT NULL,
  `roles` longtext COLLATE utf8_unicode_ci NOT NULL COMMENT '(DC2Type:array)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_8D93D64992FC23A8` (`username_canonical`),
  UNIQUE KEY `UNIQ_8D93D649A0D96FBF` (`email_canonical`),
  UNIQUE KEY `UNIQ_8D93D649C05FB297` (`confirmation_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `NomUtil` varchar(100) NOT NULL,
  `MotPasse` varchar(100) NOT NULL,
  `PrenomUtil` varchar(100) NOT NULL,
  `TelephoneUtil` varchar(50) NOT NULL,
  `EmailUtil` varchar(50) NOT NULL,
  `CategorieUtil` varchar(25) NOT NULL,
  `Acces` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `NomUtil`, `MotPasse`, `PrenomUtil`, `TelephoneUtil`, `EmailUtil`, `CategorieUtil`, `Acces`) VALUES
(1, 'deval', 'deval', 'deval', 'deval', 'deval', 'A', 'user'),
(2, 'deval', 'deval', 'deval', 'deval', 'deval', 'A', 'user'),
(3, 'deval', 'deval', 'deval', 'deval', 'deval', 'A', 'user'),
(4, 'marie', 'claire', 'claire', '67895842', 'marie@claire.fr', 'A', 'user');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auto_med`
--
ALTER TABLE `auto_med`
  ADD CONSTRAINT `FK_CDD652AFCEC3FD2F` FOREIGN KEY (`patients_id`) REFERENCES `patients` (`id`);

--
-- Constraints for table `bilan`
--
ALTER TABLE `bilan`
  ADD CONSTRAINT `FK_F4DF4F44CEC3FD2F` FOREIGN KEY (`patients_id`) REFERENCES `patients` (`id`);

--
-- Constraints for table `param_regime`
--
ALTER TABLE `param_regime`
  ADD CONSTRAINT `FK_F25609CA35E7D534` FOREIGN KEY (`regime_id`) REFERENCES `regime` (`id`);

--
-- Constraints for table `personel_ets`
--
ALTER TABLE `personel_ets`
  ADD CONSTRAINT `FK_CC1ADC15FF631228` FOREIGN KEY (`etablissement_id`) REFERENCES `etablissement` (`id`);

--
-- Constraints for table `regime`
--
ALTER TABLE `regime`
  ADD CONSTRAINT `FK_AA864A7CCEC3FD2F` FOREIGN KEY (`patients_id`) REFERENCES `patients` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
