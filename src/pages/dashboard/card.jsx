import React from 'react';
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

export default function CardComponent({title, count, icon, link}) {
  return (
    <div className="card dashboard_card">
      <div className="card-header">
        <h3 className="card-title headline">{title}</h3>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h3 className="card-title counter">{count}</h3>
          <FeatherIcon icon={icon} />
        </div>
      </div>
      <div className="card-footer text-center">
        <Link className="nav-link card_detail" to={link}>
          view details
        </Link>
      </div>
    </div>
  );
}
