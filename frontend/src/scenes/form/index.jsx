import { Box, Button, IconButton, TextField } from "@mui/material";
import { ErrorMessage, FieldArray, Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";

import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import PlaylistRemoveOutlinedIcon from '@mui/icons-material/PlaylistRemoveOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';

const Form = () => {

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <form onSubmit={handleSubmit}>
            <Box>
              <FieldArray name="exercises">
                {({ push, remove }) => (
                  <>
                  <Box display={'flex'} flexWrap={'wrap'}>
                    {values.exercises.map((exercise, index) => (
                      <Box key={index} className="exercise-container" width={'45%'} margin={'10px'}>
                        <TextField
                          label="Exercise Name"
                          variant="filled"
                          type="text"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name={`exercises.${index}.name`}
                          sx={{ gridColumn: "span 4" }}
                          fullWidth
                        />
                        <ErrorMessage name={`exercises.${index}.name`} component="div" />

                        <FieldArray name={`exercises.${index}.sets`}>
                          {({ push: pushSet, remove: removeSet }) => (
                            <div className="set-container">
                              {exercise.sets.map((set, setIndex) => (
                                <div key={setIndex} className="set-item">
                                  <Box display={'flex'}>
                                    <TextField
                                      label="Reps"
                                      variant="outlined"
                                      type="number"
                                      name={`exercises.${index}.sets.${setIndex}.reps`}
                                      fullWidth
                                    />
                                    <IconButton onClick={() => removeSet({ reps: '' })}>
                                      <RemoveCircleOutlineOutlinedIcon />
                                    </IconButton>
                                  </Box>
                                  <ErrorMessage name={`exercises.${index}.sets.${setIndex}.reps`} component="div" />
                                </div>
                              ))}
                              <IconButton onClick={() => pushSet({ reps: '' })}>
                                <AddCircleOutlineOutlinedIcon />
                              </IconButton>
                            </div>
                          )}
                        </FieldArray>
                        <IconButton onClick={() => remove(index)}>
                          <PlaylistRemoveOutlinedIcon />
                        </IconButton>
                      </Box>
                    ))}
                    
                  </Box>
                  <IconButton onClick={() => push({ name: '', sets: [{ reps: '' }] })}>
                  <PlaylistAddOutlinedIcon />
                  </IconButton>
                  </>
                )}
              </FieldArray>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add New Workout
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = yup.object().shape({
  // exercises: yup.array().of(
  //   yup.object().shape({
  //     name: yup.string().required('Exercise name is required'),
  //     sets: yup.array().of(
  //       yup.object().shape({
  //         reps: yup.number().min(1, 'Must be at least 1 rep').required('Reps are required'),
  //       })
  //     )
  //   })
  // )
});

const initialValues = {
  exercises: [
    {
      name: "",
      sets: [{ reps: "" }],
    },
  ]
};

export default Form;