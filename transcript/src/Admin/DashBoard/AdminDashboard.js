import { Layout, Menu, Divider } from 'antd';
import { HomeOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import Requests from './Requests';
import PrintTransactions from './PrintTransactions';

const { Content, Sider } = Layout;

const AdminDashboard = (props) => {
    const { type } = useParams();
    const finance = type === "finance" ? true: false;

    return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    style={{background: "rgba(231, 233, 235, 1)"}}
                >
                    <Menu mode="inline" style={{background: "rgba(231, 233, 235, 1)", marginTop: "80px"}} defaultSelectedKeys={"1"}>
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            Home
                        </Menu.Item>
                        <Menu.SubMenu title="User" icon={<UserOutlined />}>
                            <Menu.Item disabled={true} style={{background: "rgba(231, 233, 235, 1)", margin: 0}}>Donald Asiedu</Menu.Item>
                            <Menu.Item disabled={true} style={{background: "rgba(231, 233, 235, 1)", margin: 0}}>dkay@gmail.com</Menu.Item>
                        </Menu.SubMenu>
                        
                        
                        <Menu.Item key="2" icon={<LogoutOutlined />}>
                        <Link to="/">
                            Logout
                            </Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Content>
                    <div className="site-layout-background" style={{ padding: 30, marginTop: "50px",minHeight: "100vh", background: "rgba(245, 245, 245, 1)" }}> 
                        {finance && <PrintTransactions />}
                        <Requests type={type}/>
                    </div>
                </Content>
            </Layout>
    );
}

export default AdminDashboard;