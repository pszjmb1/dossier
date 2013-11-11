/**
 * Server fixture data for Dossier
 */

if (Crises.find().count() === 0) {
  Crises.insert({
    name: 'Tsunami',
  });

  Crises.insert({
    name: 'Explosion',
  });

  Crises.insert({
    name: 'Catastrophic data loss',
  });
}