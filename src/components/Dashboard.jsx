import React, { useState, useContext } from "react";
import { WidgetContext } from "../context/WidgetContext";
import CloudAccountsWidget from "./CloudAccountsWidget";
import CloudAccountRiskAssessmentWidget from "./CloudAccountRiskAssessmentWidget";
import AddWidgetModal from "./AddWidgetModal";
import HorizontalBarWidget from "./HorizontalBarWidget";
import "../styles/Dashboard.css";
import { FaPlus, FaSync, FaEllipsisV } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import graph from "../assets/graph.png";

const Dashboard = () => {
  const { state, dispatch } = useContext(WidgetContext);
  const { categories } = state;

  const [showModal, setShowModal] = useState(false);

  const handleAddWidget = (categoryId, widgetId, action = "ADD") => {
    if (action === "ADD") {
      const widgetToAdd = categories
        .find((cat) => cat.id === categoryId)
        ?.widgets.find((widget) => widget.id === widgetId);
      if (widgetToAdd) {
        dispatch({
          type: "ADD_WIDGET",
          payload: { categoryId, widget: widgetToAdd },
        });
      }
    } else if (action === "REMOVE") {
      dispatch({
        type: "REMOVE_WIDGET",
        payload: { categoryId, widgetId },
      });
    }
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    handleAddWidget(categoryId, widgetId, "REMOVE");
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  const handleFilter = (e) => {
    const selectedTime = e.target.value;
    console.log("Filter by:", selectedTime);
  };

  return (
    <div className="dashboard-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="mb-0">CNAPP Dashboard</h5>

        <div className="d-flex">
          <button
            className="btn btn-sm border bg-white px-2 me-3 d-flex align-items-center"
            onClick={() => setShowModal(true)}
          >
            Add Widget <FaPlus className="mx-2" />
          </button>
          <button
            className="btn btn-sm border  px-2 bg-white me-3 d-flex align-items-center"
            onClick={handleRefresh}
          >
            <FaSync />
          </button>
          <button className="btn btn-sm border bg-white px-2 me-3 d-flex align-items-center">
            <FaEllipsisV />
          </button>
          <div className="btn btn-sm border bg-white d-flex align-items-center">
            <MdAccessTimeFilled className="me-1" size={20} />
            <select
              onChange={handleFilter}
              className="form-select form-select-sm d-inline-block ms-2"
            >
              <option value="today">Last 2 days</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
            </select>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {categories.map((category) => (
          <div key={category.id} className="category-section mb-4">
            <h6 className="mb-3 ms-3">{category.name}</h6>
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
                    {widget.type === "cloudAccounts" && (
                      <CloudAccountsWidget data={widget.data} />
                    )}
                    {widget.type === "cloudAccountRisk" && (
                      <CloudAccountRiskAssessmentWidget data={widget.data} />
                    )}
                    {widget.type === "namespaceSpecificAlerts" && (
                      <div className="widget-content">
                        <h6 className="widget-title">
                          Top 5 Namespace Specific Alerts
                        </h6>
                        <img src={graph} className="widget-image" alt="Graph" />
                        <p className="widget-message fw-bold">
                          No graph data available
                        </p>
                      </div>
                    )}
                    {widget.type === "workloadAlerts" && (
                      <div className="widget-content">
                        <h6 className="widget-title">Workload Alerts</h6>
                        <img src={graph} className="widget-image" alt="Graph" />
                        <p className="widget-message fw-bold">
                          No graph data available
                        </p>
                      </div>
                    )}
                    {(widget.type === "Assessment" ||
                      widget.type === "Issues") && (
                      <div className="widget-content">
                        <h6 className="widget-title">{widget.name}</h6>
                        <HorizontalBarWidget data={widget.data} />
                      </div>
                    )}
                    {widget.type === "addWidget" && (
                      <div className="widget-card add-widget-card">
                        + Add Widget
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="widget-card-container">
                <div className="widget-card add-widget-card">
                  <button
                    className="btn border  px-3 me-2 d-flex align-items-center"
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
