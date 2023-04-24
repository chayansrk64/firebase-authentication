import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const Home = () => {
    const {user} = useContext(AuthContext)
    console.log(user);
    return (
        <div>
            <p>{ user && user.displayName}</p>
           <h2>This is home page</h2>
        </div>
    );
};

export default Home;