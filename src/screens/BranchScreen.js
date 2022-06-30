import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import Branch from "../components/Branch/Branch";
const BranchScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Branch />
      </main>
    </>
  );
};

export default BranchScreen;
