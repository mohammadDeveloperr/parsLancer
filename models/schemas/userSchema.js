const schema = {
    type: "object",
    properties: {
      first_name: {type: "string"},
      last_name: {type: "string"},
      username: {type: "string"},
      number: {type: "string"},
      email: {type: "string"},
    },
    required: ["first_name","username","number","email"],
    additionalProperties: false,
    errorMessage: {
        type: "داده های ورودی باید رشته باشند", // will not replace internal "type" error for the property "foo"
        required: {
          first_name: 'لطفا نام خود را وارد کنید',
          username: 'لطفا نام کاربری خود را وارد کنید',
          number: 'لطفا شماره تلفن هماره خود را وارد کنید',
          email: "لطفا ایمیل خود را وارد کنید",
        },
    }
  }

  module.exports=schema;