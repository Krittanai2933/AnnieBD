import React, { memo, useState, useEffect } from "react";
import "../features/GiftSection.css"; // Import your CSS file for animations

const GiftSection = memo(({ data }) => {
    const [isBoxOpen, setIsBoxOpen] = useState(false);
    const [count, setCount] = useState(0);

    // Automatically open the gift box after a delay
    useEffect(() => {
        const openBoxTimeout = setTimeout(() => {
            setIsBoxOpen(true);
        }, 2000); // 2000ms delay before the box opens

        return () => clearTimeout(openBoxTimeout);
    }, []);

    // Handle the count-up animation when the box is open
    useEffect(() => {
        if (isBoxOpen) {
            let start = 0;
            const end = 4071;
            const duration = 3000; // Duration for the count-up animation in ms
            const incrementTime = duration / end;

            const countInterval = setInterval(() => {
                start += 1;
                setCount(start);
                if (start >= end) clearInterval(countInterval);
            }, incrementTime);

            return () => clearInterval(countInterval);
        }
    }, [isBoxOpen]);

    return (
        <div className="relative">
            <div className="flex flex-col gap-4">
                <div className="p-2 !bg-[#fbfbfb74] rounded-lg shadow-sm ">
                    {Array.isArray(data)
                        ? data.map((message, index) => (
                              <div
                                  className="text-lg p-2 text-start"
                                  key={index}
                              >
                                  {message}
                              </div>
                          ))
                        : null}
                </div>
                <div className="p-4 py-8 flex flex-col text-center gap-4 rounded-lg items-center">
                    <p className="font-bold text-[#f78da4] text-xl">
                        ขวัญปีนี้
                    </p>
                    <div
                        className={`gift-box-container ${
                            isBoxOpen ? "open" : ""
                        } w-[300px] h-[380px] rounded-lg shadow-lg`}
                    >
                        {!isBoxOpen ? (
                            <div className="gift-box bg-[#c6d998] rounded-lg flex items-center justify-center w-full h-full">
                                {/* Replace this with an animated gift box image or icon */}
                                <div className="gift-animation">
                                    🎁 {/* Example: You can use a real gift box icon here */}
                                </div>
                            </div>
                        ) : (
                            <div className="count-up-box bg-[#c6d998] rounded-lg flex items-center justify-center w-full h-full">
                                <span className="text-3xl font-bold text-[#f78da4]">
                                    {count} sat
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default GiftSection;
