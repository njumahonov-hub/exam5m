
const bcrypt = require("bcryptjs");
const CustomErrorHandle = require("../utils/custom-errorhandle");
const AuthSchema = require("../schema/auth.schema");
const SavedSchema = require("../schema/saved.schema");


const change_pasport = async (req, res, next) => {
  try {
    const { email, current_password, new_password, confirm_password } =
      req.body;

    if (new_password !== confirm_password) {
      throw CustomErrorHandle.BadRequest(
        "new password and confirm password must be same"
      );
    }

    if (new_password === current_password) {
      throw CustomErrorHandle.BadRequest(
        "new password and current password must be different"
      );
    }

    const foundeduser = await AuthSchema.findOne({ email });

    if (!foundeduser) {
      throw CustomErrorHandle.UnAuhtorized("user not found");
    }

    const compare = await bcrypt.compare(
      current_password,
      foundeduser.password
    );

    if (compare) {
      if (req.user.email !== foundeduser.email) {
        throw CustomErrorHandle.Forbidden(
          "you have not access for this action"
        );
      }

      const hashpassword = await bcrypt.hash(new_password, 12);
      await AuthSchema.findByIdAndUpdate(foundeduser._id, {
        password: hashpassword,
      });
      return res.status(200).json({
        message: "Succesful",
      });
    } else {
      throw CustomErrorHandle.UnAuhtorized("wrong password");
    }
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id

 
    const user = await AuthSchema.findById(userId).select(
      "first_name last_name phone_number email avatar"
    )

    if (!user) {
      throw CustomErrorHandle.NotFound("User not found")
    }

    
    const savedCars = await SavedSchema.find({ user_id: userId })
      .populate("car_id")
      .select("car_id createdAt") 

   
    const savedCarsList = savedCars.map(item => ({
      ...item.car_id._doc,
      savedAt: item.createdAt
    }))

    res.status(200).json({
      user,
      savedCars: savedCarsList
    })

  } catch (error) {
    next(error)
  }
}

const add_profile = async (req, res, next) => {
  try {
    const userId = req.user.id 
    const { first_name, last_name, phone_number } = req.body

    const user = await AuthSchema.findById(userId)

    if (!user) {
      throw CustomErrorHandle.NotFound("User not found")
    }

    
    if (user.first_name || user.last_name || user.phone_number) {
      throw CustomErrorHandle.BadRequest("Profile already exists")
    }

    user.first_name = first_name
    user.last_name = last_name
    user.phone_number = phone_number

    await user.save()

    res.status(201).json({
    message: "succesful added"
    })

  } catch (error) {
    next(error)
  }
}

const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id
    const { first_name, last_name, phone_number } = req.body

    const updatedUser = await AuthSchema.findByIdAndUpdate(
      userId,
      {
        first_name,
        last_name,
        phone_number
      },
      { new: true }
    )

    if (!updatedUser) {
      throw CustomErrorHandle.NotFound("User not found")
    }

    res.status(200).json({
      message: "Profile updated successfully"
    })

  } catch (error) {
    next(error)
  }
}

module.exports = {
  change_pasport,
  add_profile,
  getProfile,
  updateProfile,
  
};
