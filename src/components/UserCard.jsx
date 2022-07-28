import * as React from "react";

import { Card, Col, Modal, Form, Input } from "antd";
import {
    HeartOutlined,
    EditOutlined,
    DeleteOutlined,
    MailOutlined,
    PhoneOutlined,
    GlobalOutlined,
    HeartFilled,
} from "@ant-design/icons";

const { Meta } = Card;

const UserCard = (props) => {
    const [like, setLike] = React.useState(false);
    const [model, setModel] = React.useState(false);
    const [user, setUser] = React.useState({});

    const handleLike = () => {
        setLike(!like);
    };

    const handleSubmit = (values) => {
        props.handleUpdate(user.id, values);
        toggleModal();
    };

    const toggleModal = () => {
        setModel((prev) => !prev);
    };

    const [form] = Form.useForm();

    React.useEffect(() => {
        setUser((prev) => ({
            ...prev,
            ...props.user,
        }));
    }, [props.user]);

    return (
        <React.Fragment key={user.username}>
            <Modal
                visible={model}
                title="Edit User"
                okText="Submit"
                cancelText="Cancel"
                onCancel={toggleModal}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            handleSubmit(values);
                        })
                        .catch((info) => {
                            console.log("Validate Failed:", info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="update_user"
                    initialValues={{
                        modifier: "public",
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        initialValue={user.name}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        initialValue={user.email}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                            {
                                type: "email",
                                message: "Invalid email",
                            },
                        ]}
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        initialValue={user.phone}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="website"
                        label="Website"
                        initialValue={user.website}
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>

            <Col xs={24} sm={24} md={8} lg={8} xl={6}>
                <Card
                    className="user--card"
                    cover={
                        <img
                            alt={user.username}
                            src={`https://avatars.dicebear.com/v2/avataaars/${user.username}.svg?options[mood][]=happy`}
                            width={200}
                        />
                    }
                    actions={[
                        <button onClick={handleLike} className="card-action">
                            {like ? (
                                <HeartFilled
                                    key="like"
                                    className="card-action-like card-action-icon"
                                />
                            ) : (
                                <HeartOutlined
                                    key="like"
                                    className="card-action-dislike card-action-icon"
                                />
                            )}
                        </button>,
                        <button onClick={toggleModal} className="card-action">
                            <EditOutlined
                                key="edit"
                                className="card-action-icon"
                            />
                        </button>,
                        <button
                            onClick={() => {
                                props.handleDelete(user.id);
                            }}
                            className="card-action"
                        >
                            <DeleteOutlined
                                key="delete"
                                className="card-action-icon"
                            />
                        </button>,
                    ]}
                >
                    <Meta title={user.name} />
                    <div className="user--card__info">
                        <p>
                            <MailOutlined /> {user.email} <br />
                            <PhoneOutlined /> {user.phone} <br />
                            <GlobalOutlined /> {user.website}
                        </p>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default UserCard;
