import { CartPageClientWrapper } from "./CartPageClientWrapper";
import { User } from "@/core/domain/user";

interface CartPageClientProps {
  user: User;
  token: string;
}

export default function CartPageClient({ ...props }: CartPageClientProps) {
  return <CartPageClientWrapper {...props} />;
}
