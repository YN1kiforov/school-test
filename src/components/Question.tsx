import React from "react";
import { useFormContext } from "react-hook-form";
import { Question as QuestionType } from "../types/QuestionTypes";
import {
    TextField,
    Checkbox,
    FormControlLabel,
    RadioGroup,
    Radio,
    Typography,
    FormHelperText,
    Stack,
} from "@mui/material";

type QuestionProps = {
    question: QuestionType;
};

const Question: React.FC<QuestionProps> = ({ question }) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const getErrorMessage = (id: string) => {
        const error = errors[id];
        if (error) {
            if ("message" in error) {
                return error.message as string;
            }
            return "Ошибка валидации";
        }
        return "";
    };

    switch (question.type) {
        case "single":
            return (
                <>
                    <Typography my={1} variant="h6">
                        {question.question}
                    </Typography>
                    <RadioGroup>
                        {question.options?.map((option, index) => (
                            <FormControlLabel
                                key={`${option}${index}`}
                                value={option}
                                control={
                                    <Radio
                                        sx={{
                                            color: "#b82833",
                                            "&.Mui-checked": {
                                                color: "#b82833",
                                            },
                                        }}
                                    />
                                }
                                label={option}
                                {...register(question.id, {
                                    required: "Выберите один вариант",
                                })}
                            />
                        ))}
                    </RadioGroup>
                    {errors[question.id] && (
                        <FormHelperText error>
                            {getErrorMessage(question.id)}
                        </FormHelperText>
                    )}
                </>
            );
        case "multiple":
            return (
                <>
                    <Typography my={1} variant="h6">
                        {question.question}
                    </Typography>
                    <Stack direction="column">
                        {question.options?.map((option, index) => (
                            <FormControlLabel
                                key={`${option}${index}`}
                                control={
                                    <Checkbox
                                        sx={{
                                            color: "#b82833",
                                            "&.Mui-checked": {
                                                color: "#b82833",
                                            },
                                        }}
                                        {...register(
                                            `${question.id}.${index}`,
                                            {
                                                validate: (_, value) => {
                                                    return value[
                                                        question.id
                                                    ].includes(true);
                                                },
                                            }
                                        )}
                                    />
                                }
                                label={option}
                            />
                        ))}
                    </Stack>
                    {errors[question.id] && (
                        <FormHelperText error>
                            {getErrorMessage(question.id)}
                        </FormHelperText>
                    )}
                </>
            );
        case "short":
            return (
                <>
                    <Typography my={1} variant="h6">
                        {question.question}
                    </Typography>
                    <TextField
                        variant="outlined"
                        {...register(question.id, {
                            required: "Поле обязательно для заполнения",
                        })}
                    />
                    {errors[question.id] && (
                        <FormHelperText error>
                            {getErrorMessage(question.id)}
                        </FormHelperText>
                    )}
                </>
            );
        case "long":
            return (
                <>
                    <Typography my={1} variant="h6">
                        {question.question}
                    </Typography>
                    <TextField
                        variant="outlined"
                        multiline
                        fullWidth
                        rows={4}
                        {...register(question.id, {
                            required: "Поле обязательно для заполнения",
                        })}
                    />
                    {errors[question.id] && (
                        <FormHelperText error>
                            {getErrorMessage(question.id)}
                        </FormHelperText>
                    )}
                </>
            );
    }
};

export default Question;
