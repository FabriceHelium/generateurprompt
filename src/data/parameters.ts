import { humanoids } from './creatures/humanoids';
import { hybrids } from './creatures/hybrids';
import { cryptids } from './creatures/cryptids';
import { xenomorphs } from './creatures/xenomorphs';
import { supernatural } from './creatures/supernatural';
import { moods } from './parameters/mood';
import { appearances } from './parameters/appearance';
import { videoStyles } from './parameters/videoStyle';
import { aspectRatios } from './parameters/aspectRatio';
import { movements } from './parameters/movement';
import { effects } from './parameters/effects';

const allCreatures = [
  ...humanoids.creatures,
  ...hybrids.creatures,
  ...cryptids.creatures,
  ...xenomorphs.creatures,
  ...supernatural.creatures
];

export const defaultParameters = [
  {
    id: 'creature',
    name: 'Type de Créature',
    options: allCreatures,
    selected: allCreatures[0]
  },
  {
    id: 'mood',
    name: 'Ambiance',
    options: moods.options,
    selected: moods.options[0]
  },
  {
    id: 'appearance',
    name: 'Type d\'Apparition',
    options: appearances.options,
    selected: appearances.options[0]
  },
  {
    id: 'environment',
    name: 'Environnement',
    options: [
      'Ruines Anciennes',
      'Station Spatiale',
      'Installation Souterraine',
      'Jungle Dense',
      'Base Arctique',
      'Ville Abandonnée',
      'Désert Post-apocalyptique',
      'Profondeurs Océaniques',
      'Paysage Volcanique',
      'Monde Alien'
    ],
    selected: 'Ruines Anciennes'
  },
  {
    id: 'videoStyle',
    name: 'Style Visuel',
    options: videoStyles.options,
    selected: videoStyles.options[0]
  },
  {
    id: 'aspectRatio',
    name: 'Format Vidéo',
    options: aspectRatios.options,
    selected: aspectRatios.options[0]
  },
  {
    id: 'movement',
    name: 'Mode Mouvement',
    options: movements.options,
    selected: movements.options[0]
  },
  {
    id: 'effect',
    name: 'Effet Spécial',
    options: effects.options,
    selected: effects.options[0]
  },
  {
    id: 'weather',
    name: 'Atmosphère',
    options: [
      'Brouillard Toxique',
      'Pluie Acide',
      'Pluie de Météores',
      'Tempête Électrique',
      'Éruption Solaire',
      'Éclipse Totale',
      'Distorsion Quantique',
      'Tempête Temporelle',
      'Brèche Dimensionnelle',
      'Faille Réalité'
    ],
    selected: 'Brouillard Toxique'
  },
  {
    id: 'lighting',
    name: 'Effets Lumineux',
    options: [
      'Lueur Bioluminescente',
      'Décharge de Plasma',
      'Particules Quantiques',
      'Radiation UV',
      'Brume Éthérée',
      'Énergie du Vide',
      'Réfraction Cristalline',
      'Réseau Neural',
      'Matière Sombre',
      'Distorsion Temporelle'
    ],
    selected: 'Lueur Bioluminescente'
  },
  {
    id: 'quality',
    name: 'Qualité du Rendu',
    options: [
      'Réalisme 8K',
      'Photoréaliste',
      'Cinématographique',
      'Hyperréaliste',
      'Rendu Quantique',
      'Amélioration Neurale',
      'Deep Dream',
      'Optimisation IA'
    ],
    selected: 'Réalisme 8K'
  }
];