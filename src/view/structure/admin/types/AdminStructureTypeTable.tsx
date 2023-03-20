import {ColumnsType} from "antd/es/table";
import {Table} from "antd";
import {IAdminStructureType} from "./index";

const columns: ColumnsType<IAdminStructureType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
    }
];

interface AdminStructureTypeTableProps {
    adminStructureTypes: IAdminStructureType[]
}


const AdminStructureTypeTable = (props: AdminStructureTypeTableProps) => {
    return <Table columns={columns} dataSource={props.adminStructureTypes} rowKey={it => it.id}/>
}

export default AdminStructureTypeTable;