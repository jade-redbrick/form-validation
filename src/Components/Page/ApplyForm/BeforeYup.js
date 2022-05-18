import React, { Fragment } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./index.scss";
import Field from "../../Common/Field";

export default function BeforeYup() {
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
    defaultValues: {
      name: "",
      email: "",
      description: "",
      phone: "",
      date: new Date().toISOString().split("T")[0],
    },
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
      <h3>react-hook-form without yup</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input">
          <label htmlFor="name">name</label>
          <input
            type="name"
            {...register("name", {
              required: "이름을 입력해 주세요",
              maxLength: { value: 20, message: "20자 이하여야 합니다" },
            })}
          />
          {errors.name && <span>{errors.name?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="email">Email</label>
          {/* <input name="email" ref={register({re})} */}
          <input
            type="email"
            {...register("email", {
              required: "이메일을 입력해 주세요",
              maxLength: { value: 64, message: "64자 이하여야 합니다" },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "이메일 형식에 맞지 않습니다.",
              },
            })}
          />
          {errors.email && <span>{errors.email?.message}</span>}
        </div>
        <div className="form__input">
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description", {
              required: "설명을 입력해 주세요",
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
              required: "번호를 입력해 주세요",
              pattern: {
                value: /^[0-9\b]+$/,
                message: "번호 형식에 맞지 않습니다.",
              },
            })}
          />
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
