import React, { useEffect } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { useUser } from '../../context/user.context';
import { useRouter } from 'next/router';

function Dashboard() {
  const { currentUser, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.role != '1') {
      router.push('/');
    }
  }, [currentUser, isLoading]);

  return <DashboardLayout>Dashboard</DashboardLayout>;
}

export default Dashboard;
