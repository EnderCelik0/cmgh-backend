export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-6 text-2xl ">{children}</div>;
}
