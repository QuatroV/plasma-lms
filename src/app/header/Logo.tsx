import Image, { ImageProps } from "next/image";
import BlobLogo from "public/blob-logo.png";
import BlobLogoWhite from "public/blob-logo-white.png";

type Props = Omit<ImageProps, "src" | "alt"> & {
  white?: boolean;
};

const Logo = ({ white = false, ...other }: Props) => {
  return (
    <Image
      src={white ? BlobLogoWhite : BlobLogo}
      alt="Logo"
      height={120}
      width={120}
      {...other}
    />
  );
};

export default Logo;
