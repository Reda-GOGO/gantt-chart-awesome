

function adjustSpilter(taskContainer, spliter, taskTable, taskChart,phTaskTable,phTaskChart) {

    spliter.onmousedown = (event) => {
        let md = {
            event,
            offsetX: spliter.offsetLeft,
            offsetY: spliter.offsetTop,
            firstWidth: taskTable.offsetWidth,
            secondWidth: taskChart.offsetWidth
        }
        phTaskTable.style.width = `${md.firstWidth }px`;
        phTaskChart.style.width = (md.secondWidth) + "px";
        phTaskTable.style.minHeight = `500px`;
        phTaskChart.style.minHeight = "500px";
        document.onmousemove = adjustSize
        function adjustSize(e) {

            let delta = {
                x: e.clientX - md.event.clientX,
                y: e.clientY - md.event.clientY
            };

            // delta.x = Math.min(Math.max(delta.x, -md.firstWidth),
            //     md.secondWidth);

            spliter.style.left = delta.x + "px";
            taskTable.style.width = `${(md.firstWidth + delta.x)}px`;
            phTaskTable.style.width = `${(md.firstWidth + delta.x)}px`;
            taskChart.style.width = (md.secondWidth - delta.x) + "px";
            phTaskChart.style.width = (md.secondWidth - delta.x) + "px";
            taskContainer.style.userSelect = 'none'
        }

        document.onmouseup = finishAdjusting

        function finishAdjusting() {
            document.onmouseup = ''
            document.onmousemove = ''
            taskContainer.style = 'user-select: auto;'
            phTaskTable.style.width = `0px`;
            phTaskChart.style.width =  "0px";
            phTaskTable.style.minHeight = `0px`;
            phTaskChart.style.minHeight = "0px";
        }
    }

}

export default adjustSpilter