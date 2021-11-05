import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faTwitch,
  faDiscord,
} from '@fortawesome/free-brands-svg-icons';

const SocialLink = ({ link, icon }) => (
  <a href={link} target="_blank" className="underline">
    <FontAwesomeIcon
      icon={icon}
      className="text-white mx-2 h-6 opacity-50 hover:opacity-100 transition-all"
    />
  </a>
);

export function Index() {
  return (
    <div className="h-screen bg-background flex relative">
      <div
        className="absolute h-full w-full"
        style={{ filter: 'blur(14px) brightness(0.5)' }}
      >
        <ReactPlayer
          url="https://www.youtube.com/watch?v=RR2EI8EEOOw"
          width="100%"
          height="100%"
          muted
          playing
          loop
          controls={false}
        />
        <div className="absolute h-full w-full opacity-80 bg-background z-10"></div>
      </div>
      <div className="absolute h-full w-full z-10 flex justify-center items-center">
        <div className="text-center">
          <div className="text-4xl font-medium">SGMN.DEV</div>
          <div className="text-md text-accent">Some aRolf web development</div>
          <div className="mt-4">
            <div className="font-medium text-accent flex justify-center">
              <SocialLink link="https://github.com/sygeman" icon={faGithub} />
              <SocialLink
                link="https://www.twitch.tv/sygeman"
                icon={faTwitch}
              />
              <SocialLink
                link="https://discord.gg/vzDa3CQZgR"
                icon={faDiscord}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
