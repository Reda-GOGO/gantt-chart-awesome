import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { months, hours } from '../../data/calendarData';
import { getMonthsBetweenDates, getWeeksBetween, getDaysBetweenDates } from '../../utils/calculateDate';

function TaskChartHeader({ setWidthCell, setTotalCell }) {
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
    const [daysInfo, setDaysInfo] = useState(getDaysBetweenDates(weeksInfo.weeks[0].startDate, weeksInfo.weeks[weeksInfo.weeks.length - 1].endDate, firstDate, lastDate))
    const [firstCells, setFirstCells] = useState([]);
    const [secondCells, setSecondCells] = useState([]);
    const [cellWidth, setCellWidth] = useState(0);

    useEffect(() => {
        const firstCellData = [];
        const secondCellData = [];

        if (zoomType === 'months' || zoomType === 'years') {
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
        } else if (zoomType === 'days') {
            weeksInfo.weeks.forEach(element => {
                firstCellData.push({
                    itemDate: `${element.startDate.split('/')[1]} ${months[element.startDate.split('/')[0] - 1].slice(0, 3)} ${element.startDate.split('/')[2]}- ${element.endDate.split('/')[1]} ${months[element.endDate.split('/')[0] - 1].slice(0, 3)} ${element.endDate.split('/')[2]}`,
                    TotalIn: 7
                }
                );
            });
            daysInfo.days.map((item) => {
                secondCellData.push(item)
            })
        } else if (zoomType === 'hours') {
            daysInfo.actualDays.map((day, i) => {
                firstCellData.push({
                    itemDate: day,
                    TotalIn: 24,
                })
            })
            for (let index = 0; index < daysInfo.actualDays.length * 24; index++) {
                secondCellData.push(hours[(hours.length + index) % hours.length])
            }
        }

        // Set both states together to ensure they are updated simultaneously
        setFirstCells(firstCellData);
        setSecondCells(secondCellData);

        const totalCells = secondCellData.length;
        const areaWidth = panels.second;
        let calculatedCellWidth;
        if (zoomType === 'hours') {
            calculatedCellWidth = areaWidth / totalCells > 40 ? areaWidth / totalCells : 40;
        } else {
            calculatedCellWidth = areaWidth / totalCells > 80 ? areaWidth / totalCells : 80;

        }
        setCellWidth(calculatedCellWidth);
        setTotalCell(totalCells);
        setWidthCell(calculatedCellWidth);
    }, [zoomType, monthInfo, weeksInfo, daysInfo, panels]);

    // Separate useEffect to handle setting minWidth CSS properties
    useEffect(() => {
        if (timeline_area.current) {
            const totalCells = secondCells.length;
            let calculatedCellWidth;
            if (zoomType === 'hours') {
                calculatedCellWidth = panels.second / totalCells > 40 ? panels.second / totalCells : 40;
            } else {
                calculatedCellWidth = panels.second / totalCells > 80 ? panels.second / totalCells : 80;

            }
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
