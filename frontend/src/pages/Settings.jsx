// settings.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Trash2,
  AlertCircle,
  CheckCircle,
  Shield,
  Lock,
  User,
  Settings as SettingsIcon,
  Key,
  HelpCircle,
  Info,
  Bell,
  Eye,
  EyeOff
} from "lucide-react";
import axiosClient from "../utils/axiosClient";
import Animate from "../animation";

// Zod Schema for Forgot Password
const forgotPasswordSchema = z.object({
  emailId: z.string()
    .email("Invalid email address")
    .min(1, "Email is required")
});

// Zod Schema for Change Password
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

const Settings = () => {
  // Forgot Password Form
  const {
    handleSubmit: handleForgotPasswordSubmit,
    control: forgotPasswordControl,
    formState: { errors: forgotPasswordErrors, isSubmitting: isForgotPasswordSubmitting },
    reset: resetForgotPasswordForm
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { emailId: "" }
  });

  // Change Password Form
  const {
    handleSubmit: handleChangePasswordSubmit,
    control: changePasswordControl,
    formState: { errors: changePasswordErrors, isSubmitting: isChangePasswordSubmitting },
    reset: resetChangePasswordForm,
    watch
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  // Delete Account state
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [changePasswordMessage, setChangePasswordMessage] = useState({ type: "", text: "" });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Forgot Password Handler
  const onForgotPasswordSubmit = async (data) => {
    setMessage({ type: "", text: "" });
    try {
      const res = await axiosClient.post(`/user/forgot-password`, data);
      setMessage({
        type: "success",
        text: res.data.message || "Password reset link sent to your email"
      });
      resetForgotPasswordForm();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to send reset link"
      });
    }
  };

  // Change Password Handler
  const onChangePasswordSubmit = async (data) => {
    setChangePasswordMessage({ type: "", text: "" });
    try {
      const res = await axiosClient.post(`/auth/change-password`, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      });
      setChangePasswordMessage({
        type: "success",
        text: res.data.message || "Password changed successfully"
      });
      resetChangePasswordForm();
    } catch (err) {
      setChangePasswordMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to change password"
      });
    }
  };

  // Delete Account Handler
  const handleDeleteAccount = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    if (!window.confirm("Are you absolutely sure? This will delete ALL your data permanently!")) {
      setDeleteConfirm(false);
      return;
    }

    try {
      const res = await axiosClient.delete(`/user/deleteProfile`, {
        withCredentials: true
      });
      alert("Account deleted successfully!");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete account");
      setDeleteConfirm(false);
    }
  };

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
                  <SettingsIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#030859]">Account Settings</h1>
                  <p className="text-gray-600">Manage your account preferences and security</p>
                </div>
              </div>

              {/* Optional quick stats card - can be removed if not needed */}
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#030859]/20">
                    <Shield className="w-5 h-5 text-[#030859]" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#030859]">Secure</div>
                    <div className="text-sm text-gray-600">Your data is protected</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subtle indicator that this is settings page */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <Info className="w-4 h-4" />
            <span>Manage your account settings and security options below</span>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="space-y-8">
          {/* Change Password Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-[#030859]/10 to-[#5FD4E2]/10 p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#030859] to-[#5FD4E2] flex items-center justify-center shadow-md">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#030859]">Change Password</h2>
                    <p className="text-gray-600">Update your password regularly to keep your account secure</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-6">
                <form onSubmit={handleChangePasswordSubmit(onChangePasswordSubmit)}>
                  <div className="space-y-5">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <Controller
                        name="currentPassword"
                        control={changePasswordControl}
                        render={({ field }) => (
                          <div className="relative">
                            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              {...field}
                              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#030859]"
                            >
                              {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        )}
                      />
                      {changePasswordErrors.currentPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {changePasswordErrors.currentPassword.message}
                        </p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <Controller
                        name="newPassword"
                        control={changePasswordControl}
                        render={({ field }) => (
                          <div className="relative">
                            <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type={showNewPassword ? "text" : "password"}
                              {...field}
                              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#030859]"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        )}
                      />
                      {changePasswordErrors.newPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {changePasswordErrors.newPassword.message}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-gray-500">
                        Password must be at least 8 characters and include uppercase, lowercase, number, and special character.
                      </p>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <Controller
                        name="confirmPassword"
                        control={changePasswordControl}
                        render={({ field }) => (
                          <div className="relative">
                            <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              {...field}
                              className="w-full pl-12 pr-12 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#030859]"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        )}
                      />
                      {changePasswordErrors.confirmPassword && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {changePasswordErrors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    {/* Change Password Message */}
                    {changePasswordMessage.text && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl flex items-center gap-3 ${
                          changePasswordMessage.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        {changePasswordMessage.type === "success" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600" />
                        )}
                        <span className="text-sm font-medium">{changePasswordMessage.text}</span>
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      disabled={isChangePasswordSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isChangePasswordSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Change Password
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Forgot Password Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-[#030859]/10 to-[#5FD4E2]/10 p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FBB102] to-[#FBB102]/70 flex items-center justify-center shadow-md">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#030859]">Forgot Password</h2>
                    <p className="text-gray-600">Request a password reset link via email</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="p-6">
                <form onSubmit={handleForgotPasswordSubmit(onForgotPasswordSubmit)}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <Controller
                        name="emailId"
                        control={forgotPasswordControl}
                        render={({ field }) => (
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              {...field}
                              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-300 text-[#030859] placeholder-gray-400 focus:outline-none focus:border-[#030859] focus:ring-1 focus:ring-[#030859]/30 transition-colors shadow-sm"
                              placeholder="Enter your registered email"
                            />
                          </div>
                        )}
                      />
                      {forgotPasswordErrors.emailId && (
                        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {forgotPasswordErrors.emailId.message}
                        </p>
                      )}
                    </div>

                    {/* Forgot Password Message */}
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

                    <button
                      type="submit"
                      disabled={isForgotPasswordSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-[#030859] to-[#5FD4E2] text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      {isForgotPasswordSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="w-5 h-5" />
                          Send Reset Link
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Delete Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl border border-red-200 shadow-sm overflow-hidden">
              {/* Section Header */}
              <div className="bg-gradient-to-r from-red-50 to-red-100/50 p-6 border-b border-red-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                    <Trash2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-red-700">Delete Account</h2>
                    <p className="text-red-600">Permanently delete your account and all data</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-6">
                  <div className="p-4 bg-red-50/50 rounded-xl border border-red-100">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-red-800">
                        <p className="font-medium mb-1">This action cannot be undone.</p>
                        <p>All your data including solved problems, submissions, and profile information will be permanently deleted.</p>
                      </div>
                    </div>
                  </div>

                  {deleteConfirm ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-5 bg-red-50 border border-red-200 rounded-xl"
                    >
                      <p className="text-red-700 font-medium mb-4 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        ⚠️ Are you absolutely sure? This action is irreversible!
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => setDeleteConfirm(false)}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
                        >
                          Yes, Delete My Account
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(true)}
                      className="w-full py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete Account
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional security tip card (optional) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-[#030859]/5 to-[#5FD4E2]/5 rounded-2xl p-6 border border-[#5FD4E2]/30"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#DCE7C6]">
                <Shield className="w-6 h-6 text-[#030859]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#030859] mb-2">Security Tip</h3>
                <p className="text-gray-700 text-sm">
                  For added security, we recommend enabling two-factor authentication and regularly updating your password. 
                  If you suspect any unauthorized access, contact support immediately.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Animation (dark mode only - kept from original) */}
      <div className="hidden dark:block fixed inset-0 pointer-events-none">
        <Animate />
      </div>
    </div>
  );
};

export default Settings;