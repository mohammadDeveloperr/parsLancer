const updateUser = {
  type: "object",
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    username: { type: "string" },
    password: { type: "string", minLength: 4 },
    number: { type: "string" },
    email: { type: "string", format: "email" },
    role: { type: "string", enum: ["admin", "user"] },
    about_me:{type:'string'}
  },
  required: ["first_name", "username", "password", "number", "email"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      first_name: "لطفا نام خود را وارد کنید",
      username: "لطفا نام کاربری خود را وارد کنید",
      password: "لطفا رمز ورود خود را وارد کنید",
      number: "لطفا شماره تلفن هماره خود را وارد کنید",
      email: "لطفا ایمیل خود را وارد کنید",
      role: "لطفا وضعیت کاربر را وارد کنید",
    },
    properties: {
      password: "پسورد شما باید از ۴ کاراکتر بیشتر باشد",
      email: "فرمت ایمیل نادرست است",
    },
    enum: "وضعیت هر کاربر میتونه یا admin باشه یا user"
  },
};

const loginSchema = {
  type: "object",
  properties: {
    username: { type: "string" },
    password: { type: "string", minLength: 4 },
  },
  required: ["username", "password"],
  additionalProperties: false,
  errorMessage: {
    type: "should be an object",
    required: {
      username: "لطفا نام کاربری خود را وارد کنید",
      password: "لطفا رمز ورود خود را وارد کنید",
    },
    properties: {
      password: "پسورد شما باید از ۴ کاراکتر بیشتر باشد",
    },
  },
};

module.exports = { updateUser };
