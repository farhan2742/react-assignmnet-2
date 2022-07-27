import * as React from 'react';
import './App.css';
import Progress from './components/Progress';
import UserCard from './components/UserCard';
import axios from 'axios';
import { Card, Col, Row } from 'antd';

function App() {
  const [userData, setUserData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState([]);

  const deleteUser = (id) => {
    setUserData((prevState) => {
      const users = prevState.users.filter(user => user.id !== id)
      console.log(users)
      return {
        users: users
      }
    })
  };

  const updateUser = (id, data) => {
    console.log(id, data)
    setUserData((prevState) => {
      const users = prevState.users.map((user) => {
        if (user.id === id) {
          const userUpdated = {
            ...user,
            ...data
          }
          return userUpdated
        }
        else {
          return user;
        }  
          
      });
      return {
        users: users
      }
    })
  };


  // const updateUser = (id, data) => {
  //   setUserData((prevState) => ({
  //     prevState.users.map((user) => {
  //       if (user.id === id) return { ...user, ...data };
  //       return user;
  //     }),
  //   }));
  // };
  

  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        setUserData(prev => {
          return {
            ...prev,
            users: response.data
          }
        });
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, []);

  React.useEffect(() => {
    if (userData.users !== undefined) {
      setCards((prev) => {
        const users = userData.users.map(user => (
          <UserCard user={user} handleDelete={deleteUser} handleUpdate={updateUser} />
        ));
        return users;
      });
    }
  }, [userData]);

  return (
    <Row gutter={[10, 24]} className='user-cards'>
      {loading ? <Progress /> : cards}
    </Row>
  );
}

export default App;
