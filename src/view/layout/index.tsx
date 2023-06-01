import { Layout, Menu, theme } from 'antd'
import React from 'react'
import {
  BorderOuterOutlined,
  PartitionOutlined,
  TeamOutlined,
  ToolOutlined
} from '@ant-design/icons'
import { type ItemType } from 'antd/es/menu/hooks/useItems'
import EmployeePage from '../employee'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import PointPage from '../point'
import TotalStationPage from '../tool/totalStation'
import AreaStructureTypePage from '../structure/area/types'
import AreaStructurePage from '../structure/area'
import AdminStructureTypePage from '../structure/admin/types'
import AdminStructurePage from '../structure/admin'
import CompetencyPage from '../competency'
import JobTitlePage from '../jobTitle'
import EmployeeInfoPage from '../employee/EmployeeInfoPage'

const { Header, Content, Footer, Sider } = Layout

const employeeMenuItem: ItemType = {
  key: 'employee',
  icon: <TeamOutlined/>,
  label: 'Employees',

  children: [
    { key: 'employeeList', label: <Link to={'/employees'}>Employees</Link> },
    { key: 'competencyList', label: <Link to={'/competencies'}>Competencies</Link> },
    { key: 'jobTitleList', label: <Link to={'/jobTitles'}>Job titles</Link> }
  ]
}

const pointMenuItem: ItemType = {
  key: 'points',
  icon: <BorderOuterOutlined/>,
  label: 'Horizontal and vertical control surveys',

  children: [
    { key: 'pointsList', label: <Link to={'/points'}>Points</Link> }
  ]
}

const toolMenuItem: ItemType = {
  key: 'tools',
  icon: <ToolOutlined/>,
  label: 'Tools',

  children: [{ key: 'totalStationList', label: <Link to={'/tools/total-stations'}>Total stations</Link> }]
}

const structureMenuItem: ItemType = {
  key: 'structure',
  icon: <PartitionOutlined/>,
  label: 'Structure',

  children: [
    { key: 'adminStructureTypes', label: <Link to={'/structure/admin-types'}>Admin structure types</Link> },
    { key: 'areaStructureTypes', label: <Link to={'/structure/area-types'}>Area structure types</Link> },
    { key: 'areaStructure', label: <Link to={'/structure/area'}>Area structure</Link> },
    { key: 'adminStructure', label: <Link to={'/structure/admin'}>Admin structure</Link> }
  ]
}

const menuItems = [employeeMenuItem, pointMenuItem, toolMenuItem, structureMenuItem]
const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  return (
    <Layout style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header style={{ backgroundColor: '#1890ff' }}>
        <div className="logo">
        </div>
      </Header>
      <Content style={{ flexGrow: 1, display: 'flex' }}>
        <Layout style={{ background: colorBgContainer, flexGrow: 1 }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={menuItems}
            />
          </Sider>
          <Content style={{ minHeight: 280, paddingRight: 10, paddingTop: 10 }}>
            <Routes>
              <Route path="/employees" element={<EmployeePage/>}/>
              <Route path="/employees/:employeeId" element={<EmployeeInfoPage/>}/>
              <Route path="/competencies" element={<CompetencyPage/>}/>
              <Route path="/jobTitles" element={<JobTitlePage/>}/>
              <Route path="/points" element={<PointPage/>}/>
              <Route path="/tools/total-stations" element={<TotalStationPage/>}/>
              <Route path="/structure/area-types" element={<AreaStructureTypePage/>}/>
              <Route path="/structure/admin-types" element={<AdminStructureTypePage/>}/>
              <Route path="/structure/area" element={<AreaStructurePage/>}/>
              <Route path="/structure/admin" element={<AdminStructurePage/>}/>
              <Route
                path="*"
                element={<Navigate to="/employees" replace />}
              />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Easy Point ©2023 Created by Aleksey Ermakov</Footer>
    </Layout>
  )
}

export default MainLayout
