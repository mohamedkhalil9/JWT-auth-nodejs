export const verifyTmp = (token) => {
  const verificationLink = `http://localhost:4000/api/v1/profile/verify-email/${token}`;
  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Email</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:system-ui,sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);padding:20px;margin:0}
        .container{max-width:500px;margin:0 auto;background:rgba(255,255,255,.95);backdrop-filter:blur(20px);border-radius:20px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.1)}
        .header{background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:40px 20px;text-align:center;color:white;position:relative}
        .header::before{content:'';position:absolute;inset:0;background:radial-gradient(circle,rgba(255,255,255,.1) 1px,transparent 1px);background-size:30px 30px;animation:float 20s linear infinite}
        @keyframes float{0%{transform:translate(-20px,-20px)}100%{transform:translate(-20px,-50px)}}
        .icon{width:60px;height:60px;background:rgba(255,255,255,.2);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:15px;animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
        h1{font-size:24px;font-weight:700;position:relative;z-index:1}
        .content{padding:40px 30px;text-align:center}
        .text{color:#374151;font-size:16px;line-height:1.6;margin-bottom:30px}
        .btn{display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:white!important;text-decoration:none;padding:14px 32px;border-radius:50px;font-weight:600;transition:all .3s;box-shadow:0 8px 20px rgba(79,70,229,.3)}
        .btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(79,70,229,.4)}
        .note{background:#fef3c7;border:1px solid #fbbf24;border-radius:8px;padding:15px;margin:25px 0;font-size:14px;color:#92400e}
        .footer{background:#f8fafc;padding:20px;text-align:center;font-size:12px;color:#64748b}
        @media(max-width:480px){.container{margin:10px;border-radius:15px}.header{padding:30px 15px}.content{padding:30px 20px}.btn{padding:12px 28px}}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="icon">
                <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
            </div>
            <h1>Verify Your Email</h1>
        </div>
        
        <div class="content">
            <div class="text">
                Welcome! Please verify your email address to activate your account and get started.
            </div>
            
            <a href=${verificationLink} class="btn">Verify Email Address</a>
            
            <div class="note">
                <strong>Security Notice:</strong> This link expires in 24 hours. If you didn't create an account, please ignore this email.
            </div>
            
            <div style="margin-top:20px;font-size:13px;color:#64748b">
                Having trouble? Copy this link: <br>
                <a href=${verificationLink} style="color:#4f46e5;word-break:break-all">${verificationLink}</a>
            </div>
        </div>
        
        <div class="footer">
            © 2025 Your Company • <a href="#" style="color:#64748b">Unsubscribe</a>
        </div>
    </div>
</body>
</html>`;
};

export const resetTmp = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - Fixed for Gmail</title>
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:system-ui,sans-serif;background:linear-gradient(135deg,#ff6b6b,#ee5a24);padding:20px;margin:0}
        .container{max-width:500px;margin:0 auto;background:rgba(255,255,255,.95);border-radius:20px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,.15)}
        .header{background:linear-gradient(135deg,#e74c3c,#c0392b);padding:40px 20px;text-align:center;color:white;position:relative}
        .icon{width:60px;height:60px;background:rgba(255,255,255,.2);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:15px;}
        h1{font-size:24px;font-weight:700;position:relative;z-index:1}
        .content{padding:40px 30px;text-align:center}
        .alert{background:linear-gradient(135deg,#fef2f2,#fee2e2);border:1px solid #fca5a5;border-radius:10px;padding:15px;margin-bottom:25px;color:#991b1b;font-size:14px}
        .text{color:#374151;font-size:16px;line-height:1.6;margin-bottom:25px}
        .otp-box{background:linear-gradient(135deg,#f8fafc,#f1f5f9);border:1px solid #e2e8f0;border-radius:15px;padding:25px;margin:20px 0;position:relative;overflow:hidden}
        .otp-label{font-size:14px;color:#64748b;margin-bottom:15px;font-weight:500}
        .otp-digits{text-align: center; margin: 15px 0;}
        .digit{width:45px;height:55px;background:white;border:2px solid #e2e8f0;border-radius:8px;display:inline-block;text-align:center;line-height:55px;font-size:24px;font-weight:700;color:#1f2937;box-shadow:0 2px 4px rgba(0,0,0,.05);margin:0 5px;}
        .full-code{font-size:13px;color:#64748b;margin-top:10px;}
        .warning{background:#fff7ed;border:1px solid #fdba74;border-radius:8px;padding:15px;margin:20px 0;font-size:14px;color:#9a3412}
        .tips{background:#f0f9ff;border:1px solid #7dd3fc;border-radius:8px;padding:15px;margin:20px 0;text-align:left}
        .tips h3{color:#0c4a6e;font-size:14px;margin-bottom:8px}
        .tips ul{margin:0;padding-left:15px;color:#075985;font-size:13px}
        .tips li{margin-bottom:5px}
        .footer{background:#f8fafc;padding:20px;text-align:center;font-size:12px;color:#64748b}
        @media(max-width:480px){.container{margin:10px;border-radius:15px}.header{padding:30px 15px}.content{padding:30px 20px}.digit{width:35px;height:45px;font-size:20px}}
        
        /* Added for better email compatibility */
        .copy-note {margin-top: 15px; font-size: 13px; color: #64748b;}
        .code-display {background: #f1f5f9; padding: 8px 15px; border-radius: 8px; display: inline-block; margin-top: 10px; font-weight: bold;}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="icon">
                <svg width="30" height="30" fill="white" viewBox="0 0 24 24">
                    <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10A2,2 0 0,1 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"/>
                </svg>
            </div>
            <h1>Reset Your Password</h1>
        </div>
        
        <div class="content">
            <div class="alert">
                <strong>Password Reset Request</strong><br>
                We received a request to reset your password. If you didn't make this request, please ignore this email.
            </div>
            
            <div class="text">
                Use the verification code below to reset your password. This code is valid for 10 minutes.
            </div>
            
            <div class="otp-box">
                <div class="otp-label">Your verification code:</div>
                <div class="otp-digits">
                    <div class="digit">7</div>
                    <div class="digit">2</div>
                    <div class="digit">9</div>
                    <div class="digit">4</div>
                    <div class="digit">1</div>
                    <div class="digit">8</div>
                </div>
                <div class="full-code">
                    <strong>Full Code:</strong> <span class="code-display">729418</span>
                </div>
                <div class="copy-note">
                    ⚠️ For security, copy this code manually
                </div>
            </div>
            
            <div class="warning">
                <strong>⏰ Expires in 10 minutes</strong><br>
                If it expires, you'll need to request a new password reset.
            </div>
            
            <div class="tips">
                <h3>🔒 Security Tips</h3>
                <ul>
                    <li>Never share this code with anyone</li>
                    <li>Make sure you're on our official website</li>
                    <li>Choose a strong, unique password</li>
                </ul>
            </div>
            
            <div style="margin-top:20px;font-size:13px;color:#64748b">
                Need help? Contact us at <a href="mailto:support@yourapp.com" style="color:#e74c3c">support@yourapp.com</a>
            </div>
        </div>
        
        <div class="footer">
            © 2025 Your Company • <a href="#" style="color:#64748b">Unsubscribe</a>
        </div>
    </div>
    
    <div style="max-width: 600px; margin: 30px auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #e74c3c; margin-bottom: 15px;">What Changed for Gmail Compatibility:</h2>
        <ul style="list-style-type: none; padding-left: 0;">
            <li style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                ✅ <strong>Digit Alignment Fixed</strong>: Replaced Flexbox with inline-block and text-align center
            </li>
            <li style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                ✅ <strong>Copy Button Removed</strong>: JavaScript doesn't work in emails - added manual copy instructions
            </li>
            <li style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                ✅ <strong>Animation Effects Removed</strong>: Email clients don't support complex CSS animations
            </li>
            <li style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                ✅ <strong>Gradient Support</strong>: Kept simple linear gradients that Gmail supports
            </li>
            <li style="margin-bottom: 10px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
                ✅ <strong>Enhanced Code Visibility</strong>: Made the full code more prominent for easy copying
            </li>
        </ul>
    </div>
</body>
</html>`;
