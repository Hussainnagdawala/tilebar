import React from 'react'
import { Link } from 'react-router-dom'

const ChangePassword = () => {
  return (
   <>
   <div className="content-wrapper pb-2 mb-0">
   <div className="container">
   <div className="row mb-2 mt-2">
        <div className="col-sm-6">
          <h1 className="m-0 text-dark">Change Password</h1>
        </div>
        {/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active">Change Password</li>
          </ol>
        </div>
        {/* /.col */}
      </div>
    <div className="row">
      <div className="col-md-12 mx-auto pt-4">
      <section className="content">
  <div className="container-fluid">
    <div className="card border-0 shadow rounded-4">
      <div className="card-header">
        <h3 className="card-title fw-bold">Change Password</h3>
      </div>
      <form
        id="addnewservice"
        role="form"
        action="Resetpassword/resetpasswordsave"
        method="post"
        className="basicvalidation col-md-12"
      >
        <div className="card-body">
          <div className="form-group">
            <label>Old Password</label>
            <input
              type="password"
              className="form-control"
              required="true"
              id="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              required="true"
              id="cnfpassword"
              name="cnfpassword"
              placeholder="Enter Confirm Password"
            />
          </div>
          <div className="form-group">
            <label>Confirm new password.</label>
            <input
              type="password"
              className="form-control"
              required="true"
              id="cnfpassword"
              name="cnfpassword"
              placeholder="Enter Confirm Password"
            />
          </div>
          <div id="password_submit" className="btn-block text-right mt-3">
            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
      </div>
    </div>
   </div>
   </div>

   </>
  )
}

export default ChangePassword