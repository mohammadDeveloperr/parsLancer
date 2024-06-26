 module.exports.addProjectSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    explain: { type: "string" },
    minPrice: { type: "integer" },
    maxPrice: { type: "integer"},
  },
  required: ["title", "explain", "minPrice", "maxPrice"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
        title: "لطفا تیتر پروژه  را وارد کنید",
        explain: "لطفا توضیح پروژه خود را وارد کنید",
        minPrice: "لطفا حداقل قیمت پروژه خود را وارد کنید",
        maxPrice: "لطفا حداکثر قیمت پروژه خود را وارد کنید"
    },
  },
};
