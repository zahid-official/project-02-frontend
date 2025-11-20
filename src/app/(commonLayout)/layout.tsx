import Navbar from "@/components/shared/Navbar";

interface IProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: IProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full mx-auto sticky top-0 bg-background/90 z-50">
        <Navbar />
      </header>

      <main className="grow px-1 mx-auto max-w-7xl">{children}</main>

      <footer></footer>
    </div>
  );
};

export default PublicLayout;
