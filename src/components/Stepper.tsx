import React from "react";

import {
    Stack,
    Box,
} from "@mui/material";

type StepperProps = {
    steps: number;
    activeSteps: number;
};

const Stepper: React.FC<StepperProps> = ({ steps, activeSteps }) => {
    return (
        <Stack direction="row" spacing={1}>
            {new Array(steps).fill(2).map((_, i) => {
                let color: string = "black";

                if (activeSteps > i) color = "black";
                if (activeSteps == i) color = "#b82833";
                if (activeSteps < i) color = "gray";

                return <Box key={i} bgcolor={color} height={8} width={"100%"}></Box>;
            })}
        </Stack>
    );
};

export default Stepper;
