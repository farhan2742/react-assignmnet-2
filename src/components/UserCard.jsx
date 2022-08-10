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

const UserCard = ({ user, handleDelete, handleUpdate }) => {
    const [like, setLike] = React.useState(false);
    const [model, setModel] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState({});

    const handleLike = () => {
        setLike(!like);
    };

    const handleSubmit = (values) => {
        handleUpdate(currentUser.id, values);
        toggleModal();
    };

    const toggleModal = () => {
        setModel((prev) => !prev);
    };

    const [form] = Form.useForm();

    React.useEffect(() => {
        setCurrentUser((prev) => ({
            ...prev,
            ...user,
        }));
    }, [user]);

    return (
        <React.Fragment key={currentUser.username}>
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
                        initialValue={currentUser.name}
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
                        initialValue={currentUser.email}
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
                        initialValue={currentUser.phone}
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
                        initialValue={currentUser.website}
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
                            alt={currentUser.username}
                            src={`https://avatars.dicebear.com/v2/avataaars/${currentUser.username}.svg?options[mood][]=happy`}
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
                                handleDelete(currentUser.id);
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
                    <Meta title={currentUser.name} />
                    <div className="user--card__info">
                        <p>
                            <MailOutlined /> {currentUser.email} <br />
                            <PhoneOutlined /> {currentUser.phone} <br />
                            <GlobalOutlined /> {currentUser.website}
                        </p>
                    </div>
                </Card>
            </Col>
        </React.Fragment>
    );
};

export default UserCard;
