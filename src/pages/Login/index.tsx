import { Avatar, Box } from "@mui/material";
import {
  Text,
  Input,
  Button,
  SocialOauthButton,
  IconButton,
} from "components/atoms";
import { OTPInput, SocialProvider } from "components";
import { useLoginFlow } from "./hooks";
import { loginStyles } from "./Login.styles";
import { LOGIN_STEPS } from "types";
import { isValidEmail } from "utils";

const SOCIAL_ROW_1: SocialProvider[] = [
  "google",
  "microsoft",
  "facebook",
  "linkedin",
];
const SOCIAL_ROW_2: SocialProvider[] = ["whatsapp", "telegram", "discord"];

const Login = () => {
  const {
    step,
    email,
    setEmail,
    isLoading,
    resendTimer,
    handleSendOtp,
    handleVerifyOtp,
    handleResend,
    goBackToEmail,
    setOtp,
    otp,
  } = useLoginFlow();

  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendOtp();
    }
  };

  return (
    <Box sx={loginStyles.screen}>
      <Box sx={loginStyles.cardOuter}>
        <Box sx={loginStyles.cardInner}>
          {step === LOGIN_STEPS.EMAIL && (
            <>
              <Avatar
                src="/assets/images/common/logo.png"
                sx={loginStyles.logo}
              />

              <Text
                variant="heading"
                textAlign="center"
                sx={loginStyles.heading}
              >
                Enter your email to log in
              </Text>

              <Text
                variant="bodyMuted"
                textAlign="center"
                sx={loginStyles.subtext}
              >
                To log in to the app, we will send a code to the specified email
                address.
              </Text>

              <Input
                placeholder="Your email"
                sx={loginStyles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleEmailKeyDown}
                fullWidth
              />

              <Button
                variant="primary"
                size="large"
                text="Continue"
                loading={isLoading}
                disabled={!isValidEmail(email)}
                onClick={handleSendOtp}
                fullWidth
                sx={loginStyles.button}
              />
            </>
          )}

          {step === LOGIN_STEPS.OTP && (
            <>
              <Box sx={loginStyles.backButton}>
                <IconButton
                  icon="chevron-left"
                  variant="gray"
                  onClick={goBackToEmail}
                />
              </Box>

              <Avatar
                src="/assets/images/common/logo.png"
                sx={loginStyles.logo}
              />

              <Text
                variant="heading"
                textAlign="center"
                sx={loginStyles.heading}
              >
                Enter the confirmation code
              </Text>

              <Text
                variant="bodyMuted"
                textAlign="center"
                sx={loginStyles.subtext}
              >
                We have sent you the code by email:
              </Text>

              <Text
                variant="body"
                textAlign="center"
                sx={loginStyles.emailBold}
              >
                {email}
              </Text>

              <Box sx={loginStyles.otpContainer}>
                <OTPInput
                  length={6}
                  onChange={(value) => setOtp(value)}
                  onComplete={(value) => handleVerifyOtp(value)}
                />
              </Box>

              <Button
                variant="primary"
                size="large"
                text="Continue"
                loading={isLoading}
                onClick={() => handleVerifyOtp()}
                fullWidth
                disabled={otp.length !== 6}
                sx={loginStyles.button}
              />
            </>
          )}
        </Box>
        <Box>
          {step === LOGIN_STEPS.EMAIL && (
            <Box sx={loginStyles.footerEmail}>
              <Text variant="bodyMuted" textAlign="center">
                Or continue with
              </Text>

              <Box sx={{ ...loginStyles.socialRow, margin: "12px 0 10px 0" }}>
                {SOCIAL_ROW_1.map((social) => (
                  <Box key={social} sx={loginStyles.socialButton}>
                    <SocialOauthButton social={social} disabled />
                  </Box>
                ))}
              </Box>
              <Box sx={loginStyles.socialRow}>
                {SOCIAL_ROW_2.map((social) => (
                  <Box key={social} sx={loginStyles.socialButton}>
                    <SocialOauthButton social={social} disabled />
                  </Box>
                ))}
              </Box>
            </Box>
          )}
          {step === LOGIN_STEPS.OTP && (
            <Box sx={loginStyles.footerOtp}>
              {resendTimer > 0 ? (
                <Text variant="bodyMuted">
                  You can resend code after {resendTimer}s
                </Text>
              ) : (
                <Box></Box>
              )}
              <Button
                variant="white"
                size="xs"
                text="Resend Code"
                onClick={handleResend}
                loading={isLoading}
                disabled={resendTimer > 0}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
