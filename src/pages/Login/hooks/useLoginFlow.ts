import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "features/auth";
import { useToast } from "hooks";
import { LoginStep, LOGIN_STEPS } from "types";
import { RESEND_COOLDOWN_SECONDS } from "consts";
import { getErrorMessage, isValidEmail } from "utils";

export const useLoginFlow = () => {
  const [step, setStep] = useState<LoginStep>(LOGIN_STEPS.EMAIL);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { sendOtp, verifyOtp } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const startResendTimer = useCallback(() => {
    setResendTimer(RESEND_COOLDOWN_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSendOtp = useCallback(async () => {
    if (!isValidEmail(email)) return;
    setIsLoading(true);
    try {
      const response = await sendOtp(email);
      showToast({ variant: "success", message: response.message });
      setStep(LOGIN_STEPS.OTP);
      startResendTimer();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to send OTP"),
      });
    } finally {
      setIsLoading(false);
    }
  }, [email, sendOtp, showToast, startResendTimer]);

  const handleVerifyOtp = useCallback(
    async (otpValue?: string) => {
      const code = otpValue || otp;
      if (code.length !== 6) return;
      setIsLoading(true);
      try {
        const response = await verifyOtp(email, code);
        showToast({ variant: "success", message: response.message });
        const redirect = searchParams.get("redirect") || "/dashboard";
        navigate(redirect, { replace: true });
      } catch (error: unknown) {
        showToast({
          variant: "error",
          message: getErrorMessage(error, "Invalid OTP code"),
        });
      } finally {
        setIsLoading(false);
      }
    },
    [otp, email, verifyOtp, showToast, navigate, searchParams]
  );

  const handleResend = useCallback(async () => {
    if (resendTimer > 0) return;
    setIsLoading(true);
    try {
      const response = await sendOtp(email);
      showToast({ variant: "success", message: response.message });
      startResendTimer();
    } catch (error: unknown) {
      showToast({
        variant: "error",
        message: getErrorMessage(error, "Failed to resend OTP"),
      });
    } finally {
      setIsLoading(false);
    }
  }, [email, resendTimer, sendOtp, showToast, startResendTimer]);

  const goBackToEmail = useCallback(() => {
    setStep(LOGIN_STEPS.EMAIL);
    setOtp("");
  }, []);

  return {
    step,
    email,
    setEmail,
    otp,
    setOtp,
    isLoading,
    resendTimer,
    handleSendOtp,
    handleVerifyOtp,
    handleResend,
    goBackToEmail,
  };
};
