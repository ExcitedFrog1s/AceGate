import "antd/dist/antd.min.css";
import {
    Layout,
    message,
    Upload,
    Row,
    Button,
    Form, Input,
    Menu,
} from 'antd';
import { LoadingOutlined, PlusOutlined, CheckCircleOutlined, RollbackOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom'
import axios from "axios";
import {Select } from 'antd';
import MyHeader from "../../../components/header/header";

const { Header, Content, Footer} = Layout;


const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
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

function Edit() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const [size] = useState('middle');
    const interest = localStorage.getItem("interest");
    const field = localStorage.getItem("field");

    let location = useLocation()
    let params = new URLSearchParams(location.search)
    const token = localStorage.getItem("userToken");
    // let RID = params.get('RID')

    const getData = ()=>{
        axios({
            method: "post",
            url: "/personInfo",
            headers: {
                token: token
            }
        })
            .then(res => {
                    setData(res.data)
                }
            )
    }

    const [form] = Form.useForm();
    const [Uinterest,setUinterest] = React.useState()
    const [Ufield,setUfield] = React.useState()
    // const pushData = ()=>{
    //     axios({
    //         method: "post",
    //         url: "https://mock.apifox.cn/m1/1955876-0-default/editPortal2",
    //         data: {
    //             RID: params.get('RID'),
    //             Ravatar: Ravatar,
    //             Rinstitute: Rinstitute,
    //             Rcontact: Rcontact,
    //             Rconcepts: Rconcepts,
    //             RpersonalPage: RpersonalPage,
    //             Rgateinfo: Rgateinfo,
    //         }
    //     })
    //         .then(res => {
    //                 console.log(res.data)
    //             }
    //         )
    // }



    const changeInfo = () =>{
        axios({
            method: 'POST',
            url: '/personInfo/edit',
            headers: {
                token: token
            },
            data:{
                Uinterest: Uinterest,
                Ufield : Ufield,
            }
        }).then(response =>{
            console.log('information');
            console.log(Uinterest);
            console.log(response.data)
        });
        document.dispatchEvent(new CustomEvent('myEvent', {
            detail: {
                log: "i'm zach"
            }
        }))

    }

    useEffect(() => {
        getData();
        setUfield(field);
        setUinterest(interest);
        localStorage.setItem("interest", '');
        localStorage.setItem("field", '');
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

    const onFinish = (values) => {

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

    const optionValue = ['人工智能', '机器学习', '计算机网络',
        '神经网络', '深度学习', '植物泛基因研究',
        '生态与环境科学', '地球科学', '马克思主义',
        '生物科学领域', '电磁波吸收材料', '化学与材料科学',
        '物理学', '人文社科', '天文学与天体物理学',
        '数学'];
    const optionValue2 = ['中国式现代化', '文献综述', '人工智能',
        '共同富裕', '数字化转型', '作业设计', '课程思政', '粮食安全', '自然辩证法',
        '经济研究', '文化自信', '人类命运共同体', '劳动教育', '管理世界', '绿色金融',
        '盈利能力分析', '工程伦理']
    let interestoption = [];
    let fieldoption = [];
    if (interest.length > 0){
        interestoption = interest.split("\u00A0\u00A0");
    }
    if (field.length > 0){
        fieldoption  = field.split("\u00A0\u00A0");
    }
    const options = [];
    const options2 = [];
    for (let i = 10; i < 26; i++) {
        options.push({
            value: optionValue[i-10],
            label: optionValue[i-10]
        });
        options2.push({
            value: optionValue2[i-10],
            label: optionValue2[i-10]
        });
    }
    const handleChange2 = (value) => {
        setUfield(value.join(`\u00A0\u00A0`))
        localStorage.setItem("interest", value.join(`\u00A0\u00A0`));
    };
    const handleChange3 = (value) => {
        setUinterest(value.join(`\u00A0\u00A0`))
        localStorage.setItem("field", value.join(`\u00A0\u00A0`));
    };
    return (
        <Layout className="layout"
                style={{
                    minHeight: '100vh',
                }}
        >

            <MyHeader/>
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
                            name="Ufield"
                            label="研究领域"
                            initialValue={fieldoption}
                            style={{
                                padding: '10px',
                                margin: '0 0 57px 0'
                            }}
                        >
                            <Select
                                mode="tags"
                                size={size}
                                placeholder="请选择你的研究领域"
                                onChange={handleChange2}
                                style={{
                                    width: '100%',
                                }}
                                options={options}
                            />
                        </Form.Item>
                        <Form.Item
                            name="Uinterest"
                            label="我的兴趣词"
                            initialValue={interestoption}
                            style={{
                                padding: '10px',
                            }}
                        >
                            <Select
                                mode="tags"
                                size={size}
                                placeholder="请选择你的兴趣词"
                                onChange={handleChange3}
                                style={{
                                    width: '100%',
                                }}
                                options={options2}
                            />
                        </Form.Item>
                    </Form>

                    <Row
                        style={{
                            padding: '8px 0 0 0',
                        }}
                    >
                        <Link
                            to={{
                                pathname: '/personInfo',
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
                                onClick={changeInfo}
                            >
                                保存
                            </Button>
                            <Button className="button2"
                                    icon = {<RollbackOutlined/>}
                                    type="primary"
                                    size="large"
                                    shape={"round"}
                                    style={{
                                        margin: '25px 40px 16px 30px',
                                        border: 'none',
                                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.3)',
                                    }}
                            >
                                取消
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
export default Edit;