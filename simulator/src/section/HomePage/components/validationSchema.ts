import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    server: Yup.number()
        .required("Server is required")
        .positive("Server must be a positive number")
        .max(100, "Server must not exceed 100"),
    numberOfCustomers: Yup.number()
        .required("Number of Customers is required")
        .positive("Number of Customers must be a positive number")
        .max(5000, "Number of Customers must not exceed 10,000"),
    // minPriority: Yup.number()
    //     .required("Minimum Priority is required")
    //     .positive("Minimum Priority must be a positive number")
    //     .max(100, "Minimum Priority must not exceed 100"),
    distributionType: Yup.number()
        .required("Distribution Type is required"),
    distribution: Yup.number()
        .nullable()
        .when("distributionType", ([distributionType], schema) =>
            distributionType === 1 ? schema.required("Distribution is required") : schema
        ),
    lambda: Yup.number()
        .required("λ is required")
        .positive("λ must be a positive number"),
    mue: Yup.number()
        .nullable()
        .when(["distribution", "distributionType"], ([distribution, distributionType], schema) =>
            distribution === 1 || distributionType === 0
                ? schema.required("μ is required").positive("μ must be a positive number")
                : schema
        ),
    a: Yup.number()
        .nullable()
        .when(["distribution", "distributionType"], ([distribution, distributionType], schema) =>
            distributionType === 1 && distribution === 0
                ? schema.required("Lower Bound (a) is required").positive("Lower Bound (a) must be a positive number")
                : schema
        ),
    b: Yup.number()
        .nullable()
        .when(["distribution", "distributionType"], ([distribution, distributionType], schema) =>
            distributionType === 1 && distribution === 0
                ? schema
                    .required("Upper Bound (b) is required")
                    .positive("Upper Bound (b) must be a positive number")
                    .moreThan(Yup.ref("a"), "Upper Bound (b) must be greater than Lower Bound (a)")
                : schema
        ),
    sd: Yup.number()
        .nullable()
        .when(["distribution", "distributionType"], ([distribution, distributionType], schema) =>
            distributionType === 1 && distribution === 1
                ? schema.required("Standard Deviation (σ) is required").positive("Standard Deviation (σ) must be a positive number")
                : schema
        ),
});

export default validationSchema;
