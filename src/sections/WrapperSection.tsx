import { ReactNode } from "react";

interface Props {
  title?: string;
  children?: ReactNode;
  rightHeader?: ReactNode;
  titleWithLabel?: ReactNode;
}

const WrapperSection = ({
  title,
  children,
  rightHeader,
  titleWithLabel,
}: Props) => {
  return (
    <section className="flex flex-col gap-5 py-8">
      {title && (
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <h1 className="text-lg text-black font-semibold">{title}</h1>
            {titleWithLabel && (
              <p className="text-[13px] text-muted-foreground">
                {titleWithLabel}
              </p>
            )}
          </div>
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
