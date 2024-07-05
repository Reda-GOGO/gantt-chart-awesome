import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { months, hours } from '../../data/calendarData';
import { getMonthsBetweenDates, getWeeksBetween, getDaysBetweenDates } from '../../utils/calculateDate';

function TaskChartHeader({ setWidthCell, setTotalCell, setcurrenttotal, setleftCell, setselectIndex }) {
    const zoomType = useSelector(state => state.zoomtype.value) || 'months';
    const tasks = useSelector(state => state.tasksdata.value);
    const panels = useSelector(state => state.panelsWidth);
    const scrollableLeft = useSelector(state => state.scrollableLeft.value);
    
    const timeline_area = useRef();
    const firstTimeline_value = useRef([]);
    const lastTimeline_value = useRef([]);

    const lastDate = useMemo(() => {
        const date = new Date(tasks[tasks.length - 1].start);
        date.setDate(date.getDate() + tasks[tasks.length - 1].duration);
        return date;
    }, [tasks]);

    const firstDate = useMemo(() => new Date(tasks[0].start), [tasks]);

    const weeksInfo = useMemo(() => getWeeksBetween(firstDate, lastDate), [firstDate, lastDate]);
    const monthInfo = useMemo(() => getMonthsBetweenDates(firstDate, lastDate), [firstDate, lastDate]);
    const daysInfo = useMemo(() => getDaysBetweenDates(weeksInfo.weeks[0].startDate, weeksInfo.weeks[weeksInfo.weeks.length - 1].endDate, firstDate, lastDate), [weeksInfo, firstDate, lastDate]);

    const [firstCells, setFirstCells] = useState([]);
    const [secondCells, setSecondCells] = useState([]);
    const [cellWidth, setCellWidth] = useState(0);
    const [firstLeft, setFirstLeft] = useState([]);
    const [lastLeft, setLastLeft] = useState([]);
    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(0);
    const [currenttotalCell, setCurrenttotalCell] = useState(0);

    useEffect(() => {
        const calculateData = () => {
            const firstCellData = [];
            const secondCellData = [];

            const areaWidth = panels.second;
            let calculatedCellWidth;

            const firstLefts = [];
            const lastLefts = [];
            let totalCells;
            let newfirstIndex = 0;
            let newsecondIndex = 0;
            let newTotalCell = 0;
            let newcurrenttotalCell = 0;

            if (zoomType === 'months' || zoomType === 'years') {
                totalCells = monthInfo.totalMonth;
                newfirstIndex = 0;
                newsecondIndex = 0;
                newTotalCell = totalCells;
                newcurrenttotalCell = totalCells;
                calculatedCellWidth = areaWidth / totalCells > 80 ? areaWidth / totalCells : 80;
                let firstLeftIter = 0;
                let lastLeftIter = 0;
                for (let index = 0; index < monthInfo.totalYear; index++) {
                    firstLefts.push(firstLeftIter);
                    firstLeftIter += monthInfo.dates[index].month.length * calculatedCellWidth;
                }
                for (let index = 0; index < monthInfo.totalMonth; index++) {
                    lastLefts.push(lastLeftIter);
                    lastLeftIter += calculatedCellWidth;
                }
                if (monthInfo.totalMonth < 20) {
                    monthInfo.dates.forEach(info => {
                        firstCellData.push({ itemDate: info.year, TotalIn: info.month.length });
                        info.month.forEach(mth => {
                            secondCellData.push(months[mth - 1]);
                        });
                    });
                }
            } else if (zoomType === 'weeks') {
                totalCells = weeksInfo.totalWeeks;
                newTotalCell = totalCells;
                newcurrenttotalCell = totalCells;
                calculatedCellWidth = areaWidth / totalCells > 80 ? areaWidth / totalCells : 80;
                let firstLeftIter = 0;
                let lastLeftIter = 0;
                for (let index = 0; index < weeksInfo.totalMonths; index++) {
                    firstLefts.push(firstLeftIter);
                    firstLeftIter += (weeksInfo.Monthsinfo[index].days / 7) * calculatedCellWidth;
                }
                for (let index = 0; index < weeksInfo.totalWeeks; index++) {
                    lastLefts.push(lastLeftIter);
                    lastLeftIter += calculatedCellWidth;
                }
                if (weeksInfo.totalWeeks > 20) {
                    let temp = 0;
                    for (let index = 0; index < weeksInfo.totalMonths; index++) {
                        temp += (weeksInfo.Monthsinfo[index].days / 7) * calculatedCellWidth;
                        if (scrollableLeft - temp < 0) {
                            newfirstIndex = index;
                            break;
                        }
                    }
                    newsecondIndex = Math.floor(scrollableLeft / 80);
                    for (let index = 0; index < 20; index++) {
                        if (index < 5 && index + newfirstIndex < weeksInfo.totalMonths) {
                            firstCellData.push({
                                itemDate: `${months[weeksInfo.Monthsinfo[index + newfirstIndex].month].slice(0, 3)} ${weeksInfo.Monthsinfo[index + newfirstIndex].year}`,
                                TotalIn: weeksInfo.Monthsinfo[index + newfirstIndex].days / 7
                            });
                        }
                        if (index + newsecondIndex < weeksInfo.totalWeeks) {
                            secondCellData.push(`${weeksInfo.weeks[index + newsecondIndex].startDate.split('/')[1]} ${months[weeksInfo.weeks[index + newsecondIndex].startDate.split('/')[0] - 1].slice(0, 3)} - ${weeksInfo.weeks[index + newsecondIndex].endDate.split('/')[1]} ${months[weeksInfo.weeks[index + newsecondIndex].endDate.split('/')[0] - 1].slice(0, 3)}`);
                        }
                    }
                } else {
                    weeksInfo.Monthsinfo.forEach(month => {
                        firstCellData.push({
                            itemDate: `${months[month.month].slice(0, 3)} ${month.year}`,
                            TotalIn: month.days / 7
                        });
                    });
                    weeksInfo.weeks.forEach(element => {
                        secondCellData.push(
                            `${element.startDate.split('/')[1]} ${months[element.startDate.split('/')[0] - 1].slice(0, 3)} - ${element.endDate.split('/')[1]} ${months[element.endDate.split('/')[0] - 1].slice(0, 3)}`
                        );
                    });
                }
            } else if (zoomType === 'days') {
                totalCells = daysInfo.totalDays;
                newfirstIndex = 0;
                newsecondIndex = 0;
                newTotalCell = totalCells;
                newcurrenttotalCell = totalCells;
                calculatedCellWidth = areaWidth / totalCells > 80 ? areaWidth / totalCells : 80;
                let firstLeftIter = 0;
                let lastLeftIter = 0;
                for (let index = 0; index < weeksInfo.totalWeeks; index++) {
                    firstLefts.push(firstLeftIter);
                    firstLeftIter += 7 * calculatedCellWidth;
                }
                for (let index = 0; index < daysInfo.totalDays; index++) {
                    lastLefts.push(lastLeftIter);
                    lastLeftIter += calculatedCellWidth;
                }
                if (daysInfo.totalDays < 21) {
                    weeksInfo.weeks.forEach(element => {
                        firstCellData.push({
                            itemDate: `${element.startDate.split('/')[1]} ${months[element.startDate.split('/')[0] - 1].slice(0, 3)} ${element.startDate.split('/')[2]}- ${element.endDate.split('/')[1]} ${months[element.endDate.split('/')[0] - 1].slice(0, 3)} ${element.endDate.split('/')[2]}`,
                            TotalIn: 7
                        });
                    });
                    daysInfo.days.forEach(item => {
                        secondCellData.push(item);
                    });
                } else {
                    newfirstIndex = Math.floor(scrollableLeft / (80 * 7));
                    newsecondIndex = Math.floor(scrollableLeft / 80);
                    for (let index = 0; index < 21; index++) {
                        if (index < 3 && index + newfirstIndex < weeksInfo.totalWeeks) {
                            firstCellData.push({
                                itemDate: `${weeksInfo.weeks[index + newfirstIndex].startDate.split('/')[1]} ${months[weeksInfo.weeks[index + newfirstIndex].startDate.split('/')[0] - 1].slice(0, 3)} ${weeksInfo.weeks[index + newfirstIndex].startDate.split('/')[2]}- ${weeksInfo.weeks[index + newfirstIndex].endDate.split('/')[1]} ${months[weeksInfo.weeks[index + newfirstIndex].endDate.split('/')[0] - 1].slice(0, 3)} ${weeksInfo.weeks[index + newfirstIndex].endDate.split('/')[2]}`,
                                TotalIn: 7
                            });
                        }
                        if (index + newsecondIndex < daysInfo.totalDays) {
                            secondCellData.push(daysInfo.days[index + newsecondIndex]);
                        }
                    }
                }
            } else if (zoomType === 'hours') {
                totalCells = daysInfo.actualDays.length * 24;
                calculatedCellWidth = areaWidth / totalCells > 40 ? areaWidth / totalCells : 40;
                let firstLeftIter = 0;
                let lastLeftIter = 0;
                newfirstIndex = 0;
                newsecondIndex = 0;
                newcurrenttotalCell = totalCells;
                for (let index = 0; index < daysInfo.actualDays.length; index++) {
                    firstLefts.push(firstLeftIter);
                    firstLeftIter += 24 * calculatedCellWidth;
                }
                for (let index = 0; index < daysInfo.actualDays.length * 24; index++) {
                    lastLefts.push(lastLeftIter);
                    lastLeftIter += calculatedCellWidth;
                }
                if (daysInfo.totalDays < 3) {
                    newTotalCell = totalCells;
                    daysInfo.actualDays.forEach(day => {
                        firstCellData.push({
                            itemDate: day,
                            TotalIn: 24
                        });
                    });
                    for (let index = 0; index < daysInfo.actualDays.length * 24; index++) {
                        secondCellData.push(hours[(hours.length + index) % hours.length]);
                    }
                } else {
                    newTotalCell = 2 * 24;
                    newfirstIndex = Math.floor(scrollableLeft / (40 * 24));
                    newsecondIndex = Math.floor(scrollableLeft / 40);
                    for (let index = 0; index < 2; index++) {
                        if (daysInfo.actualDays[index + newfirstIndex]) {
                            firstCellData.push({
                                itemDate: `${daysInfo.actualDays[index + newfirstIndex].split('/')[1]} ${months[daysInfo.actualDays[index + newfirstIndex].split('/')[0] - 1]} ${daysInfo.actualDays[index + newfirstIndex].split('/')[2]}`,
                                TotalIn: 24
                            });
                        }
                    }
                    for (let index = 0; index < 48; index++) {
                        if (index + newsecondIndex < daysInfo.actualDays.length * 24) {
                            secondCellData.push(hours[(hours.length + index + newsecondIndex) % hours.length]);
                        }
                    }
                }
            }

            return {
                firstCellData,
                secondCellData,
                firstLefts,
                lastLefts,
                calculatedCellWidth,
                newfirstIndex,
                newsecondIndex,
                newTotalCell,
                newcurrenttotalCell,
            };
        };

        const {
            firstCellData,
            secondCellData,
            firstLefts,
            lastLefts,
            calculatedCellWidth,
            newfirstIndex,
            newsecondIndex,
            newTotalCell,
            newcurrenttotalCell,
          } = calculateData();
        
          // Update state variables only if necessary
          setselectIndex(prev => (prev !== newsecondIndex ? newsecondIndex : prev));
          setCellWidth(prev => (prev !== calculatedCellWidth ? calculatedCellWidth : prev));
          setWidthCell(prev => (prev !== calculatedCellWidth ? calculatedCellWidth : prev));
          setcurrenttotal(prev => (prev !== newcurrenttotalCell ? newcurrenttotalCell : prev));
          setFirstIndex(prev => (prev !== newfirstIndex ? newfirstIndex : prev));
          setSecondIndex(prev => (prev !== newsecondIndex ? newsecondIndex : prev));
          setTotalCell(prev => (prev !== newTotalCell ? newTotalCell : prev));
        
          // Update cell data only if the underlying data or displayed range has changed
          setFirstCells(prev => (JSON.stringify(prev) !== JSON.stringify(firstCellData) ? firstCellData : prev));
          setSecondCells(prev => (JSON.stringify(prev) !== JSON.stringify(secondCellData) ? secondCellData : prev));
          setFirstLeft(prev => (JSON.stringify(prev) !== JSON.stringify(firstLefts) ? firstLefts : prev));
          setLastLeft(prev => (JSON.stringify(prev) !== JSON.stringify(lastLefts) ? lastLefts : prev));
          setleftCell(prev => (JSON.stringify(prev) !== JSON.stringify(lastLefts) ? lastLefts : prev));
        }, [zoomType, panels, scrollableLeft, daysInfo]); // Only these dependencies are likely required
    useEffect(() => {
        setselectIndex(secondIndex);
        if (timeline_area.current) {
            const totalCells = currenttotalCell;
            timeline_area.current.style.minWidth = `${totalCells * cellWidth}px`;
            lastTimeline_value.current.forEach((element, index) => {
                if (element) {
                    element.style.minWidth = `${cellWidth}px`;
                    element.style.width = `${cellWidth}px`;
                    element.style.left = lastLeft[index + secondIndex] + "px";
                }
            });
            firstTimeline_value.current.forEach((element, index) => {
                if (element && firstCells[index]) {
                    element.style.minWidth = `${firstCells[index].TotalIn * cellWidth}px`;
                    element.style.left = firstLeft[index + firstIndex] + "px";
                }
            });
        }
    }, [currenttotalCell, firstCells, secondCells, firstLeft, lastLeft, cellWidth, firstIndex, secondIndex]);

    return (
        <div ref={timeline_area} className="relative w-full h-20 flex flex-col">
            <div className="relative flex w-full h-10">
                {firstCells.map((item, i) => (
                    <div
                        ref={el => (firstTimeline_value.current[i] = el)}
                        key={i}
                        className="absolute font-extralight h-full text-sm border-r-[1px] border-gray-400 flex justify-center items-center"
                    >
                        {item.itemDate}
                    </div>
                ))}
            </div>
            <div className="relative flex w-full h-10">
                {secondCells.map((item, i) => (
                    <div
                        ref={el => (lastTimeline_value.current[i] = el)}
                        key={i}
                        className="absolute font-extralight h-full text-sm border-b-[1px] border-t-[1px] border-r-[1px] border-gray-400 flex justify-center items-center"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskChartHeader;
