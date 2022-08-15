import React, { useEffect, useState } from "react";
import "./App.css";
import Progress from "./components/Progress";
import UserCard from "./components/UserCard";
import axios from "axios";
import { Row } from "antd";

const App = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState([]);

    const deleteUser = (id) => {
        setUserData((prevState) => {
            const users = prevState.users.filter((user) => user.id !== id);
            console.log(users);
            return {
                users: users,
            };
        });
    };

    const updateUser = (id, data) => {
        console.log(id, data);
        setUserData((prevState) => {
            const users = prevState.users.map((user) => {
                if (user.id === id) {
                    const userUpdated = {
                        ...user,
                        ...data,
                    };
                    return userUpdated;
                } else {
                    return user;
                }
            });
            return {
                users: users,
            };
        });
    };

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/users")
            .then(function (response) {
                setUserData((prev) => {
                    return {
                        ...prev,
                        users: response.data,
                    };
                });
                setLoading(false);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (userData.users !== undefined) {
            setCards(() => {
                const users = userData.users.map((user) => (
                    <UserCard
                        user={user}
                        handleDelete={deleteUser}
                        handleUpdate={updateUser}
                    />
                ));
                return users;
            });
        }
    }, [userData]);

    return (
        <Row gutter={[10, 24]} className="user-cards">
            {loading ? <Progress /> : cards}
        </Row>
    );
};

export default App;
