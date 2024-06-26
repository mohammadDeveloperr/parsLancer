module.exports.addProjectSkillSchema = {
    type: "object",
    properties: {
        skills: { type: "array" }
    },
    required: ["skills"],
    additionalProperties: false,
    errorMessage: {
        type: "should be an object",
        required: {
            skills: "لطفا نام مهارت را وارد کنید "
        },
    },
};
