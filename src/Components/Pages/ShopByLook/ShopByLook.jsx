import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

const ShopByLook = () => {
  // State for modal visibility
  const [show, setShow] = useState(false);
  
  // State for storing categories
  const [categories, setCategories] = useState([]);

  // State for form inputs
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Handle file input change
  const handleFileChange = (e) => setImage(e.target.files[0]);

  // Handle form input change
  const handleNameChange = (e) => setName(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleFaqQuestionChange = (e) => setFaqQuestion(e.target.value);
  const handleFaqAnswerChange = (e) => setFaqAnswer(e.target.value);

  // Add new category
  const handleAddCategory = () => {
    if (image && name && title && description && faqQuestion && faqAnswer) {
      const newCategory = {
        id: categories.length + 1,
        image: URL.createObjectURL(image),
        name,
        title,
        description,
        faq: {
          question: faqQuestion,
          answer: faqAnswer,
        },
      };
      setCategories([...categories, newCategory]);

      // Reset fields
      setImage(null);
      setName('');
      setTitle('');
      setDescription('');
      setFaqQuestion('');
      setFaqAnswer('');
      setShow(false);
    }
  };

  // Handle delete category
  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Modal close/open functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="content-wrapper pb-2 mb-0">
        <div className="container">
          {/* Header and Breadcrumb */}
          <div className="row mb-3 mt-2 align-items-center">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">ShopByLook</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">ShopByLook</li>
              </ol>
            </div>
          </div>

          {/* Add Category Button */}
          <div className="row mb-3">
            <div className="col-12 text-end">
              <Button variant="primary" onClick={handleShow}>
                Add Data
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
                    <th>Name</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>FAQ (Q/A)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>
                        <img
                          src={category.image}
                          alt={category.name}
                          className="img-fluid"
                          style={{ maxWidth: '100px' }}
                        />
                      </td>
                      <td>{category.name}</td>
                      <td>{category.title}</td>
                      <td>{category.description}</td>
                      <td>
                        <strong>Q:</strong> {category.faq.question} <br />
                        <strong>A:</strong> {category.faq.answer}
                      </td>
                      <td>
                        <i
                          className="fa-solid fa-trash-can text-danger fs-4"
                          onClick={() => handleDeleteCategory(category.id)}
                          style={{ cursor: 'pointer' }}
                        ></i>
                        <i className="fa-solid fa-pen-to-square text-info ms-3 fs-4"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form Fields */}
          <form>
            <div className="mb-3">
              <label htmlFor="categoryImage" className="form-label">Image</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryName" className="form-label">Name</label>
              <input type="text" className="form-control" value={name} onChange={handleNameChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryTitle" className="form-label">Title</label>
              <input type="text" className="form-control" value={title} onChange={handleTitleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="categoryDescription" className="form-label">Description</label>
              <textarea className="form-control" rows="3" value={description} onChange={handleDescriptionChange}></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="faqQuestion" className="form-label">FAQ Question</label>
              <input type="text" className="form-control" value={faqQuestion} onChange={handleFaqQuestionChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="faqAnswer" className="form-label">FAQ Answer</label>
              <input type="text" className="form-control" value={faqAnswer} onChange={handleFaqAnswerChange} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      
    </>
  );
};

export default ShopByLook;
