import { useEffect, useState } from "react";

const useMobile = (targetSize = 768, height?: boolean) => {
  const [mobile, setMobile] = useState<boolean>();

  useEffect(() => {
    setMobile(height 
      ? window.innerHeight <= targetSize
      : window.innerWidth <= targetSize
    );
  }, [targetSize, height]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setMobile(height 
          ? window.innerHeight <= targetSize
          : window.innerWidth <= targetSize
        );
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [mobile, targetSize, height]); 

  return mobile;
}

export default useMobile;