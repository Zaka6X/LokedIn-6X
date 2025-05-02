-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2025 at 09:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lokedin6x`
--

-- --------------------------------------------------------

--
-- Table structure for table `exams`
--

CREATE TABLE `exams` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `target` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `Id_user` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exams`
--

INSERT INTO `exams` (`id`, `titre`, `description`, `target`, `link`, `Id_user`) VALUES
(151, 'Math', 'Analyse', 'SMI S2', 'math-1746116313533', 2),
(152, 'Test-2', 'Analyse', 'SMA', 'test-2-1746116610469', 2),
(153, 'TEst', 'File update', 'SMA', 'test-1746116755622', 2),
(154, 'TEst', 'Analyse', 'SMA', 'test-1746116817172', 2),
(155, 'Math', 'Analyse', 'SMA', 'math-1746116886523', 2),
(156, 'Math', 'File update', 'SMA', 'math-1746117443707', 2),
(157, 'Math', 'Analyse', 'SMI S2', 'math-1746117817083', 2),
(158, 'TEst', 'File update', 'SMA', 'test-1746118154005', 2),
(159, 'Math', 'File update', 'SMA', 'math-1746118536677', 2),
(160, 'TEst', 'Analyse', 'SMA', 'test-1746118591859', 2),
(161, 'Math', 'Analyse', 'SMI S2', 'math-1746118826101', 2),
(162, 'Math', 'Analyse', 'SMA', 'math-1746119023455', 2),
(163, 'Math', 'File update', 'SMA', 'math-1746119179165', 2),
(164, 'TEst', 'File update', 'SMA', 'test-1746119205620', 2),
(165, 'Math', 'File update', 'SMI S2', 'math-1746119508403', 2),
(166, 'TEst', 'Analyse', 'SMA', 'test-1746119826566', 2),
(167, 'TEst', 'File update', 'SMI S2', 'test-1746120256287', 2),
(168, 'Math', 'Analyse', 'SMA', 'math-1746120975625', 2),
(169, 'Math', 'File update', 'SMA', 'math-1746121118024', 2),
(170, 'Math', 'File update', 'SMA', 'math-1746121348696', 2),
(171, 'Math', 'File update', 'SMI S2', 'math-1746121387001', 2),
(172, 'Math', 'Analyse', 'SMI S2', 'math-1746121805871', 2),
(173, 'Math', 'Analyse', 'SMI S2', 'math-1746122079586', 2),
(174, 'Math', 'Analyse', 'SMI S2', 'math-1746122509281', 2),
(175, 'TEst', 'File update', 'SMA', 'test-1746122671467', 2),
(176, 'Upload', 'File update', 'SMA', 'upload-1746122732203', 2),
(177, 'Math', 'add', 'test', 'math-1746122940946', 2),
(178, 'Math', 'Analyse', 'SMI S2', 'math-1746125218893', 2),
(179, 'Math', 'Analyse', 'SMA', 'math-1746125446983', 2),
(180, 'Math', 'Analyse', 'SMA', 'math-1746125533328', 2);

-- --------------------------------------------------------

--
-- Table structure for table `options`
--

CREATE TABLE `options` (
  `Id_question` int(100) DEFAULT NULL,
  `option_text` text NOT NULL,
  `OP_nbr` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `options`
--

INSERT INTO `options` (`Id_question`, `option_text`, `OP_nbr`) VALUES
(67, 'A', 'OP1'),
(67, 'B', 'OP2'),
(67, 'C', 'OP3'),
(69, 'A', 'OP1'),
(69, 'B', 'OP2'),
(69, 'C', 'OP3'),
(71, 'file', 'OP1'),
(71, 'test', 'OP2'),
(72, 'q', 'OP1'),
(72, 'qw', 'OP2'),
(73, 'H', 'OP1'),
(73, 'E', 'OP2'),
(74, 'w', 'OP1'),
(74, '1', 'OP2'),
(75, 'a', 'OP1'),
(75, 'b', 'OP2'),
(76, 'w', 'OP1'),
(76, 'w', 'OP2'),
(77, '12', 'OP1'),
(77, '12', 'OP2'),
(78, 'w', 'OP1'),
(78, 'A', 'OP2'),
(79, 'q', 'OP1'),
(79, 'A', 'OP2'),
(80, 'h', 'OP1'),
(80, 'nigga', 'OP2'),
(87, 'w', 'OP1'),
(87, 'w', 'OP2'),
(88, 'w', 'OP1'),
(88, '3', 'OP2'),
(90, 'A', 'OP1'),
(90, 'q', 'OP2'),
(91, 'A', 'OP1'),
(91, 'q', 'OP2'),
(92, 'XXX', 'OP1'),
(92, 'Tentation', 'OP2'),
(95, 'w', 'OP1'),
(95, 'w', 'OP2'),
(96, 'w', 'OP1'),
(96, 'w', 'OP2'),
(97, 'w', 'OP1'),
(97, 'w', 'OP2'),
(97, '33', 'OP3');

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `Id_exam` int(100) DEFAULT NULL,
  `Id_question` int(100) NOT NULL,
  `question_text` varchar(255) DEFAULT NULL,
  `reponse` varchar(255) DEFAULT NULL,
  `note` int(11) DEFAULT NULL,
  `duree` int(11) DEFAULT NULL,
  `tolerance` varchar(10) DEFAULT NULL,
  `media` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`Id_exam`, `Id_question`, `question_text`, `reponse`, `note`, `duree`, `tolerance`, `media`) VALUES
(151, 67, 'Q1', 'OP1', 1, 12, '-', NULL),
(152, 69, 'Q1', 'OP3', 12, 23, NULL, NULL),
(152, 70, 'Q2', 'Esxsd', 12, 23, '10%', NULL),
(153, 71, 'Upload', 'OP1', 1, 23, NULL, NULL),
(155, 72, 'cours fourier', 'OP1', 2, 12, NULL, NULL),
(156, 73, 'Hello', 'OP1', 1, 22, NULL, NULL),
(156, 74, 'CCC', 'OP1', 2, 12, NULL, NULL),
(157, 75, 'TEsssste', 'OP1', 1, 2, NULL, NULL),
(158, 76, 'cours fourier', 'OP1', 2, 3, NULL, NULL),
(160, 77, '1', 'OP1', 1, 23, NULL, NULL),
(162, 78, 'AAA', 'OP1', 1, 23, NULL, NULL),
(163, 79, 'CCCooooooo', 'OP1', 1, 2, NULL, NULL),
(164, 80, 'hellnot', 'OP2', 2, 12, NULL, NULL),
(164, 81, 'kalli', 'Linux', 3, 12, '10%', NULL),
(165, 82, 'cours fourier', 'n*n', 1, 23, '10%', NULL),
(165, 83, 'Adding', 'n*n', 1, 23, '10%', NULL),
(166, 84, 'AAAAAAAAAAAAAAAAded', 'sf', 1, 23, '10%', NULL),
(167, 85, 'hello test', 'Esxsd', 1, 23, '10%', NULL),
(168, 86, 'ADDE diff id', 'Esxsd', 2, 23, '10%', NULL),
(172, 87, 'AAA', 'OP2', 1, 23, NULL, NULL),
(172, 88, 'OOGABOOGA', 'OP1', 1, 23, NULL, NULL),
(172, 89, 'cours fourier', 'Esxsd', 1, 23, '10%', NULL),
(174, 90, 'CCC', 'OP1', 34, 12, NULL, NULL),
(175, 91, 'CCC', 'OP1', 2, 12, NULL, NULL),
(175, 92, 'cours fourier', 'OP2', 1, 23, NULL, NULL),
(176, 93, 'HRE', 'n*n', 1, 12, '10%', NULL),
(176, 94, 'Hello', 'n*n', 3, 2, '10%', NULL),
(179, 95, 'AAA', 'OP1', 1, 23, NULL, NULL),
(180, 96, 'AAA', 'OP2', 1, 12, NULL, NULL),
(180, 97, 'cours fourier', 'OP3', 2, 3, NULL, NULL),
(180, 98, 'CCC', 'sf', 2, 23, '10%', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `sexe` varchar(255) DEFAULT NULL,
  `etablissement` varchar(255) DEFAULT NULL,
  `filiere` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `email`, `password`, `nom`, `prenom`, `dob`, `sexe`, `etablissement`, `filiere`) VALUES
(2, 'zaka6x@gmail.com', '$2b$08$mr5O/roOesu6a.O4RSu/G./cFATwdsTrD.OpPpgzjUr0IYg7Ikb4i', 'Zaka-6X', 'EL', '2005-05-28', 'male', 'Fuck La Fac', 'SMI'),
(6, 'karim1x@gmail.com', '$2b$08$OORvVdhBAjOK/WDKRjfUauqp/kR3SSwR0BF47k3VuaslugmAUHwMG', 'Karim', '1X', '2005-01-20', 'Homme', 'Fuck La Fac', 'SMI');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exams`
--
ALTER TABLE `exams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `link` (`link`),
  ADD KEY `fk_exam_user` (`Id_user`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`Id_question`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exams`
--
ALTER TABLE `exams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=181;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `Id_question` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exams`
--
ALTER TABLE `exams`
  ADD CONSTRAINT `fk_exam_user` FOREIGN KEY (`Id_user`) REFERENCES `users` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
