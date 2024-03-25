import { useEffect, useState } from "react";
import { decode } from 'blurhash'
import { getDataUrlFromArr } from "../../utils/url";

interface Props {
  blurhash: string | undefined | null;
  src: string;
  srcset?: string;
  width?: number | undefined;
  height?: number | undefined;
}
export const CommonBlurhash: React.FC<Props> = ({blurhash, src, srcset, width, height}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [placeHolder, setPlaceHolder] = useState<string>()

  useEffect(() => {
    const img = document.createElement("img")
    img.onload = () => {
      setIsLoaded(true)
    }
    img.src = src
    if (srcset)
      img.srcset = srcset

    if (blurhash) {
      const pixels = decode(blurhash, 32, 32)
      setPlaceHolder(getDataUrlFromArr(pixels, 32, 32))
    }

  }, [])
  return (<div className="border border-base rounded-lg w-full h-full">
    {isLoaded || !placeHolder 
      ? <img className="w-full h-full object-cover" src={src} srcSet={srcset} width={width} height={height}/> 
      : <img className="w-full h-full object-cover" src={placeHolder}  width={width} height={height}/>}
  </div>)
}
