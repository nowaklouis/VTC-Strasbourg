module.exports = async (db) => {
  const infoTrajets = db.infoTrajets;
  await infoTrajets.create({
    name: "line1",
    line1:
      "Voici quelques informations à retenir avant de réserver un trajet sur notre page :",
    line2:
      "- Les courses ne peuvent être réservées qu' 1 heure après l'heure actuelle de réservation, réserver en avance!",
    line3: "- Disposition à l'heure | 70 € par heure + 1.20 par Km",
    line4:
      "- Prise en charge en dehors de la France impossible mais dépôt possible en dehors.",
    line5:
      "- Toutes les courses sont retenues mais sont en attente de validation d'un chauffeur avec le paiement en attente également, si validé, un mail de validation vous sera transmis sur votre boite mail, si refus, annulation du paiement avec l'envoi d'un mail précisant le refus de la réservation.",
    line6:
      "- Si c'est votre première course, paiement sur le site obligatoire, sinon, paiement directement dans le taxi proposé.",
    line7:
      "Tél: 01.01.01.01.01 - Seulement pour cas spécifique ou demande spéciale",
  });
};
