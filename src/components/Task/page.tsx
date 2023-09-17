"use client"

import { FormEvent, KeyboardEvent, useEffect, useState } from "react";

export interface ITask {
  id: number,
  title: string;
  responsible: string;
}

interface IProps extends ITask {
  deleteFunc: (id: number) => void,
  changeTaskTitle: (id: number, title: string) => void
}

const Task = (props: IProps) => {

  const [ title, setTitle ] = useState<string>(props.title)
  const [ isEdit, setIsEdit ] = useState<boolean>(true)
  const [ isShowingConfig, setIsShowingConfig ] = useState<boolean>(false)

  const handleEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter") {
      setIsEdit(false)
      props.changeTaskTitle(props.id, title)
    }
  }

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/title", title)
  }

  useEffect(() => {
    setTitle(props.title)
  }, [props.title])

  return (
    <article
      draggable
      className=" relative w-full p-2 mt-1 text-sm font-medium bg-white border border-gray-200 shadow hover:bg-slate-200" 
      onMouseEnter={() => setIsShowingConfig(true)}
      onMouseLeave={() => setIsShowingConfig(false)}
      onDragEnd={() => props.deleteFunc(props.id)}
      onDragStart={handleDrag}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "22px 1fr"
      }}>
        <span>
          <i className="fa-solid fa-bars-progress pr-2 text-gray-400"></i>
        </span>
        {isEdit ?
          <form>
            <textarea onKeyDown={handleEnter} onChange={(e) => setTitle(e.target.value)} className=" w-full" value={title}/>
          </form>
        :
          <p className="">
            {title}
          </p>
        }
      </div>
      <aside className={`absolute top-2 right-2 flex text-xs text-gray-600 ${isShowingConfig? "":"hidden"}`}
        style={{}}
      >
        <div onClick={() => setIsEdit(true)} className=" w-5 h-5 bg-white rounded-l border border-gray-200 div-center cursor-pointer hover:bg-gray-100">
          <i className="fa-solid fa-pen"></i>
        </div>
        <div onClick={() => props.deleteFunc(props.id)} className=" w-5 h-5 bg-white rounded-r border border-gray-200 div-center cursor-pointer hover:bg-gray-100">
          <i className="fa-solid fa-trash"></i>
        </div>
      </aside>
    </article>
  );
};

export default Task;
