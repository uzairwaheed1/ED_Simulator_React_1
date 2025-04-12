import { CustomSelect, TextFieldInput } from "@/common/components";
import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import validationSchema from "./validationSchema";
import { useStateContext } from "../../../context/StateContext";
import { useSubmit } from "./utils/useSubmit";

const initialValues = {
  server: undefined,
  distributionType: undefined,
  lambda: undefined,
  mue: undefined,
  a: undefined,
  b: undefined,
  av: undefined,
  sv: undefined,
};

const QueuingModelForm = () => {
  const {
    setQueueUtilization,
    setAverageQueueLengthQueue,
    setAverageWaitingTimeQueue,
    setAverageQueueLengthSystem,
    setAverageWaitingTimeSystem,
    setShowQueuingResults,
  } = useStateContext();

  return (
    <div className="flex flex-col items-center justify-center max-h-fit mt-4 h-[40%]">
      <h3 className="md:text-3xl text-xl mb-6">Input Parameters</h3>{" "}
      {/* Suitable heading */}
      <Formik
        onSubmit={(values) => {
          useSubmit(values, {
            setQueueUtilization,
            setAverageQueueLengthQueue,
            setAverageWaitingTimeQueue,
            setAverageQueueLengthSystem,
            setAverageWaitingTimeSystem,
            setShowQueuingResults,
          });
        }}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ getFieldProps, touched, values, errors }) => {
          const distributionOptions = [
            {
              label: `M/M/${values.server ?? "N"}`,
              value: 0,
            },
            {
              label: `M/G/${values.server ?? "N"}`,
              value: 1,
            },
            {
              label: `G/G/${values.server ?? "N"}`,
              value: 2,
            },
          ];

          return (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", rowGap: 3 }}>
                <div className="grid grid-cols-3 gap-4">
                  {" "}
                  {/* Added gap for spacing */}
                  <TextFieldInput
                    placeholder={"Enter Servers"}
                    label={"Server"}
                    error={touched["server"] && Boolean(errors["server"])}
                    helperText={touched["server"] && errors["server"]}
                    {...getFieldProps("server")}
                  />
                  {/* <TextFieldInput
                    placeholder={"Enter No. of Customers"}
                    label={"NO. of Customers"}
                    error={
                      touched["numberOfCustomers"] &&
                      Boolean(errors["numberOfCustomers"])
                    }
                    helperText={
                      touched["numberOfCustomers"] &&
                      errors["numberOfCustomers"]
                    }
                    {...getFieldProps("numberOfCustomers")}
                  /> */}
                  {/* <TextFieldInput
                    placeholder={"Enter Minimum Priority"}
                    label={"Min Priority"}
                    error={
                      touched["minPriority"] && Boolean(errors["minPriority"])
                    }
                    helperText={touched["minPriority"] && errors["minPriority"]}
                    {...getFieldProps("minPriority")}
                  /> */}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {" "}
                  {/* Added gap for spacing */}
                  <CustomSelect
                    label={"Enter Distribution Type"}
                    error={
                      touched["distributionType"] &&
                      Boolean(errors["distributionType"])
                    }
                    helperText={
                      touched["distributionType"] && errors["distributionType"]
                    }
                    {...getFieldProps("distributionType")}
                    options={distributionOptions}
                  />
                  {/* {values.distributionType === 1 && (
                    <CustomSelect
                      label={"Enter Distribution"}
                      error={
                        touched["distribution"] &&
                        Boolean(errors["distribution"])
                      }
                      helperText={
                        touched["distribution"] && errors["distribution"]
                      }
                      {...getFieldProps("distribution")}
                      options={distributionTypeOptions}
                    />
                  )} */}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {" "}
                  {/* Added gap for spacing */}
                  <TextFieldInput
                    placeholder={"Enter Average Inter Arrival Time"}
                    label={"λ"}
                    error={touched["lambda"] && Boolean(errors["lambda"])}
                    helperText={touched["lambda"] && errors["lambda"]}
                    {...getFieldProps("lambda")}
                  />
                  {(values.distributionType === 2 ||
                    values.distributionType === 0) && (
                    <TextFieldInput
                      placeholder={"Enter Average Service Time"}
                      label={"μ"}
                      error={touched["mue"] && Boolean(errors["mue"])}
                      helperText={touched["mue"] && errors["mue"]}
                      {...getFieldProps("mue")}
                    />
                  )}
                  {values.distributionType === 1 && (
                    <TextFieldInput
                      placeholder={"Enter the value of Lower Bound"}
                      label={"a"}
                      error={touched["a"] && Boolean(errors["a"])}
                      helperText={touched["a"] && errors["a"]}
                      {...getFieldProps("a")}
                    />
                  )}
                  {values.distributionType === 1 && (
                    <TextFieldInput
                      placeholder={"Enter the value of Upper Bound"}
                      label={"b"}
                      error={touched["b"] && Boolean(errors["b"])}
                      helperText={touched["b"] && errors["b"]}
                      {...getFieldProps("b")}
                    />
                  )}
                  {values.distributionType === 2 && (
                    <TextFieldInput
                      placeholder={"Enter Arrival Variance"}
                      label={"σ2 arrival"}
                      error={touched["av"] && Boolean(errors["av"])}
                      helperText={touched["av"] && errors["av"]}
                      {...getFieldProps("av")}
                    />
                  )}
                  {values.distributionType === 2 && (
                    <TextFieldInput
                      placeholder={"Enter Service Variance"}
                      label={"σ2 service"}
                      error={touched["sv"] && Boolean(errors["sv"])}
                      helperText={touched["sv"] && errors["sv"]}
                      {...getFieldProps("sv")}
                    />
                  )}
                </div>
                <div className="grid grid-cols-3 justify-center">
                  {" "}
                  {/* Centered button */}
                  <div></div>
                  <Button
                    sx={{
                      maxWidth: 300,
                    }}
                    type="submit"
                    variant="contained"
                  >
                    Simulate
                  </Button>
                  <div></div>
                </div>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default QueuingModelForm;
