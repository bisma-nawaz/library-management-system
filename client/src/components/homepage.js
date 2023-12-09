import React from 'react';

const HomePage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <h1>Welcome to Library</h1>
        </div>
    );
};

export default HomePage;


// TODO: SHOW DIFFERENT HOMEPAGES FOR DIFFERENT USERS BASED ON THEIR ROLES IN THE DB: 