const rucherRecord = await rucherDB.create(rucher)

const create = async (rucher: Rucher) => {
    return await prisma.t_rucher.create({
        data: {
            rucNumero: rucher.nbr,
            rucNom: rucher.name,
            rucLocalisation: rucher.localisation,
            fkApiculteur: rucher.fkApiculteur,
        }
    })
}