// profile.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Upload,
  AlertCircle,
  CheckCircle,
  Loader,
  Camera,
  Home,
  Globe,
  Map,
  Users,
  ChevronRight,
  Lock
} from "lucide-react";
import axiosClient from "../utils/axiosClient";
import Animate from "../animation";

// Zod Schema for Profile Validation (email removed)
const profileSchema = z.object({
  firstName: z.string()
    .min(3, "First name must be at least 3 characters")
    .max(20, "First name must be less than 20 characters"),
  lastName: z.string()
    .min(3, "Last name must be at least 3 characters")
    .max(20, "Last name must be less than 20 characters")
    .optional()
    .or(z.literal("")),
  phoneNumber: z.string()
    .regex(/^[0-9+\-\s()]{10,15}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  gender: z.enum(["male", "female", "other"]).optional().or(z.literal("")),
  dateOfBirth: z.string().optional().or(z.literal("")),
  address: z.object({
    street: z.string().optional().or(z.literal("")),
    city: z.string().optional().or(z.literal("")),
    state: z.string().optional().or(z.literal("")),
    country: z.string().optional().or(z.literal(""))
  }).optional()
});

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [userEmail, setUserEmail] = useState(""); // to display email separately

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      address: {
        street: "",
        city: "",
        state: "",
        country: ""
      }
    }
  });

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/user/getProfile", { withCredentials: true });
        const user = res.data.user || res.data;

        // Format date for input (YYYY-MM-DD)
        let formattedDate = "";
        if (user.dateOfBirth) {
          const date = new Date(user.dateOfBirth);
          formattedDate = date.toISOString().split("T")[0];
        }

        reset({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phoneNumber: user.phoneNumber || "",
          gender: user.gender || "",
          dateOfBirth: formattedDate,
          address: {
            street: user.address?.street || "",
            city: user.address?.city || "",
            state: user.address?.state || "",
            country: user.address?.country || ""
          }
        });

        // Store email for read-only display
        setUserEmail(user.emailId || "");

        if (user.profileImage) {
          setImagePreview(user.profileImage);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError(err.response?.data?.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit handler
  const onSubmit = async (data) => {
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      // Create FormData for potential image upload
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === "address") {
          formData.append("address", JSON.stringify(data.address));
        } else {
          formData.append(key, data[key]);
        }
      });
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await axiosClient.put("/user/updateProfile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMessage({
        type: "success",
        text: res.data.message || "Profile updated successfully!"
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to update profile"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#030859]/20 rounded-full" />
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-[#030859] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="mt-6 text-lg font-medium text-[#030859]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#030859]/5 via-[#5FD4E2]/5 to-[#DCE7C6]/5" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#5FD4E208_1px,transparent_1px),linear-gradient(to_bottom,#5FD4E208_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-8 md:py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#030859] to-[#5FD4E2] rounded-2xl flex items-center justify-center shadow-lg shadow-[#030859]/20">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#030859]">Your Profile</h1>
                  <p className="text-gray-600">Manage your personal information and preferences</p>
                </div>
              </div>

              {/* Quick stats - optional */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#5FD4E2]/20">
                    <CheckCircle className="w-5 h-5 text-[#5FD4E2]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#030859]">Profile</div>
                    <div className="text-sm text-gray-600">Complete your details</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* Section Header */}
          <div className="bg-gradient-to-r from-[#030859]/10 to-[#5FD4E2]/10 p-6 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#030859] to-[#5FD4E2] flex items-center justify-center shadow-md">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#030859]">Personal Information</h2>
                <p className="text-gray-600">Update your profile details and photo</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#030859]/10 to-[#5FD4E2]/10">
                      <User className="w-12 h-12 text-[#030859]/40" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-[#030859] to-[#5FD4E2] rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow border-4 border-white">
                  <Camera className="w-5 h-5 text-white" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                  />
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-500">Click the camera icon to change photo</p>
            </div>

            {/* Read-only Email Display */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#030859]/10">
                  <Mail className="w-5 h-5 text-[#030859]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 font-medium">Email (cannot be changed)</p>
                  <p className="text-base text-[#030859] font-medium">{userEmail}</p>
                </div>
                <Lock className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...field}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                          placeholder="John"
                        />
                      </div>
                    )}
                  />
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...field}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                          placeholder="Doe"
                        />
                      </div>
                    )}
                  />
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        {...field}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                        placeholder="+1 234 567 890"
                      />
                    </div>
                  )}
                />
                {errors.phoneNumber && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Gender & DOB Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                        <select
                          {...field}
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm appearance-none"
                        >
                          <option value="">Select</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90" />
                      </div>
                    )}
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => (
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...field}
                          type="date"
                          className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                        />
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#030859] flex items-center gap-2 border-b border-gray-200 pb-2">
                  <MapPin className="w-5 h-5 text-[#5FD4E2]" />
                  Address
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Street */}
                  <div>
                    <Controller
                      name="address.street"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <Home className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            {...field}
                            placeholder="Street"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                          />
                        </div>
                      )}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <Controller
                      name="address.city"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            {...field}
                            placeholder="City"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                          />
                        </div>
                      )}
                    />
                  </div>

                  {/* State */}
                  <div>
                    <Controller
                      name="address.state"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <Map className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            {...field}
                            placeholder="State"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                          />
                        </div>
                      )}
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <Controller
                      name="address.country"
                      control={control}
                      render={({ field }) => (
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            {...field}
                            placeholder="Country"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                          />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              {message.text && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex items-center gap-3 ${
                    message.type === "success"
                      ? "bg-green-50 text-green-800 border border-green-200"
                      : "bg-red-50 text-red-800 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="text-sm font-medium">{message.text}</span>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Background Animation (dark mode only) */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none">
        <Animate />
      </div>
    </div>
  );
};

export default Profile;