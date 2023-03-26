import { type IAreaStructure, type TreeAreaStructure } from '../view/structure/area'

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
