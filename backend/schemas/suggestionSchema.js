module.exports.addSuggestSchema = {
    type: "object",
    properties: {
      price: { type: "integer" },
      time: { type: "integer" },
      explain: { type: "string" }      
    },
    required: ["price", "time", "explain"],
    additionalProperties: false,
    errorMessage: {
      type: "should be an object",
      required: {
        price: "لطفا قیمت پیشنهاد خود را وارد کنید",
          explain: "لطفا زمان مورد نیاز پروژه را وارد کنید",
          time: "لطفا قیمت پیشنهادی خود را وارد کنید",
      },
    },
  };
  

  module.exports.getSuggestSchema = {
    type: "object",
    properties: {
      projectId: { type: "string" },
      employer_username: { type: "string" },
      freelancer_username: { type: "string" }      
    },
    required: [],
    additionalProperties: false,
    errorMessage: {
      additionalProperties:"جستجو بر اساس این کلمات امکان پذیر است projectId, employer_username,freelancer_username ",
    },
  };
  