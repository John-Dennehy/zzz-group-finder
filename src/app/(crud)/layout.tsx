type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <h1>Admin Layout Placeholder</h1>
      {children}
    </div>
  );
}
