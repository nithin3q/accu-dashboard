import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import '../styles/AddWidgetModal.css'; // Import custom styles

const AddWidgetModal = ({ show, handleClose, handleAddWidget, categories }) => {
  // Set the default selectedCategoryId to categories[1] if it exists
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || '');
  const [selectedWidgets, setSelectedWidgets] = useState({});

  useEffect(() => {
    if (selectedCategoryId) {
      const categoryWidgets = categories.find(cat => cat.id === selectedCategoryId)?.widgets || [];
      const initialWidgetState = categoryWidgets.reduce((acc, widget) => {
        acc[widget.id] = true; // Check all widgets by default
        return acc;
      }, {});
      setSelectedWidgets(initialWidgetState);
    }
  }, [selectedCategoryId, categories]);

  const handleWidgetChange = (widgetId) => {
    setSelectedWidgets(prevState => ({
      ...prevState,
      [widgetId]: !prevState[widgetId],
    }));
  };

  const handleConfirm = () => {
    const categoryWidgets = categories.find(cat => cat.id === selectedCategoryId)?.widgets || [];
    const uncheckedWidgets = categoryWidgets.filter(widget => !selectedWidgets[widget.id]);

    uncheckedWidgets.forEach(widget => {
      handleAddWidget(selectedCategoryId, widget.id, 'REMOVE');
    });

    const selectedWidgetIds = Object.keys(selectedWidgets).filter(widgetId => selectedWidgets[widgetId]);

    selectedWidgetIds.forEach(widgetId => {
      if (!categoryWidgets.some(widget => widget.id === parseInt(widgetId))) {
        const widgetToAdd = categories.find(cat => cat.id === selectedCategoryId)?.widgets.find(widget => widget.id === parseInt(widgetId));
        if (widgetToAdd) {
          handleAddWidget(selectedCategoryId, widgetToAdd.id, 'ADD');
        }
      }
    });

    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      dialogClassName="custom-modal"
      animation={false}
      className='border-0 text-white'
    >
      <Modal.Header className='modal-headers' closeButton>
        <Modal.Title>Add widget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav className="flex-row mb-3">
          {categories.map(category => (
            <Nav.Link
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`category-nav-link ${category.id === selectedCategoryId ? 'active' : ''}`}
              style={{ cursor: 'pointer', color: '#000' }}
            >
              {category.name}
            </Nav.Link>
          ))}
        </Nav>
        {selectedCategoryId && (
          <>
            {categories.find(cat => cat.id === selectedCategoryId)?.widgets.map(widget => (
              <Form.Check
                key={widget.id}
                type="checkbox"
                id={`widget-${widget.id}`}
                label={widget.name}
                checked={selectedWidgets[widget.id] || false}
                onChange={() => handleWidgetChange(widget.id)}
                className="mb-3 border rounded p-2 ps-5 m-2 text-danger fw-bold"
              />
            ))}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={handleClose} className='custom-btn2'>
          Cancel
        </button>
        <button onClick={handleConfirm} className='custom-btn'>
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWidgetModal;
