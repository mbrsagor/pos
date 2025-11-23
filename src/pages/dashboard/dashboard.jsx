import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import PageTitle from "../../components/common/pageTitle";
import "../../styles/dashboard.scss";
import AdminCard from "./adminCard";
import CompanyCard from "./companyCard";

export default function Dashboard() {
  // Model
  const [user, setUser] = useState(null);

  // Get data from local-store
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Layout>
      {/* Page header and welcome section */}
      <div>
        <PageTitle title="Dashboard" subtitle="Overview" />
        <div className="card m-2">
          <div className="card-body dashboard-welcome-card">
            <h2>Welcome to the pos Admin Portal.</h2>
            <p>Hello, {user?.fullname}!</p>
          </div>
        </div>
      </div>
      {/* Cards section */}
      {user?.role === 1 ? (
        <AdminCard />
      ) : user?.role === 2 ? (
        <CompanyCard />
      ) : (
        <CompanyCard />
      )}
    </Layout>
  );
}
