import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { calculateDaysBetweenDates } from '../../utils/calculateDate';
import defineRelation from '../../utils/defineRelation.js'
function TaskChartBody() {
    const taskData = useSelector((state) => state.tasksdata.value);
    const expandLines = useSelector((state) => state.expandLines.value);
    const scrollableLeft = useSelector(state => state.scrollableLeft.value);
    const [selectIndex, setSelectIndex] = useState(0);
    const widthCell = useSelector((state) => state.widthCell.value);
    const totalCell = useSelector((state) => state.totalCell.value);
    const currentTotal = useSelector((state) => state.currenttotalCell.value);
    const leftCell = useSelector((state) => state.leftCell.value);
    const [positionX, setPositionX] = useState([]);
    const [widthRatio, setWidthRatio] = useState(0);
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(taskData[0].start);
    const zoomType = useSelector(state => state.zoomtype.value) || 'months';
    const relation = defineRelation(taskData);
    let start = new Date(taskData[0].start);
    start.setMonth(start.getMonth() - 1);
    start.setDate(1);

    const firstMonthsIn = start;
    const startDay = startDate.getDay();
    let firstWeeksIn;
    if (startDay <= 0) {
        firstWeeksIn = new Date(startDate.getTime() - (((6 - startDay)) * millisecondsInDay));
    } else {
        firstWeeksIn = new Date(startDate.getTime() - (((startDay - 1)) * millisecondsInDay));
    }

    const calculateCoordinates = () => {
        let Ratio = 0;
        let XpositionArr = [];
        let firstDayIn = new Date(taskData[0].start);
        if (zoomType === 'months' || zoomType === 'years') {
            Ratio = 12 / 365;
            taskData.forEach((task) => {
                XpositionArr.push(calculateDaysBetweenDates(firstMonthsIn, task.start) * Ratio);
            });
        } else if (zoomType === 'weeks') {
            Ratio = 1 / 7;
            taskData.forEach((task) => {
                XpositionArr.push(calculateDaysBetweenDates(firstWeeksIn, task.start) * Ratio);
            });
        } else if (zoomType === 'days') {
            Ratio = 1;
            taskData.forEach((task) => {
                XpositionArr.push((calculateDaysBetweenDates(firstWeeksIn, task.start)) * Ratio);
            });
        } else if (zoomType === 'hours') {
            Ratio = 24;
            taskData.forEach((task) => {
                XpositionArr.push(
                    calculateDaysBetweenDates(firstDayIn, task.start) * Ratio
                );
            });
        }
        return {
            Ratio,
            XpositionArr
        };
    };


    useEffect(() => {
        let result = calculateCoordinates();
        setWidthRatio(result.Ratio);
        setPositionX(result.XpositionArr);
    }, [zoomType]);

    useEffect(() => {
        setSelectIndex(Math.floor(scrollableLeft / widthCell));
    }, [scrollableLeft, widthCell]);

    return (
        <>
            {
                taskData.map((task, i) => {
                    return (
                        <div key={task.id}
                            style={{ minWidth: widthCell * currentTotal, display: !expandLines[task.id] ? 'flex' : 'none' }}
                            className="relative flex w-full h-6 border-b-[1px] border-gray-300">
                            {Array(totalCell).fill(0).map((_, i) => {
                                if (i + selectIndex < leftCell.length) {
                                    return (
                                        <div key={i} className="absolute h-full border-r-[1px] border-gray-300"
                                            style={{ width: widthCell, left: leftCell[i + selectIndex] }}>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                            <div
                                className="w-full flex justify-center items-center h-6 ">
                                {
                                    (task.duration != 0 )? (
                                        <div
                                    style={{
                                        left: positionX.length > i && !isNaN(positionX[i]) ? positionX[i] * widthCell : 0,
                                        width: task.duration * widthCell * widthRatio,
                                        backgroundColor: relation[task.id].length == 0 ? '#3b82f6' : '#4ade80'
                                    }}
                                    className="absolute h-[18px] ">
                                        
                                </div>
                                    ):(
                                        <div 
                                        style={{
                                            left: positionX.length > i && !isNaN(positionX[i]) ? positionX[i] * widthCell : 0
                                        }}
                                        className="absolute w-4 h-4 bg-fuchsia-600 rotate-45">

                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}

export default TaskChartBody;
