import React from "react";

import UserTable from "./userTable";
import Layout from "../../../../components/common/layout";
import PageTitle from "../../../../components/common/pageTitle";

export default function UserListPage() {
  return (
    <Layout>
      <PageTitle title="User List" subtitle="Users" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-0">
            <UserTable />
          </div>
        </div>
      </div>
    </Layout>
  );
}
