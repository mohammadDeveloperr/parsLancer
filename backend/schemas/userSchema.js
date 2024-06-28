const registerSchema = {
  type: "object",
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    username: { type: "string" },
    password:{type:"string",minLength:4},
    number: { type: "string" },
    email: { type: "string", format: "email" },
  },
  required: ["first_name", "username","password", "number", "email"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      first_name: "لطفا نام خود را وارد کنید",
      username: "لطفا نام کاربری خود را وارد کنید",
      password:"لطفا رمز ورود خود را وارد کنید",
      number: "لطفا شماره تلفن هماره خود را وارد کنید",
      email: "لطفا ایمیل خود را وارد کنید",
    },
    properties: {
      password: "پسورد شما باید از ۴ کاراکتر بیشتر باشد",
      email: "فرمت ایمیل نادرست است",
    },
  },
};

const loginSchema={
  type: "object",
  properties: {
    username: { type: "string" },
    password:{type:"string",minLength:4}
  },
  required: ["username","password"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      username: "لطفا نام کاربری خود را وارد کنید",
      password:"لطفا رمز ورود خود را وارد کنید"
    },
    properties: {
      password: "پسورد شما باید از ۴ کاراکتر بیشتر باشد",
    },
  },
}

const updateUser={
  type: "object",
  properties: {
    first_name: { type: "string",minLength:2  },
    last_name:{type:"string"},
    about_me:{type:"string"},
    username: { type: "string" },
    number: { type: "string" },
    email: { type: "string", format: "email" },
  },
  required: ["first_name"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      first_name: "لطفا نام  خود را وارد کنید",
    }
  },
}

const updatePassword={
  type: "object",
  properties: {
    oldPassword: { type: "string",minLength:4 },
    newPassword:{type:"string",minLength:4}
  },
  required: ["oldPassword","newPassword"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      oldPassword: "لطفا رمز عبور فعلی را وارد کنید",
      newPassword:"لطفا رمز عبور جدید خود را وارد کنید"
    },
    properties: {
      oldPassword: "پسورد شما باید از ۴ کاراکتر بیشتر باشد",
      newPassword: "پسورد شما باید از ۴ کاراکتر بیشتر باشد",
    },
  },
}

module.exports = {registerSchema,loginSchema,updateUser,updatePassword};
