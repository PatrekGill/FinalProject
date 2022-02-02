-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema servicecallsdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `servicecallsdb` ;

-- -----------------------------------------------------
-- Schema servicecallsdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `servicecallsdb` DEFAULT CHARACTER SET utf8 ;
USE `servicecallsdb` ;

-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `phone_number` VARCHAR(45) NOT NULL,
  `role` VARCHAR(45) NULL DEFAULT 'customer',
  `enabled` TINYINT(1) NULL DEFAULT 1,
  `notes` TEXT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `created_date` DATETIME NULL,
  `updated_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `street` VARCHAR(120) NOT NULL,
  `street_2` VARCHAR(45) NULL,
  `city` VARCHAR(45) NOT NULL,
  `state_abbv` VARCHAR(2) NOT NULL,
  `zip_code` INT(5) NOT NULL,
  `notes` TEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_address_customer1_idx` (`user_id` ASC),
  CONSTRAINT `fk_address_customer1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `problem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `problem` ;

CREATE TABLE IF NOT EXISTS `problem` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(120) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `solution`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `solution` ;

CREATE TABLE IF NOT EXISTS `solution` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(120) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `business`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `business` ;

CREATE TABLE IF NOT EXISTS `business` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  `name` VARCHAR(200) NULL,
  `logo_url` VARCHAR(200) NULL,
  `created_date` DATETIME NULL,
  `updated_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_contractor_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_contractor_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_call`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_call` ;

CREATE TABLE IF NOT EXISTS `service_call` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `address_id` INT NOT NULL,
  `problem_id` INT NULL,
  `solution_id` INT NULL,
  `problem_description` TEXT NOT NULL,
  `date_created` DATETIME NULL,
  `date_scheduled` DATETIME NULL,
  `completed` TINYINT(1) NOT NULL DEFAULT 0,
  `total_cost` DECIMAL(25,2) NULL DEFAULT 0,
  `estimate` TINYINT(1) NULL DEFAULT 0,
  `hours_labor` INT NULL DEFAULT 0,
  `contractor_notes` TEXT NULL,
  `business_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `customer_rating` INT NULL,
  `customer_rating_comment` TEXT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_service_call_address_idx` (`address_id` ASC),
  INDEX `fk_service_call_problem1_idx` (`problem_id` ASC),
  INDEX `fk_service_call_solution1_idx` (`solution_id` ASC),
  INDEX `fk_service_contractor1_idx` (`business_id` ASC),
  INDEX `fk_service_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_service_call_address`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_call_problem1`
    FOREIGN KEY (`problem_id`)
    REFERENCES `problem` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_call_solution1`
    FOREIGN KEY (`solution_id`)
    REFERENCES `solution` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_contractor1`
    FOREIGN KEY (`business_id`)
    REFERENCES `business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `equipment_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `equipment_type` ;

CREATE TABLE IF NOT EXISTS `equipment_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(120) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `type_UNIQUE` (`type` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `model`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `model` ;

CREATE TABLE IF NOT EXISTS `model` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `equipment_type_id` INT NOT NULL,
  `model_number` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `fuel_type` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_model_equipment_type1_idx` (`equipment_type_id` ASC),
  CONSTRAINT `fk_model_equipment_type1`
    FOREIGN KEY (`equipment_type_id`)
    REFERENCES `equipment_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `equipment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `equipment` ;

CREATE TABLE IF NOT EXISTS `equipment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `serial_number` VARCHAR(45) NULL,
  `address_id` INT NOT NULL,
  `model_id` INT NOT NULL,
  `price` DECIMAL(25,2) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_equipment_address1_idx` (`address_id` ASC),
  INDEX `fk_equipment_model1_idx` (`model_id` ASC),
  CONSTRAINT `fk_equipment_address1`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_equipment_model1`
    FOREIGN KEY (`model_id`)
    REFERENCES `model` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_comment` ;

CREATE TABLE IF NOT EXISTS `service_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `service_id` INT NOT NULL,
  `text` TEXT NOT NULL,
  `comment_date` DATETIME NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_service_comment_user1_idx` (`user_id` ASC),
  INDEX `fk_service_comment_service1_idx` (`service_id` ASC),
  CONSTRAINT `fk_service_comment_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_service_comment_service1`
    FOREIGN KEY (`service_id`)
    REFERENCES `service_call` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `business_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `business_user` ;

CREATE TABLE IF NOT EXISTS `business_user` (
  `business_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`business_id`, `user_id`),
  INDEX `fk_contractor_has_user_user1_idx` (`user_id` ASC),
  INDEX `fk_contractor_has_user_contractor1_idx` (`business_id` ASC),
  CONSTRAINT `fk_contractor_has_user_contractor1`
    FOREIGN KEY (`business_id`)
    REFERENCES `business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contractor_has_user_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `service_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `service_type` ;

CREATE TABLE IF NOT EXISTS `service_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(250) NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `business_service_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `business_service_type` ;

CREATE TABLE IF NOT EXISTS `business_service_type` (
  `business_id` INT NOT NULL,
  `service_type_id` INT NOT NULL,
  PRIMARY KEY (`business_id`, `service_type_id`),
  INDEX `fk_contractor_has_service_type_service_type1_idx` (`service_type_id` ASC),
  INDEX `fk_contractor_has_service_type_contractor1_idx` (`business_id` ASC),
  CONSTRAINT `fk_contractor_has_service_type_contractor1`
    FOREIGN KEY (`business_id`)
    REFERENCES `business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contractor_has_service_type_service_type1`
    FOREIGN KEY (`service_type_id`)
    REFERENCES `service_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS monkey@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'monkey'@'localhost' IDENTIFIED BY 'monkey';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'monkey'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (1, 'Demo', 'Contractor', '1231231111', 'business', 1, NULL, 'DemoContractor', '$2a$10$RRdxemmcZudAaoLiaevK8.L77H1tfgBxWcAOgHrcjwqFy3puA6xM2', '2022-01-6 18:52:02', '2022-01-6 18:52:03');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (2, 'Demo', 'Customer', '1231232222', 'customer', 1, NULL, 'DemoCustomer', '$2a$10$vA.zLAZr/ihTPnn3boZ7CuuvhCtgO3vFVuDQVQ8MvkJZO1YajPRlC', '2022-01-8 18:52:02', '2022-01-8 18:52:04');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (3, 'Smith', 'Jones', '1231232223', 'admin', 1, NULL, 'admin', '$2a$10$ERLPMzTwDyd/XYJthi0Y2OjY.g2DF8LEv3MIW.g0ZvjXlCzQYTxTC', '2022-01-8 18:52:02', '2022-01-8 18:52:04');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (4, 'Jo ann', 'O\'Conor', '3853849794', 'customer', 1, NULL, 'JoAnnConner', 'dxAegsgJ', '2021-07-23 15:31:08', '2021-11-26 01:49:03');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (5, 'Isis', 'Maulkin', '9951555831', 'customer', 1, NULL, 'MaulkinIs', '2zeaY4xG', '2021-10-04 23:57:12', '2021-09-25 07:35:10');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (6, 'Agretha', 'Speakman', '7619783281', 'customer', 1, NULL, 'SpeakmanAgretha', 'i7ApHZz3r', '2022-01-04 10:06:03', '2021-11-12 10:13:28');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (7, 'Raffarty', 'Marchi', '4736896464', 'customer', 1, NULL, 'RaffartyMarchi', 'KglJFQKEL', '2021-01-16 01:11:49', '2021-08-08 16:28:56');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (8, 'Thornie', 'Yea', '4452763913', 'customer', 1, NULL, 'ThornieYea', 'hqJUH6H8u', '2021-07-17 14:28:53', '2021-11-04 08:32:28');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (9, 'Flynn', 'Burgne', '2158491988', 'customer', 1, NULL, 'FlynnBurgne', 'vXgCsQHIF', '2021-11-05 20:13:12', '2021-02-11 08:31:19');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (10, 'Hannie', 'Gumby', '2646749209', 'customer', 1, NULL, 'HannieGumby', 'xfoDkBS', '2021-10-28 02:30:28', '2021-08-25 19:39:09');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (11, 'Oswald', 'Milne', '2103315620', 'customer', 1, NULL, 'OswaldMilne', 'A7zOWx3FuM1W', '2021-01-23 08:46:38', '2021-02-21 14:10:02');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (12, 'Alisha', 'Joselin', '9503552524', 'customer', 1, NULL, 'AlishaJoselin', 'zcH5IRnKJ8c', '2021-04-14 07:23:47', '2021-02-03 18:32:51');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (13, 'Linell', 'Liggett', '3981447796', 'customer', 1, NULL, 'LinellLiggett', '2s1bSo', '2021-06-07 11:57:04', '2021-11-17 13:01:38');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (14, 'Waylen', 'Hazeldine', '4024075139', 'customer', 1, NULL, 'WaylenHazeldine', '1P8rtXih', '2021-05-22 22:45:59', '2021-12-17 15:59:24');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (15, 'Burnaby', 'Baylie', '8775805741', 'customer', 1, NULL, 'BurnabyBaylie', 'tljSE5dzYg', '2020-09-07 18:57:01', '2022-01-12 06:06:57');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (16, 'Zahara', 'Aronovich', '6326298983', 'customer', 1, NULL, 'ZaharaAronovich', '25AJlc9', '2021-09-04 17:04:12', '2021-05-17 05:14:34');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (17, 'Letta', 'Camel', '4301704511', 'customer', 1, NULL, 'LettaCamel', 'ICJnOi', '2021-12-01 08:54:08', '2021-06-14 05:08:22');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (18, 'Barthel', 'Perrin', '6189833794', 'customer', 1, NULL, 'BarthelPerrin', 'nkYMer', '2021-03-12 15:27:37', '2021-08-14 21:27:34');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (19, 'Glenn', 'Astley', '4723575389', 'customer', 1, NULL, 'GlennAstley', 'KEyq93GAhRR3', '2021-12-28 03:43:19', '2021-03-09 17:45:53');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (20, 'Lezley', 'Preble', '2129052865', 'customer', 1, NULL, 'LezleyPreble', 'PYksU6QOXOtX', '2021-12-19 07:05:09', '2021-11-13 05:26:14');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (21, 'Adelaida', 'Hellard', '1175720946', 'customer', 1, NULL, 'AdelaidaHellard', 'Gh7cZK8ifZ', '2021-06-26 22:32:27', '2021-07-17 15:30:47');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (22, 'Freddie', 'Pinwill', '9611104761', 'customer', 1, NULL, 'FreddiePinwill', 'tLKJ7mOJuNMf', '2021-03-07 09:42:33', '2021-03-14 19:11:22');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (23, 'Jeane', 'Antonat', '6836353341', 'customer', 1, NULL, 'JeaneAntonat', 'buQ07A', '2021-11-18 11:13:39', '2021-05-19 06:28:04');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (24, 'Ki', 'Mendenhall', '1874385878', 'customer', 1, NULL, 'KiMendenhall', 'yjXmo63j73', '2021-06-02 06:38:30', '2021-04-01 03:57:34');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (25, 'Constancy', 'Ingarfill', '9124026501', 'customer', 1, NULL, 'ConstancyIngarfill', 'OWIem25eeDYb', '2021-03-28 19:23:33', '2021-02-07 00:16:51');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (26, 'Perice', 'Forcer', '8303403392', 'customer', 1, NULL, 'PericeForcer', '8bXG7hFyir', '2021-08-21 05:11:55', '2021-06-06 21:56:27');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (27, 'Patsy', 'Kubik', '2833544398', 'customer', 1, NULL, 'PatsyKubik', 'k4xnhOJOmZfj', '2020-09-29 09:08:31', '2021-10-22 09:30:13');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (28, 'Jessie', 'Flasby', '1428589703', 'customer', 1, NULL, 'JessieFlasby', 'UhOqFnp0EkL9', '2021-11-06 10:08:59', '2022-01-05 17:27:52');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (29, 'Trixie', 'Orable', '1284494964', 'customer', 1, NULL, 'TrixieOrable', 'TUMOwvUH3pEj', '2021-11-09 16:13:16', '2022-01-23 13:17:40');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (30, 'Shelby', 'Lockett', '3615973475', 'customer', 1, NULL, 'ShelbyLockett', 'B0go9O1Yt', '2021-03-06 20:14:04', '2021-12-10 14:06:54');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (31, 'Ikey', 'Wipfler', '5959480285', 'customer', 1, NULL, 'IkeyWipfler', 'FqRwvFiAw', '2020-11-09 06:02:00', '2021-12-05 18:10:13');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (32, 'Maureen', 'Bellas', '4166285349', 'customer', 1, NULL, 'MaureenBellas', 'nI1E45qV', '2021-04-18 13:51:37', '2021-06-09 05:40:07');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (33, 'Gwendolen', 'Liptrot', '7384115916', 'customer', 1, NULL, 'GwendolenLiptrot', '1gimus', '2021-10-07 09:54:02', '2021-11-16 23:44:31');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (34, 'Shirlene', 'Uc', '3281832918', 'customer', 1, NULL, 'ShirleneUc', 'IjU0qt', '2021-03-16 05:22:07', '2021-06-14 14:17:18');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (35, 'Larina', 'Lethcoe', '8824357230', 'customer', 1, NULL, 'LarinaLethcoe', 'VQkwPew', '2020-09-13 10:11:58', '2022-01-25 05:27:57');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (36, 'Neille', 'Clissold', '6148233129', 'customer', 1, NULL, 'NeilleClissold', 'fNRSgO15t7', '2020-11-14 22:44:02', '2021-05-12 12:45:25');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (37, 'Shani', 'Abramow', '3836079892', 'customer', 1, NULL, 'ShaniAbramow', '4TPvGPTXEfH', '2021-01-09 11:11:32', '2021-06-25 14:46:10');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (38, 'Thornton', 'Keston', '5247327663', 'customer', 1, NULL, 'ThorntonKeston', 'foZGE5OOn', '2020-12-14 08:32:07', '2021-02-06 13:45:09');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (39, 'Chic', 'Crooks', '1682280090', 'customer', 1, NULL, 'ChicCrooks', 'gkTsXkiL', '2021-08-22 17:39:32', '2021-09-25 11:14:56');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (40, 'Waverly', 'MacKeeg', '4132510090', 'customer', 1, NULL, 'WaverlyMacKeeg', 'LwMGjbClO', '2020-10-11 19:51:05', '2021-05-10 12:48:03');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (41, 'Erena', 'Paintain', '4666729990', 'customer', 1, NULL, 'ErenaPaintain', 'QJI9Ct', '2021-06-10 22:49:51', '2021-05-27 21:06:40');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (42, 'Clarette', 'Dingley', '7819039460', 'customer', 1, NULL, 'ClaretteDingley', 'hvkLLP9y', '2020-12-31 03:36:52', '2021-05-07 11:27:05');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (43, 'Dina', 'Wedderburn', '7492999795', 'customer', 1, NULL, 'DinaWedderburn', 'SJX4YMHOf', '2021-11-18 10:53:43', '2021-06-02 23:01:54');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (44, 'Valencia', 'Jarrel', '7782459436', 'customer', 1, NULL, 'ValenciaJarrel', 'p4eK93bE', '2021-06-08 13:41:12', '2021-08-24 21:19:12');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (45, 'Thurston', 'Halse', '7622186078', 'customer', 1, NULL, 'ThurstonHalse', 'kycr9PJWZfc', '2021-10-23 06:29:39', '2021-04-30 02:24:00');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (46, 'Maridel', 'MacPhail', '3573871124', 'customer', 1, NULL, 'MaridelMacPhail', 'ULR4nJ', '2021-11-17 15:10:51', '2021-03-15 05:03:33');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (47, 'Merv', 'MacGown', '7795281587', 'customer', 1, NULL, 'MervMacGown', 'UlBKEkayQo', '2021-08-26 05:36:26', '2021-11-12 03:31:59');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (48, 'Heywood', 'Ditch', '4152883882', 'customer', 1, NULL, 'HeywoodDitch', 'yRgFlWo', '2021-11-23 09:58:45', '2021-08-04 10:22:13');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (49, 'Drucie', 'Leavry', '7361422179', 'customer', 1, NULL, 'DrucieLeavry', 'hBVTPOca', '2021-10-05 10:12:15', '2021-03-29 16:37:46');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (50, 'Eugenia', 'Oxtarby', '4651233547', 'customer', 1, NULL, 'EugeniaOxtarby', 'NCfctte5Xxt6', '2021-10-28 20:52:19', '2021-03-14 17:03:08');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (51, 'Scarlet', 'Duddell', '1797416110', 'business', 1, NULL, 'ScarletDuddell', 'NysVnoFB', '2021-04-27 02:11:43', '2021-07-09 10:20:34');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (52, 'Devonne', 'Maass', '2697647001', 'business', 1, NULL, 'DevonneMaass', '1II41UHKb9hC', '2021-03-27 11:49:22', '2021-05-12 21:22:32');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (53, 'Dulcea', 'Threadgold', '8066594007', 'business', 1, NULL, 'DulceaThreadgold', 'C7s7NnwN', '2021-11-04 21:37:01', '2022-01-13 20:51:43');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (54, 'Jeremie', 'Berndt', '7805263960', 'business', 1, NULL, 'JeremieBerndt', 'Q40u27', '2021-03-03 11:02:05', '2021-03-06 14:55:09');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (55, 'Quintin', 'Banyard', '8543397196', 'business', 1, NULL, 'QuintinBanyard', 'FhcRIr', '2021-02-08 10:02:04', '2021-02-02 01:13:19');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (56, 'Darline', 'Forrest', '9331165244', 'business', 1, NULL, 'DarlineForrest', 'qxdKYNDb1NG', '2021-10-05 23:42:10', '2021-06-21 09:12:21');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (57, 'Nelie', 'Aronstam', '1853172201', 'business', 1, NULL, 'NelieAronstam', 'csZ1uEgx', '2021-06-18 11:07:49', '2021-06-30 01:41:00');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (58, 'Alexandr', 'Dursley', '8335708055', 'business', 1, NULL, 'AlexandrDursley', 'msO8zUsYUDoN', '2021-03-05 16:30:49', '2021-11-30 10:11:06');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (59, 'Linus', 'Broker', '7083275531', 'business', 1, NULL, 'LinusBroker', 'cR5MXPCm7K', '2021-01-30 00:57:23', '2021-05-23 07:59:33');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (60, 'Meier', 'Loughran', '5044551502', 'business', 1, NULL, 'MeierLoughran', 'y8tkWNYvwu', '2021-11-07 04:27:55', '2021-02-08 05:26:21');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (61, 'Waly', 'Ormesher', '5528910673', 'business', 1, NULL, 'WalyOrmesher', 'Cz2MMdt1o', '2020-11-09 22:44:27', '2021-01-30 10:33:11');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (62, 'Toiboid', 'Ormston', '2035263917', 'business', 1, NULL, 'ToiboidOrmston', 'J9hl1gG', '2021-09-02 22:57:20', '2021-12-05 15:28:23');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (63, 'Stacy', 'Dunrige', '2685443522', 'business', 1, NULL, 'StacyDunrige', 'wUnxgGTkrR', '2021-01-26 14:04:54', '2021-02-10 17:56:13');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (64, 'Shawna', 'O\'Crowley', '4125955091', 'business', 1, NULL, 'ShawnaOCrowley', '7aLgodLAk', '2021-10-10 02:33:32', '2021-05-17 17:32:25');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (65, 'Hunter', 'Renac', '8047073520', 'business', 1, NULL, 'HunterRenac', 'bviNMGIaDwxK', '2021-02-14 08:04:09', '2021-05-10 01:16:34');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (66, 'Shaun', 'Pavelin', '7897056229', 'business', 1, NULL, 'ShaunPavelin', 'SWTZKr2eEG', '2021-08-16 11:25:08', '2021-03-07 18:50:40');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (67, 'Roxie', 'Le feuvre', '9945773172', 'business', 1, NULL, 'RoxieLefeuvre', 'ovNGG4WAKta9', '2021-04-20 03:59:56', '2021-02-28 23:49:52');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (68, 'Say', 'Winskill', '1582895963', 'business', 1, NULL, 'SayWinskill', 'rwFy7E40', '2021-06-14 17:05:33', '2021-06-24 08:07:10');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (69, 'Travis', 'Chedgey', '7382942387', 'business', 1, NULL, 'TravisChedgey', 'qfxRUCYJL', '2021-03-05 18:41:49', '2021-06-02 13:21:59');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (70, 'Joya', 'Persey', '9893265043', 'business', 1, NULL, 'JoyaPersey', 'KLNPL6SavE9', '2021-09-21 03:10:09', '2021-12-01 09:46:00');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (71, 'Inglis', 'Weatherhill', '7423438756', 'business', 1, NULL, 'InglisWeatherhill', 'HIo5WOxv', '2021-07-21 04:36:10', '2021-04-02 00:04:00');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (72, 'Aura', 'Scolding', '2908291463', 'business', 1, NULL, 'AuraScolding', '1hHtOj', '2021-11-18 22:21:44', '2021-07-22 07:35:34');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (73, 'Vincent', 'Menault', '3592811936', 'business', 1, NULL, 'VincentMenault', 'JvxhrWT', '2021-08-08 07:13:07', '2021-09-27 06:55:04');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (74, 'Thorin', 'Savell', '7946069951', 'business', 1, NULL, 'ThorinSavell', 'vHfz92znl', '2021-11-11 20:28:24', '2021-06-12 16:48:15');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (75, 'Didi', 'Rowsel', '3117599902', 'business', 1, NULL, 'DidiRowsel', '0Qvx0gVS1', '2021-03-13 14:14:04', '2021-01-28 09:38:49');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (76, 'Sandro', 'Jameson', '8791469121', 'business', 1, NULL, 'SandroJameson', 'RggEngb5', '2020-12-22 18:18:00', '2021-02-19 23:40:59');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (77, 'Agosto', 'Guyer', '7321086528', 'business', 1, NULL, 'AgostoGuyer', 'J5P09PxG', '2021-12-24 08:40:23', '2021-07-24 03:14:32');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (78, 'Laurette', 'O\'Hare', '6756988915', 'business', 1, NULL, 'LauretteOHare', 'SPVIn5', '2020-12-14 09:10:13', '2021-11-03 05:49:44');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (79, 'Katharina', 'Oury', '2272633142', 'business', 1, NULL, 'KatharinaOury', 'y5yrQcBixE', '2021-12-22 15:56:37', '2021-07-19 18:29:40');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (80, 'Tobey', 'Bilborough', '6567939501', 'business', 1, NULL, 'TobeyBilborough', 'BNYm1Fmxeo', '2021-12-23 08:44:47', '2022-01-20 10:19:43');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (81, 'Loralie', 'Westrip', '7141265984', 'business', 1, NULL, 'LoralieWestrip', 'EyrRGKOwFQud', '2021-12-17 16:50:28', '2021-12-22 12:59:31');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (82, 'Hendrika', 'Muncie', '6226999281', 'business', 1, NULL, 'HendrikaMuncie', 'yegWZN6Cn', '2021-08-13 02:51:31', '2022-01-25 16:45:19');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (83, 'Doti', 'Cowpertwait', '6812818535', 'business', 1, NULL, 'DotiCowpertwait', 'oYDajH', '2021-09-27 04:29:48', '2021-07-09 23:54:00');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (84, 'Obadiah', 'Jagiello', '5057055785', 'business', 1, NULL, 'ObadiahJagiello', 'gf07ULAB', '2021-04-15 22:34:19', '2021-11-27 23:53:17');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (85, 'Carolee', 'Kantor', '9127676286', 'business', 1, NULL, 'CaroleeKantor', 'AbQ4sA5xaI', '2021-02-18 12:44:27', '2021-10-06 20:55:57');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (86, 'Ches', 'Chaucer', '7461300416', 'business', 1, NULL, 'ChesChaucer', 'XUJUHz', '2021-03-16 19:50:10', '2021-09-23 17:16:04');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (87, 'Blondell', 'Riddler', '7772534452', 'business', 1, NULL, 'BlondellRiddler', 'TvGZlAAfk', '2021-10-01 16:53:00', '2021-04-24 16:30:24');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (88, 'Meaghan', 'Vallow', '9925891253', 'business', 1, NULL, 'MeaghanVallow', 'B4Il0J', '2021-06-05 19:13:56', '2021-10-21 08:21:54');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (89, 'Manolo', 'Bloomer', '1298251129', 'business', 1, NULL, 'ManoloBloomer', 'SRm9kI4Rul', '2021-03-20 22:59:17', '2021-12-01 06:42:26');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (90, 'Miguela', 'Sollars', '4702110139', 'business', 1, NULL, 'MiguelaSollars', '8ape7VEYM142', '2021-06-25 15:00:53', '2021-11-12 21:38:41');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (91, 'Eddie', 'Kenrack', '2815346335', 'business', 1, NULL, 'EddieKenrack', '8oAWyszy', '2020-10-11 08:37:25', '2021-02-14 10:34:35');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (92, 'Hy', 'Kalisch', '2647331775', 'business', 1, NULL, 'HyKalisch', 'aRGEK3dbRuB', '2021-06-06 00:39:20', '2021-06-13 07:57:04');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (93, 'Joete', 'Waddam', '5942714483', 'business', 1, NULL, 'JoeteWaddam', '5UgIvR2FXVR', '2021-01-30 01:30:38', '2021-10-04 22:43:31');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (94, 'Lynn', 'Mullaly', '7831259048', 'business', 1, NULL, 'LynnMullaly', 'v2vJ1A6', '2021-12-29 14:39:30', '2021-12-29 08:08:53');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (95, 'Gennie', 'Duckhouse', '4331612900', 'business', 1, NULL, 'GennieDuckhouse', '0oZxGiteFdo', '2021-08-10 07:34:49', '2021-10-22 16:08:58');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (96, 'Adriane', 'Iacobini', '4638173645', 'business', 1, NULL, 'AdrianeIacobini', 'ULV8qKAjE3', '2021-06-16 17:17:37', '2021-08-01 04:19:47');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (97, 'Phyllys', 'Blease', '3476492814', 'business', 1, NULL, 'PhyllysBlease', 'xPYgl0u', '2020-09-06 18:05:30', '2021-11-02 05:13:11');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (98, 'Yettie', 'Kinnie', '8614627526', 'business', 1, NULL, 'YettieKinnie', 'aLGPJExAlbUp', '2021-11-29 01:17:16', '2021-07-14 02:17:52');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (99, 'Karlis', 'Borsnall', '5937904858', 'business', 1, NULL, 'KarlisBorsnall', 'qwtp9ER', '2021-05-26 07:36:36', '2021-10-06 09:33:35');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (100, 'Murdock', 'Bordman', '2182990778', 'business', 1, NULL, 'MurdockBordman', 'gg1YEy', '2020-09-25 10:57:46', '2021-02-27 15:06:05');

COMMIT;


-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (1, 2, '62 Fake St.', 'unit 1', 'Hanover', 'PA', 99022, 'notes');
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (2, 2, '3522 Notreal Ave.', NULL, 'Hampstead', 'MD', 80238, 'notes');
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (3, 26, '8 Sundown Pass', NULL, 'College Station', 'TX', 78531, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (4, 50, '4025 Blackbird Way', NULL, 'New Orleans', 'LA', 69756, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (5, 44, '4304 Warrior Alley', NULL, 'Santa Monica', 'CA', 30049, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (6, 5, '1 Katie Hill', NULL, 'Austin', 'TX', 51718, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (7, 47, '09182 David Junction', NULL, 'San Francisco', 'CA', 35043, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (8, 23, '346 Thackeray Drive', NULL, 'Arlington', 'TX', 13334, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (9, 3, '2 Granby Crossing', NULL, 'Greensboro', 'NC', 73843, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (10, 18, '8907 Arkansas Crossing', NULL, 'Arvada', 'CO', 23240, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (11, 38, '4 Marquette Place', NULL, 'Pittsburgh', 'PA', 86061, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (12, 9, '846 Springs Point', NULL, 'Phoenix', 'AZ', 11993, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (13, 30, '28946 Logan Circle', NULL, 'Tulsa', 'OK', 19480, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (14, 39, '3 Helena Court', NULL, 'Dallas', 'TX', 79575, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (15, 35, '8 Donald Place', NULL, 'Orlando', 'FL', 33057, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (16, 18, '02 Pepper Wood Pass', NULL, 'Denver', 'CO', 39405, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (17, 42, '013 Mandrake Parkway', NULL, 'Sacramento', 'CA', 75278, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (18, 41, '35865 Grover Trail', NULL, 'Wilmington', 'DE', 22087, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (19, 26, '0654 Lunder Point', NULL, 'Houston', 'TX', 98014, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (20, 40, '891 Rowland Crossing', NULL, 'Bradenton', 'FL', 80570, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (21, 22, '30778 Rigney Road', NULL, 'Fresno', 'CA', 33125, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (22, 22, '0049 Mandrake Park', NULL, 'Tulsa', 'OK', 10371, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (23, 35, '28 Cordelia Plaza', NULL, 'Albany', 'NY', 66935, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (24, 11, '5255 Elka Crossing', NULL, 'Tuscaloosa', 'AL', 56919, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (25, 29, '71765 Messerschmidt Drive', NULL, 'Jeffersonville', 'IN', 91419, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (26, 8, '2668 Arkansas Way', NULL, 'Herndon', 'VA', 89363, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (27, 26, '1785 Bartelt Circle', NULL, 'Jefferson City', 'MO', 83781, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (28, 3, '231 Carey Point', NULL, 'Los Angeles', 'CA', 10255, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (29, 19, '5548 Briar Crest Plaza', NULL, 'San Francisco', 'CA', 29424, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (30, 7, '970 Grasskamp Point', NULL, 'Waterloo', 'IA', 13197, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (31, 7, '1691 Claremont Terrace', NULL, 'Kansas City', 'KS', 95541, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (32, 35, '75005 Tennessee Trail', NULL, 'Lake Worth', 'FL', 93356, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (33, 7, '281 Pleasure Junction', NULL, 'San Jose', 'CA', 77402, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (34, 10, '26 Burrows Pass', NULL, 'Peoria', 'IL', 54383, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (35, 35, '9 Cody Center', NULL, 'Flushing', 'NY', 61976, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (36, 21, '9154 Lotheville Avenue', NULL, 'Van Nuys', 'CA', 55535, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (37, 45, '741 Sycamore Hill', NULL, 'El Paso', 'TX', 31619, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (38, 39, '9001 Susan Place', NULL, 'Brea', 'CA', 58022, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (39, 48, '4604 La Follette Terrace', NULL, 'Chico', 'CA', 89434, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (40, 35, '60650 Mccormick Place', NULL, 'Oklahoma City', 'OK', 10803, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (41, 36, '1239 6th Place', NULL, 'New York City', 'NY', 66710, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (42, 4, '6 Golf View Plaza', NULL, 'Seattle', 'WA', 94994, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (43, 37, '246 Aberg Way', NULL, 'Baltimore', 'MD', 80343, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (44, 40, '09 Farmco Crossing', NULL, 'Milwaukee', 'WI', 22847, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (45, 35, '7861 Anderson Trail', NULL, 'Fresno', 'CA', 38681, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (46, 24, '19832 Porter Road', NULL, 'Asheville', 'NC', 35184, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (47, 14, '5 Di Loreto Crossing', NULL, 'Indianapolis', 'IN', 18026, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (48, 16, '44 Rowland Place', NULL, 'Bloomington', 'IL', 80574, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (49, 46, '6098 Aberg Terrace', NULL, 'Memphis', 'TN', 63659, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (50, 19, '4 Loeprich Street', NULL, 'Austin', 'TX', 71277, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (51, 33, '0906 Morrow Way', NULL, 'Durham', 'NC', 40891, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (52, 9, '5 Stuart Lane', NULL, 'Fresno', 'CA', 65490, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (53, 49, '399 Pepper Wood Pass', NULL, 'Warren', 'OH', 99669, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (54, 30, '3601 Commercial Parkway', NULL, 'San Jose', 'CA', 12741, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (55, 6, '3 Green Terrace', NULL, 'Santa Monica', 'CA', 50080, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (56, 48, '6859 Twin Pines Drive', NULL, 'Hialeah', 'FL', 28565, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (57, 41, '724 Helena Avenue', NULL, 'Tucson', 'AZ', 34254, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (58, 48, '6 Killdeer Avenue', NULL, 'Jamaica', 'NY', 34810, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (59, 3, '17089 Spohn Street', NULL, 'Humble', 'TX', 70304, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (60, 18, '381 Emmet Hill', NULL, 'Cincinnati', 'OH', 32650, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (61, 19, '02 Packers Avenue', NULL, 'San Antonio', 'TX', 32868, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (62, 8, '51 Stoughton Alley', NULL, 'Miami', 'FL', 21317, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (63, 16, '2641 Lyons Circle', NULL, 'Amarillo', 'TX', 36608, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (64, 14, '2 Melby Pass', NULL, 'Fort Lauderdale', 'FL', 77340, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (65, 44, '6834 Rusk Road', NULL, 'Lansing', 'MI', 78161, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (66, 24, '48 Stuart Plaza', NULL, 'Shreveport', 'LA', 78438, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (67, 25, '83 Main Place', NULL, 'Nashville', 'TN', 45124, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (68, 39, '8243 Homewood Point', NULL, 'Seattle', 'WA', 38463, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (69, 20, '60583 Bobwhite Junction', NULL, 'Dallas', 'TX', 97906, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (70, 26, '0 Troy Parkway', NULL, 'Lima', 'OH', 61642, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (71, 48, '042 Randy Trail', NULL, 'Spokane', 'WA', 89107, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (72, 16, '225 Dryden Pass', NULL, 'Ocala', 'FL', 74717, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (73, 31, '4 Raven Terrace', NULL, 'Tuscaloosa', 'AL', 93788, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (74, 14, '455 Lunder Point', NULL, 'Corona', 'CA', 78625, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (75, 5, '5 Melby Center', NULL, 'Louisville', 'KY', 74139, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (76, 36, '5801 Trailsway Park', NULL, 'Tampa', 'FL', 30507, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (77, 48, '31192 Ohio Road', NULL, 'Tacoma', 'WA', 94817, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (78, 16, '71 Bay Terrace', NULL, 'Vero Beach', 'FL', 50043, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (79, 22, '7 Havey Trail', NULL, 'Washington', 'DC', 64792, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (80, 25, '8214 Miller Pass', NULL, 'Kansas City', 'MO', 28981, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (81, 26, '13696 Mcbride Circle', NULL, 'Fort Wayne', 'IN', 37196, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (82, 33, '1 Jay Point', NULL, 'Philadelphia', 'PA', 60082, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (83, 9, '24 Heath Plaza', NULL, 'New York City', 'NY', 77302, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (84, 26, '8 Center Place', NULL, 'Wilkes Barre', 'PA', 38904, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (85, 18, '2339 Dapin Alley', NULL, 'Kansas City', 'MO', 94406, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (86, 37, '1811 Melvin Hill', NULL, 'Alexandria', 'VA', 24804, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (87, 13, '142 Hagan Junction', NULL, 'Pasadena', 'CA', 48795, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (88, 20, '55 Sundown Park', NULL, 'Albany', 'NY', 45103, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (89, 32, '6 Dwight Road', NULL, 'Nashville', 'TN', 31998, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (90, 9, '28070 Lindbergh Point', NULL, 'Kansas City', 'MO', 23444, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (91, 27, '676 Moose Place', NULL, 'Daytona Beach', 'FL', 45678, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (92, 30, '84161 Continental Court', NULL, 'Cape Coral', 'FL', 56073, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (93, 39, '5 Leroy Street', NULL, 'Washington', 'DC', 35648, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (94, 44, '85 Mayfield Crossing', NULL, 'South Bend', 'IN', 26414, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (95, 38, '8 Melody Court', NULL, 'Miami', 'FL', 98060, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (96, 31, '9 Roth Circle', NULL, 'Saint Paul', 'MN', 19522, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (97, 9, '33 Division Terrace', NULL, 'Arlington', 'TX', 94632, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (98, 42, '946 Becker Center', NULL, 'Albuquerque', 'NM', 74601, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (99, 12, '7236 Green Ridge Pass', NULL, 'Washington', 'DC', 98511, NULL);
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (100, 31, '48894 Melby Road', NULL, 'Tucson', 'AZ', 23356, NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `problem`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `problem` (`id`, `description`) VALUES (1, 'NO HEAT');
INSERT INTO `problem` (`id`, `description`) VALUES (2, 'NO AIR CONDITIONING');
INSERT INTO `problem` (`id`, `description`) VALUES (3, 'NO HOT WATER');
INSERT INTO `problem` (`id`, `description`) VALUES (4, 'NO WATER');
INSERT INTO `problem` (`id`, `description`) VALUES (5, 'MAINTENANCE HEAT');
INSERT INTO `problem` (`id`, `description`) VALUES (6, 'MAINTENANCE AIR CONDITIONING');
INSERT INTO `problem` (`id`, `description`) VALUES (7, 'LOUD NOISES');
INSERT INTO `problem` (`id`, `description`) VALUES (8, 'INDOOR FAN NOT RUNNING');
INSERT INTO `problem` (`id`, `description`) VALUES (9, 'FAN BROKEN');
INSERT INTO `problem` (`id`, `description`) VALUES (10, 'WATER LEAK');
INSERT INTO `problem` (`id`, `description`) VALUES (11, 'OUTDOOR FAN NOT RUNNING');
INSERT INTO `problem` (`id`, `description`) VALUES (12, 'NEW INSTALL');
INSERT INTO `problem` (`id`, `description`) VALUES (13, 'FROZEN OUTDOOR UNIT');
INSERT INTO `problem` (`id`, `description`) VALUES (14, 'FROZEN INDOOR UNIT');
INSERT INTO `problem` (`id`, `description`) VALUES (15, 'TRIPS BREAKER');
INSERT INTO `problem` (`id`, `description`) VALUES (16, 'NOT RUNNING');

COMMIT;


-- -----------------------------------------------------
-- Data for table `solution`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `solution` (`id`, `description`) VALUES (1, 'ADDED REFRIDGERANT');
INSERT INTO `solution` (`id`, `description`) VALUES (2, 'RESET SYSTEM POWER');
INSERT INTO `solution` (`id`, `description`) VALUES (3, 'CHANGED AIR FILTER');
INSERT INTO `solution` (`id`, `description`) VALUES (4, 'THAWED');
INSERT INTO `solution` (`id`, `description`) VALUES (5, 'PERFROMED MAINTENANCE');
INSERT INTO `solution` (`id`, `description`) VALUES (6, 'INSTALLED NEW SYSTEM');
INSERT INTO `solution` (`id`, `description`) VALUES (7, 'REPLACED EQUIPMENT');
INSERT INTO `solution` (`id`, `description`) VALUES (8, 'FIXED WATER LEAK');
INSERT INTO `solution` (`id`, `description`) VALUES (9, 'CLEARED DRAIN LINE');
INSERT INTO `solution` (`id`, `description`) VALUES (10, 'CLEANED FLAME SENSOR');
INSERT INTO `solution` (`id`, `description`) VALUES (11, 'FIXED');

COMMIT;


-- -----------------------------------------------------
-- Data for table `business`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (1, 1, 1, 'CJ\'s', 'https://image.shutterstock.com/z/stock-photo-cassette-type-air-condition-and-hvac-system[…]r-bare-skin-ceiling-of-insulated-metal-roof-735756277.jpg', '2022-01-7 18:52:01', '2022-01-7 18:52:02');
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (2, 1, 1, 'Plumbing & Plumbing', 'https://media.istockphoto.com/vectors/plumbing-design-or-icon-template-easy-to-customize-vector-id1061536116?k=20&m=1061536116&s=612x612&w=0&h=0wfMhwMVA5HJHZFhklLH1GjDMLWVOov27y-tqIJh_08=', '2022-01-7 18:52:01', '2022-01-7 18:52:02');
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (3, 1, 1, 'Dogma HVAC', 'https://thumbs.dreamstime.com/z/plumbing-logo-vector-icon-illustration-design-plumbing-logo-plumbing-logo-vector-icon-illustration-design-167274982.jpg', '2022-01-7 18:52:01', '2022-01-7 18:52:02');
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (4, 1, 1, 'Magical HVAC', 'https://thumbs.dreamstime.com/z/hvac-logo-design-heating-ventilation-air-conditioning-icon-template-165380324.jpg', '2022-01-7 18:52:01', '2022-01-7 18:52:02');
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (5, 67, 1, 'Enterprise HVAC', 'https://static.vecteezy.com/system/resources/previews/002/685/737/original/hvac-logo-design-illustration-eps-format-suitable-for-your-design-needs-logo-illustration-animation-etc-vector.jpg', '2022-01-7 18:52:01', '2022-01-7 18:52:02');
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (6, 68, 1, 'Brent\'s Plumbing', 'https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/08/plumbing-logos.jpg', '2022-01-7 18:52:01', '2022-01-7 18:52:02');
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (7, 69, 1, 'CT Woodworks', 'https://i.pinimg.com/originals/4b/d7/a0/4bd7a05aa4ab2e9b75639aba5e4a4be5.jpg', '2022-01-7 18:52:01', '2022-01-7 18:52:02');
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (8, 70, 1, 'Quest Panel', 'https://png.pngtree.com/png-clipart/20200727/original/pngtree-solar-panels-logo-house-and-sun-template-png-image_5297740.jpg', '2022-01-7 18:52:01', '2022-01-7 18:52:02');
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (9, 1, 1, 'Hunter Sunshine', 'https://previews.123rf.com/images/mrhungryman/mrhungryman2003/mrhungryman200300663/143366240-solar-panel-logo-template-design-vector.jpg', '2022-01-7 18:52:01', '2022-01-7 18:52:02');

COMMIT;


-- -----------------------------------------------------
-- Data for table `service_call`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (1, 1, 1, 11, 'No heat.', '2022-01-01', '2022-02-02', 0, 12.99, 1, 4, 'Fixed heater.', 1, 1, 3, 'I give it a 3');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (2, 2, 1, 11, 'Heat stopped working in house.', '2022-01-01', '2022-02-03', 0, 14.21, 0, 3, 'Reset system power.', 1, 2, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (3, 5, 2, 11, 'Air conditioning won\'t turn on. Fan\'s not spinning.', '2022-01-01', '2022-02-04', 1, 100.34, 0, 3, NULL, 3, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (4, 6, 2, 11, 'AC doesn\'t seem to be working but the unit is running.', '2022-01-02', '2022-02-05', 1, 54, 0, 10, NULL, 4, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (5, 4, 3, 11, 'Only cold water running out of all sinks.', '2022-01-05', '2022-02-06', 1, 54.26, 0, 8, NULL, 2, 4, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (6, 25, 1, 11, 'Heater stopped working.', '2022-01-04', '2022-02-07', 1, 66, 0, 5, NULL, 2, 2, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (7, 6, 4, 11, 'No water coming from any taps', '2022-01-07', '2022-02-08', 0, 90.20, 0, 3, NULL, 4, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (8, 4, 5, 11, 'Heater maintenance due.', '2022-01-06', '2022-02-09', 0, 50.60, 1, 10, NULL, 3, 4, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (9, 7, 5, 11, 'Heater maintenance due this week.', '2022-01-07', '2022-02-12', 0, 13.66, 0, 3, NULL, 1, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (10, 3, 6, 11, 'A/C maintenance due.', '2022-01-09', '2022-02-10', 0, 90.50, 0, 12, NULL, 1, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (11, 33, 1, 11, 'Heater stopped working.', '2022-01-06', '2022-02-10', 1, 85.20, 0, 3, NULL, 1, 33, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (12, 10, 10, 11, 'Water leaking from boiler.', '2022-01-21', '2022-02-28', 0, 45.60, 1, 4, NULL, 1, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (13, 5, 9, 11, 'Fan broken on A/C unit.', '2022-01-11', '2022-02-15', 1, 15.00, 0, 4, NULL, 1, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (14, 5, 12, 11, 'Install of new A/C unit at back of property.', '2022-01-16', '2022-02-22', 0, 70, 0, 8, NULL, 1, 5, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (15, 9, 10, 11, 'Leaking kitchen sink.', '2022-01-17', '2022-02-21', 0, 75.60, 0, 7, NULL, 1, 9, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (16, 4, 7, 11, 'Loud noises coming from attic fan.', '2022-01-17', '2022-02-19', 0, 80.20, 1, 7, NULL, 1, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (17, 2, 1, 11, 'I have no heat in my house, please help.', '2022-01-01', '2022-02-03', 0, 14.21, 0, 3, NULL, 1, 2, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (18, 22, 15, 11, 'Breaker tripping.', '2022-01-01', '2022-02-04', 1, 100.34, 0, 3, NULL, 3, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (19, 27, 11, 11, 'Outdoor fan won\'t spin.', '2022-01-02', '2022-02-05', 1, 54, 0, 10, NULL, 4, 1, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (20, 18, 3, 11, 'Hot water not coming on for upstairs shower.', '2022-01-05', '2022-02-06', 1, 54.26, 0, 8, NULL, 2, 18, 4, 'gave it a four');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (21, 19, 16, 11, 'My rear property unit is not running.', '2022-01-04', '2022-02-07', 1, 66, 0, 5, NULL, 2, 19, 4, 'gave it a four');

COMMIT;


-- -----------------------------------------------------
-- Data for table `equipment_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `equipment_type` (`id`, `type`) VALUES (1, 'Air Conditioner');
INSERT INTO `equipment_type` (`id`, `type`) VALUES (2, 'Toilet');
INSERT INTO `equipment_type` (`id`, `type`) VALUES (3, 'Solar Panel');

COMMIT;


-- -----------------------------------------------------
-- Data for table `model`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `model` (`id`, `name`, `equipment_type_id`, `model_number`, `description`, `fuel_type`) VALUES (1, NULL, 1, '1234', 'a big ac', 'Electric');

COMMIT;


-- -----------------------------------------------------
-- Data for table `equipment`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `equipment` (`id`, `serial_number`, `address_id`, `model_id`, `price`) VALUES (1, '1234', 1, 1, 50.25);
INSERT INTO `equipment` (`id`, `serial_number`, `address_id`, `model_id`, `price`) VALUES (2, '1234', 2, 1, 33.33);

COMMIT;


-- -----------------------------------------------------
-- Data for table `service_comment`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `service_comment` (`id`, `user_id`, `service_id`, `text`, `comment_date`) VALUES (1, 2, 1, 'fix my stuff', '2022-01-06 18:52:02');
INSERT INTO `service_comment` (`id`, `user_id`, `service_id`, `text`, `comment_date`) VALUES (2, 1, 1, 'I\'m getting there', '2022-01-07 18:52:02');

COMMIT;


-- -----------------------------------------------------
-- Data for table `business_user`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `business_user` (`business_id`, `user_id`) VALUES (1, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `service_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `service_type` (`id`, `description`, `name`) VALUES (1, NULL, 'HVAC Maintenance & Repair');
INSERT INTO `service_type` (`id`, `description`, `name`) VALUES (2, NULL, 'Plumbing');
INSERT INTO `service_type` (`id`, `description`, `name`) VALUES (3, NULL, 'Kitchen Refurbishing');
INSERT INTO `service_type` (`id`, `description`, `name`) VALUES (4, NULL, 'Patios');
INSERT INTO `service_type` (`id`, `description`, `name`) VALUES (5, NULL, 'Solar Panel Install, Repair, and Removal');

COMMIT;


-- -----------------------------------------------------
-- Data for table `business_service_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (1, 1);
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (2, 2);
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (1, 2);
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (3, 1);
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (4, 1);
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (5, 1);
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (6, 2);
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (7, 4);
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (8, 5);
INSERT INTO `business_service_type` (`business_id`, `service_type_id`) VALUES (9, 5);

COMMIT;

