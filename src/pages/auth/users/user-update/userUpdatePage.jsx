import React from "react";

import UserProfileForm from "./form";
import Layout from "../../../../components/common/layout";
import PageTitle from "../../../../components/common/pageTitle";

export default function UserUpdatePage() {
  return (
    <Layout>
      <PageTitle title="User Update" subtitle="User Information" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-0">
            <UserProfileForm />
          </div>
        </div>
      </div>
    </Layout>
  );
}
