import { createSignal } from 'solid-js';

const IndexPage = () => {
  const [fullVahui, setFullVahiu] = createSignal(false);

  return (
    <div class="text-white insert-0 flex justify-center items-center h-screen w-screen">
      <img
        src="/vahui.webp"
        onClick={() => setFullVahiu((fullVahui) => !fullVahui)}
        classList={{ 'rounded-lg': true, 'scale-[5]': fullVahui() }}
      />
    </div>
  );
};

export default IndexPage;
