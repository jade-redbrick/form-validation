import React, { Fragment } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./index.scss";
import Field from "../../Common/Field";

const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;

const schema = Yup.object({
  name: Yup.string()
    .max(15, "15자 이하여야 합니다")
    .required("이름을 작성해 주세요"),
  name2: Yup.string()
    .max(15, "15자 이하여야 합니다")
    .required("name2을 작성해 주세요"),
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

const Input = ({ label, register, errors }) => (
  <div className="form__input">
    <label>{label}</label>
    <input {...register} />
    {errors.name && <span>{errors.name?.message}</span>}
  </div>
);

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: {
      errors,
      isDirty,
      isSubmitting,
      isValid,
      touchedFields,
      submitCount,
    },
  } = useForm({
    mode: "onChange", // "onBlur", "onChange"
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
    },
    resolver: yupResolver(schema),
  });
  const { fields, append } = useFieldArray({
    control,
    name: "teamMembersArray",
  });
  const watchTeamMembersArray = watch("teamMembersArray");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchTeamMembersArray[index],
    };
  });
  const onSubmit = (data, e) => {
    alert(JSON.stringify(data));
    reset();
  };

  console.log("updated", controlledFields);
  return (
    <Fragment>
      <h3>React-hook-form + yup with Functional Component</h3>
      {/* <span>Only Functional Component is available</span> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input">
          <label htmlFor="name">Name</label>
          <input {...register("name")} />
          {errors.name && <span>{errors.name?.message}</span>}
        </div>
        <div className="form__input">
          <Controller
            name="name2"
            control={control}
            render={({ field }) => {
              return (
                <Field.Input
                  title="Name2"
                  name="name2"
                  placeholder="enter your name"
                  {...field}
                />
              );
            }}
          />
          {/* Controller 대강 사용 방법!! Field.Input까지 수정해 줘야 함 */}
          {errors.name2 && <span>{errors.name2?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="email">Email</label>
          {/* <input name="email" ref={register({re})} */}
          <input type="email" {...register("email")} />
          {/* 패턴 사용  */}
          {/* <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} /> */}
          {errors.email && <span>{errors.email?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="description">Description</label>
          <textarea {...register("description")} />
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
          <input type="tel" {...register("phone")} />
          {errors.phone && <span>{errors.phone?.message}</span>}
        </div>

        {controlledFields.map((field, index) => {
          return (
            <input
              key={index}
              {...register(`teamMembersArray.${index}.name`)}
            />
          );
        })}

        <button
          type="button"
          onClick={() =>
            append({
              name: "",
            })
          }
        >
          Append
        </button>
        <div className="form__input checkbox">
          <input type="checkbox" {...register("checkbox")} />
          <p>이용 약관에 동의합니다.</p>
          {errors.checkbox && <span>{errors.checkbox?.message}</span>}
        </div>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </Fragment>
  );
}
