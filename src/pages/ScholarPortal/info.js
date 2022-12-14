import "antd/dist/antd.min.css";
import { Typography, Layout, Button, Form, InputNumber, Input, Col, Row} from 'antd';
import { FormOutlined, CheckCircleOutlined, IdcardOutlined} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
const { Header, Content, Footer} = Layout;
const { Title, Paragraph, Text, Link } = Typography;

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

function Info() {
    const onFinish = (values) => {
        console.log(values);
    };
    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
            <Form.Item
                name={['user', 'name']}
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
                name={['user', 'workplace']}
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
                name={['user', 'email']}
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
                name={['user', 'search-area']}
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
                name={['user', 'website']} label="个人主页"
                style={{
                    padding: '10px',
                }}
            >
                <Input placeholder="请输入您的个人主页"/>
            </Form.Item>
            <Form.Item
                name={['user', 'introduction']} label="个人简介"
                style={{
                    padding: '10px',
                    color: '#0087FF',
                }}
            >
                <Input.TextArea placeholder="请输入您的个人简介"/>
            </Form.Item>
        </Form>
    );
}
export default Info;