import React from 'react';
import { Form, InputGroup, Button, Breadcrumb } from 'react-bootstrap';
import { FaCog } from 'react-icons/fa';
import { MdOutlineNotificationsActive } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import { IoPersonCircleSharp } from 'react-icons/io5';

const Topbar = () => {
  return (
    <div className="d-flex align-items-center p-2">
      {/* BREADCRUMBS */}
      <div className="flex-grow-1 ">
        <Breadcrumb className="mb-0">
          <Breadcrumb.Item active>Home</Breadcrumb.Item>
          <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/* SEARCH BAR */}
      <div className="d-flex justify-content-center flex-grow-1">
        <InputGroup className="rounded border" style={{ maxWidth: '400px' }}>
          <InputGroup.Text className="border-0 bg-white">
            <CiSearch size={20} />
          </InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Search anything"
            className="border-0"
            style={{ borderRadius: '0 5px 5px 0' }}
          />
        </InputGroup>
      </div>

      {/* ICONS */}
      <div className="d-flex align-items-center justify-content-end flex-grow-1">
        <Button variant="link" className="text-dark">
          <MdOutlineNotificationsActive size={20} />
        </Button>
        <Button variant="link" className="text-dark">
          <FaCog />
        </Button>
        <Button variant="link" className="text-dark">
          <IoPersonCircleSharp size={30} />
        </Button>
      </div>
    </div>
  );
};

export default Topbar;
