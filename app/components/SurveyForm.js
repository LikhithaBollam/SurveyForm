'use client';

import { useState, useEffect } from 'react';
import useForm from '../hooks/useForm';
import FormSection from './FormSection';

const SurveyForm = () => {
  const initialValues = {
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteLanguage: '',
    experience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
    additionalQuestions: [],
  };

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validate,
    resetForm,
  } = useForm(initialValues);

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [submittedData, setSubmittedData] = useState(null);

  const fetchAdditionalQuestions = async (topic) => {
    const res = await fetch(`/api/fetchAdditionalQuestions?topic=${topic}`);
    const data = await res.json();
    setAdditionalQuestions(data);
  };

  useEffect(() => {
    if (values.surveyTopic) {
      fetchAdditionalQuestions(values.surveyTopic);
    }
  }, [values.surveyTopic]);

  const handleAdditionalQuestionChange = (id, value) => {
    setAdditionalQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === id ? { ...question, value } : question
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid', { ...values, additionalQuestions });
      setSubmittedData({
        ...values,
        additionalQuestions,
        section: getSectionName(values.surveyTopic),
      });
      resetForm(); 
      setAdditionalQuestions([]); 
    } else {
      console.log('Form is invalid', errors);
    }
  };

  const getSectionName = (topic) => {
    switch (topic) {
      case 'Technology':
        return 'Technology Section';
      case 'Health':
        return 'Health Section';
      case 'Education':
        return 'Education Section';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Survey Topic</label>
          <select
            name="surveyTopic"
            value={values.surveyTopic}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select a topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
          {errors.surveyTopic && <p className="text-red-500 text-sm mt-1">{errors.surveyTopic}</p>}
        </div>

        {values.surveyTopic === 'Technology' && (
          <FormSection title="Technology Section">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Favorite Programming Language</label>
              <select
                name="favoriteLanguage"
                value={values.favoriteLanguage}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {errors.favoriteLanguage && <p className="text-red-500 text-sm mt-1">{errors.favoriteLanguage}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Years of Experience</label>
              <input
                type="number"
                name="experience"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>
          </FormSection>
        )}

        {values.surveyTopic === 'Health' && (
          <FormSection title="Health Section">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Exercise Frequency</label>
              <select
                name="exerciseFrequency"
                value={values.exerciseFrequency}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {errors.exerciseFrequency && <p className="text-red-500 text-sm mt-1">{errors.exerciseFrequency}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Diet Preference</label>
              <select
                name="dietPreference"
                value={values.dietPreference}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {errors.dietPreference && <p className="text-red-500 text-sm mt-1">{errors.dietPreference}</p>}
            </div>
          </FormSection>
        )}

        {values.surveyTopic === 'Education' && (
          <FormSection title="Education Section">
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Highest Qualification</label>
              <select
                name="highestQualification"
                value={values.highestQualification}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's Degree">Bachelors Degree</option>
                <option value="Master's Degree">Masters Degree</option>
                <option value="Doctorate">Doctorate</option>
              </select>
              {errors.highestQualification && <p className="text-red-500 text-sm mt-1">{errors.highestQualification}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={values.fieldOfStudy}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-2 border ${errors.fieldOfStudy ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {errors.fieldOfStudy && <p className="text-red-500 text-sm mt-1">{errors.fieldOfStudy}</p>}
            </div>
          </FormSection>
        )}

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Feedback</label>
          <textarea
            name="feedback"
            value={values.feedback}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border border-gray-300 rounded resize-vertical"
            style={{ maxHeight: '200px' }}
          />
          {errors.feedback && <p className="text-red-500 text-sm mt-1">{errors.feedback}</p>}
        </div>

        {additionalQuestions.length > 0 && (
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Additional Questions</label>
            {additionalQuestions.map((question) => (
              <div key={question.id} className="mb-2">
                <label className="block text-sm mb-1">{question.question}</label>
                <input
                  type="text"
                  value={question.value}
                  onChange={(e) => handleAdditionalQuestionChange(question.id, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 block w-full">
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-8 p-4 bg-gray-100 rounded-md shadow-md">
          <h2 className="text-lg font-bold mb-4">Summary</h2>
          <p><span className="font-bold">Section:</span> {submittedData.section}</p>
          <p><span className="font-bold">Full Name:</span> {submittedData.fullName}</p>
          <p><span className="font-bold">Email:</span> {submittedData.email}</p>
          <p><span className="font-bold">Survey Topic:</span> {submittedData.surveyTopic}</p>
          {submittedData.surveyTopic === 'Technology' && (
            <>
              <p><span className="font-bold">Favorite Language:</span> {submittedData.favoriteLanguage}</p>
              <p><span className="font-bold">Experience:</span> {submittedData.experience}</p>
            </>
          )}
          {submittedData.surveyTopic === 'Health' && (
            <>
              <p><span className="font-bold">Exercise Frequency:</span> {submittedData.exerciseFrequency}</p>
              <p><span className="font-bold">Diet Preference:</span> {submittedData.dietPreference}</p>
            </>
          )}
          {submittedData.surveyTopic === 'Education' && (
            <>
              <p><span className="font-bold">Highest Qualification:</span> {submittedData.highestQualification}</p>
              <p><span className="font-bold">Field of Study:</span> {submittedData.fieldOfStudy}</p>
            </>
          )}
          <div className="mb-4">
            <p><span className="font-bold">Feedback:</span></p>
            <div className="w-full p-2 border border-gray-300 rounded" style={{ maxHeight: '120px', overflowY: 'auto' }}>
              {submittedData.feedback}
            </div>
          </div>
          {submittedData.additionalQuestions.length > 0 && (
            <div className="mt-4">
              <p className="font-bold">Additional Questions:</p>
              {submittedData.additionalQuestions.map((question) => (
                <p key={question.id}><span className="font-bold">{question.question}:</span> {question.value}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SurveyForm;
