import useSWR from 'swr';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSession, signIn, signOut } from 'next-auth/react';
import path from 'path';
// Next.js standalone hook
path.resolve('./next.config.js');

const fetcher = (url) => fetch(url).then((res) => res.json());

const User = () => {
  const { data } = useSWR('/api/link', fetcher);
  const fullLink = `${window?.location?.origin}/${data?.link}`;

  return (
    <>
      <div>
        <CopyToClipboard text={fullLink} onCopy={() => fullLink}>
          <div>Click to copy: {fullLink}</div>
        </CopyToClipboard>
      </div>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
};

export function Index() {
  const { data: session } = useSession();
  if (session) {
    return <User />;
  }
  return (
    <div className="insert-0 flex h-screen w-screen justify-center items-center">
      <button
        className="px-2 py-1 rounded bg-slate-700 hover:bg-slate-800"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </div>
  );
}

export default Index;
