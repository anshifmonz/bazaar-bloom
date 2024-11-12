import { getUserByEmail } from "../../service/auth/userService.js";
import { comaparePasswd } from "../../utils/auth/passwordHandler.js";

const authenticateUser = async (email, passwd, cb) => {
  try {
    const user = await getUserByEmail(email, 'data');
    if (!user) return cb(null, false, { message: 'Email or password is incorrect' })

    const hashPasswd = user.password;
    const isCorrectPasswd = await comaparePasswd(passwd, hashPasswd)
    if (!isCorrectPasswd) return cb(null, false, { message: 'Email or password is incorrect' })
    
    return cb(null, user)
  } catch (err) {
    cb(true, false, { message: 'Server error' })
  }
}

export default authenticateUser;
