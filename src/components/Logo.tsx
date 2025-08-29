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
      <img
        src="./src/assets/logo.png"
        alt="Vista SysTech"
        className="size-fit"
      />
    </div>
  );
}
