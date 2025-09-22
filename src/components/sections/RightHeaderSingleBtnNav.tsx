import Link from "next/link";

interface Props {
  name: string;
  slug: string;
}

const RightHeaderSingleBtnNav = ({ name, slug }: Props) => {
  return (
    <Link href={slug} className="text-sm font-[500]">
      {name}
    </Link>
  );
};

export default RightHeaderSingleBtnNav;
