import React, { Fragment } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./index.scss";

const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;

const schema = Yup.object({
  name: Yup.string()
    .max(15, "열다섯 글자보다 작아야 합니다")
    .required("이름을 작성해 주세요"),
  email: Yup.string()
    .email("유효하지 않은 이메일입니다.")
    .required("이메일을 작성해 주세요"),
  description: Yup.string()
    .max(250, "250자보다 작아야 합니다")
    .required("소개를 작성해 주세요"),
  date: Yup.date().required(),
  phone: Yup.string()
    .matches(phoneRegExp, "유효한 전화번호가 아닙니다.")
    .required("전화번호를 작성해 주세요"),
  checkbox: Yup.boolean().required().oneOf([true], "이용 약관에 동의해 주세요"),
}).required();

const Input = ({ label, register, required, errors }) => (
  <div className="form__input">
    <label>{label}</label>
    <input {...register(label, required)} />
    {errors.name && <span>{errors.name?.message}</span>}
  </div>
);

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <Fragment>
      <h3>React-hook-form + yup with Functional Component</h3>
      {/* <span>Only Functional Component is available</span> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="name"
          register={register}
          required={{
            required: "This field is required",
            maxLength: {
              value: 16,
              message: "입력 가능한 최대 글자 수는 16자입니다.",
            },
          }}
          errors={errors}
        />
        {/* <div className="form__input">
          <label htmlFor="name">Name</label>
          <input
            {...register("name", {
              required: "This field is required",
              maxLength: {
                value: 16,
                message: "입력 가능한 최대 글자 수는 16자입니다.",
              },
            })}
          />
          {errors.name && <span>{errors.name?.message}</span>}
        </div> */}

        <div className="form__input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "This field is required",
              maxLength: 64,
            })}
          />
          {/* 패턴 사용  */}
          {/* <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} /> */}
          {errors.email && <span>{errors.email?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description", {
              required: "This field is required",
              maxLength: 250,
            })}
          />
          {errors.description && <span>{errors.description?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            {...register("date", { required: "This field is required" })}
          />
          {errors.date && <span>{errors.date?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            {...register("phone", {
              required: "This field is required",
              maxLength: 11,
            })}
          />
          {errors.phone && <span>{errors.phone?.message}</span>}
        </div>
        <div className="form__input checkbox">
          <input
            type="checkbox"
            {...register("checkbox", { required: "This field is required" })}
          />
          <p>이용 약관에 동의합니다.</p>
          {errors.checkbox && <span>{errors.checkbox?.message}</span>}
        </div>
        <button type="submit" disabled={Object.keys(errors).length !== 0}>
          Submit
        </button>
      </form>
    </Fragment>
  );
}
