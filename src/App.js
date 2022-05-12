import FunctionalFormik from "./Components/Formik/Functional";
import ClassFormik from "./Components/Formik/Class";
import ReactHookForm from "./Components/ReactHookForm";
import Example from "./Components/Example";

function App() {
  return (
    <div className="App">
      <FunctionalFormik />
      <ClassFormik />
      <ReactHookForm />
      {/* <Example /> */}
    </div>
  );
}

export default App;
