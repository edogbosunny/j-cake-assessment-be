import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: String,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: false,
  },
  profile_table: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile'
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
