import React from 'react';
import { Field, FieldArray, ErrorMessage, useFormikContext } from 'formik';
import { Box, Button, TextField } from '@mui/material';

export default function WorkoutFormContent() {
    const { values, handleSubmit } = useFormikContext();

    return (
        <form>
            <Box display='grid' gap='30px' gridTemplateColumns='repeat(4, minmax(0, 1fr))'>
                <FieldArray name="exercises">
                    {({ push, remove }) => (
                        <>
                            {values.exercises.map((exercise, index) => (
                                <div key={index}>
                                    <TextField
                                        fullWidth
                                        label="Exercise Name"
                                        variant="outlined"
                                        type="text"
                                        name={`exercises.${index}.name`}
                                        sx={{ gridColumn: "span 2" }}
                                    />
                                    <ErrorMessage name={`exercises.${index}.name`} component="div" />

                                    <FieldArray name={`exercises.${index}.sets`}>
                                        {({ push: pushSet, remove: removeSet }) => (
                                            <>
                                                {exercise.sets.map((set, setIndex) => (
                                                    <div key={setIndex}>
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
                                            </>
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
            </Box>
            <Button variant="outlined" color='secondary' onClick={handleSubmit}>Submit</Button>
        </form>
    );
}
