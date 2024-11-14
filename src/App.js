import { Fade } from 'react-slideshow-image';
import { useState, useEffect } from 'react'; // เพิ่ม useEffect
import 'react-slideshow-image/dist/styles.css'
import { _birthdayMessages, _messages } from "../src/assets/mock/mock";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { _albums } from "./assets/mock/mock";
import { useModal } from "./hooks/useModal";
import { Header, MessageSection } from "./components/ui";
import { MemoryZone } from "./components/common";

function App() {
    const { isModalVisible, currentImage, openModal, closeModal } = useModal();

    const messageRef = useRef(null);
    const memoryZoneRef = useRef(null);

    const isInViewMessageRef = useInView(messageRef, {
        once: true,
        amount: 0.2,
    });
    const isInViewMemoryZoneRef = useInView(memoryZoneRef, {
        once: true,
        amount: 0.2,
    });
    const initialTimestamp = 1729603809; // Unix timestamp 
    const [timer, setTimer] = useState(Math.floor(Date.now() / 1000) - initialTimestamp);
    useEffect(() => {
        const interval = setInterval(() => {
          setTimer(Math.floor(Date.now() / 1000) - initialTimestamp);
        }, 1000); //  timer update every sec
    
        return () => clearInterval(interval); // clear interval for component unmount
      }, [initialTimestamp]);

      const days = Math.floor(timer / (60 * 60 * 24));
      const hours = Math.floor((timer % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((timer % (60 * 60)) / 60);
      const seconds = timer % 60;

    return (
        <div>
            <div className="aura" />
            <div className="flex justify-center h-auto overflow-y-auto aura">
                <div className="flex flex-col items-center max-w-[350px] py-12 gap-16 relative">
                    <Header
                        content={{
                            title: "สุขสันต์วันเกิดค่ะ",
                            subtitle: "Annie🎉",
                        }}
                    />
                    <div className="w-[245px] h-[320px] rounded-lg shadow-lg mb-12">
                        <Fade>
                            {_albums.map((image, index) => (
                            <div key={index} className="each-fade">
                                 <img 
                                     src={image} 
                                    alt={`image_${index}`} 
                                    onClick={() => openModal(image)} 
                                    loading="lazy" 
                                    className="border-none bg-[#a7e6f76b] rounded-lg cursor-pointer w-full h-full object-cover" 
                                />
                            </div>
                            ))}
                         </Fade>
                    </div>

                    <MessageSection
                        data={_messages}
                        ref={messageRef}
                        isInView={isInViewMessageRef}
                    />
                    <MemoryZone
                        ref={memoryZoneRef}
                        isInView={isInViewMemoryZoneRef}
                        data={
                            //ข้อความ section birthday
                            _birthdayMessages
                        }
                    />
                    <div className={`pb-20 font-bold text-[#fec3ca] text-3xl`}>
                        เราอยู่ด้วยกัน💕 <br />
                        มาตลอด {days} วัน {hours} ชั่วโมง <br />
                        {minutes} นาที {seconds} วินาที แล้วค่ะ
                    </div>
                </div>
            </div>

            {isModalVisible && (
                <div className="modal show" onClick={closeModal}>
                    <div className="modal-content">
                        {currentImage && (
                            <img
                                src={currentImage}
                                alt="Preview"
                                className="modal-image"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
