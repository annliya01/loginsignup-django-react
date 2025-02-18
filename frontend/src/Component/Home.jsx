import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('access_token') === null) {
      const navigate = useNavigate();
      navigate('/login'); 
    } else {
      const fetchData = async () => {
        try {
          const { data } = await axios.get('http://localhost:8000/home/', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json'
            }
          });
          setMessage(data.message); 
        } catch (e) {
          console.log('Not authenticated');
        }
      };

      fetchData(); 
    }
  }, []);  
  return (
    <div className="form-signin">
      <h3>Hi {message}</h3>
    </div>
  );
}
