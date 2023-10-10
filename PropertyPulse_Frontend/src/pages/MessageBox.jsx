import { BsFillSendFill } from "react-icons/bs";
const MessageBox = () => {
  return (
    <div className=" relative border flex flex-col border-slate-200 shadow-sm rounded-sm min-h-[calc(100vh-100px)] bg-slate-100 w-full">
      <div className="flex items-center p-2 text-slate-600 font-semibold cursor-pointer border-b-2">
        <img
          className="h-[40px] w-[40px] rounded-full object-cover mr-4"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH4AvQMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQIDBgEHAP/EADsQAAIBAwMCAgcFBwQDAQAAAAECAwAEEQUSITFBE1EGFCIyYXGRQlKBobEVIyQzYsHwB4LR4UNTcjT/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAeEQEBAQEAAwEBAQEAAAAAAAAAARECAxIxIUFRE//aAAwDAQACEQMRAD8A8oDMGGG4q+Bzt5OeaXrI4IJXp5UwtlJQEjGazXF26uFjUttd2UGgtxJGePpV8d8DwwxVTR1U8YxSA1rhQM5GKEuL0bSFcA0uvSypgMcUAST1NVIVow3V0TgScVS08596U19bEkkZqaxBic0yDs8h6yE1zk9zRfgoBz+tfBEPQZPwFGjAm0/OuhPhRojGew+dd2fAUewwEI6kAy8CiwnwqO328UaMDKzBiKsAkPepIoMhBoiMDcPnQcUCGQjNdFuT1NPYIUaDOO1CbRuPFLQBW2XvVq2yfdzVsjBTUfFI6UBZFaqWUbR1o6W2dCFRDgeQpcly6sCM8Gn66wGjQgKrYw2R1pGQWSbossMnNFquKpsB+4/GigKdEcxUgK6BUwtIKytQdOKI21CReKAS6iuFpbTXU/cpV3q4ir7X3zVhk8PIABzVMJ27j8KlBDJcy7YwTilTj5VeYnAzRcYjjUMo/eDseh/Gmdl6OXMhDdK0mkegj3M4a4cLGOSBWd7jWcdVmEuILmJd8O5xwfOrPUYpyfV3MbjqknevWdM9A9Mt23bScedR9KfRC0l0+ae0jCXESEoV745xU+6/+f48ZkjMTlGGCDVJ/mU2vEWe3WQjEuOaVFT4grSVjZiqMfvjV6DBzUYULTNiivAYdjQQiK62xbapLZYmpxwmrhBSUEMYY5NSWEUUIvhVkcYPagBVtxXJ7f3eKbxW/wAK7Pbj2eKchWlNgv8ADj50SBVVgP4cfOiMc06HyipgV8oqaikEcVGQcGrsVCQcUAj1UexSjvTnVv5dJu9VE1Nc7Wx5Vo/RmJQGOATnyrOIfZb5VofR5hDbNNI2FL4A71Pfxfj+t7poXgYrUWTMiqQKwdhrsMEih4phnoSnWtZZarDd2wkhOdqknjBH4VzdSuvmytRbyPya+upf4d2foFJNY4+msds4jitpJQDgsSFBP40707XYNUgCz27W/iqRncGXBHfyoy5pWzXj2pAJckL/ACwTilbe+M08160ms9VuLSUEvC55IxuXr+mKQv74x510c/HN19XWABumzinpgVo+AKzto+y4Y02F+AMA09QLgtlMgBxV89mUHApdFfFZA+elMpNbV4wAmaVMOLfNcEe1gKg1+WJwOtR8VnINT+nhrAoIqUqA46UuSWTtVpMpxVyiwtsB/DiiMVXYL/DLV+2mT5RxUwK4oqYoD7FVydKsJqieRVQknFBE+r48Ok3emGo3SynatLj1qomi9NiWa6WJxkPxWn0WFZbULsQNGTjC45yRWX05/DuomPA3AE1rtM3QymIFSVOM+fes/I28eL7fTbiSRZJ2ZupKY/Q9q0XoXam41K8gaQ5SMAAHHJB/6oV7iSO1ZiyKQM5HJ/z60f6CT29ncyO8y8n2sH4Vjux0TmTotuvR6eaaFo0mTOAzocFGB9ofrWs0nSZLaDxWaRyE4VwPLgfXzq/VbiN1Fzp80cqH39nPNEaTdpLGN8gJz0AwM1N6/wBX6f2M16Z6NF6vrd/IZDItlD4R6+0rHdn5qF/OvK5B7Qr2z0wuLeP0a1rxpUV5YjDECeWdl6AfJj+deLyjDCtvF8cvmz2/A6L++aiYYy/TtVKZ8dwKZab7jhhWmMUEjOau8MDnpVg2765MfKg3FAHPFHWlsZs7R08qXkMo5p/6Oyx8h8UqcUC32NgjmjY7cFelWzRqZMgiiIlGyo1eMpp4/hkogrRVtpxhhCEk471M2nxrRAMLX2KOFoPOotaDzoIpu7lIFJJ5rP3l9JOxCgha1k+lpMfa5qv9jQge4KAxeCe3Nc8Nj9k1tP2REPsD6VNdKj+4PpT0sYsROq5KnBpvpd/Mu7eS7IoxnrgGn7aWmOUAHypdeW8KsUt0PioNxPYgdRSs0+blXapd3UzBbcsEIBJC54qOl2V5ES8NyFZzySD/AMVzSbxSfBlO3GByKdev3NmBHZQpLvBJ4PFZfHTMt2j7a11sW5jtHmaInIyuBj5mirK8mhtbc5xK03htnyH/AHTew1J4dNC3bRpIUGUQYwcUj01JtV1BbSx4JdizEcRgnlj/AJ1rOzWlsnxm/S2/W61y4cqSRgcduBSCaTJBCNXseo/6fWUt0wtLlkkkTxFWYAqe3UfH51nNT9EL7TVZ7mzzEP8Ayx+0v/I/Gur0vMcVstee27YuS5RsUXFPsLYRsGtGLKAfZWpmyhVdxRcfKkGb8dt24RtXzSyN0jatILeDjAUZ+Fd9XhH3fpSNmt8zDHhNV1tPcwHMcRrRLDD5r9KsWGEfd+lLD0kF5fHpEc/KrFudSI4iIp5GkAdV4yx4p5Dpi7B7A+lHqNJyoqpx2HWiT0qsiqSXlbgE+XauiOdqPC1Yq0Au9Wm86ttbC5nkCrkmmUabmCjqTT2GAW0MmxcSR8t/UR1q+OPZPXWFcehMVzI/0FSOlRR9gSPOtUY0KB0911BHyoO4txuxjOa3nEjO9VmLyzVh7PX5Vmry2Ed/EzLnxAUJrdPDlXX/ANZ5+NZ/WrPMCzKMmOTd+FO86JWNmtxcM232LiNijf1YNH2dxcW8PhNBIH6bgufzFHXmltNKLq0G5mHtoOrcdRV2kMvCynBBxzxXF5Obzf11+O+3x22h1XV5FhtYmijICtJJwPwHWt9o1na+jWkTSkfy0Mksh6uQM819pccVtCHXaQwzwaSemV/PqNt+xNNBa6vj4SgfH+w6n4A1lN6uNbnM1s7SVp7zSCcFjYB27dSpNHXd34d0kZU5c7cdsUHpFvs1SWTIaOCBLZD57Ryfrx+FDXs+daVWJxjg16mfmPN3+qtW9DtL1PeLBfULs8+IoJTPcFc4+mKz8/odqMcbR5iuY17xnDH8DWpN5Lp80bO25Wbn5U13Rl/EGPDYZxjpWXXEqp3Y8nn0hoZQhVlK9QRg119PU9Ac16pDBbapaE3UYZWY7M9QB3BrLavpLadchT7UT5Mb+Y8j8RWXXGNJ1rKjTBgHB61f+zlYcCmyx81dHEAc96jFaBtNIiG1mHtDoTTpEAUCoxirKeDXnUrXatlVOPnRcJk8PdKMfM1ndB1i4e7lS6cOoXI4pg18k9tIQ7A5wBilmH9MBe26ttaRQfKrYr63eTZvGazV1pcryQSpnaTyaYxaPMlxHKVxH1zmmeRp7aIyRyFOoGQfj2rQuRNGl3F7lwmSPusByKWaDGGlmtz7zR7l+lMNLHM9i32x4kfwYdfrXV45kc/V2mGm4fRrYjsu36ZH9q+kTenxBr7RedMZPuSuPzz/AHqxe9UknUfx80ZHvKDQLW+64e3YfFRTCXEetRH74INR1eFoJkuE42nk0yZu4tZrOZQiEK5OP6TQUMSzEXB3AnHi7h0b/P0rfx28Go2wJX4j4Uj1LR5tPMksLLJBLy8bdNw7jyNZ98e0xpx360s/aZghMUcm7ttX/PhRHoteS2l9eSG0Et26hIpnX+W5I9kfDHJ/AU50XSvUbZ7lgRNOB7BHuDt+PP50bolkp1FcncsRZ8nqWP8AhqPH4fX9qvJ5d/IexItrGIxnKqMsepPcmkMx9Y1njog5ptfT7Q7EilOmLmK6u3HLEgfKtmInW18S1Rl58sdqptL/AMXSSgb94vBq2KUS2gjftSeNDFqCxLwHYcUjaq3kNvCkQIGxVRc+YHP96Nv7SO+00wuPaAyjHqG7Un8YPdsMZ2NwPNs05hlzJyfZiG5z/V5UuocrCDg89f0qwPikv+oGs3Gi+k8sKwHwZ0WaN+xz72PxB/Kl9x6Sm0hieaMt4nTHyrlv5W31qJb2CDAkkCk9iap/bFn/AO9frXlXpbrD392jRO6KAcgHFIUuZlGPEfr96mK2cljp9hE8sBO8juaEtbqT1TO1Cu7yqNw0jEKW4+VUBAOB08qzvVrTI0vriJZpk8U1hnEtiuSdu7t2FYZpSoweR5Vp/RLdPDM7nIDBAPLjJp8besLrJGpG+0lt7uP7GOezDvTm+ASSLUbYEqpDOg7A9aXaYhk0udGwfCYqM+WKYaO5nspbf7duoKO3OVP2T513Ry0TpDAXl/EpGwyCRP8A5ZR/3UnJjn2npml+gyBdYuI0BCmIcZ6cnj5UfqnsSBh1zToKdWYJf28g7NTq/hWa1BxwRWf1lsmJvjWnsz42moT9ygE/o6/hXUtux4zxTC/TfqNnER+7Zizjz2jP64pVF+71RsfeFPbv/wDdbeZD4+FAB63hQiRNs9rIFEaEvh28sh6nvQGusyvb9OCRimNp7Gk7h1NF/JhQBqk5KmNTkscUXHCIdNSIdSvNKUb1i8TPQnOKdXPDIvalTKm3QrntQlkfH1eNj0Ugmi9TYpARSzTSwgvZlxuSFyvzwcUQGml3ayXkku4ZGWAPfyp3aSeJH4EbZZvePz6msZZv6qjheSo9pu5xWu0WP1WyS5kO+WZQ5PkD0FOlCH/WOwtpfRq2vWZVntbhFjz9pX4K/kG/215nrNxGlnZNwTjp/tr2L01s4tT9CtR9ZUN4I8dD5MvP6ZH414zc28EkEQZScDjPauLy9Z06fHN5ZS/kDzZFDjFaCfT7dzwuKFbToVOKieSKvjr/2Q=="
          alt="profile image"
        />
        <span className="text-lg">Abay Raj</span>
      </div>

      <div className="flex flex-col overflow-y-scroll mb-20">
        <div className="flex-col">
          <div className="flex gap-2 w-[50%] bg-blue-500 p-3 mt-5 text-white rounded-lg ml-5">
            <img
              className="h-[40px] w-[40px] rounded-full object-cover mr-4"
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <p className="text-xs font-semibold tracking-wider">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              esse!
            </p>
          </div>
          <span className="mt-2 ml-5 text-xs text-semibold text-slate-600">
            1hr ago
          </span>
        </div>
        <div className="flex flex-col w-[50%] text-white rounded-lg mr-5 self-end">
          <div className="flex gap-2 bg-gray-700 p-3 mt-5 text-white rounded-lg ml-5">
            <img
              className="h-[40px] w-[40px] rounded-full object-cover mr-4"
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <p className="text-xs font-semibold tracking-wider">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              esse!
            </p>
          </div>
          <span className="mt-2 ml-5 text-xs text-semibold text-slate-600">
            1hr ago
          </span>
        </div>
      </div>
      <div className="w-[100%] absolute left-2 bottom-2 flex items-center gap-5">
        <input
          type="text"
          className="border-none outline-none w-[85%] h-[50px] rounded-[50px] p-3 text-slate-700"
          name=""
          id=""
          placeholder="Write something..."
        ></input>
        <button className="bg-gray-700 w-[40px] h-[40px] p-2 rounded-full flex items-center">
          <BsFillSendFill className="text-white text-xl" />
        </button>
      </div>
    </div>
  );
};
export default MessageBox;