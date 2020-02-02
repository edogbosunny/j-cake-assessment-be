import mongoose from 'mongoose';

const ProfileSchema = mongoose.Schema({
  profile_image: {
    type: String,
    default: 'http://www.gravatar.com/avatar/?d=mm'
  },
});

const Profile = mongoose.model('Profile', ProfileSchema);
export default Profile;
