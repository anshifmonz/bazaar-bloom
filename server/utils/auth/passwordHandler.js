import bcrypt from 'bcrypt'
const saltRound = 10

const hashPassword = async (passwd) => {
  try {
    return await bcrypt.hash(passwd, saltRound);
  } catch (err) {
    console.log('hashPassword: ' + err);
    return 'err';
  }
}

const comaparePasswd = async (passwd, hashPasswd) => {
  try {
    return await bcrypt.compare(passwd, hashPasswd);
  } catch (err) {
    console.log('comaparePasswd: ' + err);
    return 'err';
  }
}

export { hashPassword, comaparePasswd };
