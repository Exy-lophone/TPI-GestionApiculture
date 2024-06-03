--
-- Base de données : `db_gestionApiculteur`
--

-- --------------------------------------------------------

--
-- Déchargement des données de la table `t_apiculteur`
--

INSERT INTO `t_apiculteur` (`idApiculteur`, `apiNomUtilisateur`, `apiMotDePasse`) VALUES
(2, 'Apiculteur', '$2b$10$WNJWaH1USp.gpvZ.GEp01e4xvFJjw6fS/V1pr4ux/TS9/WzAJAQl6');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `t_categorie`
--

INSERT INTO `t_categorie` (`idCategorie`, `catNom`) VALUES
(4, 'extraction'),
(2, 'inspection'),
(3, 'mise des hausses'),
(6, 'nourrissement'),
(5, 'traitement');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `t_couleur`
--

INSERT INTO `t_couleur` (`idCouleur`, `couNom`, `couCodeHex`) VALUES
(3, 'Bleu', '0000ff'),
(4, 'Blanc', '000000'),
(5, 'Jaune', 'ffff00'),
(6, 'Rouge', 'ff0000'),
(7, 'Vert', '00ff00'),
(8, 'Mauve', '8B00F8'),
(9, 'Rose', 'E306A5'),
(10, 'Vert lime', 'C0FA44'),
(11, 'Cyan', '10B0F5');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `t_reine`
--

INSERT INTO `t_reine` (`idReine`, `reiAnneNaissance`, `fkCouleur`) VALUES
(3, 2020, 3),
(4, 2021, 4),
(5, 2022, 5),
(6, 2023, 6),
(7, 2024, 7),
(8, 2025, 3);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `t_rucher`
--

INSERT INTO `t_rucher` (`idRucher`, `rucNumero`, `rucNom`, `rucLocalisation`, `fkApiculteur`) VALUES
(1, 57256001, 'Bee Happy', 'Chem. de Maillefer 37, 1052 Le Mont-sur-Lausanne', 2),
(3, 15637943, 'Super Rucher', 'Rue de Cossonay, 1029 Villars-Sainte-Croix', 2);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `t_ruche`
--

INSERT INTO `t_ruche` (`idRuche`, `rucNumero`, `rucDescription`, `fkReine`, `fkRucher`, `fkCouleur`) VALUES
(5, 1, 'Description de la ruche numéro 1', 3, 1, 3),
(6, 2, 'Description de la ruche numéro 2', 4, 1, 6),
(7, 3, 'Description de la ruche numéro 3', 5, 1, 7),
(8, 4, 'description de la ruche numéro 4', 6, 3, 4),
(9, 5, 'Description de la ruche numéro 5', 7, 3, 11),
(10, 6, 'Description de la ruche numéro 6', 8, 3, 8),
(11, 10, 'wdagwgag', 4, 1, 5);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `t_activite`
--

INSERT INTO `t_activite` (`idActivite`, `actDescription`, `actDate`, `actDuree`, `fkCategorie`, `fkRuche`) VALUES
(35, 'Mise des hausse', '2024-07-21', '03:21:00', 3, 6),
(36, 'Mise des hausse', '2025-07-21', '04:20:00', 3, 7),
(37, 'Nourrir les abeilles', '2024-06-21', '03:30:00', 6, 5),
(38, 'Nourrir toutes les abeilles', '2024-06-21', '03:30:00', 6, 6),
(39, 'Nourrir toutes les abeilles', '2024-06-21', '03:30:00', 6, 7),
(40, 'Nourrir toutes les abeilles', '2024-06-21', '03:30:00', 6, 11),
(41, 'Inspecter toutes les ruches', '2025-06-10', '01:30:00', 2, 8),
(42, 'Inspecter toutes les ruches', '2025-06-10', '01:30:00', 2, 9),
(43, 'Inspecter toutes les ruches', '2025-06-10', '01:30:00', 2, 10);

-- --------------------------------------------------------
