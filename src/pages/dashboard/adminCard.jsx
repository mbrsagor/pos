import React, { useEffect, useState } from "react";

import Card from "./card";
import axios from "../../services/axiosConfig";
import { SuperAdminDashboardEndpoint } from "../../services/api_services";

export default function AdminCard() {
  // Model
  const [totalUser, setTotalUser] = useState(0);
  const [totalCompany, setTotalCompany] = useState(0);
  const [countActiveUsers, setCountActiveUsers] = useState(0);
  const [countInactiveUsers, setCountInactiveUsers] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(SuperAdminDashboardEndpoint);
        setTotalUser(response.data.data.total_users || 0);
        setCountActiveUsers(response.data.data.total_active_users || 0);
        setTotalCompany(response.data.data.total_companies || 0);
        setCountInactiveUsers(response.data.data.total_inactive_users || 0);
        setTotalServices(response.data.data.total_services || 0);
        setTotalCategories(response.data.data.total_categories || 0);
        setTotalSubmissions(response.data.data.total_submissions || 0);
        setTotalTransactions(response.data.data.total_transactions || 0);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Card
              title="Total Users"
              icon="users"
              count={totalUser}
              link="/"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Card
              title="Customer"
              icon="user-check"
              count={countActiveUsers}
              link="/"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Card
              title="Total Restaurant"
              icon="home"
              count={countInactiveUsers}
              link="/"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Card
              title="Total menus"
              icon="server"
              count={totalServices}
              link="/"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Card
              title="Total Categories"
              icon="folder"
              count={totalCategories}
              link="/"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Card
              title="Total Orders"
              icon="compass"
              count={totalSubmissions}
              link="/"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Card
              title="Total Transactions"
              icon="dollar-sign"
              count={totalTransactions}
              link="/"
            />
          </div>
          <div className="col-12 col-sm-6 col-md-3 mb-3">
            <Card
              title="Delivery Man"
              icon="home"
              count={totalCompany}
              link="/"
            />
          </div>
        </div>
      </div>
    );
}
