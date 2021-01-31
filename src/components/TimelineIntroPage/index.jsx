import React, { useState } from 'react'
import { timelinesConfig } from '../../slideConfig';
import { Button } from 'react-bootstrap';
import { motion } from "framer-motion";
import { Timeline } from '../Timeline'
export default function TimelineintroPage(props) {

    const [selectedTimeline, setSelectedTimeline] = useState(null);

    return (
        <div className="d-flex justify-content-around p-5 timeline-intro-wrapper">
            {
                timelinesConfig.map((timeline) => {
                    if (!selectedTimeline || selectedTimeline === timeline.id) {
                        return <div onClick={() => { setSelectedTimeline(timeline.id) }} className="d-flex flex-row mx-2">
                            <motion.div whileHover={{ scale: selectedTimeline ? 1 : 1.05 }} whileTap={{ scale: selectedTimeline ? 1 : 0.8 }} >
                                <div className={`timeline-wrapper ${selectedTimeline ? "border-right-0 rounded-left" : "border rounded"}`}>
                                    <div class="align-items-start d-flex flex-column mb-2">
                                        <h6>{timeline.heading + ":"}</h6>
                                        <div style={{fontSize:"12px"}}>{timeline.subHeading}</div>
                                    </div>
                                    <iframe className={"mb-2"} src={timeline.videoThumb} width="310" height="150"></iframe>
                                    <img className="img-thumbnail p-0 mb-2" src={`${process.env.PUBLIC_URL}/${timeline.imageThumb}`} alt="" />
                                    <Button variant="dark">{"Learn more"}</Button>
                                </div>
                            </motion.div>
                            {selectedTimeline && <Timeline slides={timeline.slides} />}
                        </div>
                    } else {
                        return <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.8 }}>
                            <div onClick={() => { setSelectedTimeline(timeline.id) }} className="d-flex flex-column justify-content-center timeline-wrapper p-2 h-100 mx-1">
                                {timeline.heading.split("").map((char) => (<div>{char}</div>))}
                            </div>
                        </motion.div>
                    }
                }
                )
            }
        </div>
    )
}