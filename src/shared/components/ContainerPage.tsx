import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ContainerPage = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <main className="container mx-auto px-4 py-12">{children}</main>
    </div>
  );
};

export default ContainerPage;
