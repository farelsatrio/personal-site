import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

// Root layout hanya untuk non-matched routes (404, dll)
// Tidak perlu <html> dan <body> karena locale layout yang handle
export default function RootLayout({ children }: Props) {
  return children;
}