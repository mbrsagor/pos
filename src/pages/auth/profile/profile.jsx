import React from "react";
import Layout from "../../../components/common/layout";
import PageTitle from "../../../components/common/pageTitle";

export default function Profile() {
  return (
    <Layout>
      <PageTitle title="Profile" subtitle="Manage your profile" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label className="mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label className="mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
