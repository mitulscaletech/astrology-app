import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";
import IconFacebook from "@/shared/icons/facebook";
import IconInstagram from "@/shared/icons/instagram";
import IconYoutube from "@/shared/icons/youtube";
import Typography from "./ui/typography";
import Grid from "./ui/grid";

export function Footer() {
  return (
    <footer className="py-5 md:py-8 lg:py-10 xl:py-12 2xl:py-14">
      <div className="container">
        <Grid className="justify-between gap-y-4">
          <Grid.Col className="md:w-3/12 xl:w-2/12">
            <div>
              <Link href="/" className="block w-28 md:w-36 lg:w-40 xl:w-44">
                <Image src={logo} alt="logo" width={190} height={58} />
              </Link>
              <p className="mt-2 2xl:mt-3">
                Personalized life guidance <br className="md:hidden lg:block" />
                with Astrology and Pooja
              </p>
            </div>
          </Grid.Col>
          <Grid.Col className="md:w-9/12 lg:w-8/12 xl:w-7/12">
            <Grid className="gap-y-4">
              <Grid.Col className="md:w-4/12">
                {/* Explore WeWake */}
                <div>
                  <Typography variant="h4" size="base" className="font-bold mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6">
                    EXPLORE WEWAKE
                  </Typography>
                  <ul className="space-y-1 md:space-y-2 xl:space-y-3 font-bold">
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/astrology">
                        Astrology
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/blog">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/about">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/contact">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </Grid.Col>
              <Grid.Col className="md:w-4/12">
                {/* User */}
                <div>
                  <Typography variant="h4" size="base" className="font-bold mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6">
                    USER
                  </Typography>
                  <ul className="space-y-1 md:space-y-2 xl:space-y-3 font-bold">
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/support">
                        Support
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/appointments">
                        Appointments
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/alerts">
                        Alerts
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/shop">
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/account">
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/settings">
                        Settings
                      </Link>
                    </li>
                  </ul>
                </div>
              </Grid.Col>
              <Grid.Col className="md:w-4/12">
                {/* Astrologer */}
                <div>
                  <Typography variant="h4" size="base" className="font-bold mb-2 md:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6">
                    ASTROLOGER
                  </Typography>
                  <ul className="space-y-1 md:space-y-2 xl:space-y-3 font-bold">
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/support">
                        Support
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/appointments">
                        Appointments
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/alerts">
                        Alerts
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/shop">
                        Shop
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/account">
                        Account
                      </Link>
                    </li>
                    <li>
                      <Link className="opacity-50 hover:opacity-100" href="/settings">
                        Settings
                      </Link>
                    </li>
                  </ul>
                </div>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <div className="mt-4 md:mt-5 lg:mt-6 xl:mt-7 2xl:mt-8 flex flex-col md:flex-row items-center justify-between border-t border-secondary/10 pt-3 lg:pt-4 2xl:pt-5">
          <p className="opacity-50">&copy; {new Date().getFullYear()} WeWake Astrology & Pooja.</p>
          <div className="flex gap-x-3 mt-3 md:mt-0">
            <Link
              aria-label="facebook"
              href="https://facebook.com"
              className="size-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconFacebook />
            </Link>
            <Link
              aria-label="instagram"
              href="https://instagram.com"
              className="size-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconInstagram />
            </Link>
            <Link
              aria-label="youtube"
              href="https://youtube.com"
              className="size-6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconYoutube />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
