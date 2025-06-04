
import { ReactNode } from "react";

interface InitializationCheckerProps {
  children: ReactNode;
}

const InitializationChecker = ({ children }: InitializationCheckerProps) => {
  // For now, just render children without checks
  return <>{children}</>;
};

export default InitializationChecker;
