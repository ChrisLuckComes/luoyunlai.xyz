import githubLogo from '@/images/githubLogo.png';
import { LazyImage } from './component/image';

const classMap = {
  home: 'flex-center flex-col w-full h-full'
};

export default function Home() {
  return (
    <div className={classMap.home}>
      <LazyImage width="450" height="450" src={githubLogo} />
      <div>一个5年前端程序员的小站，分享前端方面的经验总结</div>
      <div className="text-assist">顺便练一下react</div>
    </div>
  );
}
