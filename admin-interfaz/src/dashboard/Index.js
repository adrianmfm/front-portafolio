import React from 'react';
import CreateUser from './CreateUser'
import DeleteUser from './DeleteUser';
import Users from './Users';
import EditUser from './EditUser';
const Index = () => {
  return (
    <React.StrictMode>
      <div>
      <DeleteUser/>
      <CreateUser />
        <EditUser/>
          
      </div>
    </React.StrictMode>
  );
};

export default Index;
