import * as React from 'react';

import { Card, Col, Row } from 'antd';
import { HeartOutlined, EditOutlined, DeleteOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, HeartFilled } from '@ant-design/icons';

const { Meta } = Card;

const UserCard = (props) => {
    
    const [like, setLike] = React.useState(false)

    const handleLike = () => {
        setLike(!like);
    }
    return (
        <Col  xs={24} sm={24} md={8} lg={8} xl={6} key={props.user.username}>
            <Card    
                className="user--card"
                style={{ width: 300 }}
                cover={<img alt={props.user.username} src={`https://avatars.dicebear.com/v2/avataaars/${props.user.username}.svg?options[mood][]=happy`} width={200} />}
                actions={[
                    <button onClick={handleLike} className="card-action">
                        {like ? <HeartFilled key="like" className="card-action-like" /> : <HeartOutlined key="like" className="card-action-dislike"/>}
                    </button>,
                    <button onClick={() => console.log('edit')} className="card-action">
                        <EditOutlined key="edit" />
                    </button>,
                    <button onClick={() => console.log('delete')} className="card-action">
                        <DeleteOutlined key="delete" />
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
        
    )
}

export default UserCard;