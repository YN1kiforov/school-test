import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Container, Box, Button, Typography, Stack } from "@mui/material";
import Question from "../components/Question";
import FinalScreen from "../components/FinalScreen";
import { timeConverter } from "../utils/timeConverter";
import Stepper from "../components/Stepper";

type questionType = {
    id: string;
    type: "single" | "multiple" | "short" | "long";
    question: string;
    options?: string[];
};

type testType = {
    name: string;
    duration: number;
    questions: questionType[];
};

const mockTest: testType = {
    name: "Тестирование",
    duration: 300,
    questions: [
        { id: "question1", type: "short", question: "Как Вас зовут?" },
        { id: "question2", type: "long", question: "Расскажите о себе" },
        {
            id: "question3",
            type: "multiple",
            question: "Выберите любимые фрукты:",
            options: ["Яблоко", "Банан", "Апельсин"],
        },
        {
            id: "question4",
            type: "multiple",
            question: "Выберите овощи:",
            options: ["Помидор", "Клубника", "Грейпфрут"],
        },
        {
            id: "question5",
            type: "single",
            question: "Какая сейчас пора года?",
            options: ["Зима", "Весна", "Лето", "Осень"],
        },
        {
            id: "question6",
            type: "multiple",
            question: "Какие виды спорта вам нравятся?",
            options: ["Футбол", "Баскетбол", "Шахматы"],
        },
        {
            id: "question7",
            type: "single",
            question: "Какая сейчас пора года?",
            options: ["Зима", "Весна", "Лето", "Осень"],
        },
        {
            id: "question8",
            type: "single",
            question: "Какого цвета солнце?",
            options: ["Желтое", "Синее", "Зеленое"],
        },
        {
            id: "question9",
            type: "multiple",
            question: "Выберите животных:",
            options: ["Собака", "Кошка", "Банан"],
        },
    ],
};

const App: React.FC = () => {
    const methods = useForm({
        defaultValues: JSON.parse(localStorage.getItem("formData") || "{}"),
    });
    const [currentStep, setCurrentStep] = useState<number>(
        parseInt(localStorage.getItem("currentStep") || "0", 10)
    );
    const [timeLeft, setTimeLeft] = useState<number>(
        parseInt(
            localStorage.getItem("timeLeft") || mockTest.duration.toString(),
            10
        )
    );
    const [isCompleted, setIsCompleted] = useState<boolean>(false);

    const saveProgress = (data: any, newStep: number) => {
        localStorage.setItem("formData", JSON.stringify(data));
        localStorage.setItem("currentStep", String(newStep));
        localStorage.setItem("timeLeft", timeLeft.toString());
    };

    const onSubmit = () => {
        const data = methods.getValues();
        if (currentStep >= mockTest.questions.length - 1 || timeLeft <= 0) {
            setIsCompleted(true);

            console.log("Sending results:", data);

            localStorage.removeItem("currentStep");
            localStorage.removeItem("formData");
        } else {
            const newStep = currentStep + 1;
            setCurrentStep(newStep);
            saveProgress(data, newStep);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                const newTimeLeft = prevTimeLeft - 1;
                localStorage.setItem("timeLeft", newTimeLeft.toString());
                return newTimeLeft;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
            localStorage.removeItem("timeLeft");
        };
    }, []);

    useEffect(() => {
        if (timeLeft <= 0) {
            onSubmit();
        }
    }, [timeLeft]);

    return (
        <Container>
            <Box mt={4}>
                {!isCompleted ? (
                    <>
                        <Stack
                            mb={1}
                            display="flex"
                            alignItems="center"
                            spacing={2}
                            direction="row"
                        >
                            <Typography variant="h5">
                                {mockTest.name}
                            </Typography>
                            <Box borderRadius={1} p={1} px={2} border={1}>
                                {timeConverter(timeLeft)}
                            </Box>
                        </Stack>
                        <FormProvider {...methods}>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                                <Stepper
                                    activeSteps={currentStep}
                                    steps={mockTest.questions.length}
                                ></Stepper>

                                <Question
                                    question={mockTest.questions[currentStep]}
                                />
                                <Box mt={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            backgroundColor: "#b82833",
                                            "&:hover": {
                                                backgroundColor: "#66141b",
                                            },
                                        }}
                                    >
                                        {currentStep <
                                        mockTest.questions.length - 1
                                            ? "Далее"
                                            : "Завершить"}
                                    </Button>
                                </Box>
                            </form>
                        </FormProvider>
                    </>
                ) : (
                    <FinalScreen />
                )}
            </Box>
        </Container>
    );
};

export default App;
