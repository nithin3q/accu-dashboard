import React, { useState, useContext } from "react";
import { WidgetContext } from "../context/WidgetContext";
import CloudAccountsWidget from "./CloudAccountsWidget";
import CloudAccountRiskAssessmentWidget from "./CloudAccountRiskAssessmentWidget";
import AddWidgetModal from "./AddWidgetModal";
import "../styles/Dashboard.css";
import { FaPlus, FaSync, FaEllipsisV } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

const Dashboard = () => {
  const { state, dispatch } = useContext(WidgetContext);
  const { categories } = state;

  const [showModal, setShowModal] = useState(false);

  const handleAddWidget = (categoryId, widgetId, action = 'ADD') => {
    if (action === 'ADD') {
      const widgetToAdd = categories.find(cat => cat.id === categoryId)?.widgets.find(widget => widget.id === widgetId);
      if (widgetToAdd) {
        dispatch({
          type: 'ADD_WIDGET',
          payload: { categoryId, widget: widgetToAdd },
        });
      }
    } else if (action === 'REMOVE') {
      dispatch({
        type: 'REMOVE_WIDGET',
        payload: { categoryId, widgetId },
      });
    }
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    handleAddWidget(categoryId, widgetId, 'REMOVE');
  };

  const handleRefresh = () => {
    // Implement refresh logic
  };

  const handleFilter = (e) => {
    // Implement filter logic based on selected day
  };

  return (
    <div className="dashboard-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">CNAPP Dashboard</h5>

        <div className="d-flex">
          <button
            className="btn border bg-light px-3 me-2 d-flex align-items-center"
            onClick={() => setShowModal(true)}
          >
            <FaPlus className="me-2" /> Add Widget
          </button>
          <button
            className="btn border bg-light px-3 me-2 d-flex align-items-center"
            onClick={handleRefresh}
          >
            <FaSync />
          </button>
          <button className="btn border bg-light px-3 me-2 d-flex align-items-center">
            <FaEllipsisV />
          </button>
          <div className="btn border bg-light d-flex align-items-center">
            <MdAccessTimeFilled className="me-1" size={30} />
            <select
              onChange={handleFilter}
              className="form-select d-inline-block ms-2"
            >
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {categories.map((category) => (
          <div key={category.id} className="category-section mb-4">
            <h5 className="mb-3">{category.name}</h5>
            <div className="widget-row">
              {category.widgets.map((widget) => (
                <div key={widget.id} className="widget-card-container">
                  <div className="widget-card position-relative p-3 rounded">
                    <button
                      className="btn position-absolute top-0 end-0"
                      onClick={() => handleRemoveWidget(category.id, widget.id)}
                    >
                      &times;
                    </button>
                    {widget.type === 'cloudAccounts' && <CloudAccountsWidget data={widget.data} />}
                    {widget.type === 'cloudAccountRisk' && <CloudAccountRiskAssessmentWidget data={widget.data} />}
                    {widget.type === 'namespaceSpecificAlerts' && <div className="widget-card add-widget-card">+ Add Widget</div>}
                    {widget.type === 'workloadAlerts' && <div className="widget-card add-widget-card">+ Add Widget</div>}
                    {widget.type === 'addWidget' && <div className="widget-card add-widget-card">+ Add Widget</div>}
                  </div>
                </div>
              ))}
              <div className="widget-card-container">
                <div className="widget-card add-widget-card">
                  <button
                    className="btn border bg-light px-3 me-2 d-flex align-items-center"
                    onClick={() => setShowModal(true)}
                  >
                    <FaPlus className="me-2" /> Add Widget
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddWidgetModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleAddWidget={handleAddWidget}
        categories={categories} // Pass categories as a prop
      />
    </div>
  );
};

export default Dashboard;
