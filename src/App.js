import * as React from 'react';
import './App.css';
import Progress from './components/Progress';
import UserCard from './components/UserCard';
import axios from 'axios';
import { Card, Col, Row } from 'antd';

function App() {
  const [userData, setUserData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState([])

  

  React.useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(function (response) {
        setUserData(prev => {
          return {
            ...prev,
            Users: response.data
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
    if (userData.Users !== undefined) {
      setCards(() => {
        const users = userData.Users.map(user => (
          <UserCard user={user}/>
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
