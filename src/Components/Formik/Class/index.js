import { Formik, Form } from "formik";
import React, { Component, Fragment } from "react";

import * as Yup from "yup";
import Fields from "../Fields";

export default class ClassForm extends Component {
  constructor(props) {
    super(props);
    this.state = { phoneRegExp: /^\d{3}\d{3,4}\d{4}$/ };
  }

  render() {
    return (
      <Fragment>
        <h3>Formik + yup with Class Component</h3>
        <Formik
          initialValues={{
            name: "",
            email: "",
            desc: "",
            date: new Date().toISOString().split("T")[0],
            phone: "",
            agree: false,
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
              .matches(this.state.phoneRegExp, "유효한 전화번호가 아닙니다.")
              .required("Required"),
            agree: Yup.boolean()
              .required("Required")
              .oneOf([true], "이용 약관에 동의해 주세요"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {(props) => (
            <Form>
              <Fields.Input label="Name" name="name" />
              <Fields.Email label="Email" name="email" />
              <Fields.Textarea label="Description" name="desc" />
              <Fields.Date label="Date" name="date" />
              <Fields.Phone label="Phone" name="phone" />
              <Fields.Checkbox name="agree">
                이용 약관에 동의합니다.
              </Fields.Checkbox>
              {/* 미 입력 시 버튼 비활성화 */}
              <button type="submit" disabled={!props.isValid}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </Fragment>
    );
  }
}
