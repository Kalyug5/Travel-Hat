import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import * as Yup from "yup";
import "../../styles/Travel.css";
import { useDispatch, useSelector } from "react-redux";
import { createTravel } from "./traveSlice";
import { User } from "../../Authentication/userAuthSlice";
import { TbFileSad } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const initialValues = {
  destination: "",
  start_date: "",
  end_date: "",
  budget: 0,
  interests: [],
  activities: [],
};

const validationSchema = Yup.object().shape({
  destination: Yup.string().required("Destination is required"),
  start_date: Yup.date().required("Start date is required"),
  end_date: Yup.date().required("End date is required"),
  budget: Yup.number()
    .required("Budget is required")
    .min(1, "Budget must be a greater than one"),
  interests: Yup.array().of(Yup.string().required("Interest is required")),
  activities: Yup.array().of(Yup.string().required("Activity is required")),
});

const Travel = () => {
  const [intrest, setIntrest] = useState("");
  const [activity, setAcitvity] = useState("");
  const dispatch = useDispatch();
  const { userData, userDataLoading } = useSelector((state) => state.user);
  const { travelDetails, travelDetailsLoading } = useSelector(
    (state) => state.travel
  );

  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await dispatch(User()).unwrap();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSkillsChange = (e) => {
    setIntrest(e.target.value);
  };
  const addSkill = (setFieldValue, values) => {
    const intrests = intrest.split(",").map((item) => item.trim());

    setFieldValue("interests", [...values.interests, ...intrests]);
    setIntrest("");
  };

  const handleSkillKeyDown = (e, setFieldValue, values) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(setFieldValue, values);
    }
  };

  const handleClose = (index, setFieldValue, values) => {
    setFieldValue("interests", [
      ...values.interests.filter((_, i) => i !== index),
    ]);
  };

  const handleCloseAll = (setFieldValue) => {
    setFieldValue("interests", []);
  };

  const handleActivityChange = (e) => {
    setAcitvity(e.target.value);
  };

  const handleActivityKeyDown = (e, setFieldValue, values) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkillActivity(setFieldValue, values);
    }
  };

  const addSkillActivity = (setFieldValue, values) => {
    const act = activity.split(",").map((item) => item.trim());
    setFieldValue("activities", [...values.activities, ...act]);
    setAcitvity("");
  };

  const handleCloseActivity = (index, setFieldValue, values) => {
    setFieldValue("activities", [
      ...values.activities.filter((_, i) => i !== index),
    ]);
  };

  const handleCloseAllActivity = (setFieldValue) => {
    setFieldValue("activities", []);
  };

  const handleSubmit = async (values) => {
    console.log("submitted");
    try {
      const response = await dispatch(
        createTravel({
          destination: values.destination,
          start_date: values.start_date,
          end_date: values.end_date,
          budget: values.budget,
          interests: values.interests,
          activities: values.activities,
          email: userData?.data,
        })
      ).unwrap();
      console.log(response);
      navigate("/dashboard");
    } catch (error) {}
  };
  return (
    <>
      {Object.keys(userData).length > 0 ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, setFieldValue, touched }) => (
            <Form>
              <div className="walk-form-component">
                <p className="walk-form-component-header">
                  Add your Travel Information to get Personalized Recommendation
                </p>

                <div className="walk-form-grid">
                  <label>
                    <div>Destination</div>
                    <Field
                      name="destination"
                      type="text"
                      placeholder="Ex Paris"
                    />
                    <div>
                      {errors?.destination && touched.destination ? (
                        <span className="walk-errs">{errors.destination}</span>
                      ) : null}
                    </div>
                  </label>
                  <label>
                    <div>Start Date</div>
                    <Field name="start_date" type="date" />
                    <div>
                      {errors?.start_date && touched.start_date ? (
                        <span className="walk-errs">{errors.start_date}</span>
                      ) : null}
                    </div>
                  </label>
                  <label>
                    <div>End Date</div>
                    <Field name="end_date" type="date" />
                    <div>
                      {errors?.end_date && touched.end_date ? (
                        <span className="walk-errs">{errors.end_date}</span>
                      ) : null}
                    </div>
                  </label>
                  <label>
                    <div>Budget($)</div>
                    <Field name="budget" type="number" />
                    <div>
                      {errors?.budget && touched.budget ? (
                        <span className="walk-errs">{errors.budget}</span>
                      ) : null}
                    </div>
                  </label>
                  <label>
                    <div className="profile-form-group">
                      <div>Intrests</div>
                      <div className="gug">
                        <Field
                          type="text"
                          name="interests"
                          placeholder="Enter your intrests "
                          onChange={(e) => handleSkillsChange(e)}
                          onKeyDown={(e) =>
                            handleSkillKeyDown(e, setFieldValue, values)
                          }
                          value={intrest}
                        />
                        <button onClick={() => addSkill(setFieldValue, values)}>
                          save
                        </button>
                      </div>
                      <div>
                        {errors?.interests && touched.interests ? (
                          <span className="walk-errs">{errors.interests}</span>
                        ) : null}
                      </div>
                    </div>
                    <div
                      className={
                        values.interests.length > 0
                          ? "active__subfilters__component"
                          : "hide"
                      }
                    >
                      <span style={{ fontWeight: "500", fontSize: "18px" }}>
                        {values.interests.length > 0
                          ? "Selected Intrests:"
                          : null}
                      </span>
                      {values.interests.map((skill, index) => (
                        <div key={index} className="skill-chip">
                          {skill}{" "}
                          <IoClose
                            className="close__Icon"
                            onClick={() =>
                              handleClose(index, setFieldValue, values)
                            }
                          />
                        </div>
                      ))}
                      {values.interests.length > 0 ? (
                        <div className="skill-chip-close-all">
                          remove all{" "}
                          <IoClose
                            className="close__Icon"
                            onClick={() => handleCloseAll(setFieldValue)}
                          />
                        </div>
                      ) : null}
                    </div>
                  </label>
                  <label>
                    <div className="profile-form-group">
                      <div>Activities</div>
                      <div className="gug">
                        <Field
                          type="text"
                          name="activities"
                          placeholder="Enter your activity "
                          onChange={(e) => handleActivityChange(e)}
                          onKeyDown={(e) =>
                            handleActivityKeyDown(e, setFieldValue, values)
                          }
                          value={activity}
                        />
                        <button
                          onClick={() =>
                            addSkillActivity(setFieldValue, values)
                          }
                        >
                          save
                        </button>
                      </div>
                      <div>
                        {errors?.activities && touched.activities ? (
                          <span className="walk-errs">{errors.activities}</span>
                        ) : null}
                      </div>
                    </div>
                    <div
                      className={
                        values.activities.length > 0
                          ? "active__subfilters__component"
                          : "hide"
                      }
                    >
                      <span style={{ fontWeight: "500", fontSize: "18px" }}>
                        {values.activities.length > 0
                          ? "Selected Intrests:"
                          : null}
                      </span>
                      {values.activities.map((skill, index) => (
                        <div key={index} className="skill-chip">
                          {skill}{" "}
                          <IoClose
                            className="close__Icon"
                            onClick={() =>
                              handleCloseActivity(index, setFieldValue, values)
                            }
                          />
                        </div>
                      ))}
                      {values.activities.length > 0 ? (
                        <div className="skill-chip-close-all">
                          remove all{" "}
                          <IoClose
                            className="close__Icon"
                            onClick={() =>
                              handleCloseAllActivity(setFieldValue)
                            }
                          />
                        </div>
                      ) : null}
                    </div>
                  </label>
                </div>

                <div className="walk-info-div">
                  {" "}
                  <p className="walk-info">
                    Please note that the travel itinerary is generated by Gemini
                    AI. As a result, sometimes the outcomes may vary and may be
                    less accurate. We appreciate your understanding and
                    cooperation.
                  </p>
                </div>
                <button type="submit">submit</button>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="warning_travel">
          <TbFileSad />
          <span>Please Login To Avail This Feature</span>
        </div>
      )}
    </>
  );
};

export default Travel;
