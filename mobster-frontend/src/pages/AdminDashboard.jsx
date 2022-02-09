import React from 'react';
import BanUser from '../components/Admin/BanUser';
import Report from '../components/Admin/Report';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";


const AdminDashboard = () => {
  return <div>
      <BanUser/>
      <Report/>
  </div>;
};

export default withAuthenticationRequired(AdminDashboard, {});
