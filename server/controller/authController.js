import { getUserByEmail } from "../service/userService.js";
import { comaparePasswd } from "../utils/passwordHandler.js";

const authenticateUser = async (email, passwd, cb) => {
  try {
    const user = await getUserByEmail(email, 'data');

    if (user === 'err')  return cb(true, false, { message: 'Server error'})    
    if (!user) return cb(null, false, { message: 'Email or password is incorrect' })

    const hashPasswd = user.password;
    const isCorrectPasswd = await comaparePasswd(passwd, hashPasswd)
    
    if (isCorrectPasswd === 'err') return cb(null, false, { message: 'Server error'})
    if (!isCorrectPasswd) return cb(null, false, { message: 'Email or password is incorrect' })
    return cb(null, user)

  } catch (err) {
    console.log('authenticateUser: ' + err);
    cb(true, false, { message: 'Server error' })
  }
}

export default authenticateUser;
