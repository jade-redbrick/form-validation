import FunctionalFormik from "./Components/Formik/Functional";
import ClassFormik from "./Components/Formik/Class";
import Example from "./Components/Example";

function App() {
  return (
    <div className="App">
      <FunctionalFormik />
      <ClassFormik />
      {/* <Example /> */}
    </div>
  );
}

export default App;
