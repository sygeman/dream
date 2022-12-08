import { createEffect, createSignal } from 'solid-js';

const IndexPage = () => {
  const [fullVahui, setFullVahiu] = createSignal(false);

  createEffect(() => {
    const interval = setInterval(() => {
      setFullVahiu((fullVahui) => !fullVahui);
    }, 2e3);

    return () => clearInterval(interval);
  });

  return (
    <div class="text-white insert-0 flex justify-center items-center h-screen w-screen">
      <img
        src="/vahui.webp"
        classList={{
          'rounded-lg transition-transform': true,
          'scale-[5]': fullVahui(),
        }}
      />
    </div>
  );
};

export default IndexPage;
