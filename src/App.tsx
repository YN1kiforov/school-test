import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Test from './pages/Test';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "test",
    element: <Test/>,
  },
]);

const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
