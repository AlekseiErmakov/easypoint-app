import {IAreaStructure, TreeAreaStructure} from "../view/structure/area";


export const toTreeNode = (areaStructure: IAreaStructure): TreeAreaStructure => {
    return {
        key: areaStructure.id,
        title: areaStructure.name,
        description: areaStructure.description,
        areaStructureType: areaStructure.areaStructureType,
        parent: areaStructure.parent,
        children: areaStructure.children.map(it => toTreeNode(it))
    }
}