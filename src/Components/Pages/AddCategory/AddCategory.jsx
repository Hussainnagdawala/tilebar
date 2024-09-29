import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Base_Url from '../../../BaseUrl/BaseUrl';

const AddCategory = () => {
  // State for modal visibility and current action (add/edit)
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // State for storing categories
  const [categories, setCategories] = useState([]);

  // State for form inputs
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(null); // Store the ID when editing

  // Fetch categories from the server (using axios)
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${Base_Url}/shop-by-use/list`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => setImage(e.target.files[0]);

  // Handle form input change
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  // Add or Edit Category
  const handleSaveCategory = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);

    try {
      if (isEditing && categoryId) {
        // Update category
        await axios.put(`${Base_Url}/shop-by-use/update/${categoryId}`, formData);
      } else {
        // Create new category
        await axios.post(`${Base_Url}/shop-by-use/create`, formData);

      }
      // Fetch updated categories and close modal
      fetchCategories();
      handleClose();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${Base_Url}/shop-by-use/remove/${id}`);
      // Fetch updated categories
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Open modal for editing an existing category
  const handleEditCategory = (category) => {
    setCategoryId(category.id);
    setTitle(category.title);
    setDescription(category.description);
    setImage(null); // Optionally reset the image
    setIsEditing(true);
    setShow(true);
  };

  // Modal close/open functions
  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
    setTitle('');
    setDescription('');
    setImage(null);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="content-wrapper pb-2 mb-0">
        <div className="container">
          {/* Header and Breadcrumb */}
          <div className="row mb-3 mt-2 align-items-center">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">All Categories</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">All Categories</li>
              </ol>
            </div>
          </div>

          {/* Add Category Button */}
          <div className="row mb-3">
            <div className="col-12 text-end">
              <Button variant="primary" onClick={handleShow}>
                Add Category
              </Button>
            </div>
          </div>

          {/* Category Table */}
          <div className="row">
            <div className="col-12">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          src={category.image}
                          alt={category.title}
                          className="img-fluid"
                          style={{ maxWidth: '100px' }}
                        />
                      </td>
                      <td>{category.title}</td>
                      <td>{category.description}</td>
                      <td>
                        <i
                          className="fa-solid fa-trash-can text-danger fs-4"
                          onClick={() => handleDeleteCategory(category.id)}
                          style={{ cursor: 'pointer' }}
                        ></i>
                        <i
                          className="fa-solid fa-pen-to-square text-info ms-3 fs-4"
                          onClick={() => handleEditCategory(category)}
                          style={{ cursor: 'pointer' }}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Category' : 'Add Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form Fields */}
          <form>
            <div className="mb-3">
              <label htmlFor="categoryImage" className="form-label">Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryTitle" className="form-label">Title</label>
              <input type="text" className="form-control" value={title} onChange={handleTitleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryDescription" className="form-label">Description</label>
              <textarea className="form-control" rows="3" value={description} onChange={handleDescriptionChange}></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveCategory}>
            {isEditing ? 'Update' : 'Save'} Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddCategory;
