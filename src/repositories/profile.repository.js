import User from '../models/users-model';

class ProfileRepository {
  static async addProfile(payload) {

    try {
      const userResponse = await new User(payload);
      return userResponse.save();
    } catch (error) {
      return error;
    }
  }

  static async update(where, payload) {
    try {
      return User.findByIdAndUpdate(
        where,
        { $set: payload },
        { useFindAndModify: false }
      );
    } catch (error) {
      console.log('error occured updating user profile', error);
    };
  }

  static async fetchOneProfile(where) {
    try {
      const a = await User
        .find(where)
        .populate('profile_table')
      return a;
    } catch (error) {
      console.log('error occured getting group posts', error.message);
      return error
    }
  };
}
export default ProfileRepository;

/**
 * find a profile
 * update the profile
 */