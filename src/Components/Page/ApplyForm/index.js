import React, { Fragment } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./index.scss";
import { TextField } from "@material-ui/core";
const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;
const defaultValues = {
  name: "",
  email: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  phone: "",
  checkbox: false,
  teamMembersArray: [],
};
const schema = Yup.object({
  name: Yup.string()
    .max(30, "30자 이하여야 합니다")
    .required("이름을 작성해 주세요"),
  email: Yup.string()
    .email("유효하지 않은 이메일입니다.")
    .required("이메일을 작성해 주세요"),
  description: Yup.string()
    .max(250, "250자보다 작아야 합니다")
    .required("소개를 작성해 주세요"),
  date: Yup.date().required("날짜를 입력해 주세요"),
  phone: Yup.string()
    .matches(phoneRegExp, "유효한 전화번호가 아닙니다. ")
    .required("전화번호를 작성해 주세요"),
  checkbox: Yup.boolean().required().oneOf([true], "이용 약관에 동의해 주세요"),
}).required();

export default function App() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: {
      errors,
      isValid,
      // isDirty, isSubmitting, touchedFields, submitCount,
    },
  } = useForm({
    mode: "onChange", // "onBlur", "onChange"
    defaultValues: defaultValues,
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
    console.log(data);
    reset();
  };

  return (
    <Fragment>
      <h3>react-hook-form with yup</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input">
          <label htmlFor="name">name</label>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => {
              return (
                <TextField
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                  name={name} // send down the input name
                  inputRef={ref}
                />
              );
            }}
          />
          {/* <input type="name" {...register("name")} /> */}
          {errors.name && <span>{errors.name?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="email">Email</label>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, onBlur, name, ref } }) => {
              return (
                <TextField
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                  name={name} // send down the input name
                  inputRef={ref}
                />
              );
            }}
          />
          {/* <input type="email" {...register("email")} /> */}
          {errors.email && <span>{errors.email?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="description">Description</label>
          <textarea {...register("description")} />
          {errors.description && <span>{errors.description?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="date">Date</label>
          <input type="date" {...register("date")} />
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
          필드 추가
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
