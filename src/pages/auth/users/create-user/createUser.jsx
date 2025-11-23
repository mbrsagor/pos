import React from "react";
import Layout from "../../../../components/common/layout";
import PageTitle from "../../../../components/common/pageTitle";

import Form from "./form";

export default function CreateUserPage() {
  return (
    <Layout>
      <PageTitle title="Create User" subtitle="User" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-0">
            <div className="card">
              <div className="card-body">
                <Form />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
