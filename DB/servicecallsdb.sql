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
  `contractor_id` INT NOT NULL,
  `business_type_id` INT NOT NULL,
  PRIMARY KEY (`contractor_id`, `business_type_id`),
  INDEX `fk_contractor_has_service_type_service_type1_idx` (`business_type_id` ASC),
  INDEX `fk_contractor_has_service_type_contractor1_idx` (`contractor_id` ASC),
  CONSTRAINT `fk_contractor_has_service_type_contractor1`
    FOREIGN KEY (`contractor_id`)
    REFERENCES `business` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_contractor_has_service_type_service_type1`
    FOREIGN KEY (`business_type_id`)
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
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (1, 'John', 'Doe', '1231231111', 'business', 1, 'hes a guy', 'johndoe', '$2a$10$RRdxemmcZudAaoLiaevK8.L77H1tfgBxWcAOgHrcjwqFy3puA6xM2', '2022-01-6 18:52:02', '2022-01-6 18:52:03');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (2, 'Test', 'Testerson', '1231232222', 'customer', 1, 'Tests a lot', 'test', '$2a$10$vA.zLAZr/ihTPnn3boZ7CuuvhCtgO3vFVuDQVQ8MvkJZO1YajPRlC', '2022-01-8 18:52:02', '2022-01-8 18:52:04');
INSERT INTO `user` (`id`, `first_name`, `last_name`, `phone_number`, `role`, `enabled`, `notes`, `username`, `password`, `created_date`, `updated_date`) VALUES (3, 'Smith', 'Jones', '1231232223', 'admin', 1, 'is and admin', 'admin', '$2a$10$ERLPMzTwDyd/XYJthi0Y2OjY.g2DF8LEv3MIW.g0ZvjXlCzQYTxTC', '2022-01-8 18:52:02', '2022-01-8 18:52:04');

COMMIT;


-- -----------------------------------------------------
-- Data for table `address`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (1, 1, '62 Fake St.', 'unit 1', 'Hanover', 'PA', 99022, 'notes');
INSERT INTO `address` (`id`, `user_id`, `street`, `street_2`, `city`, `state_abbv`, `zip_code`, `notes`) VALUES (2, 2, '3522 Notreal Ave.', NULL, 'Hampstead', 'MD', 80238, 'notes');

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

COMMIT;


-- -----------------------------------------------------
-- Data for table `business`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `business` (`id`, `user_id`, `enabled`, `name`, `logo_url`, `created_date`, `updated_date`) VALUES (1, 1, 1, 'CJ\'s', 'https://image.shutterstock.com/z/stock-photo-cassette-type-air-condition-and-hvac-system[…]r-bare-skin-ceiling-of-insulated-metal-roof-735756277.jpg', '2022-01-7 18:52:01', '2022-01-7 18:52:02');

COMMIT;


-- -----------------------------------------------------
-- Data for table `service_call`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (1, 1, 1, 1, 'No heat', '2022-01-01', '2022-01-02', 0, 12.99, 1, 4, 'stuff happened', 1, 1, 3, 'I give it a 3');
INSERT INTO `service_call` (`id`, `address_id`, `problem_id`, `solution_id`, `problem_description`, `date_created`, `date_scheduled`, `completed`, `total_cost`, `estimate`, `hours_labor`, `contractor_notes`, `business_id`, `user_id`, `customer_rating`, `customer_rating_comment`) VALUES (2, 2, 1, 1, 'maintenance', '2022-01-01', '2022-01-02', 0, 14.21, 0, 3, 'fixes it', 1, 2, 4, 'gave it a four');

COMMIT;


-- -----------------------------------------------------
-- Data for table `equipment_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `equipment_type` (`id`, `type`) VALUES (1, 'Air Conditioner');

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

COMMIT;


-- -----------------------------------------------------
-- Data for table `business_service_type`
-- -----------------------------------------------------
START TRANSACTION;
USE `servicecallsdb`;
INSERT INTO `business_service_type` (`contractor_id`, `business_type_id`) VALUES (1, 1);

COMMIT;

