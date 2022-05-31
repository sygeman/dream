export const Guest = () => {
  return (
    <div>
      <a href={`/api/auth/twitch?continue=/`}>
        <button className="px-2 p-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors delay-75 text-sm font-medium">
          Login with Twitch
        </button>
      </a>
    </div>
  );
};
