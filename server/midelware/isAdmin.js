const isAdmin = async (request, response, next) => {
  console.log(request.user)
  if (request.user.role !== 1) {
   return  response
    .status(400)
    .json({
      msg: "you are not allowed to this service,only admin have the right",
    });
  }
next()
};
module.exports = isAdmin;
