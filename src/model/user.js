import { Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({

    username: { type: String , requried: true, unique : true},
    password: { type: String , requried: true},
    admin: { type: Boolean , default : false},

})


UserSchema.methods.encryptPassowrd = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}


UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export const UserModel = model('users', UserSchema)