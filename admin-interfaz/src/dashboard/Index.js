import React from 'react';
import CreateUser from './CreateUser'
import DeleteUser from './DeleteUser';
import Users from './Users';
import Dashboard from './Dashboard'
const Index = () => {
  return (
    <React.StrictMode>
      <div>

        <Users />
        <CreateUser />
        <DeleteUser/>
        
      </div>
    </React.StrictMode>
  );
};

export default Index;
