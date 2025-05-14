import Typography from "@/components/ui/typography";

export default function CaptchaError() {
  return (
    <div className="border border-primary bg rounded-xl p-3">
      <Typography size="p" className="text-primary font-semibold text-base text-start">
        Incorrect CAPTCHA Code
      </Typography>
      <Typography size="p" className="text-primary font-normal text-base text-start">
        The code you entered doesn’t match.
        <br /> Please try again to verify you're not a robot.
      </Typography>
    </div>
  );
}
