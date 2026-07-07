import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Login from "../pages/login/page";
import EnterCode from "../pages/enter-code/page";
import CardInfo from "../pages/card-info/page";
import SecurityVerify from "../pages/security-verify/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/verify-code",
    element: <EnterCode />,
  },
  {
    path: "/card-info",
    element: <CardInfo />,
  },
  {
    path: "/security-verify",
    element: <SecurityVerify />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;