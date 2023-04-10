import { type IAreaStructure, type TreeAreaStructure } from '../view/structure/area'
import {AdministrativeUnitTree, IAdministrativeUnit} from '../view/structure/admin';

export const toTreeNode = (areaStructure: IAreaStructure): TreeAreaStructure => {
  return {
    key: areaStructure.id,
    title: areaStructure.name,
    label: areaStructure.name,
    value: areaStructure.id,
    description: areaStructure.description,
    areaStructureType: areaStructure.areaStructureType,
    parent: areaStructure.parent,
    children: areaStructure.children.map(it => toTreeNode(it))
  }
}

export const toAdministrativeUnitTree = (administrativeUnit: IAdministrativeUnit): AdministrativeUnitTree => {
  return {
    key: administrativeUnit.id,
    title: administrativeUnit.name,
    label: administrativeUnit.name,
    value: administrativeUnit.id,
    description: administrativeUnit.description,
    administrativeUnitType: administrativeUnit.administrativeUnitType,
    parent: administrativeUnit.parent,
    children: administrativeUnit.children.map(it => toAdministrativeUnitTree(it))
  }
}
