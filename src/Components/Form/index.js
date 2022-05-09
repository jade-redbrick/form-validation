import { Formik, useFormik } from "formik";
import "./index.css";
const Form = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className="form" onSubmit={formik.handleSubmit}>
      <div className="form__email">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
      <div className="form__password">
        <label htmlFor="password">password</label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
