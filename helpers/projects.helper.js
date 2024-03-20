const Project = require("../models/projects");


module.exports.getProject = async (id = null) => {
    try {
      const condition = id ? { where: { id } } : {};
      const result = await Project.findAll({ ...condition});
      return result;
    } catch (err) {
      throw err;
    }
  };


module.exports.addProject=async (project)=>{
    try {
        return await Project.create(project)
        
    } catch (err) {
        throw err;
    }
}


module.exports.updateProject = async (id, project) => {
    try {
        //TODO: حواست باشه اطلاعاتی که برای اپدیت میاد توی اسکیما چک بشه هرچیزی نتونه اپدیت کنه
        //TODO: ایدی ثبت کننده پروژه باید با ایدی درخواست کننده اپدیت یکی باشه 
      const result = await Project.update(
        { ...project },
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



module.exports.deleteProject=async (id)=>{
    try {
           //TODO: ایدی ثبت کننده پروژه باید با ایدی درخواست کننده پاک کردن یکی باشه 
        const result = await Project.destroy({
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