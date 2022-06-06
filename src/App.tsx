import "./App.css";
import Button from "./components/Button";
import HigherOrderCo from "./components/HigherOrderCo";
import Navbar from "./components/Navbar";
import PersonLists from "./components/PersonLists";
import Status from "./components/Status";
import Profile from "./components/Profile";
import Private from "./components/User";
function App() {
  const nameList = [
    {
      first: "Clark",
      last: "Kent",
    },
    {
      first: "Princess",
      last: "Diana",
    },
    {
      first: "Toan",
      last: "Ta",
    },
  ];
  const handleClick = (event: any) => console.log(event);
  return (
    <div className="App">
      <Navbar />
      <PersonLists name={nameList} />
      <HigherOrderCo>
        <Status status={"loading"} />
      </HigherOrderCo>
      <Button style={{ backgroundColor: "blue", fontSize: "14px" }} />
      <Private isLoggedIn={true} component={Profile} />
    </div>
  );
}

export default App;
