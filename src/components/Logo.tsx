import LogoImg from "../assets/logo.png";

export default function Logo({
  className = "",
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <img src={LogoImg} alt="Vista SysTech" className="size-fit" />
    </div>
  );
}
