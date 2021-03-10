import { IImpactType } from './impact-type.interface';

export interface ILikelihoodType {
  level: number,
  impacts: Array<IImpactType>
}
