import Typography from "@/components/ui/typography";

export default function CaptchaError() {
  return (
    <div className="text-primary border border-primary rounded-lg xl:rounded-xl p-2 xl:p-3 mt-4 md:mt-6 xl:mt-8 2xl:mt-10 4xl:mt-12">
      <Typography variant="p" size="p" className="font-semibold mb-1 md:mb-1.5 2xl:mb-1.5">
        Incorrect CAPTCHA Code
      </Typography>
      <Typography variant="p" size="p">
        The code you entered doesn’t match.
        <br /> Please try again to verify you&apos;re not a robot.
      </Typography>
    </div>
  );
}
