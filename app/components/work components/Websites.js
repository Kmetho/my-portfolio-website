import Image from "next/image";

export default function Websites() {
  return (
    <div className="max-h-screen h-full overflow-y-scroll border border-black">
      {/* Heading */}
      <div className="w-full bg-white border-b-2 border-black pt-[5px] pb-[10px]">
        <h2
          className="
          text-2xl font-display w-fit
          border border-black rounded-full
          px-3 py-2 m-4
          bg-white
          shadow-[10px_10px_0_0_black]
        "
        >
          websites
        </h2>
      </div>

      {/* Grid */}
      <div className="font-text bg-white grid grid-cols-1 md:grid-cols-2">
        {/* Card */}
        <div className="grid">
          <Image
            className="w-full h-full object-cover"
            src="/images/paulina.png"
            width={1000}
            height={500}
            alt=""
          />
          <p
            className="
            -mt-10 ml-2 mr-auto mb-4
            px-3
            bg-white rounded-xl
            border border-black
            shadow-[10px_10px_0_0_black]
          "
          >
            Next.js, data fetching, JSX, CSS, UI,{" "}
            <a
              href="https://flower-finder.netlify.app/"
              target="_blank"
              className="text-blue-600 underline"
            >
              link
            </a>
          </p>
        </div>

        {/* Repeat */}
        <div className="grid">
          <Image
            className="w-full h-full object-cover"
            src="/images/paulina.png"
            width={1000}
            height={500}
            alt=""
          />
          <p className=" -mt-10 ml-2 mr-auto mb-4 px-3 bg-white rounded-xl border border-black shadow-[10px_10px_0_0_black]">
            React, JSX, CSS, UI,{" "}
            <a
              href="https://1vrfkp.csb.app/"
              target="_blank"
              className="text-blue-600 underline"
            >
              link
            </a>
          </p>
        </div>

        <div className="grid">
          <Image
            className="w-full h-full object-cover"
            src="/images/paulina.png"
            width={1000}
            height={500}
            alt=""
          />
          <p className=" -mt-10 ml-2 mr-auto mb-4 px-3 bg-white rounded-xl border border-black shadow-[10px_10px_0_0_black]">
            Three.js, HTML, CSS, Blender,{" "}
            <a
              href="https://crystalssss.netlify.app/"
              target="_blank"
              className="text-blue-600 underline"
            >
              link
            </a>
          </p>
        </div>

        <div className="grid">
          <Image
            className="w-full h-full object-cover"
            src="/images/paulina.png"
            width={1000}
            height={600}
            alt=""
          />
          <p className=" -mt-10 ml-2 mr-auto mb-4 px-3 bg-white rounded-xl border border-black shadow-[10px_10px_0_0_black]">
            HTML, CSS, working with the designer,{" "}
            <a
              href="https://paulinarams.com/"
              target="_blank"
              className="text-blue-600 underline"
            >
              link
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
