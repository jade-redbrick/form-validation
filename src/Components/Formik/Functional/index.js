import { ErrorMessage, Form, Field, Formik } from "formik";
import { Fragment } from "react";
import * as Yup from "yup";
import "./index.scss";

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
          <div className="form__input">
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            {/** Field 커ㅁ포넌트가 input을 렌더링, onChange, onBlur, value 내장되어 있음 */}
            {/* input만 되는 건 아니고, select, textarea 등도 가능 */}
            <ErrorMessage name="name" />
          </div>
          <div className="form__input">
            <label htmlFor="email">email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <div className="form__input">
            <label htmlFor="desc">description</label>
            <Field name="desc" as="textarea" />
            <ErrorMessage name="desc" />
          </div>
          <div className="form__input">
            <label htmlFor="date">date</label>
            <Field name="date" type="date" />
            <ErrorMessage name="date" />
          </div>
          <div className="form__input">
            <label htmlFor="phone">phone</label>
            <Field name="phone" type="tel" />
            <ErrorMessage name="phone" />
          </div>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </Fragment>
  );
};

export default SignupForm;
