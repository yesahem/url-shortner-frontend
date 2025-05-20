import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function Welcome() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen flex justify-center ">
      <div className=" min-w-[85%] my-18">
        <div className=" ">
          <div className="text-3xl text-center">Chotu.Link</div>

          <br />
          <div className="text-2xl italic text-center ">
            Kaate <span className="line-through text-blue-700">Link</span> sabse
            Tez
          </div>
        </div>

        <div className=" min-w-[60%] min-h-72   mt-5 ">
          <div className="text-center mt-3 mb-2 text-2xl text-blue-400  ">
            Paste a Valid URL
          </div>
          <div className="flex justify-center">
            <Input type="text" className="h-12 w-[60%]" ref={inputRef} />
            <Button
              variant={"default"}
              size={"default"}
              className="bg-blue-600 ml-0.5  h-12 cursor-pointer"
              onClick={() => {
                const validURL = new URL(inputRef.current?.value!);
                console.log("isURl valid: ", validURL);
                if (validURL instanceof URL) {
                  console.log("valid url mkc ");
                  console.log("URL.href ko db me daalna hai mitra");
                }
              }}
            >
              {" "}
              Short URL{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
