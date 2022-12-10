import "antd/dist/antd.min.css";
import {
    Typography,
    Layout,
    message,
    Upload,
    Col,
    Row,
    Button,
    Form, Input,
    Menu,
} from 'antd';
import { LoadingOutlined, PlusOutlined, CheckCircleOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text} = Typography;

// tabs callback
const onChange = (key) => {
    console.log(key);
};

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('请上传JPG/PNG格式的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片必须小于2MB!');
    }
    return isJpgOrPng && isLt2M;
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

function EditPortal() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState();

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    // let RID = params.get('RID')

    const getData = ()=>{
        axios({
            method: "post",
            url: "https://mock.apifox.cn/m1/1955876-0-default/scholarPortal",
            data: {
                RID: params.get('RID'),
            }
        })
            .then(res => {
                    console.log(res.data)
                    setData(res.data)
                }
            )
    }

    const [form] = Form.useForm();
    const Ravatar = Form.useWatch('Ravatar', form);
    const Rinstitute = Form.useWatch('Rinstitute', form);
    const Rcontact = Form.useWatch('Rcontact', form);
    const Rconcepts = Form.useWatch('Rconcepts', form);
    const RpersonalPage = Form.useWatch('RpersonalPage', form);
    const Rgateinfo = Form.useWatch('Rgateinfo', form);


    const pushData = ()=>{
        axios({
            method: "post",
            url: "https://mock.apifox.cn/m1/1955876-0-default/editPortal2",
            data: {
                RID: params.get('RID'),
                Ravatar: Ravatar,
                Rinstitute: Rinstitute,
                Rcontact: Rcontact,
                Rconcepts: Rconcepts,
                RpersonalPage: RpersonalPage,
                Rgateinfo: Rgateinfo,
            }
        })
            .then(res => {
                    console.log(res.data)
                }
            )
    }


    useEffect(() => {
        getData();
    }, [])

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const onFinish = (values) => {
        console.log(values);
    };

    // save button hover style
    const [saveIsHover, setSaveIsHover] = useState(false)
    const handleMouseEnterSave = () => {
        setSaveIsHover(true)
    }
    const handleMouseLeaveSave = () => {
        setSaveIsHover(false);
    }
    const saveStyle = {
        backgroundColor: saveIsHover ? '#5bc28b' : '#50af78',
        border: 'none',
        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.2)',
    }

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
                        padding: '50px 50px 30px 50px',
                        Height: '200px',
                        backgroundColor: 'white',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                    }}
                >
                    <Row>
                        <Col span={3}></Col>
                        <Col>
                            <Typography>
                                <Title
                                    style={{
                                        fontSize: '50px',
                                        textShadow: '4px 4px 6px rgba(0,0,0,0.2)',
                                    }}
                                >{data.Rname}</Title>
                            </Typography>
                        </Col>
                    </Row>
                    <Form
                        {...layout}
                        form={form}
                        onFinish={onFinish}
                        validateMessages={validateMessages}
                        style={{
                            padding: '20px 0 0 0',
                        }}
                    >
                        <Form.Item
                            name="Ravatar"
                            label="头像"
                            rules={[
                                {
                                    required: false,
                                },
                            ]}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}

                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
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
                            <Input placeholder={data.Rinstitute}/>
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
                            <Input placeholder={data.Rcontact}/>
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
                            <Input placeholder={data.Rconcepts} />
                        </Form.Item>
                        <Form.Item
                            name="RpersonalPage" label="个人主页"
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input placeholder={data.RpersonalPage}/>
                        </Form.Item>
                        <Form.Item
                            name="Rgateinfo" label="个人简介"
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Input.TextArea placeholder={data.Rgateinfo}/>
                        </Form.Item>
                    </Form>
                    <Row
                        style={{
                            padding: '8px 0 0 0',
                        }}
                    >
                        <Link
                            to={{
                                pathname: '/scholarPortal',
                            }}
                            style={{
                                margin: "auto",
                            }}
                        >
                            <Button
                                type={"primary"}
                                icon={<CheckCircleOutlined />}
                                size="large"
                                shape={"round"}
                                style={saveStyle}
                                onMouseEnter={handleMouseEnterSave}
                                onMouseLeave={handleMouseLeaveSave}
                                onClick={pushData}
                            >
                                保存
                            </Button>
                        </Link>
                    </Row>
                </div>
            </Content>
            <Footer
                style={{
                    textAlign: 'center',
                    backgroundColor: 'rgb(230,235,247)'
                }}
            >
                AceGate ©2022 Beihang University
            </Footer>
        </Layout>
    );
}
export default EditPortal;