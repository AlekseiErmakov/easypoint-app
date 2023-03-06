import {Layout, Menu, MenuProps, theme} from "antd";
import React from "react";
import {
    BorderOuterOutlined,
    LaptopOutlined,
    NotificationOutlined, PartitionOutlined,
    TeamOutlined,
    ToolOutlined,
    UserOutlined
} from "@ant-design/icons";
import {ItemType} from "antd/es/menu/hooks/useItems";
import EmployeePage from "../employee";
import {Link, Route, Routes} from "react-router-dom";
import PointPage from "../point";
import TotalStationPage from "../tool/totalStation";
import AreaStructureTypePage from "../structure/area/types";
import AreaStructurePage from "../structure/area";

const {Header, Content, Footer, Sider} = Layout;

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
        const key = String(index + 1);

        return {
            key: `sub${key}`,
            icon: React.createElement(icon),
            label: `subnav ${key}`,

            children: new Array(4).fill(null).map((_, j) => {
                const subKey = index * 4 + j + 1;
                return {
                    key: subKey,
                    label: `option${subKey}`,
                };
            }),
        };
    },
);

const employeeMenuItem: ItemType = {
    key: 'employee',
    icon: <TeamOutlined/>,
    label: 'Employees',

    children: [{key: 'employeeList', label: <Link to={'/employees'}>Employees</Link>}]
}

const pointMenuItem: ItemType = {
    key: 'points',
    icon: <BorderOuterOutlined />,
    label: 'Horizontal and vertical control surveys',

    children: [{key: 'pointsList', label: <Link to={'/points'}>Points</Link>}]
}

const toolMenuItem: ItemType = {
    key: 'tools',
    icon: <ToolOutlined  />,
    label: 'Tools',

    children: [{key: 'totalStationList', label: <Link to={'/tools/total-stations'}>Total stations</Link>}]
}

const structureMenuItem: ItemType = {
    key: 'structure',
    icon: <PartitionOutlined />,
    label: 'Structure',

    children: [
        {key: 'areaStructureTypes', label: <Link to={'/structure/area-types'}>Area structure types</Link>},
        {key: 'areaStructure', label: <Link to={'/structure/area'}>Area structure</Link>}
    ]
}

const menuItems = [employeeMenuItem, pointMenuItem, toolMenuItem, structureMenuItem];
const MainLayout = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout style={{display: 'flex', flexDirection:'column', minHeight: '100vh'}}>
            <Header style={{backgroundColor: "#1890ff"}}>
                <div className="logo">
                </div>
            </Header>
            <Content style={{flexGrow: 1, display:'flex'}}>
                <Layout style={{background: colorBgContainer, flexGrow:1}}>
                    <Sider style={{background: colorBgContainer}} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            items={menuItems}
                        />
                    </Sider>
                    <Content style={{minHeight: 280, paddingRight: 10, paddingTop: 10}}>
                        <Routes>
                            <Route path="/employees" element={<EmployeePage/>} />
                            <Route path="/points" element={<PointPage/>} />
                            <Route path="/tools/total-stations" element={<TotalStationPage/>}/>
                            <Route path="/structure/area-types" element={<AreaStructureTypePage/>}/>
                            <Route path="/structure/area" element={<AreaStructurePage/>}/>
                        </Routes>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Easy Point ©2023 Created by Aleksey Ermakov</Footer>
        </Layout>
    )
}

export default MainLayout;