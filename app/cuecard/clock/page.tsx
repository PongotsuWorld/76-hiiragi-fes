import Clock from "../clock"
import "./clock.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const clock = () => {
  return(
    <>
      <div className="box">
        <p className={`${roboto.className} clock`}><Clock /></p>
      </div>
    </>
  )
};

export default clock;