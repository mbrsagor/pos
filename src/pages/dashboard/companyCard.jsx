/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import Card from "./card";
// import axios from "../../services/axiosConfig";
// import { SuperAdminDashboardEndpoint } from "../../services/api_services";

export default function CompanyCard() {
  // Model
  const [totalService, setTotalService] = useState(0);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [totalPromoCode, setTotalPromoCode] = useState(0);
  const [totalRating, setTotalRating] = useState(0);

  // Fetch dashboard data
  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const response = await axios.get(SuperAdminDashboardEndpoint);
  //       setTotalService(response.data.data.company_total_services || 0);
  //       setTotalSubmissions(response.data.data.company_total_submissions || 0);
  //       setTotalPromoCode(response.data.data.company_total_promo_codes || 0);
  //       setTotalRating(response.data.data.company_total_ratings || 0);
  //     } catch (error) {
  //       console.error("Error fetching dashboard data:", error);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card
            title="Total Order"
            icon="shopping-cart"
            count={totalService}
            link="/"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card
            title="Available Menus"
            icon="compass"
            count={totalSubmissions}
            link="/"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card
            title="Active Orders"
            icon="shopping-bag"
            count={totalPromoCode}
            link="/"
          />
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-3">
          <Card
            title="Total Transactions"
            icon="compass"
            count={totalRating}
            link="/"
          />
        </div>
      </div>
    </div>
  );
}
