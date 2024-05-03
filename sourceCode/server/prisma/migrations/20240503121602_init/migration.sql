-- CreateTable
CREATE TABLE `t_categorie` (
    `idCategorie` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `catNom` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `t_categorie_catNom_key`(`catNom`),
    PRIMARY KEY (`idCategorie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_activite` (
    `idActivite` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `actDescription` VARCHAR(1000) NOT NULL,
    `actDate` DATE NOT NULL,
    `actDuree` TIME NOT NULL,
    `fkCategorie` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`idActivite`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_apiculteur` (
    `idApiculteur` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `apiNomUtilisateur` VARCHAR(255) NOT NULL,
    `apiMotDePasse` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `t_apiculteur_apiNomUtilisateur_key`(`apiNomUtilisateur`),
    PRIMARY KEY (`idApiculteur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_rucher` (
    `idRucher` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `rucNumero` INTEGER UNSIGNED NOT NULL,
    `rucNom` VARCHAR(255) NOT NULL,
    `rucLocalisation` VARCHAR(255) NOT NULL,
    `fkApiculteur` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `t_rucher_rucNumero_key`(`rucNumero`),
    PRIMARY KEY (`idRucher`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_couleur` (
    `idCouleur` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `couNom` VARCHAR(255) NOT NULL,
    `couCodeHex` VARCHAR(6) NOT NULL,

    UNIQUE INDEX `t_couleur_couNom_key`(`couNom`),
    PRIMARY KEY (`idCouleur`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_reine` (
    `idReine` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `reiAnneNaissance` YEAR NOT NULL,
    `fkCouleur` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`idReine`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `t_ruche` (
    `idRuche` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `rucNumero` INTEGER UNSIGNED NOT NULL,
    `rucDescription` VARCHAR(1000) NOT NULL,
    `fkReine` INTEGER UNSIGNED NOT NULL,
    `fkRucher` INTEGER UNSIGNED NOT NULL,
    `fkCouleur` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `t_ruche_rucNumero_key`(`rucNumero`),
    PRIMARY KEY (`idRuche`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_t_activiteTot_ruche` (
    `A` INTEGER UNSIGNED NOT NULL,
    `B` INTEGER UNSIGNED NOT NULL,

    UNIQUE INDEX `_t_activiteTot_ruche_AB_unique`(`A`, `B`),
    INDEX `_t_activiteTot_ruche_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `t_activite` ADD CONSTRAINT `t_activite_fkCategorie_fkey` FOREIGN KEY (`fkCategorie`) REFERENCES `t_categorie`(`idCategorie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_rucher` ADD CONSTRAINT `t_rucher_fkApiculteur_fkey` FOREIGN KEY (`fkApiculteur`) REFERENCES `t_apiculteur`(`idApiculteur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_reine` ADD CONSTRAINT `t_reine_fkCouleur_fkey` FOREIGN KEY (`fkCouleur`) REFERENCES `t_couleur`(`idCouleur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_ruche` ADD CONSTRAINT `t_ruche_fkReine_fkey` FOREIGN KEY (`fkReine`) REFERENCES `t_reine`(`idReine`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_ruche` ADD CONSTRAINT `t_ruche_fkRucher_fkey` FOREIGN KEY (`fkRucher`) REFERENCES `t_rucher`(`idRucher`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `t_ruche` ADD CONSTRAINT `t_ruche_fkCouleur_fkey` FOREIGN KEY (`fkCouleur`) REFERENCES `t_couleur`(`idCouleur`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_t_activiteTot_ruche` ADD CONSTRAINT `_t_activiteTot_ruche_A_fkey` FOREIGN KEY (`A`) REFERENCES `t_activite`(`idActivite`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_t_activiteTot_ruche` ADD CONSTRAINT `_t_activiteTot_ruche_B_fkey` FOREIGN KEY (`B`) REFERENCES `t_ruche`(`idRuche`) ON DELETE CASCADE ON UPDATE CASCADE;
