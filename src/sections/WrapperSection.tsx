import { ReactNode } from "react";

interface Props {
  title?: string;
  children?: ReactNode;
  rightHeader?: ReactNode;
}

const WrapperSection = ({ title, children, rightHeader }: Props) => {
  return (
    <section className="flex flex-col gap-5 py-8">
      {title && (
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg text-black font-semibold">{title}</h1>
          {rightHeader ? (
            <div className="flex items-center">{rightHeader}</div>
          ) : null}
        </div>
      )}
      {children ?? null}
    </section>
  );
};

export default WrapperSection;
