import { ILikelihoodType } from './interfaces/likelihood-type.interface';

export const likelihoods: ILikelihoodType[] = [
  {
    level: 5,
    impacts: [
      { level: 1, label: 'M' },
      { level: 2, label: 'M' },
      { level: 3, label: 'H' },
      { level: 4, label: 'H' },
      { level: 5, label: 'H' },
    ],
  },
  {
    level: 4,
    impacts: [
      { level: 1, label: 'L' },
      { level: 2, label: 'M' },
      { level: 3, label: 'M' },
      { level: 4, label: 'H' },
      { level: 5, label: 'H' },
    ],
  },
  {
    level: 3,
    impacts: [
      { level: 1, label: 'L' },
      { level: 2, label: 'M' },
      { level: 3, label: 'M' },
      { level: 4, label: 'H' },
      { level: 5, label: 'H' },
    ],
  },
  {
    level: 2,
    impacts: [
      { level: 1, label: 'L' },
      { level: 2, label: 'L' },
      { level: 3, label: 'M' },
      { level: 4, label: 'M' },
      { level: 5, label: 'H' },
    ],
  },
  {
    level: 1,
    impacts: [
      { level: 1, label: 'L' },
      { level: 2, label: 'L' },
      { level: 3, label: 'L' },
      { level: 4, label: 'M' },
      { level: 5, label: 'M' },
    ],
  },
];
