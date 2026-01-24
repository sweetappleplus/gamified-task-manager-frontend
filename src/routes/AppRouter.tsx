import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "constants/routes";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {Object.values(ROUTES).map((route) => {
        const Component = route.component;
        return (
          <Route key={route.path} path={route.path} element={<Component />} />
        );
      })}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
