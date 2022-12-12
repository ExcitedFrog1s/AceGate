import './loginAndRegister.css';
import "antd/dist/antd.min.css";
import loginImg from '../../assets/images/undraw_data_input_fxv2.png'
import registerImg from '../../assets/images/undraw_data_input_fxv2.png'
import {
    Typography,
    Layout,
    message,
    Upload,
    Col,
    Row,
    Button,
    Form, Input,
    Menu, Steps, Divider,
    Image,
} from 'antd';
import { LoadingOutlined, PlusOutlined, CheckCircleOutlined, EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text} = Typography;

async function loginUser(username, password) {
    let ret = ""
    let status = ""
    await axios.post('/user/login', {
        username: username,
        password: password
    })
        .then(res => {
            console.log(res.data)
            status = res.data.status
            ret = res.data.token
        })
    return {
        token: ret,
        status: status
    };
}

async function registerUser(username, password, email, verificationCode) {
    let status = "ERR";
    await axios.get('/user/register', {
        params: {
            username: username,
            password: password,
            email: email,
            verificationCode: verificationCode
        }

    })
        .then(res => {
            status = res.data.status
        })
    return status;
}

async function sendVerificationEmail(email) {
    await axios.get('/user/sendVerifyEmail',{
        params: {
            email: email
        }
    })
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function LoginAndRegister () {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [verifyCode, setVerifycode] = useState(0);
    const [countdown, setCountdown] = useState(0);

    const [currentIsLogin, setCurrentIsLogin] = useState(true);

    // if(localStorage.getItem("userToken")) {
    //     navigate('/landing');
    // }

    const handleLogin = async e => {
        e.preventDefault();
        let data = await loginUser(username, password);
        console.log(data.token);
        console.log(data.status);
        if (data.token !== "" && data.status === 1) {
            // localStorage.setItem("userToken", data.token);
            // localStorage.setItem("username", username);
            alert("登录成功！");
            navigate("/landing");
        }
    }

    const handleSendVerifyEmail = e => {
        if (countdown === 0) {
            let result = sendVerificationEmail(email);
            setCountdown(1);
            setInterval(() => setCountdown(0), 60000);
        }
    }

    const handleRegister = async e => {
        if (username === "") {
            alert("用户名为空！");
            return -1;
        }
        if (username.length < 6) {
            alert("用户名长度至少为6！");
            return -1;
        }
        if (username.length > 20) {
            alert("用户名长度至多为20！");
            return -1;
        }
        if (password.length < 8) {
            alert("密码长度过短，至少需要8位字符");
            return -1;
        }
        if (password.length > 16) {
            alert("密码长度过长，至多16位字符");
            return -1;
        }
        if (password !== password2) {
            alert("两次输入的密码不一致！");
            return -1;
        }
        if (email === "") {
            alert("请填写邮箱！");
            return -1;
        }
        if (!validateEmail(email)) {
            alert("请填写合法的邮箱！");
            return -1;
        }
        let status = await registerUser(username, password, email, verifyCode);
        if (status === "OK") {
            alert("注册成功！");
            goToLogin();
        }else{
            alert("注册失败。请检查邮箱验证码是否正确。");
            return -1;
        }
        return 0;
    }

    // 去注册
    const goToRegister = ()=>{
        setCurrentIsLogin(false);
        console.log(currentIsLogin);

    }

    // 去登录
    const goToLogin = ()=>{
        setCurrentIsLogin(true);
        console.log(currentIsLogin);
    }

    const [linkIsHover, setLinkIsHover] = useState(false)
    const handleMouseEnterLink = () => {
        setLinkIsHover(true)
    }
    const handleMouseLeaveLink = () => {
        setLinkIsHover(false);
    }
    const linkStyle = {
        color: '#F7FAFC',
        textDecoration: linkIsHover ? 'underline' : 'none'
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
                className="content"
                style={{
                    background: currentIsLogin ? 'linear-gradient(90deg,#f7fafc, rgba(158, 171, 196, 0.8))' : 'linear-gradient(270deg,#f7fafc, rgba(158, 171, 196, 0.8))',
                    padding: '50px 200px 20px 200px',
                    height: '100vh',
                    transition: '0.5s',
                }}

            >
                <div
                    className="container"
                    style={{
                        padding: '24px',
                        backgroundColor: 'white',
                        boxShadow: '4px 4px 15px 0 rgba(0,0,0,0.1)',
                        borderRadius: '10px',
                        width: '650px',
                        height: '415px',
                        margin: 'auto',
                        marginTop: '80px',
                    }}
                >
                    <div
                        className="form-box"
                        style={{
                            transform: currentIsLogin ? 'translateX(0%)' : 'translateX(85%)',
                        }}
                    >
                        {/*register*/}
                        <div
                            className="register-box"
                            style={{
                                display: currentIsLogin ? 'none' : 'flex',
                                transition: '0.5s',
                            }}
                        >
                            <Title
                                level={2}
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '25px',
                                    color: 'white',
                                    letterSpacing: '5px',
                                }}
                            >注册</Title>
                            <Form>
                                <Form.Item
                                    name="username"
                                >
                                    <Input
                                        className={'registerInput'}
                                        placeholder="用户名"
                                        autoComplete={'off'}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                >
                                    <Input
                                        className={'registerInput'}
                                        placeholder="密码"
                                        type="password"
                                        onChange={e => setPassword((e.target.value))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password2"
                                >
                                    <Input
                                        placeholder="再次输入密码"
                                        className={'registerInput'}
                                        type="password"
                                        onChange={e => setPassword2((e.target.value))}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                >
                                    <Input
                                        className={'registerInput'}
                                        autoComplete={'off'}
                                        placeholder="邮箱"
                                        type="email"
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="verifyCode"
                                >
                                    <Input
                                        className={'registerInput'}
                                        autoComplete={'off'}
                                        placeholder="验证码"
                                        type="text"
                                        onChange={e => setVerifycode(e.target.value)}
                                        style={{
                                            width: '55%',
                                        }}
                                    />
                                    <Button
                                        shape={"round"}
                                        size="large"
                                        style={{
                                            width: '45%',
                                            margin: 'auto',
                                            textAlign: 'center',
                                            marginTop: '10px',
                                            marginBottom: '10px',
                                            letterSpacing: '0',
                                        }}
                                        isDisabled={(countdown !== 0)}
                                        onClick={handleSendVerifyEmail}
                                    >
                                        发送验证码
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Button
                                shape={"round"}
                                size="large"
                                style={{
                                    width: '40%',
                                    margin: 'auto',
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                }}
                                onClick={handleRegister}
                            >注册
                            </Button>
                        </div>
                        {/*login*/}
                        <div
                            className="login-box"
                            style={{
                                display: currentIsLogin ? 'flex' : 'none',
                                transition: '0.5s',
                            }}
                        >
                            <Title
                                level={2}
                                style={{
                                    textAlign: 'center',
                                    marginBottom: '25px',
                                    color: 'white',
                                    letterSpacing: '5px',
                                }}
                            >登录</Title>
                            <Form>
                                <Form.Item
                                    name="username"
                                    // label={'用户名'}
                                >
                                    <Input
                                        className={'loginInput'}
                                        placeholder="用户名"
                                        autoComplete={'off'}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    // label={'密码'}
                                >
                                    <Input
                                        className={'loginInput'}
                                        placeholder="密码"
                                        type="password"
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Form.Item>
                            </Form>
                            <Link
                                to="/recoverPassword"
                                component={Typography.Link}
                                style={linkStyle}
                                onMouseEnter={handleMouseEnterLink}
                                onMouseLeave={handleMouseLeaveLink}
                            >忘记密码？</Link>
                            <Button
                                // type={"primary"}
                                shape={"round"}
                                size="large"
                                style={{
                                    width: '40%',
                                    margin: 'auto',
                                    marginTop: '20px',
                                    marginBottom: '20px',
                                }}
                                onClick={handleLogin}
                            >登录</Button>
                        </div>
                    </div>
                    <div className="con-box left">
                        <h2>欢迎来到<span className="blueText">AceGate</span></h2>
                        <p>Your gate towards<span className="blueText"> academia</span>.</p>
                        <Image
                            style={{
                                margin: 'auto',
                                width: '70%',
                                height: '70%',
                            }}
                            src={registerImg}
                            preview={false}
                        />
                        <p>已有账号</p>
                        <Button
                            id="login"
                            shape={"round"}
                            size="large"
                            style={{
                                width: '30%',
                                margin: 'auto',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                            onClick={goToLogin}
                        >去登录</Button>
                    </div>
                    <div class="con-box right">
                        <h2>欢迎来到<span className="blueText">AceGate</span></h2>
                        <p>Your gate towards<span className="blueText"> academia</span>.</p>
                        <Image
                            style={{
                                margin: 'auto',
                                width: '70%',
                                height: '70%',
                            }}
                            src={loginImg}
                            // src="../../assets/images/undraw_data_input_fxv2.png"
                            preview={false}
                        />
                        <p>没有账号？</p>
                        <Button
                            id="register"
                            shape={"round"}
                            size="large"
                            style={{
                                width: '30%',
                                margin: 'auto',
                                marginTop: '20px',
                                marginBottom: '20px',
                            }}
                            onClick={goToRegister}
                        >去注册</Button>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}
export default LoginAndRegister;