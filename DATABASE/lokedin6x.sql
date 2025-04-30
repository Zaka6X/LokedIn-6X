-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2025 at 03:05 PM
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
(70, 'Math', 'Matrix', 'MIP S2', 'math-1746015959337', 2),
(71, 'Math', 'TESTING...', 'MIP S2', 'math-1746016122488', 2);

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
(18, 'n*p', 'OP1'),
(18, 'n*n', 'OP2'),
(18, 'n', 'OP3'),
(19, 'A', 'OP1'),
(19, 'B', 'OP2'),
(19, 'C', 'OP3'),
(19, 'D', 'OP4');

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
  `duree` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`Id_exam`, `Id_question`, `question_text`, `reponse`, `note`, `duree`) VALUES
(70, 16, 'DImension de Matrice', 'OP1', 3, 15),
(70, 17, 'DImension de Matrice', 'OP1', 3, 15),
(71, 18, 'DImension de Matrice', 'OP1', 3, 13),
(71, 19, 'Q1', 'OP3', 6, 15);

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
  `sexe` enum('male','female') DEFAULT NULL,
  `etablissement` varchar(255) DEFAULT NULL,
  `filiere` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Id`, `email`, `password`, `nom`, `prenom`, `dob`, `sexe`, `etablissement`, `filiere`) VALUES
(1, 'aaa@gmail.com', '$2b$08$yaX4yCUkUlETrrfBaiKKQuzCzg09eRM5xE942l0qOYt4oUwv5QgJm', 'jamal', 'haddad', '2000-12-01', 'male', 'Fuck La Fac', 'SMI'),
(2, 'zaka6x@gmail.com', '$2b$08$mr5O/roOesu6a.O4RSu/G./cFATwdsTrD.OpPpgzjUr0IYg7Ikb4i', 'Zaka-6X', 'EL', '2005-05-28', 'male', 'Fuck La Fac', 'SMI');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `Id_question` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
