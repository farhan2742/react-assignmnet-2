import * as React from 'react';

import { Card, Col, Modal, Form, Input  } from 'antd';
import { HeartOutlined, EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, HeartFilled } from '@ant-design/icons';

const { Meta } = Card;

const UserCard = (props) => {
    
    const [like, setLike] = React.useState(false);
    const [model, setModel] = React.useState(false);

    const handleLike = () => {
        setLike(!like);
    }

    const handleSubmit = (values) => {
        props.handleUpdate(props.user.id, values);
        toggleModal();
    }; 
    
    const toggleModal = () => {
        form.resetFields();
        setModel(prev => !prev);
    };

    const [form] = Form.useForm();

    return (
        <React.Fragment key={props.user.username}>
        <Modal
            visible={model}
            title="Edit User"
            okText="Submit"
            cancelText="Cancel"
            onCancel={toggleModal}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        handleSubmit(values);
                })
                .catch((info) => {
                    console.log('Validate Failed:', info);
                });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="update_user"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    initialValue={props.user.name}
                    rules={[
                        {
                        required: true,
                        message: 'This field is required',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    initialValue={props.user.email}
                    rules={[
                        {
                        required: true,
                        message: 'This field is required',
                        },
                        {
                          type: 'email',
                          message: 'Invalid email',
                        }
                    ]}
                >
                    <Input type="email" />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    initialValue={props.user.phone}
                    rules={[
                        {
                        required: true,
                        message: 'This field is required',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="website"
                    label="Website"
                    initialValue={props.user.website}
                    rules={[
                        {
                        required: true,
                        message: 'This field is required',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>

        <Col  xs={24} sm={24} md={8} lg={8} xl={6} >
            <Card    
                className="user--card"
                cover={<img alt={props.user.username} src={`https://avatars.dicebear.com/v2/avataaars/${props.user.username}.svg?options[mood][]=happy`} width={200} />}
                actions={[
                    <button onClick={handleLike} className="card-action">
                        {like ? <HeartFilled key="like" className="card-action-like card-action-icon" /> : <HeartOutlined key="like" className="card-action-dislike card-action-icon" />}
                    </button>,
                    <button onClick={toggleModal} className="card-action">
                        <EditOutlined key="edit" className='card-action-icon'/>
                    </button>,
                    <button onClick={() => {props.handleDelete(props.user.id)}} className="card-action">
                        <DeleteOutlined key="delete" className='card-action-icon'/>
                    </button>
                ]}
            >
                <Meta
                    title={props.user.name}
                />
                <div className='user--card__info'>
                    <p>
                        <MailOutlined /> {props.user.email} <br />
                        <PhoneOutlined /> {props.user.phone} <br />
                        <GlobalOutlined /> {props.user.website}
                    </p>
                </div>
            </Card>
        </Col>
        </React.Fragment>
    )
}

export default UserCard;