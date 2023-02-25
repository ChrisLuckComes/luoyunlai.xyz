import githubLogo from '@/images/githubLogo.png';
import { LazyImage } from './component/image';

const classMap = {
  home: 'flex-center flex-col w-full h-full'
};

export default function Home() {
  return (
    <div className={classMap.home}>
      <LazyImage width="450" height="450" src={githubLogo} />
      <div>Luoyunlai.top</div>
      <div className="text-assist">分享前端方面的知识和经验</div>
    </div>
  );
}
