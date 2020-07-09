// const userRepository = require("../repositories/user/user.repository");/
const authenticate = require("../authenticate/authenticate");
const context = ({ request, response }) => {
  return {
    getUserId: () => {
      const authorization = request.headers.authorization;
      if (authorization) {
        // TODO: jwt
        const token = authorization.split(" ")[1];
        if(token && token!== "")
        {
            user = authenticate.verifyToken(token)
        }
        else{
            throw new Error("token not found!");
        }
      } else {
        throw new Error("No authorization header found!!");
      }
      return {
        userId: user._id,
      };
    },
    getToken: (id)=>{
        return authenticate.getToken({_id: id})
    }
  };
};

module.exports = { context };
