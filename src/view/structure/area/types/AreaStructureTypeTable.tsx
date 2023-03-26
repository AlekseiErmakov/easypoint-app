import { type IAreaStructureType } from './index'
import { type ColumnsType } from 'antd/es/table'
import { Table } from 'antd'

const columns: ColumnsType<IAreaStructureType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  }
]

interface AreaStructureTypeTableProps {
  areaStructureTypes: IAreaStructureType[]
}

const AreaStructureTypeTable = (props: AreaStructureTypeTableProps): JSX.Element => {
  return <Table columns={columns} dataSource={props.areaStructureTypes} rowKey={it => it.id}/>
}

export default AreaStructureTypeTable
