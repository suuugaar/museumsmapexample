import {
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepSeparator,
  StepStatus,
  Text,
  useSteps,
  Stepper,
} from '@chakra-ui/react';
import { useEffect } from 'react';

const steps = [
  {
    title: 'First',
    description: 'Зарегистрируйтесть или войдите в учетную запись',
  },
  { title: 'Second', description: 'Приобретите карту' },
  { title: 'Third', description: 'Вы прекрасны!' },
];

function StepperCard({ step }: { step:number }) {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  useEffect(() => {
    setActiveStep(step);
  }, [step]);

  const activeStepText = steps[activeStep].description;
  return (
    <>
      <Stack>
        <Stepper size="sm" index={activeStep} gap="0" colorScheme="red">
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus complete={<StepIcon />} />
              </StepIndicator>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Text>
          Step {activeStep + 1}: <b>{activeStepText}</b>
        </Text>
      </Stack>
    </>
  );
}

export default StepperCard;
