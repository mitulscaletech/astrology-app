export function Footer() {
  return (
    <footer className='border-t border-secondary-200'>
      <div className='container flex h-16 items-center justify-between px-4'>
        <p className='text-sm text-secondary-300'>© 2024 WeWake. All rights reserved.</p>
        <nav className='flex space-x-4 text-sm text-secondary-300'>
          <a href='#' className='hover:underline'>
            Privacy Policy
          </a>
          <a href='#' className='hover:underline'>
            Terms of Service
          </a>
          <a href='#' className='hover:underline'>
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
