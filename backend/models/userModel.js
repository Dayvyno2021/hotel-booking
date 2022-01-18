import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {type:String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, required: true, default: false},
  stripe_account_id: '',
  stripe_seller: {},
  stripeSession: {}
}, {
  timestamps: true
}
)

userSchema.pre('save', async function(next) {
 if (!this.isModified('password')){
   next()
  }
  this.password = await bcrypt.hashSync(this.password, 9);
});

userSchema.methods.checkpassword =  async function(enteredpassword) {
  return await bcrypt.compareSync(enteredpassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User