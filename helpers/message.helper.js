const Message = require("../models/message");


module.exports.getMessage = async (params = null) => {
    try {
      const condition = params ? { where: { ...params } } : {};
      const result = await Message.findAll({ condition});
      return result;
    } catch (err) {
      throw err;
    }
  };


module.exports.addMessage=async (message)=>{
    try {
        return await Message.create(message)
        
    } catch (err) {
        throw err;
    }
}


module.exports.updateMessage = async (id, message) => {
    try {
        //TODO: حواست باشه اطلاعاتی که برای اپدیت میاد توی اسکیما چک بشه هرچیزی نتونه اپدیت کنه
        //TODO: ایدی ثبت کننده پروژه باید با ایدی درخواست کننده اپدیت یکی باشه 
      const result = await Message.update(
        { ...message },
        {
          where: {
            id,
          },
        }
      );
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };



module.exports.deleteMessage=async (id)=>{
    try {
           //TODO: ایدی ثبت کننده پروژه باید با ایدی درخواست کننده پاک کردن یکی باشه 
        const result = await Message.destroy({
            where: {
              id,
            },
          });
          console.log(result);
          return result;
    } catch (err) {
        throw err;
    }
}

module.exports.messageIsFound = async (id) => {
  try {
    const message = await Message.findOne({ id });
    if (!message) {
      throw "message not found";
    }
    return message.dataValues;
  } catch (err) {
    throw err;
  }
};