import { twMerge } from "tailwind-merge";

// eslint-disable-next-line no-unused-vars
const internalNavLinks = [];

const Header = ({ className }) => {
  return <header className={twMerge(``, className)}>header</header>;
};

export default Header;
