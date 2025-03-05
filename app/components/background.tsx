export default function Background() {
  return (
    <div className="w-full h-full absolute top-0 left-0 overflow-hidden z-0">
      <div className="w-[1000px] h-[1000px] rounded-full left-[-200px] top-[-200px] absolute blur-2xl bg-radial-[at_0%_0%] from-accent to-transparent to-65%" />
      <div className="w-[800px] h-[800px] rounded-full right-[-200px] bottom-[-200px] absolute blur-2xl bg-radial-[at_100%_100%] from-primary to-transparent to-65%" />
    </div>
  );
}
