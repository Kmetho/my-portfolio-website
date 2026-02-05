import Image from "next/image";

export default function BlenderRender() {
  return (
    <div className="max-h-screen h-full overflow-y-scroll border border-black">
      {/* Heading */}
      <div className="w-full bg-white border-b-2 border-black pt-[5px] pb-[10px]">
        <h2
          className="
            text-2xl font-normal w-fit
            border border-black rounded-full
            px-3 py-2 m-4
            bg-white
            shadow-[10px_10px_0_0_black]
          "
        >
          blender renders
        </h2>
      </div>

      {/* Grid */}
      <div className="bg-white grid grid-cols-1 md:grid-cols-2">
        <Image
          className="w-full h-auto"
          src="https://64.media.tumblr.com/e372ae57edae74bfab6deef76cc605e3/ac038d8a3a3c7b32-75/s2048x3072/4c8a733d85a51824ff1d7d53db2fbb7601469ad7.pnj"
          width={500}
          height={500}
          alt=""
        />
        <Image
          className="w-full h-auto"
          src="https://64.media.tumblr.com/f2667b5002c0e07125962b43ba7ddc59/2dae4127e7f629cb-ff/s2048x3072/2608d72444e76d88f38e127c0668b82ed8396ca7.pnj"
          width={500}
          height={500}
          alt=""
        />
        <Image
          className="w-full h-auto"
          src="https://64.media.tumblr.com/5b25054ecd2377ef94855f554784ddd0/49153f79c104ee77-30/s640x960/01b5460ae8416fa0d88ddf293e6ae65bfe82e220.pnj"
          width={500}
          height={500}
          alt=""
        />

        <Image
          className="w-full h-auto"
          src="https://64.media.tumblr.com/31e9713b23ab3d18ac809ec8c42f37e5/06e59a41755c5aa1-e9/s1280x1920/430ced8021f92d90d7a3e0bcae44f7f346a12d9e.png"
          width={500}
          height={500}
          alt=""
        />

        <Image
          className="w-full h-auto"
          src="https://64.media.tumblr.com/abda532ea8c4ed0a90e712b5073b88c4/f77a01acf381f610-62/s2048x3072/7e95733d6aa55be9d8354114b869ab218865cd1f.pnj"
          width={500}
          height={500}
          alt=""
        />
        <Image
          className="w-full h-auto"
          src="https://64.media.tumblr.com/4a1008e73eb7f596f4bd46890dfb9ded/12e106bdbbce1104-64/s2048x3072/c86fd263f941593649460bfdb235f64ffd4c8ca2.pnj"
          width={500}
          height={500}
          alt=""
        />
        <Image
          className="w-full h-auto"
          src="https://64.media.tumblr.com/0e17e172dddefab765787bffade03146/90ddb00def9dfeb5-a4/s2048x3072/627395f504ffdd6f2e02f1da1fb8b87cb9e5289f.pnj"
          width={500}
          height={500}
          alt=""
        />
      </div>
    </div>
  );
}
