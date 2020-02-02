
import tokenMiddleware from '../utils/lib/get-token';
import ProfileRepository from '../repositories/profile.repository';

const viewProfile = async (req, res) => {
  try {
    const decodedToken = tokenMiddleware.decodeToken(req.headers.token, process.env.TOKEN_SECRET)
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) && decodedToken.userId !== req.params.id) {
      return res.status(404).send({
        message: 'Invalid user Id'
      })
    }
    const profileResponse = await ProfileRepository.fetchOneProfile({ _id: decodedToken.userId })
    const mappedResponse = {
      is_admin: profileResponse[0].is_admin,
      country: profileResponse[0].country,
      profile_id: profileResponse[0].profile_table._id,
      first_name: profileResponse[0].first_name,
      last_name: profileResponse[0].last_name,
      phone_number: profileResponse[0].phone_number,
      email: profileResponse[0].email,
    }
    return res.status(200).send({
      message: 'profile retrieved succesfully',
      mappedResponse
    });

  } catch (error) {
    return res.status(500).send({
      message: 'Internal server error',
      errors: error
    });
  }
}

const updateProfile = async (req, res) => {
  const decodedToken = tokenMiddleware.decodeToken(req.headers.token, process.env.TOKEN_SECRET);

  try {
    // rework logic so only admin caan set status

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || decodedToken.userId !== req.params.id) {
      return res.status(400).send({
        message: 'Invalid user Id'
      })
    }
    const profileResponse = await ProfileRepository.update({ _id: decodedToken.userId }, req.body)
    const mappedResponse = {
      is_admin: profileResponse.is_admin,
      country: profileResponse.country,
      profile_id: profileResponse.profile_table._id,
      first_name: profileResponse.first_name,
      last_name: profileResponse.last_name,
      phone_number: profileResponse.phone_number,
      email: profileResponse.email,
    }
    console.log(decodedToken.isAdminxk);

    return res.status(200).send({
      message: 'profile updated succesfully',
      mappedResponse
    });

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: 'Something went really wrong',
      error
    })
  }
}
export default {
  viewProfile,
  updateProfile
};
