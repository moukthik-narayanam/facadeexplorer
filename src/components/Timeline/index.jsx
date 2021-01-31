// import React, { useState } from 'react';
// import HorizontalTimeline from 'react-horizontal-timeline';

// export default function Timeline(props) {
//     const [slideNo, setSlideNo] = useState(0);
//     const [prevNo, setPrevNo] = useState(0);

//     return (
//         <div>
//             {/* Bounding box for the Timeline */}
//             <div style={{ width: '60%', height: '100px', margin: '0 auto' }}>
//                 <HorizontalTimeline
//                     index={slideNo}
//                     indexClick={(index) => {
//                         setSlideNo(index);
//                         setPrevNo(slideNo)
//                     }}
//                     values={props.slides} />
//             </div>
//             <div className='text-center'>
//                 {/* any arbitrary component can go here */}
//                 {slideNo}
//             </div>
//         </div>
//     )

// }


import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

const variants = {
    enter: (direction) => {
        return {
            opacity: 0
        };
    },
    center: {
        opacity: 1
    },
    exit: (direction) => {
        return {
            opacity: 0
        };
    }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

export const Timeline = (props) => {
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const slideIndex = wrap(0, props.slides.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className="d-flex carousel-container p-2 border-left-0 rounded-right">
            <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
            </div>
            <AnimatePresence exitBeforeEnter={true} >
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 0.2 }
                    }}
                >
                    <div className="d-flex flex-column h-100 px-4">
                        <div className="d-flex flex-row" style={{ height: "65%" }}>
                            <iframe src={props.slides[slideIndex].videoThumb} width="480" height="360" style={{ top: "50%", transform: "translateY(-50%)", position: "relative" }}></iframe>
                            <div className="rounded mx-auto d-block carousel-image" style={{ backgroundImage: `url(${props.slides[slideIndex].imageThumb})` }} alt="" />
                        </div>
                        <div className="my-2">
                            <h6>{props.slides[slideIndex].heading}</h6>
                            <div>{props.slides[slideIndex].description}</div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
            <div className="next" onClick={() => paginate(1)}>
                {"‣"}
            </div>
        </div>
    );
};
