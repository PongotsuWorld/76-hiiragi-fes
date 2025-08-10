import Image from "next/image";
import Link from 'next/link';

export const metadata = {
  title: "HOME",
};

const Home = () => {
  return (
    <>
      <div className="app">
        <h1>ホームだにょ</h1>
        <div className="home-cards">
          <div className="home-card">
            <Link href="clock/">Clock</Link>
          </div>
          <div className="home-card">
            <Link href="receiver/">Receiver</Link>
          </div>
          <div className="home-card">
            <Link href="sender/">Sender</Link>
          </div>
          <div className="home-card">
            <Link href="observer/">Observer</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
