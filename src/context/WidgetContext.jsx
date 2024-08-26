// src/context/WidgetContext.js
import React, { createContext, useReducer } from 'react';
const initialState = {
  categories: [
    {
      id: 1,
      name: 'CSPM Executive Dashboard',
      widgets: [
        { 
          id: 1, 
          name: 'Cloud Accounts', 
          type: 'cloudAccounts',
          data: {
            connected: 2,
            notConnected: 2,
          },
        },
        { 
          id: 2, 
          name: 'Cloud Account Risk Assessment', 
          type: 'cloudAccountRisk',
          data: {
            failed: 1689,
            warning: 681,
            notAvailable: 36,
            passed: 7253,
          },
        },
      ],
    },
    
    {
      id: 2,
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 3,
          name: 'Top 5 Namespace Specific Alerts',
          type: 'namespaceSpecificAlerts',
          data: {
            // Add relevant data fields here
          },
        },
        {
          id: 4,
          name: 'Workload Alerts',
          type: 'workloadAlerts',
          data: {
            // Add relevant data fields here
          },
        },
      ],
    },
    {
      id: 3,
      name: 'Security Overview',
      widgets: [
        {
          id: 5,
          name: 'nithin',
          type: 'fellow',
          data: {
            // Add relevant data fields here
          },
        },
        {
          id: 6,
          name: 'kumar',
          type: 'appari',
          data: {
            // Add relevant data fields here
          },
        },
      ],
    }
  ],
};


const WidgetContext = createContext(initialState);

const widgetReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                widgets: [...category.widgets, action.payload.widget],
              }
            : category
        ),
      };
    case 'REMOVE_WIDGET':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                widgets: category.widgets.filter(widget => widget.id !== action.payload.widgetId),
              }
            : category
        ),
      };
    default:
      return state;
  }
};

const WidgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(widgetReducer, initialState);

  return (
    <WidgetContext.Provider value={{ state, dispatch }}>
      {children}
    </WidgetContext.Provider>
  );
};

export { WidgetContext, WidgetProvider };
