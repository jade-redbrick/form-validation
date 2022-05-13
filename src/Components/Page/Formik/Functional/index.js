import { ErrorMessage, Form, Field, Formik } from "formik";
import { Fragment } from "react";
import * as Yup from "yup";
import "./index.scss";
import Fields from "../Fields";
const SignupForm = () => {
  const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
  return (
    <Fragment>
      <h3>Formik + yup with Functional Component</h3>
      <Formik
        initialValues={{
          name: "",
          email: "",
          desc: "",
          date: new Date().toISOString().split("T")[0],
          phone: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "열다섯 글자보다 작아야 합니다")
            .required("Required"),
          email: Yup.string()
            .email("유효하지 않은 이메일입니다.")
            .required("Required"),
          desc: Yup.string()
            .max(250, "250자보다 작아야 합니다")
            .required("Required"),
          phone: Yup.string()
            .matches(phoneRegExp, "유효한 전화번호가 아닙니다.")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <Fields.Input label="Name" name="name" />
          <Fields.Email label="Email" name="email" />
          <Fields.Textarea label="Description" name="desc" />
          <Fields.Date label="Date" name="date" />
          <Fields.Phone label="Phone" name="phone" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default SignupForm;
