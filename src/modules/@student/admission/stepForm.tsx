import { Box, Divider, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { StepOneForm } from "./step/step1";
import { useNav } from "@hooks/useNavlHook";
import { STUDENT_ADMISSION_LIST } from "../constant/local.urls";
import { useParams } from "react-router-dom";
import { StepTwoForm } from "./step/step2";
import { StepThreeForm } from "./step/step3";
import { StepFourForm } from "./step/step4";
import { StepFiveForm } from "./step/step5";
import { StepSixForm } from "./step/step6";
import { useTranslate } from "@hooks/useTranslate";
import { LANG_STUDENT } from "@common/constant";

interface IStepData {
  label: string,
  step: number,
  icon: any
}
const steps: IStepData[] = [{
  label: "titles.studentInfo",
  step: 1
},
{
  label: "titles.parentInfo",
  step: 2
},
{
  label: "titles.siblings",
  step: 3
},
{
  label: "titles.academicInfo",
  step: 4
},
{
  label: "titles.docInfo",
  step: 5
},
{
  label: "titles.otherInfo",
  step: 6
}
] as IStepData[];

export const AdmissionForm = () => {
  const t = useTranslate(LANG_STUDENT, "info")
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const { close } = useNav(STUDENT_ADMISSION_LIST);
  const { id } = useParams()
  const [admissionId, setAdmission] = useState<string | undefined>()
  useEffect(() => {
    if (id) {
      setAdmission(id)
    }
  }, [id])
  const isStepOptional = (step: number) => {
    return step > 0;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  return (
    <Box width={"100%"} padding={2}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">{t("@labels.optional")}</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label.step} {...stepProps}>
              <StepLabel {...labelProps}>{t(label.label)}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Divider sx={{ my: 2 }} />
      {activeStep == 0 && (
        <StepOneForm setAdmission={setAdmission} admissionId={admissionId} onClose={close} onNext={handleNext} />
      )}
      {activeStep == 1 && (
        <StepTwoForm admissionId={admissionId} onSkip={handleSkip} onBack={handleBack} onClose={close} onNext={handleNext} />
      )}
      {activeStep == 2 && (
        <StepThreeForm admissionId={admissionId} onSkip={handleSkip} onBack={handleBack} onClose={close} onNext={handleNext} />
      )}
      {activeStep == 3 && (
        <StepFourForm admissionId={admissionId} onSkip={handleSkip} onBack={handleBack} onClose={close} onNext={handleNext} />
      )}
      {activeStep == 4 && (
        <StepFiveForm admissionId={admissionId} onSkip={handleSkip} onBack={handleBack} onClose={close} onNext={handleNext} />
      )}
      {activeStep == 5 && (
        <StepSixForm admissionId={admissionId} onSkip={handleSkip} onBack={handleBack} onClose={close} onNext={handleNext} />
      )}
    </Box>
  );
};
