module.exports.addSkillSchema = {
    type: "object",
    properties: {
        name: { type: "string" }
    },
    required: ["name"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
        required: {
            name: "لطفا نام مهارت را وارد کنید "
        },
    },
};
