
type GameBannerProps = {
    bannerUrl: string;
    title: string;
    adsAcount: number;
}

function GameBanner({bannerUrl, title, adsAcount}: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden block ml-4">
        <img src={bannerUrl} className="w-full"/>
        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute left-0 right-0 bottom-0">
            <strong className="font-bold text-white block">{title}</strong>
            <span className="text-zinc-300 text-sm block ">{adsAcount} anúncio(s)</span>
        </div>
    </a>
  )
}

export default GameBanner