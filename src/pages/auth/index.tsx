import { Outlet } from "react-router-dom";
import Header from "../../components/Layout/Header";

export default function Index() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
