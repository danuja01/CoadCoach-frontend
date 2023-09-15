import { twMerge } from "tailwind-merge";

// eslint-disable-next-line no-unused-vars
const usefulLinks = [];

const Footer = ({ className }) => {
  return <footer className={twMerge(``, className)}>footer</footer>;
};

export default Footer;
