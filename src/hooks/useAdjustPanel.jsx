import { useDispatch } from 'react-redux';
import { setPanelsWidth } from '../libs/features/panelsWidthSlice.js';
import { useEffect, useRef, useCallback } from 'react';

function useAdjustPanel(taskContainer, spliter, taskTable, taskChart, phTaskTable, phTaskChart) {
    const dispatch = useDispatch();
    const mouseDownData = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!mouseDownData.current) return;

        const { event, firstWidth, secondWidth } = mouseDownData.current;
        const delta = {
            x: e.clientX - event.clientX,
            y: e.clientY - event.clientY,
        };

        const newFirstWidth = firstWidth + delta.x;
        const newSecondWidth = secondWidth - delta.x;

        spliter.current.style.left = `${delta.x}px`;
        taskTable.current.style.width = `${newFirstWidth}px`;
        phTaskTable.current.style.width = `${newFirstWidth}px`;

        taskChart.current.style.width = `${newSecondWidth}px`;
        phTaskChart.current.style.width = `${newSecondWidth}px`;

        // Throttle state updates to prevent excessive re-renders
        if (mouseDownData.current.lastUpdateTime === undefined || Date.now() - mouseDownData.current.lastUpdateTime > 50) {
            dispatch(setPanelsWidth({ first: newFirstWidth, second: newSecondWidth }));
            mouseDownData.current.lastUpdateTime = Date.now();
        }

        taskContainer.current.style.userSelect = 'none';
    }, [dispatch]);

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        taskContainer.current.style.userSelect = 'auto';
        phTaskTable.current.style.width = '0px';
        phTaskChart.current.style.width = '0px';
        phTaskTable.current.style.minHeight = '0px';
        phTaskChart.current.style.minHeight = '0px';
        mouseDownData.current = null;
    }, [handleMouseMove]);

    const handleMouseDown = useCallback((event) => {
        const md = {
            event,
            offsetX: spliter.current.offsetLeft,
            offsetY: spliter.current.offsetTop,
            firstWidth: taskTable.current.offsetWidth,
            secondWidth: taskChart.current.offsetWidth,
        };

        phTaskTable.current.style.width = `${md.firstWidth}px`;
        phTaskChart.current.style.width = `${md.secondWidth}px`;
        phTaskTable.current.style.minHeight = '500px';
        phTaskChart.current.style.minHeight = '500px';

        mouseDownData.current = md;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove, handleMouseUp]);

    useEffect(() => {
        if (spliter.current) {
            spliter.current.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (spliter.current) {
                spliter.current.removeEventListener('mousedown', handleMouseDown);
            }
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleMouseDown, handleMouseMove, handleMouseUp, spliter]);

}

export default useAdjustPanel;

