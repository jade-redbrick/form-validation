import React, { Fragment } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "./index.scss";
import Field from "../../Common/Field";

const phoneRegExp = /^\d{3}\d{3,4}\d{4}$/;

const schema = Yup.object({
  teamName: Yup.string()
    .max(30, "30자 이하여야 합니다")
    .required("크리에이터(팀)명을 작성해 주세요"),
  teamDesc: Yup.string()
    .max(250, "250자 이하여야 합니다")
    .required("크리에이터(팀) 소개를 작성해 주세요"),
  worldName: Yup.string()
    .max(30, "30자 이하여야 합니다")
    .required("월드 명을 작성해 주세요"),
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
      isValid,
      // isDirty, isSubmitting, touchedFields, submitCount,
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

  const CustomController = ({ name, render, error }) => (
    <div className="form__input">
      <Controller name={name} control={control} render={render} />
    </div>
  );

  return (
    <Fragment>
      <h3>챌린지 참가 신청서 작성</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CustomController
          name="teamName"
          render={({ field }) => {
            return (
              <Field.Input
                title="크리에이터(팀)명"
                name="teamName"
                placeholder="이름을 입력해 주세요"
                onChange={field.onChange}
                onBlur={field.onBlur}
                maxLength={30}
              />
            );
          }}
          error={errors.teamName}
        />
        <CustomController
          name="teamDesc"
          render={({ field }) => {
            return (
              <Field.TextArea
                title="크리에이터(팀) 소개"
                name="teamDesc"
                placeholder="팀을 소개해 주세요(팀 구성, 목표 등)"
                onChange={field.onChange}
                onBlur={field.onBlur}
                maxLength={30}
              />
            );
          }}
          error={errors.teamDesc}
        />
        <CustomController
          name="worldName"
          render={({ field }) => {
            return (
              <Field.Input
                title="월드 명"
                name="worldName"
                placeholder="작품명을 입력해 주세요"
                onChange={field.onChange}
                onBlur={field.onBlur}
                maxLength={30}
              />
            );
          }}
          error={errors.worldName}
        />
        <CustomController
          name="name"
          render={({ field }) => {
            return (
              <Field.Input
                title="이름(본명)"
                name="name"
                placeholder="이름을 입력해 주세요"
                onChange={field.onChange}
                onBlur={field.onBlur}
                maxLength={16}
                value={field.value}
              />
            );
          }}
          error={errors.name}
        />
        <CustomController
          name="email"
          render={({ field }) => {
            return (
              <Field.Input
                title="이메일"
                name="email"
                placeholder="이메일을 입력해 주세요"
                onChange={field.onChange}
                onBlur={field.onBlur}
                maxLength={64}
              />
            );
          }}
          error={errors.email}
        />
        <CustomController
          name="phone"
          render={({ field }) => {
            return (
              <Field.Input
                title="휴대폰"
                name="phone"
                placeholder="휴대폰 연락처를 입력해 주세요"
                onChange={field.onChange}
                onBlur={field.onBlur}
                maxLength={16}
              />
            );
          }}
          error={errors.phone}
        />
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
