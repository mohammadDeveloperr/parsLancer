module.exports.addMessageSchema = {
    type: "object",
    properties: {
      message: { type: "string" }      
    },
    required: ["message"],
    additionalProperties: false,
    errorMessage: {
      type: "should be an object",
      required: {
        message: "لطفا پیام خود را وارد کنید "
      
      },
    },
  };
  

  module.exports.getMessageSchema = {
    //TODO you should good schema for get message
    type: "object",
    properties: {  
    },
    required: [],
    additionalProperties: true,
    errorMessage: {
    },
  };
  