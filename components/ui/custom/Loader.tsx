export default function Loader({ dark }: { dark: boolean }) {
  return (
    <span
      className={`border-2 rounded-full animate-spin w-5 h-5 border-transparent ${
        dark ? "border-t-primary" : "border-t-secondary"
      }`}
    />
  );
}
