import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    
    const {fullname, email, password, username} = req.body;

    if([fullname, email, password, username].some((field)=>field?.trim()==="")){
        throw new ApiErrorError(400,"Please fill all the fields");
    }

    const existedUser=User.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists with this email or username");
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coveraImageLocalPath=req.files?.coverimage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Please provide avatar image");
    }

    const avatar = await cloudinary.uploader.upload(avatarLocalPath);
    const coverimage = coveraImageLocalPath? await cloudinary.uploader.upload(coveraImageLocalPath):null;

    if(!avatarLocalPath){
        throw new ApiError(400,"Please provide avatar image");
    }

    User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase(),
        avatar:avatar.url,
        coverimage:coverimage?.url||"",
    })
    const createdUser=await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering user");
    }

    return res.status(201).json(new ApiResponse(201,createdUser,"User registered successfully"));
})

export {registerUser} 