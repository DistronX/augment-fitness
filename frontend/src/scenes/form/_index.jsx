import React from 'react';
import { Formik, Field, FieldArray, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

const validationSchema = Yup.object().shape({
  exercises: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Exercise name is required'),
      sets: Yup.array().of(
        Yup.object().shape({
          reps: Yup.number().min(1, 'Must be at least 1 rep').required('Reps are required'),
        })
      ),
    })
  ),
});

const ExerciseForm = () => {
  const initialValues = {
    exercises: [
      {
        name: '',
        sets: [{ reps: '' }],
      },
    ],
  };

  const handleSubmit = (values) => {
    // Handle form submission logic here
    console.log(values);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      <WorkoutFormContent />
    </Formik>
  );
};

const WorkoutFormContent = () => {
  const { values, handleSubmit } = useFormikContext();

  return (
    <form className="form-container">
      <FieldArray name="exercises">
        {({ push, remove }) => (
          <>
            {values.exercises.map((exercise, index) => (
              <div key={index} className="exercise-container">
                <TextField
                  label="Exercise Name"
                  variant="outlined"
                  type="text"
                  name={`exercises.${index}.name`}
                  fullWidth
                />
                <ErrorMessage name={`exercises.${index}.name`} component="div" />

                <FieldArray name={`exercises.${index}.sets`}>
                  {({ push: pushSet, remove: removeSet }) => (
                    <div className="set-container">
                      {exercise.sets.map((set, setIndex) => (
                        <div key={setIndex} className="set-item">
                          <TextField
                            label="Reps"
                            variant="outlined"
                            type="number"
                            name={`exercises.${index}.sets.${setIndex}.reps`}
                            fullWidth
                          />
                          <ErrorMessage name={`exercises.${index}.sets.${setIndex}.reps`} component="div" />

                          <button type="button" onClick={() => removeSet(setIndex)}>
                            Remove Set
                          </button>
                        </div>
                      ))}
                      <button type="button" onClick={() => pushSet({ reps: '' })}>
                        Add Set
                      </button>
                    </div>
                  )}
                </FieldArray>

                <button type="button" onClick={() => remove(index)}>
                  Remove Exercise
                </button>
              </div>
            ))}
            <button type="button" onClick={() => push({ name: '', sets: [{ reps: '' }] })}>
              Add Exercise
            </button>
          </>
        )}
      </FieldArray>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default ExerciseForm;
