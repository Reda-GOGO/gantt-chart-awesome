import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { months } from '../../data/calendarData';
import { getMonthsBetweenDates, getWeeksBetween } from '../../utils/calculateDate';
import { setzoomType } from '../../libs/features/zoomtypeSlice';

function TaskChartHeader({ setWidthCell, setTotalCell }) {
    const dispatch = useDispatch();
    const zoomType = useSelector(state => state.zoomtype.value) || 'months';
    const tasks = useSelector(state => state.tasksdata.value);
    const panels = useSelector(state => state.panelsWidth);

    const timeline_area = useRef();
    const firstTimeline_value = useRef([]);
    const lastTimeline_value = useRef([]);

    const lastDate = new Date(tasks[tasks.length - 1].start);
    lastDate.setDate(lastDate.getDate() + tasks[tasks.length - 1].duration);
    const firstDate = new Date(tasks[0].start);

    const [weeksInfo, setWeeksInfo] = useState(getWeeksBetween(firstDate, lastDate));
    const [monthInfo, setMonthInfo] = useState(getMonthsBetweenDates(firstDate, lastDate));
    const [firstCells, setFirstCells] = useState([]);
    const [secondCells, setSecondCells] = useState([]);
    const [cellWidth, setCellWidth] = useState(0);

    useEffect(() => {
        const firstCellData = [];
        const secondCellData = [];

        if (zoomType === 'months') {
            monthInfo.dates.forEach(info => {
                firstCellData.push({ itemDate: info.year, TotalIn: info.month.length });
                info.month.forEach(mth => {
                    secondCellData.push(months[mth - 1]);
                });
            });
        } else if (zoomType === 'weeks') {
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

        // Set both states together to ensure they are updated simultaneously
        setFirstCells(firstCellData);
        setSecondCells(secondCellData);

        const totalCells = secondCellData.length;
        const areaWidth = panels.second;
        const calculatedCellWidth = areaWidth / totalCells > 80 ? areaWidth / totalCells : 80;

        setCellWidth(calculatedCellWidth);
        setTotalCell(totalCells);
        setWidthCell(calculatedCellWidth);
        console.log(panels.second)
    }, [zoomType, monthInfo, weeksInfo, panels]);

    // Separate useEffect to handle setting minWidth CSS properties
    useEffect(() => {
        if (timeline_area.current) {
            const totalCells = secondCells.length;
            const calculatedCellWidth = panels.second / totalCells > 80 ? panels.second / totalCells : 80;
            timeline_area.current.style.minWidth = `${totalCells * calculatedCellWidth}px`;

            lastTimeline_value.current.forEach((element, index) => {
                if (element) element.style.minWidth = `${calculatedCellWidth}px`;
            });

            firstTimeline_value.current.forEach((element, index) => {
                if (element && firstCells[index]) {
                    element.style.minWidth = `${firstCells[index].TotalIn * calculatedCellWidth}px`;
                }
            });
        }
    }, [firstCells, secondCells, cellWidth]);

    return (
        <div ref={timeline_area} className="relative w-full h-20 flex flex-col">
            <div className="flex w-full h-10">
                {firstCells.map((item, i) => (
                    <div
                        ref={el => (firstTimeline_value.current[i] = el)}
                        key={i}
                        className="font-extralight h-full text-sm border-r-[1px] border-gray-400 flex justify-center items-center"
                    >
                        {item.itemDate}
                    </div>
                ))}
            </div>
            <div className="flex w-full h-10">
                {secondCells.map((item, i) => (
                    <div
                        ref={el => (lastTimeline_value.current[i] = el)}
                        key={i}
                        className="font-extralight h-full text-sm border-b-[1px] border-t-[1px] border-r-[1px] border-gray-400 flex justify-center items-center"
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TaskChartHeader;
