import 'antd/dist/antd.variable.min.css';
import Info from './info';
import {
    ConfigProvider,
    Typography,
    Layout,
    Menu,
    Button,
    Divider,
    Steps,
    message,
    Input,
    Col,
    Row,
    Radio,
    Space,
    Card,
    Form
} from 'antd';
import {
    FormOutlined,
    CheckCircleOutlined,
    IdcardOutlined,
    CheckCircleFilled,
    HomeOutlined,
    BulbOutlined,
    MailOutlined,
    LinkOutlined,
    FileOutlined
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import ResultCard from "../serach_results/result_card";
import axios from "axios";
const { Header, Content, Footer} = Layout;
const { Title, Paragraph, Text} = Typography;

const onChange = (key) => {
    console.log(key);
};
const onFinish = (values) => {
    console.log(values);
};

ConfigProvider.config({
    theme: {
        primaryColor: '#3a3af1',
        successColor: '#50af78',
    },
});

function ApplyPortal() {
    // const {portalList} = props;
    let location = useLocation()
    let params = new URLSearchParams(location.search)
    // let RID = params.get('RID')
    const [data, setData] = useState([]);
    const [Rlist, setRlist] = useState([]);

    const [form] = Form.useForm();
    const Rname = Form.useWatch('Rname', form);
    const Rinstitute = Form.useWatch('Rinstitute', form);
    const Rcontact = Form.useWatch('Rcontact', form);
    const Rconcepts = Form.useWatch('Rconcepts', form);
    const RpersonalPage = Form.useWatch('RpersonalPage', form);
    const Rgateinfo = Form.useWatch('Rgateinfo', form);

    const getPortal = ()=>{
        axios({
            method: "post",
            url: "/applyPortal1",
            data: {
                Rname: Rname,
                Rinstitute: Rinstitute,
            },
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        .then(res => {
            console.log(res.data.data)
            setData(res.data.data.list)
        })
        next()
    }

    const findMore = ()=>{
        axios({
            method: "post",
            url: "/applyPortal1",
            data: {
                Rname: Rname,
                Rinstitute: Rinstitute,
            },
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        .then(res => {
            console.log(res.data.data)
            setData(res.data.data.list)
        })
    }

    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
        // console.log(value);
    };

    const choosePortal = ()=>{
        console.log(value);
        axios({
            method: "post",
            url: "/applyPortal2",
            data: {
                RID: value,
                Rname: Rname,
                Rinstitute: Rinstitute,
                Rcontact: Rcontact,
                Rconcepts: Rconcepts,
                RpersonalPage: RpersonalPage,
                Rgateinfo: Rgateinfo,
            },
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
            .then(res => {
                console.log(res.data)
            })
        next()
    }

    // page2 hover create portal
    const [createIsHover, setCreateIsHover] = useState(false)
    const handleMouseEnterCreate = () => {
        setCreateIsHover(true)
    }
    const handleMouseLeaveCreate = () => {
        setCreateIsHover(false);
    }
    const createStyle = {
        color: createIsHover ? '#8484f1' : '#3a3af1',
        textDecoration: createIsHover ? 'underline' : 'none',
        margin: '0 0 0 60px',
        fontSize: '16px',
    }

    // page
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const validateMessages = {
        required: '${label}为必填项',
        types: {
            email: '请输入有效的${label}!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const steps = [
        {
            title: '个人信息',
            status: 'finish',
            icon:
                <FormOutlined />,
            content: (
                <div>
                    <Form {...layout} form={form} onFinish={onFinish} validateMessages={validateMessages}>
                        <Form.Item
                            name="Rname"
                            label="姓名"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input placeholder="请输入您的姓名" />
                        </Form.Item>
                        <Form.Item
                            name="Rinstitute"
                            label="工作单位"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input placeholder="请输入您的工作单位"/>
                        </Form.Item>
                        <Form.Item
                            name="Rcontact"
                            label="电子邮箱"
                            rules={[
                                {
                                    type: 'email',
                                    required: true,
                                },
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input placeholder="请输入您的电子邮箱"/>
                        </Form.Item>
                        <Form.Item
                            name="Rconcepts"
                            label="研究领域"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input placeholder="多个研究领域用英文半角逗号(,)分隔" />
                        </Form.Item>
                        <Form.Item
                            name="RpersonalPage" label="个人主页"
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input placeholder="请输入您的个人主页"/>
                        </Form.Item>
                        <Form.Item
                            name="Rgateinfo" label="个人简介"
                            style={{
                                padding: '10px',
                                color: '#0087FF',
                            }}
                        >
                            <Input.TextArea placeholder="请输入您的个人简介"/>
                        </Form.Item>
                    </Form>
                </div>
            ),
        },
        {
            title: '选择门户',
            status: 'finish',
            icon: <IdcardOutlined />,
            content: (
                <div>
                    <Row>
                        <Text
                            style={{
                                fontSize: '20px',
                                paddingBottom: '25px',
                            }}
                        >
                            已根据您的姓名检索出以下门户，请选择：
                        </Text>
                    </Row>
                    <div
                        style={{
                            width: '100%',
                            overflow: 'auto',
                        }}
                    >
                        <Radio.Group
                            onChange={onChange}
                            value={value}
                            defaultValue={1}
                            style={{
                                width: '100%',
                                overflow: 'auto',
                            }}
                        >
                            <Space direction="vertical">
                                {
                                    data.map((value,key) => {
                                        return (
                                            <Radio
                                                value={value.rID}
                                                style={{
                                                    padding: '5px 20px 15px 20px',
                                                    width: '100%',
                                                    overflow: 'auto',
                                                }}
                                            >
                                                <Card
                                                    hoverable={true}
                                                    style={{
                                                        width: '60vw',
                                                        height: '22vh',
                                                        overflow: 'auto',
                                                        margin: '0 0 0 20px',
                                                    }}
                                                >
                                                    <Row>
                                                        <Typography>
                                                            <Title level={2}>
                                                                {value.rname}
                                                            </Title>
                                                            {value.rinstitute &&
                                                                <Row>
                                                                    <Space>
                                                                        <HomeOutlined/>
                                                                        <Text> </Text>
                                                                    </Space>
                                                                    <Text>{value.rinstitute}</Text>
                                                                </Row>
                                                            }
                                                        </Typography>
                                                        <Divider
                                                            type={"vertical"}
                                                            style={{
                                                                height: '15vh',
                                                                overflow: 'auto',
                                                                margin: '0 20px 0 20px',
                                                            }}
                                                        />
                                                        <Typography>
                                                            {value.Cname &&
                                                                <Row>
                                                                    <Space>
                                                                        <BulbOutlined />
                                                                        <Text> </Text>
                                                                    </Space>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: '16px',
                                                                        }}
                                                                    >{value.Cname}</Text>
                                                                </Row>
                                                            }
                                                            {value.rcontact &&
                                                                <Row>
                                                                    <Space>
                                                                        <MailOutlined />
                                                                        <Text> </Text>
                                                                    </Space>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: '16px',
                                                                        }}
                                                                    >{value.rcontact}</Text>
                                                                </Row>
                                                            }
                                                            {value.rworkscount &&
                                                                <Row>
                                                                    <Space>
                                                                        <FileOutlined/>
                                                                        <Text> </Text>
                                                                    </Space>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: '16px',
                                                                        }}
                                                                    >共发表论文{value.rworkscount}篇</Text>
                                                                </Row>
                                                            }
                                                            {value.rcitescount &&
                                                                <Row>
                                                                    <Space>
                                                                        <LinkOutlined/>
                                                                        <Text> </Text>
                                                                    </Space>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: '16px',
                                                                        }}
                                                                    >共计被引用{value.rcitescount}次</Text>
                                                                </Row>
                                                            }
                                                        </Typography>
                                                    </Row>
                                                </Card>
                                            </Radio>
                                        )
                                    })
                                }
                            </Space>
                        </Radio.Group>
                        <Text
                            style={createStyle}
                            onMouseEnter={handleMouseEnterCreate}
                            onMouseLeave={handleMouseLeaveCreate}
                            onClick={findMore}
                        >
                            没有我的门户？
                        </Text>
                    </div>
                </div>
            ),
        },
        {
            title: '完成',
            status: 'wait',
            icon: <CheckCircleOutlined />,
            content: (
                <div>
                    <Row>
                        <CheckCircleFilled
                            style={{
                                fontSize: '100px',
                                color: '#50af78',
                                margin: "auto",
                                marginTop: '30px',
                            }}
                        />
                    </Row>
                    <Row>
                        <Text
                            style={{
                                fontSize: '18px',
                                margin: "auto",
                                padding: '20px',
                            }}
                        >
                            欢迎入驻
                        </Text>
                    </Row>
                    <Row>
                        <Text
                            style={{
                                fontSize: '16px',
                                margin: "auto",
                                marginBottom: '40px',
                            }}
                        >
                            您的申请将于3天内由管理员审核，请耐心等待。
                        </Text>
                    </Row>
                </div>
            ),
        },
    ];
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        icon: item.icon,
        content: item.content,
    }));
    return (
        <Layout className="layout">
            <Header>
                <div/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                />
            </Header>
            <Content
                style={{
                    padding: '50px 200px 20px 200px',
                    backgroundColor: 'rgb(230,235,247)',
                }}
            >
                <div
                    style={{
                        padding: '24px',
                        Height: '150px',
                        backgroundColor: 'white',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                    }}
                >
                    <Steps
                        current={current}
                        items={items}
                        style={{
                            padding: '24px',
                        }}
                    />
                    <Divider dashed/>
                    <div
                        className="steps-content"
                        style={{
                            padding: '24px',
                        }}
                    >
                        {steps[current].content}
                    </div>
                    <div className="steps-action">
                        {current === 0 && (
                            <Row>
                                <Button
                                    type="primary"
                                    onClick={getPortal}
                                    shape={"round"}
                                    size="large"
                                    style={{
                                        margin: 'auto',
                                        // backgroundColor: '#3a3af1',
                                        border: 'none',
                                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                                        marginBottom: '20px',
                                    }}
                                >
                                    下一步
                                </Button>
                            </Row>

                        )}
                        {current === 1 && (
                            <Row>
                                <Col span={16}></Col>
                                <Col span={8}>
                                    <Button
                                        shape={"round"}
                                        size="large"
                                        style={{
                                            margin: '0 10px',
                                            marginBottom: '20px',
                                        }}
                                        onClick={() => prev()}
                                    >
                                        返回修改
                                    </Button>
                                    <Button
                                        type="primary"
                                        onClick={choosePortal}
                                        shape={"round"}
                                        size="large"
                                        style={{
                                            border: 'none',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        确定
                                    </Button>
                                </Col>
                            </Row>
                        )}
                        {current ===2 && (
                            <Row>
                                <Link
                                    to={{
                                        pathname: '/',
                                    }}
                                    style={{
                                        margin: 'auto',
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        onClick={() => message.success('即将返回首页!')}
                                        shape={"round"}
                                        size="large"
                                        style={{
                                            border: 'none',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        返回
                                    </Button>
                                </Link>
                            </Row>
                        )}
                    </div>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    backgroundColor: 'rgb(230,235,247)',
                }}
            >
                AceGate ©2022 Beihang University
            </Footer>
        </Layout>
    );
}
export default ApplyPortal;