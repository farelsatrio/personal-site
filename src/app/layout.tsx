import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Since we have a `[locale]` layout, this layout is only used for non-matched routes (e.g. 404)
export default function RootLayout({ children }: Props) {
  return children;
}
