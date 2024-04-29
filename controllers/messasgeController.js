const Message=require("../models/message")
const Suggestion=require("../models/suggestion")
const helper = require("../helpers/message.helper");
const SuggestHelper=require("../helpers/suggestion.helper")
const errors = require("../config/errors");

module.exports.getMessage = async (req, res, next) => {
  try {
          //TODO : create schema for this just acceppt id OR freelancer_username OR employer_username

          //TODO you should good schema for get message

    const messageProperty= req.query;
    const messages = await helper.getMessage(messageProperty);
    res.status(200).json({ messages });
  } catch (err) {
    next({ message: "پیدا کردن پیام با مشکل مواجه شد", data: err });
  }
};
module.exports.addMessage= async (req, res, next) => {
    try {
      const {suggestId}=req.params
      const suggest=await SuggestHelper.getSuggest({id:suggestId});
      if(!suggest[0]){
        throw {message:"پیشنهاد مورد نظر پیدا نشد ",statusCode:"404",data:"suggest not found"}
      }
      const {freelancer_username,employer_username}=suggest[0]
      const owner=req.user.username

      if(freelancer_username !=owner && employer_username != owner){
        throw errors.accessDenyError;
      }

      const result = await helper.addMessage({...req.body,owner,suggestId,freelancer_username,employer_username});
  
      console.log(result);
      res
        .status(200)
        .json({ message: "message added successfully", statusCode: 200 });
    } catch (err) {
      console.log(err);
      next({ message:err.message || "اضافه کردن پیام با مشکل مواجه شد", data:err.data|| err });
    }
  };

module.exports.updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await helper.getMessage({id});
    if (!message[0]) {
      throw "message not found";
    }
    if (
      message[0].owner !== req.user.username &&req.user.role != "admin") { 
        //!TODO : توی ارور ها یک ارور مخصوص این درست کردم وقت کردی اون رو بزار برای قانون dry
        throw "access denied";
    }

    const newMessage = req.body;
    const result = await helper.updateMessage(id, newMessage);
    console.log(result);
    res.status(200).json({ message: "پیام شما  با موفقیت اپدیت شد" });
  } catch (err) {
    if (err == "message not found") {
      next({
        statusCode: 404,
        message: "پیامی ای با این ایدی یافت نشد",
        data: "message not found",
      });
    }

    if (err == "access denied") next(errors.accessDenyError);
    next({ message: "اپدیت پیام شما با مشکل مواجه شد", data: err });
  }
};

module.exports.deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const message = await helper.getMessage({id});
    if (!message[0]) {
      throw "message not found";
    }
    if (
      message[0].owner !== req.user.username &&
      req.user.role != "admin"
    ) {
      throw "access denied";
    }
    const result = await helper.deleteMessage(id);

    console.log(result);
    res.status(200).json({ message: "پیام شما  با موفقیت حذف شد" });
  } catch (err) {
    if (err == "message not found") {
      next({
        statusCode: 404,
        message: "پیامی ای با این ایدی یافت نشد",
        data: "message not found",
      });
    }

    if (err == "access denied") next(errors.accessDenyError);
    next({ message: "حذف کردن پیام شما با مشکل مواجه شد", data: err });
  }
};

