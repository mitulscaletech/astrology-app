export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className=''>
      <h1 className='text-center'>User Layout</h1>
      <main className='flex-1 p-6'>{children}</main>
    </div>
  );
}
