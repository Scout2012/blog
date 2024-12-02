import Image from "next/image";
import { DATA_LOCATION, IMAGES_LOCATION } from "../lib/Global";

const imageLoader = ({ src }) => {
  return `https://s3.us-east-1.amazonaws.com/${DATA_LOCATION}/${IMAGES_LOCATION}/${src}.jpg`;
}

export default function LoadedImage(){
  return (
    <Image
      src="me"
      alt="me"
      height={220}
      width={267}
      quality={100}
      loader={imageLoader}
    />
  )
}