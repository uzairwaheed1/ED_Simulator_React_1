import { CustomSelect, TextFieldInput } from "@/common/components";
import { Box, Button } from "@mui/material";
import { Formik, Form } from "formik";
import validationSchema from "./validationSchema";
import { useStateContext } from "../../../context/StateContext";
import { handleSimulationSubmit } from "../utils/handleSimulationSubmit";
import "../../../styles/globals.css"; // Import your global styles here

const initialValues = {
  server: undefined,
  numberOfCustomers: undefined,
  distribution: undefined,
  distributionType: undefined,
  // minPriority: undefined,
  lambda: undefined,
  mue: undefined,
  a: undefined,
  b: undefined,
  sd: undefined,
};

const DistributionForm = () => {
  const {
    setShowTable,
    setTableData,
    setShowGantChart,
    setGantChartData,
    setServerUtilization,
    setAverages,
    setResponseTimes,
    setWaitingTimes,
    setServiceTimes,
    setTurnaroundTimes,
  } = useStateContext();

  return (
    <div className= "form-main-container">
    <div className="flex flex-col items-center justify-center max-h-fit form-container">
      <h3 className="md:text-3xl text-xl mb-6">Input Parameters</h3>{" "}
      {/* Suitable heading */}
      <Formik
        onSubmit={(values) =>
          handleSimulationSubmit(values, {
            setShowTable,
            setTableData,
            setShowGantChart,
            setGantChartData,
            setServerUtilization,
          })
        }
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
          ];
          const distributionTypeOptions = [
            {
              label: "Uniform",
              value: 0,
            },
            {
              label: "Normal",
              value: 1,
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
                  <TextFieldInput
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
                  />
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
                  {values.distributionType === 1 && (
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
                  )}
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
                  {(values.distribution === 1 ||
                    values.distributionType === 0) && (
                    <TextFieldInput
                      placeholder={"Enter Average Service Time"}
                      label={"μ"}
                      error={touched["mue"] && Boolean(errors["mue"])}
                      helperText={touched["mue"] && errors["mue"]}
                      {...getFieldProps("mue")}
                    />
                  )}
                  {values.distributionType === 1 &&
                    values.distribution === 0 && (
                      <TextFieldInput
                        placeholder={"Enter the value of Lower Bound"}
                        label={"a"}
                        error={touched["a"] && Boolean(errors["a"])}
                        helperText={touched["a"] && errors["a"]}
                        {...getFieldProps("a")}
                      />
                    )}
                  {values.distributionType === 1 &&
                    values.distribution === 0 && (
                      <TextFieldInput
                        placeholder={"Enter the value of Upper Bound"}
                        label={"b"}
                        error={touched["b"] && Boolean(errors["b"])}
                        helperText={touched["b"] && errors["b"]}
                        {...getFieldProps("b")}
                      />
                    )}
                  {values.distributionType === 1 &&
                    values.distribution === 1 && (
                      <TextFieldInput
                        placeholder={"Enter Standard Deviation"}
                        label={"σ"}
                        error={touched["sd"] && Boolean(errors["sd"])}
                        helperText={touched["sd"] && errors["sd"]}
                        {...getFieldProps("sd")}
                      />
                    )}
                </div>
                <div className="grid grid-cols-3 justify-center simulate-button">
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
    

    </div>
  );
};

export default DistributionForm;
