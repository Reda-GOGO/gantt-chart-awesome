import { useDispatch, useSelector } from 'react-redux';
import { setPanelsWidth } from '../libs/features/panelsWidthSlice.js';
import { useEffect } from 'react';

function useAdjustPanel(taskContainer, spliter, taskTable, taskChart, phTaskTable, phTaskChart) {
    const dispatch = useDispatch()

    useEffect(() => {
        if (spliter.current !== undefined &&
            taskContainer.current !== undefined &&
            taskTable.current !== undefined &&
            taskChart.current !== undefined &&
            phTaskChart.current !== undefined
            && phTaskTable.current !== undefined) {
            spliter.current.onmousedown = (event) => {
                let delta
                let md = {
                    event,
                    offsetX: spliter.current.offsetLeft,
                    offsetY: spliter.current.offsetTop,
                    firstWidth: taskTable.current.offsetWidth,
                    secondWidth: taskChart.current.offsetWidth
                }
                phTaskTable.current.style.width = `${md.firstWidth}px`;
                phTaskChart.current.style.width = (md.secondWidth) + "px";
                phTaskTable.current.style.minHeight = `500px`;
                phTaskChart.current.style.minHeight = "500px";
                document.onmousemove = adjustSize
                function adjustSize(e) {

                    delta = {
                        x: e.clientX - md.event.clientX,
                        y: e.clientY - md.event.clientY
                    };

                    spliter.current.style.left = delta.x + "px";
                    taskTable.current.style.width = `${(md.firstWidth + delta.x)}px`;
                    phTaskTable.current.style.width = `${(md.firstWidth + delta.x)}px`;

                    taskChart.current.style.width = (md.secondWidth - delta.x) + "px";
                    phTaskChart.current.style.width = (md.secondWidth - delta.x) + "px";

                    dispatch(setPanelsWidth({
                        first: (md.firstWidth + delta.x),
                        second: (md.secondWidth - delta.x)
                    }))

                    taskContainer.current.style.userSelect = 'none'
                }
                document.onmouseup = finishAdjusting

                function finishAdjusting() {
                    document.onmouseup = ''
                    document.onmousemove = ''
                    taskContainer.current.style = 'user-select: auto;'
                    phTaskTable.current.style.width = `0px`;
                    phTaskChart.current.style.width = "0px";
                    phTaskTable.current.style.minHeight = `0px`;
                    phTaskChart.current.style.minHeight = "0px";
                    

                }
            }
        }
    }, [])
}

export default useAdjustPanel