import React from 'react'

const Dashboard = () => {
  return (
    <div>
     <div className="content-wrapper pb-2 mb-0">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Dashboard</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">Home</li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>
        {/* Main content */}
        <section className="content">
        <div class="container-fluid">
  <div class="row">
    <div class="col-12 col-sm-6 col-md-3 mb-4">
      <div class="card shadow-sm">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container bg-primary text-white d-flex align-items-center justify-content-center">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <div class="ml-3">
            <h6>Total Orders</h6>
            <h3>1,200</h3>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 col-sm-6 col-md-3 mb-4">
      <div class="card shadow-sm">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container bg-success text-white d-flex align-items-center justify-content-center">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="ml-3">
            <h6>Total Revenue</h6>
            <h3>$45,300</h3>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 col-sm-6 col-md-3 mb-4">
      <div class="card shadow-sm">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container bg-warning text-white d-flex align-items-center justify-content-center">
            <i class="fas fa-boxes"></i>
          </div>
          <div class="ml-3">
            <h6>Total Products</h6>
            <h3>450</h3>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-12 col-sm-6 col-md-3 mb-4">
      <div class="card shadow-sm">
        <div class="card-body d-flex align-items-center">
          <div class="icon-container bg-danger text-white d-flex align-items-center justify-content-center">
            <i class="fas fa-users"></i>
          </div>
          <div class="ml-3">
            <h6>Total Customers</h6>
            <h3>890</h3>
          </div>
        </div>
      </div>
    </div>
  </div>


</div>


        </section>
      </div>
    </div>  
  )
}

export default Dashboard
