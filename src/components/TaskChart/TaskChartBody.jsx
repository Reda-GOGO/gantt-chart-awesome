import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';
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
    const LeftlineWraperRef = useRef([]);
    const leftlineRef = useRef([]);
    const RightlineWrapperRef = useRef([]);
    const rightlineRef = useRef([]);
    const TaskWrapper = useRef([]);
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
    function detectLeftButton(evt) {
        evt = evt || window.event;
        if ("buttons" in evt) {
            return evt.buttons == 1;
        }
        var button = evt.which || evt.button;
        return button == 1;
    }


    useEffect(() => {
        let result = calculateCoordinates();
        setWidthRatio(result.Ratio);
        setPositionX(result.XpositionArr);
    }, [zoomType]);

    useEffect(() => {
        setSelectIndex(Math.floor(scrollableLeft / widthCell));
    }, [scrollableLeft, widthCell]);

    const drawLine = throttle((event, id, direction) => {
        if (!detectLeftButton(event)) return;
        const initialPosition = { x: event.clientX, y: event.clientY };
        const initposX = TaskWrapper.current[id].getBoundingClientRect().left;
        const initposY = TaskWrapper.current[id].getBoundingClientRect().top;
        const onMouseMove = ((e) => {
            if (e.target.getBoundingClientRect().y >= TaskWrapper.current[taskData[0].id].getBoundingClientRect().y
                && e.target.getBoundingClientRect().y <= TaskWrapper.current[taskData[taskData.length - 1].id].getBoundingClientRect().y
            ) {
                if (!LeftlineWraperRef.current || !rightlineRef.current) return;

                const { x, y } = initialPosition;
                let dx, dy = 0
                if (TaskWrapper.current[id].getBoundingClientRect().left < initposX) {
                    dx = e.clientX - x + Math.abs(TaskWrapper.current[id].getBoundingClientRect().left - initposX);
                    if (TaskWrapper.current[id].getBoundingClientRect().top < initposY) {
                        dy = e.clientY - y + Math.abs(TaskWrapper.current[id].getBoundingClientRect().top - initposY);
                    } else {
                        dy = e.clientY - y - Math.abs(TaskWrapper.current[id].getBoundingClientRect().top - initposY);
                    }
                } else {
                    dx = e.clientX - x - Math.abs(TaskWrapper.current[id].getBoundingClientRect().left - initposX);
                    if (TaskWrapper.current[id].getBoundingClientRect().top < initposY) {
                        dy = e.clientY - y + Math.abs(TaskWrapper.current[id].getBoundingClientRect().top - initposY);
                    } else {
                        dy = e.clientY - y - Math.abs(TaskWrapper.current[id].getBoundingClientRect().top - initposY);
                    }
                }
                const angle = Math.atan2(dy, dx);
                const width = Math.sqrt(dx * dx + dy * dy);
                const lineRef = direction === 'left' ? leftlineRef : rightlineRef;
                const lineWrapperRef = direction === 'left' ? LeftlineWraperRef : RightlineWrapperRef;
                lineWrapperRef.current[id].style.display = 'flex';
                lineWrapperRef.current[id].style.transform = `rotate(${angle * (180 / Math.PI)}deg)`;
                lineRef.current[id].style.width = `${width - 8}px`;
            }
        });


        const onMouseUp = () => {
            if (!LeftlineWraperRef.current || !rightlineRef.current) return;

            const lineWrapperRef = direction === 'left' ? LeftlineWraperRef : RightlineWrapperRef;
            const lineRef = direction === 'left' ? leftlineRef : rightlineRef;

            lineWrapperRef.current[id].style.display = '';
            lineWrapperRef.current[id].style.transform = 'rotate(0deg)';
            lineRef.current[id].style.width = '0px';

            document.body.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseup', onMouseUp);
        };
        document.body.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseup', onMouseUp);

    },16);

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
                                ref={el => TaskWrapper.current[task.id] = el}
                                className="w-full flex justify-center items-center h-6 ">
                                {
                                    (task.duration != 0) ? (
                                        <div
                                            style={{
                                                left: positionX.length > i && !isNaN(positionX[i]) ? positionX[i] * widthCell : 0,
                                                width: task.duration * widthCell * widthRatio,
                                                backgroundColor: relation[task.id].length == 0 ? '#3b82f6' : '#4ade80'
                                            }}
                                            className="group absolute h-[18px] flex items-center">
                                            <div
                                                onMouseDown={(event) => drawLine(event, task.id, 'left')}
                                                ref={el => LeftlineWraperRef.current[task.id] = el}
                                                className="absolute group-hover:flex hidden items-center  bg-gray-400 w-3 h-3 rounded-full left-[-12px]">
                                                <div
                                                    ref={el => leftlineRef.current[task.id] = el}
                                                    className="z-50 h-[2px] top-[6px] left-[6px] absolute transition duration-100 ease-in-out  bg-amber-400 "></div>
                                            </div>
                                            <div
                                                onMouseDown={(event) => drawLine(event, task.id, 'right')}
                                                ref={el => RightlineWrapperRef.current[task.id] = el}
                                                className="absolute group-hover:flex hidden items-center bg-gray-400 w-3 h-3 rounded-full right-[-12px]">
                                                <div
                                                    ref={el => rightlineRef.current[task.id] = el}
                                                    style={{ width: '0px' }}
                                                    className="z-50 h-[2px] left-[6px] absolute transition duration-100 ease-in-out bg-amber-400">

                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                left: positionX.length > i && !isNaN(positionX[i]) ? positionX[i] * widthCell : 0
                                            }}
                                            className="group absolute w-4 h-4 flex bg-fuchsia-600 rotate-45">
                                            <div className="group absolute -rotate-45 w-4 h-4">
                                                <div
                                                    onMouseDown={(event) => drawLine(event, task.id, 'left')}
                                                    ref={el => LeftlineWraperRef.current[task.id] = el}
                                                    className="absolute group-hover:flex hidden items-center  bg-gray-400 w-3 h-3 rounded-full left-[-12px]">
                                                    <div
                                                        ref={el => leftlineRef.current[task.id] = el}
                                                        style={{ width: '0px' }}
                                                        className="h-[2px] top-[6px] left-[6px] absolute transition duration-100 ease-in-out  bg-amber-400 "></div>
                                                </div>
                                                <div
                                                    onMouseDown={(event) => drawLine(event, task.id, 'right')}
                                                    ref={el => RightlineWrapperRef.current[task.id] = el}
                                                    className="absolute group-hover:flex hidden items-center bg-gray-400 w-3 h-3 rounded-full right-[-12px]">
                                                    <div
                                                        ref={el => rightlineRef.current[task.id] = el}
                                                        style={{ width: '0px' }}
                                                        className="h-[2px] top-[6px] left-[6px] absolute transition duration-100 ease-in-out bg-amber-400">

                                                    </div>
                                                </div>
                                            </div>
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
