export const verifyTmp = (token) => {
  const resetUrl = `localhost:4000/api/v1/profile/verify-email/${token}`;
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi </p>
        
        <p>You requested a password reset for your account. Click the button below to reset your password:</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            verify email 
          </a>
        </div>
        
        <p><strong>This link will expire in 1 hour.</strong></p>
        
        <p>If you didn't request this reset, please ignore this email.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this URL into your browser:<br>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
        </div>
      </div>
    `;
};

export const resetTmp = (otp) => {
  return `
        <h2 style="color: #333;">Welcome, ${otp}! 🎉</h2>
    `;
};
