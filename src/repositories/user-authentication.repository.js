import User from '../models/users-model';
import Profile from '../models/profile-model.js';

class UserAuthenticationRepository {
  static async signUp(payload) {

    try {
      const userResponse = await new User(payload);
      const userProfile = await new Profile();
      userProfile.save();
      userResponse.profile_table = userProfile;
      // console.log('----user-resp-->', userResponse);
      return userResponse.save();
    } catch (error) {
      // console.log('error occurred while creating repository', error.message);
      return error;
    }
  }
  static async get(where) {
    try {
      const a = await User
        .find(where)
      return a;
    } catch (error) {
      console.log('error occured getting group posts', error.message);
      return error
    }
  };

  static async login(where) {
    try {
      const userDetails = await User
        .find(where)
      return userDetails;
    } catch (error) {
      console.log('error occured getting group posts', error.message);
      return error
    }
  }
}
export default UserAuthenticationRepository