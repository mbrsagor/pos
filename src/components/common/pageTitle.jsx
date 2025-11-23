import React from 'react';
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

export default function PageTitle({title, subtitle}) {
  return (
    <div className="container-fluid pageTitleContainer">
      <div className="col-md-12">
        <div className="row">
          <div className="page-title d-flex align-items-center justify-content-between">
            <h2 className="m-0">{title}</h2>
            <div className="d-flex align-items-center">
              <p className='m-0'>
                <Link to="/dashboard">Dashboard</Link>
                <FeatherIcon icon="chevrons-right" size={15} />
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
