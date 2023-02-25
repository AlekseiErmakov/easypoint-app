import {Layout, Menu, MenuProps, theme} from "antd";
import React from "react";
import {BorderOuterOutlined, LaptopOutlined, NotificationOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import {ItemType} from "antd/es/menu/hooks/useItems";
import EmployeePage from "../employee";
import {Link, Route, Routes} from "react-router-dom";
import PointPage from "../point";

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

const menuItems = [employeeMenuItem, pointMenuItem];
const MainLayout = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout>
            <Header style={{backgroundColor: "#1890ff"}}>
                <div className="logo">
                </div>
            </Header>
            <Content style={{padding: '0 50px'}}>
                <Layout style={{padding: '24px 0', background: colorBgContainer}}>
                    <Sider style={{background: colorBgContainer}} width={200}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%'}}
                            items={menuItems}
                        />
                    </Sider>
                    <Content style={{padding: '0 24px', minHeight: 280}}>
                        <Routes>
                            <Route path="/employees" element={<EmployeePage/>} />
                            <Route path="/points" element={<PointPage/>} />
                        </Routes>
                    </Content>
                </Layout>
            </Content>
            <Footer style={{textAlign: 'center'}}>Easy Point ©2023 Created by Aleksey Ermakov</Footer>
        </Layout>
    )
}

export default MainLayout;