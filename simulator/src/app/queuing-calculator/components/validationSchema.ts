import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    server: Yup.number()
        .required("Server is required")
        .positive("Server must be a positive number"),
    distributionType: Yup.number()
        .required("Distribution Type is required"),
    lambda: Yup.number()
        .required("λ is required")
        .positive("λ must be a positive number"),
    mue: Yup.number()
        .nullable()
        .when("distributionType", ([distributionType], schema) =>
            distributionType === 0
                ? schema.required("μ is required").positive("μ must be a positive number")
                : schema
        ),
    a: Yup.number()
        .nullable()
        .when("distributionType", ([distributionType], schema) =>
            distributionType === 1
                ? schema.required("Lower Bound (a) is required").positive("Lower Bound (a) must be a positive number")
                : schema
        ),
    b: Yup.number()
        .nullable()
        .when("distributionType", ([distributionType], schema) =>
            distributionType === 1
                ? schema
                      .required("Upper Bound (b) is required")
                      .positive("Upper Bound (b) must be a positive number")
                      .moreThan(Yup.ref("a"), "Upper Bound (b) must be greater than Lower Bound (a)")
                : schema
        ),
    av: Yup.number()
        .nullable()
        .when("distributionType", ([distributionType], schema) =>
            distributionType === 2
                ? schema.required("Arrival Variance (σ²) is required").positive("Arrival Variance (σ²) must be a positive number")
                : schema
        ),
    sv: Yup.number()
        .nullable()
        .when("distributionType", ([distributionType], schema) =>
            distributionType === 2
                ? schema.required("Service Variance (σ2) is required").positive("Service Variance (σ2) must be a positive number")
                : schema
        ),
});

export default validationSchema;
