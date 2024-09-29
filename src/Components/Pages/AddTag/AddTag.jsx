import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const AddTag = () => {
  // Add slider
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="content-wrapper pb-2 mb-0">
        <div className="container">
          {/* Header and Breadcrumb */}
          <div className="row mb-3 mt-2 align-items-center">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">All Tag</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">All Tag</li>
              </ol>
            </div>
          </div>

          {/* Add Slider Button */}
          <div className="row mb-3">
            <div className="col-12 text-end">
              <Button variant="primary" onClick={handleShow}>
                Add Tag
              </Button>
            </div>
          </div>

          {/* Slider Table */}
          <div className="row">
            <div className="col-12">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBrQJZIWlflMXDnp5Ilk_9dHmhFd1MSPjZw&s"
                        alt="Slider"
                        className="img-fluid"
                        style={{ maxWidth: '100px' }}
                      />
                    </td>
                    <td>Kitchen</td>

                    <td>
                      <i className="fa-solid fa-trash-can text-danger fs-4"></i>
                      <i className="fa-solid fa-pen-to-square text-info ms-3 fs-4"></i>

                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Slider Modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your form fields or other content here */}
           <form action="">
           <div class="">
           <label htmlForfor="" className="form-label">Name</label>
              <input type="text" class="form-control"/>
             </div>
           <div class="">
           <label htmlForfor="exampleFormControlInput1" className="form-label">Image</label>
              <input type="file" class="form-control"/>
             </div>
           </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddTag;
