export function Index() {
  return (
    <div className="h-screen bg-background flex">
      <div className="m-auto text-center">
        <div className="text-4xl font-medium">SGMN.DEV</div>
        <div className="text-md text-accent">Some aRolf web development</div>
        <div className="mt-4">
          <div className="font-medium text-accent">
            <a
              href="https://github.com/sygeman"
              target="_blank"
              className="underline"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/vzDa3CQZgR"
              target="_blank"
              className="underline ml-2"
            >
              Discord
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
