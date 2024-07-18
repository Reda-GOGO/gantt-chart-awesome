import TaskChartHeader from './TaskChart/TaskChartHeader'
import TaskChartBody from './TaskChart/TaskChartBody'
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

function TaskChart() {
  const widthCell = useSelector((state) => state.widthCell.value);
  const taskCoordinates = useSelector((state) => state.taskCoordinates.value);
  const taskData = useSelector((state) => state.tasksdata.value);
  const listLinks = useSelector((state) => state.linksData.value);
  const expandLines = useSelector((state) => state.expandLines.value);
  const [filteredListLinks , setFilteredListLinks] = useState([]);
  const linkWrapper = useRef();
  const calculateTwoDimension = (link) => {
    let dx = 0;
    let dy = 0;
    let Xdiff = 0;
    let Ydiff = 0;
    let InitTop = 0;
    let InitLeft = 0;
    let TypeLink = '';
    if (taskCoordinates.YpositionArr
      && !isNaN(taskCoordinates.YpositionArr[link.source.index - 1])
      && !isNaN(taskCoordinates.YpositionArr[link.destionation.index - 1])
    ){
      InitTop = Math.abs((taskCoordinates.YpositionArr[0] - taskCoordinates.YpositionArr[link.source.index - 1] ) - 10);
      dy = (Math.abs(taskCoordinates.YpositionArr[link.destionation.index - 1] - taskCoordinates.YpositionArr[link.source.index - 1]));
    }
    Ydiff = (link.source.index - link.destionation.index) * 24;
    if (taskCoordinates.XpositionArr
      && !isNaN(taskCoordinates.XpositionArr[link.source.index - 1])
      && !isNaN(taskCoordinates.XpositionArr[link.destionation.index - 1])
    ) {
      if (link.source.position === 'end' && link.destionation.position === 'start') {
        if (taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell <= (taskCoordinates.XpositionArr[link.source.index - 1] + taskCoordinates.Ratio * taskData[link.source.index - 1].duration) * widthCell + 4) {
          dx = Math.abs(taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell - (taskCoordinates.XpositionArr[link.source.index - 1] + taskCoordinates.Ratio * taskData[link.source.index - 1].duration) * widthCell);
          Xdiff = taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell - (taskCoordinates.XpositionArr[link.source.index - 1] + taskCoordinates.Ratio * taskData[link.source.index - 1].duration) * widthCell;

          InitLeft = (taskCoordinates.XpositionArr[link.source.index - 1] * widthCell) + (taskCoordinates.Ratio * taskData[link.source.index - 1].duration * widthCell)
          if (link.source.index < link.destionation.index) {
            TypeLink = 'EndStartDownDown';
          } else {
            TypeLink = 'EndStartDownUp';
          }
        } else {
          dx = Math.abs(taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell - (taskCoordinates.XpositionArr[link.source.index - 1] + taskCoordinates.Ratio * taskData[link.source.index - 1].duration) * widthCell);
          Xdiff = taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell - (taskCoordinates.XpositionArr[link.source.index - 1] + taskCoordinates.Ratio * taskData[link.source.index - 1].duration) * widthCell;
          InitLeft = (taskCoordinates.XpositionArr[link.source.index - 1] * widthCell) + (taskCoordinates.Ratio * taskData[link.source.index - 1].duration * widthCell)
          if (link.source.index < link.destionation.index) {
            TypeLink = 'EndStartUpDown';
          } else {
            TypeLink = 'EndStartUpUp';
          }
        }
      } else {
        if ((taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell + taskCoordinates.Ratio * taskData[link.destionation.index - 1].duration * widthCell) >= (taskCoordinates.XpositionArr[link.source.index - 1] * widthCell) + 4) {
          dx = Math.abs((taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell + taskCoordinates.Ratio * taskData[link.destionation.index - 1].duration * widthCell) - (taskCoordinates.XpositionArr[link.source.index - 1] * widthCell));
          Xdiff = (taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell + taskCoordinates.Ratio * taskData[link.destionation.index - 1].duration * widthCell) - (taskCoordinates.XpositionArr[link.source.index - 1] * widthCell);
          InitLeft = taskCoordinates.XpositionArr[link.source.index - 1] * widthCell
          if (link.source.index < link.destionation.index) {
            TypeLink = 'StartEndUpDown';
          } else {
            TypeLink = 'StartEndUpUp';
          }
        } else {
          dx = Math.abs((taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell + taskCoordinates.Ratio * taskData[link.destionation.index - 1].duration * widthCell) - (taskCoordinates.XpositionArr[link.source.index - 1] * widthCell));
          Xdiff = (taskCoordinates.XpositionArr[link.destionation.index - 1] * widthCell + taskCoordinates.Ratio * taskData[link.destionation.index - 1].duration * widthCell) - (taskCoordinates.XpositionArr[link.source.index - 1] * widthCell);
          InitLeft = taskCoordinates.XpositionArr[link.source.index - 1] * widthCell
          if (link.source.index < link.destionation.index) {
            TypeLink = 'StartEndDownDown';
          } else {
            if (dx < 4) {
              TypeLink = 'StartEndUpUp';
            } else {
              TypeLink = 'StartEndDownUp';
            }
          }
        }
      }
    }
    return {
      TypeLink, Xdiff, Ydiff, dx, dy, InitTop, InitLeft
    }

  }

  useEffect(()=>{
    let lists = [] ;
    listLinks.map((link)=>{
      if(expandLines[link.destionation.index] !== true && expandLines[link.source.index] !== true){
        lists.push(link)
      }
    })
    setFilteredListLinks(lists);
  },[listLinks,taskCoordinates,expandLines])
  return (
    <>
      <div className="z-50 w-full h-full relative flex flex-col flex-nowrap ">
        <TaskChartHeader
        />
        <TaskChartBody
        />
        {/* here is the links area  */}
        <div ref={linkWrapper} className="z-0 top-20 absolute w-full ">
          {
            filteredListLinks.map((link, i) => {
              if (calculateTwoDimension(link).TypeLink === 'EndStartUpDown') {
                return <LinkEndStartUpDown key={i} linkData={calculateTwoDimension(link)} />
              } else if (calculateTwoDimension(link).TypeLink === 'EndStartUpUp') {
                return <LinkEndStartUpUp key={i} linkData={calculateTwoDimension(link)} />
              }
              else if (calculateTwoDimension(link).TypeLink === 'StartEndDownUp') {
                return <LinkStartEndDownUp key={i} linkData={calculateTwoDimension(link)} />
              }
              else if (calculateTwoDimension(link).TypeLink === 'StartEndDownDown') {
                return <LinkStartEndDownDown key={i} linkData={calculateTwoDimension(link)} />
              }
              else if (calculateTwoDimension(link).TypeLink === 'EndStartDownDown') {
                return <LinkEndStartDownDown key={i} linkData={calculateTwoDimension(link)} />
              }
              else if (calculateTwoDimension(link).TypeLink === 'EndStartDownUp') {
                return <LinkEndStartDownUp key={i} linkData={calculateTwoDimension(link)} />
              }
              else if (calculateTwoDimension(link).TypeLink === 'StartEndUpUp') {
                return <LinkStartEndUpUp key={i} linkData={calculateTwoDimension(link)} />
              }
              else if (calculateTwoDimension(link).TypeLink === 'StartEndUpDown') {
                return <LinkStartEndUpDown key={i} linkData={calculateTwoDimension(link)} />
              }

            })
          }
        </div>
      </div>
    </>
  )
}

export default TaskChart
function LinkEndStartUpDown({ linkData }) {
  return (
    <div
      style={{
        left: linkData.InitLeft,
        top: linkData.InitTop,
      }}
      className="absolute w-1 h-[2px] bg-amber-500">
      <div className="z-0 top-0 left-1 rotate-90 absolute w-1 h-1">
        <div
          style={{
            width: linkData.dy
          }}
          className="top-1 left-0 absolute h-[2px] bg-amber-500 ">
          <div
            style={{
              left: linkData.dy
            }}
            className="top-[2px] -rotate-90 absolute w-1 h-1">
            <div
              style={{
                width: linkData.dx,
              }}
              className="left-1 absolute h-[2px] bg-amber-500 ">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


function LinkStartEndDownUp({ linkData }) {
  return (
    <div
      style={{
        left: linkData.InitLeft - 4,
        top: linkData.InitTop,
      }}
      className="absolute w-1 h-[2px] bg-amber-500">
      <div className="z-0 -top-1 left-0 -rotate-90 absolute w-1 h-1">
        <div
          style={{
            width: linkData.dy
          }}
          className="top-0 -left-0 absolute h-[2px] bg-amber-500 ">
          <div
            style={{
              left: linkData.dy
            }}
            className="top-[2px] -rotate-90 absolute w-1 h-1">
            <div
              style={{
                width: linkData.dx,
              }}
              className="left-1 absolute h-[2px] bg-amber-500 ">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkEndStartDownDown({ linkData }) {
  return (
    <div
      style={{
        left: linkData.InitLeft,
        top: linkData.InitTop,
      }}
      className="absolute w-1 h-[2px] bg-amber-500 ">
      <div className="absolute top-0 left-0 rotate-90 w-1 h-1">
        <div className="absolute w-[14px] h-[2px] bg-amber-500 ">
          <div className="left-[14px] absolute w-0 h-0 rotate-90 ">
            <div
              style={{
                width: linkData.dx + 8
              }}
              className="absolute h-[2px] bg-amber-500 ">
              <div
                style={{
                  left: linkData.dx + 8
                }}
                className="absolute top-[2px]  w-0 h-0 -rotate-90">
                <div
                  style={{
                    width: linkData.dy - 12
                  }}
                  className="absolute h-[2px] bg-amber-500">
                  <div
                    style={{
                      left: linkData.dy - 12
                    }}
                    className="absolute w-0 h-0  top-[2px] -rotate-90">
                    <div className="absolute w-3 h-[2px] bg-amber-500">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkStartEndUpUp({ linkData }) {
  return (
    <div
      style={{
        left: linkData.InitLeft - 4,
        top: linkData.InitTop,
      }}
      className="absolute w-1 h-[2px] bg-amber-500 ">
      <div className="absolute left-0 top-[-2px] -rotate-90 w-1 h-1">
        <div className="absolute w-[14px] h-[2px] bg-amber-500 ">
          <div className="left-[14px] absolute w-0 h-0 rotate-90 ">
            <div
              style={{
                width: linkData.dx + 8
              }}
              className="absolute h-[2px] bg-amber-500 ">
              <div
                style={{
                  left: linkData.dx + 8
                }}
                className="absolute top-[2px]  w-0 h-0 -rotate-90">
                <div
                  style={{
                    width: linkData.dy - 12
                  }}
                  className="absolute h-[2px] bg-amber-500">
                  <div
                    style={{
                      left: linkData.dy - 12
                    }}
                    className="absolute w-0 h-0  top-[2px] -rotate-90">
                    <div className="absolute w-1 h-[2px] bg-amber-500">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function LinkStartEndUpDown({ linkData }) {
  return (
    <div
      style={{
        left: linkData.InitLeft - 4,
        top: linkData.InitTop,
      }}
      className="absolute w-1 h-[2px] bg-amber-500 ">
      <div className="absolute -left-1 top-0 rotate-90 w-1 h-1">
        <div className="absolute w-[14px] h-[2px] bg-amber-500 ">
          <div className="left-[12px] absolute w-0 h-0 -rotate-90 ">
            <div
              style={{
                width: linkData.dx + 8
              }}
              className="absolute h-[2px] bg-amber-500 ">
              <div
                style={{
                  left: linkData.dx + 8
                }}
                className="absolute top-[2px]  w-0 h-0 rotate-90">
                <div
                  style={{
                    width: linkData.dy - 12
                  }}
                  className="absolute h-[2px] bg-amber-500">
                  <div
                    style={{
                      left: linkData.dy - 12
                    }}
                    className="absolute w-0 h-0  top-[2px] rotate-90">
                    <div className="absolute w-1 h-[2px] bg-amber-500">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkEndStartDownUp({ linkData }) {
  return (
    <div
      style={{
        left: linkData.InitLeft,
        top: linkData.InitTop,
      }}
      className="absolute w-1 h-[2px] bg-amber-500 ">
      <div className="absolute top-[-4px] left-[2px] -rotate-90 w-1 h-1">
        <div className="absolute w-[14px] h-[2px] bg-amber-500 ">
          <div className="left-[12px] absolute w-0 h-0 -rotate-90 ">
            <div
              style={{
                width: linkData.dx + 8
              }}
              className="absolute h-[2px] bg-amber-500 ">
              <div
                style={{
                  left: linkData.dx + 8
                }}
                className="absolute top-[2px]  w-0 h-0 rotate-90">
                <div
                  style={{
                    width: linkData.dy - 12
                  }}
                  className="absolute h-[2px] bg-amber-500">
                  <div
                    style={{
                      left: linkData.dy - 12
                    }}
                    className="absolute w-0 h-0  top-[2px] rotate-90">
                    <div className="absolute w-2 h-[2px] bg-amber-500">

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function LinkStartEndDownDown({ linkData }) {
  return (
    <div
      style={{
        left: linkData.InitLeft - 4,
        top: linkData.InitTop,
      }}
      className="absolute w-1 h-[2px] bg-amber-500">
      <div className="z-0 -top-0 -left-1 rotate-90 absolute w-1 h-1">
        <div
          style={{
            width: linkData.dy
          }}
          className="top-0 -left-0 absolute h-[2px] bg-amber-500 ">
          <div
            style={{
              left: linkData.dy
            }}
            className="top-[2px] rotate-90 absolute w-1 h-1">
            <div
              style={{
                width: linkData.dx,
              }}
              className="-left-[2px] top-1 absolute h-[2px] bg-amber-500 ">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
function LinkEndStartUpUp({ linkData }) {
  return (
    <div
      style={{
        left: linkData.InitLeft,
        top: linkData.InitTop,
      }}
      className="absolute w-1 h-[2px] bg-amber-500">
      <div className="z-0 top-0 left-1 -rotate-90 absolute w-1 h-1">
        <div
          style={{
            width: linkData.dy
          }}
          className="-top-0 -left-[-2px] absolute h-[2px] bg-amber-500 ">
          <div
            style={{
              left: linkData.dy
            }}
            className="-top-0 rotate-90 absolute w-1 h-1">
            <div
              style={{
                width: linkData.dx - 4,
              }}
              className="left-0 top-[2px] absolute h-[2px] bg-amber-500 ">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}