import React, { useRef, useState } from 'react'
import ReactDOMServer from 'react-dom/server'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { BsCardText, BsPlus, BsThreeDots } from 'react-icons/bs'

import { v4 as uuid } from 'uuid'

import { project } from '../../data/db'

import ColumnAdd from './ColumnAdd'
import ColumnEdit from './ColumnEdit'
import ProjectHeader from './ProjectHeader'
import TaskAdd from './/TaskAdd'
import TaskEdit from './TaskEdit'
import DropDownMenu from '../UI/DropDownMenu'

import '../../App.scss'

const Project: React.FC<{}> = () => {
    const addColumnsRef = useRef<HTMLDivElement>(null)

    const [columns, setColumns] = useState(project.columns)
    const [showAddColumns, setShowAddColumns] = useState(false)
    const [currentColumnFocus, setCurrentColumnFocus] = useState('')
    const [currentColumnOption, setCurrentColumnOption] = useState('')
    const [currentColumnEdit, setCurrentColumnEdit] = useState('')
    const [currentTaskOption, setCurrentTaskOption] = useState('')
    const [currentTaskFocus, setCurrentTaskFocus] = useState('')
    const [currentTaskAdd, setCurrentTaskAdd] = useState('')
    const [currentTaskEdit, setCurrentTaskEdit] = useState('')

    const getInnerHTML = (content: JSX.Element | string): string => {
        if (React.isValidElement(content)) {
            var currentElement = content as JSX.Element

            return ReactDOMServer.renderToStaticMarkup(currentElement.props.children)
        }

        return content.toString()
    }

    const onAddColumnClick = (columnName: string): void => {
        if (columnName.trim().length === 0) {
            return
        }

        const updatedColumns = {
            ...columns,
            [uuid()]: {
                name: columnName,
                items: []
            }
        }

        setColumns(updatedColumns)

        setShowAddColumns(false)
    }

    const onAddTaskClick = (id: string, task: string): void => {
        if (task.trim().length === 0) {
            return
        }

        const sourceColumn = columns[id]
        const updatedColumns = {
            ...columns,
            [id]: {
                ...sourceColumn,
                items: [{ id: uuid(), content: task }, ...sourceColumn.items]
            }
        }

        setColumns(updatedColumns)

        setCurrentTaskAdd('')
    }

    const onDeleteColumnClick = (event: React.MouseEvent, id: string) => {
        event.preventDefault()

        if (window.confirm('Are you sure you want to delete the currently selected column and all of its associated tasks? This process cannot be undone.')) {
            const filteredColumns = Object.entries(columns).filter(([key, column]) => key !== id && column)
            const updatedColumns = Object.fromEntries(filteredColumns)

            setColumns(updatedColumns)
        }
    }

    const onDeleteTaskClick = (event: React.MouseEvent, id: string, taskId: string) => {
        event.preventDefault()

        if (window.confirm('Are you sure you want to delete the currently selected task? This process cannot be undone.')) {
            const sourceColumn = columns[id]

            const updatedColumns = {
                ...columns,
                [id]: {
                    ...sourceColumn,
                    items: [...sourceColumn.items.filter((x) => x.id !== taskId)]
                }
            }

            setColumns(updatedColumns)
        }
    }

    const onEditColumnClick = (id: string, columnName: string): void => {
        if (columnName.trim().length === 0) {
            return
        }

        const sourceColumn = columns[id]
        const updatedColumns = {
            ...columns,
            [id]: {
                ...sourceColumn,
                name: columnName
            }
        }

        setColumns(updatedColumns)

        setCurrentColumnEdit('')
    }

    const onEditTaskClick = (id: string, taskId: string, task: string): void => {
        if (task.trim().length === 0) {
            return
        }

        const sourceColumn = columns[id]
        const updatedColumns = {
            ...columns,
            [id]: {
                ...sourceColumn,
                items: [...sourceColumn.items.map((item) => item.id !== taskId ? item : { ...item, content: task })]
            }
        }

        setColumns(updatedColumns)

        setCurrentTaskEdit('')
    }

    const onDragEnd = (result: any, columns: any) => {
        if (!result.destination) {
            return
        }

        const { source, destination, type } = result

        if (type === 'column') {
            if (source.index === destination.index) {
                return
            }

            const indexedColumns = Object.entries(columns).filter(([key, column]) => key && column)
            const [removed] = indexedColumns.splice(source.index, 1)

            indexedColumns.splice(destination.index, 0, removed)

            const updatedColumns = {
                ...Object.fromEntries(indexedColumns),
                ...columns
            }

            setColumns(updatedColumns)
        }

        if (type === 'task') {
            if (source.droppableId !== destination.droppableId) {
                const sourceColumn = columns[source.droppableId]
                const destColumn = columns[destination.droppableId]
                const sourceItems = [...sourceColumn.items]
                const destItems = [...destColumn.items]

                const [removed] = sourceItems.splice(source.index, 1)

                destItems.splice(destination.index, 0, removed)

                const updatedColumns = {
                    ...columns,
                    [source.droppableId]: {
                        ...sourceColumn,
                        items: sourceItems
                    },
                    [destination.droppableId]: {
                        ...destColumn,
                        items: destItems
                    },
                }

                setColumns(updatedColumns)
            } else {
                const column = columns[source.droppableId]
                const copiedItems = [...column.items]
                const [removed] = copiedItems.splice(source.index, 1)

                copiedItems.splice(destination.index, 0, removed)

                const updatedColumns = {
                    ...columns,
                    [source.droppableId]: {
                        ...column,
                        items: copiedItems
                    }
                }

                setColumns(updatedColumns)
            }
        }
    }

    const onFocusColumnClick = (event: React.MouseEvent, id: string): void => {
        event.preventDefault()
        event.stopPropagation()

        setCurrentColumnFocus(id)
        setCurrentTaskFocus('')
        setCurrentColumnOption('')
        setCurrentTaskOption('')
        setCurrentTaskEdit('')
    }

    const onFocusTaskClick = (event: React.MouseEvent, id: string): void => {
        event.preventDefault()
        event.stopPropagation()

        const currentElement = event.target as Element

        if (currentElement.nodeName === 'A') {
            const currentAnchor = currentElement as HTMLAnchorElement

            window.open(currentAnchor.href, currentAnchor.target)
        }

        setCurrentTaskFocus(id)
        setCurrentColumnFocus('')
        setCurrentColumnOption('')
        setCurrentTaskOption('')

        if (currentTaskEdit !== id) {
            setCurrentTaskEdit('')
        }
    }

    const onShowColumnEditClick = (event: React.MouseEvent, id: string): void => {
        event.preventDefault()
        event.stopPropagation()

        setCurrentColumnEdit(id)
        setCurrentColumnOption('')
        setCurrentTaskAdd('')
        setCurrentTaskEdit('')
    }

    const onShowColumnOptionsClick = (event: React.MouseEvent, id: string): void => {
        event.preventDefault()
        event.stopPropagation()

        setCurrentColumnFocus(id)
        setCurrentTaskOption('')
        setCurrentTaskFocus('')

        setCurrentColumnOption((previousCurrentColumn) => {
            if (previousCurrentColumn === id) {
                return ''
            } else {
                return id
            }
        })
    }

    const onShowTaskAddOptionsClick = (event: React.FormEvent, id: string): void => {
        event.preventDefault()

        setCurrentTaskAdd(id)
        setCurrentColumnEdit('')
        setCurrentTaskEdit('')
    }

    const onShowTaskEditOptionsClick = (event: React.FormEvent, id: string): void => {
        event.preventDefault()
        event.stopPropagation()

        setCurrentTaskEdit(id)
        setCurrentTaskFocus('')
        setCurrentColumnEdit('')
        setCurrentColumnFocus('')
        setCurrentTaskAdd('')
        setCurrentTaskOption('')
    }

    const onShowTaskOptionsClick = (event: React.MouseEvent, id: string): void => {
        event.preventDefault()
        event.stopPropagation()

        setCurrentTaskOption((previousCurrentTask) => {
            if (previousCurrentTask === id) {
                return ''
            } else {
                return id
            }
        })
    }

    const onScrollProjectContainer = (event: React.WheelEvent): void => {
        const currentTarget = event.target as Element

        if (currentTarget.scrollHeight > currentTarget.clientHeight) {
            return
        }

        window.scrollBy({
            left: event.deltaY,
        })
    }

    const onScrollToAddColumns = (event: React.MouseEvent): void => {
        event.preventDefault()

        setShowAddColumns(false)

        setTimeout(() => {
            addColumnsRef.current!.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })

            setShowAddColumns(true)
        }, 250)
    }

    return (
        <>
            <ProjectHeader project={project} />
            <div className='container project-container' onWheel={(e: React.WheelEvent) => onScrollProjectContainer(e)}>
                <div className='row mb-3 project-container-menu'>
                    <div className='col'>
                        {(Object.entries(columns).length > 1) &&
                            <a className='small' href='/' onClick={(e: React.MouseEvent) => onScrollToAddColumns(e)}><BsPlus style={{ fontSize: '1.5em' }} /> Add Column</a>
                        }

                        &nbsp;
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='project'>
                            <DragDropContext onDragEnd={result => onDragEnd(result, columns)}>
                                <Droppable droppableId='project-columns' direction='horizontal' type='column'>
                                    {provided => {
                                        return (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                style={{ display: 'flex' }}
                                            >

                                                {Object.entries(columns).map(([id, column], index) => {
                                                    return (
                                                        <Draggable key={id} draggableId={id} index={index}>
                                                            {(provided, snapshot) => {
                                                                return (
                                                                    <div key={id}
                                                                        className={`project-column p-2 mr-3 ${currentColumnFocus === id && 'project-column-focus'}`}
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            ...provided.draggableProps.style,
                                                                            opacity: snapshot.isDragging ? '0.55' : '1'
                                                                        }}
                                                                        onClick={(e: React.MouseEvent) => onFocusColumnClick(e, id)}
                                                                    >
                                                                        <div className='p-sm-2 column-heading'>
                                                                            <span className='badge badge-secondary mr-2'>{column.items.length}</span>

                                                                            {column.name}

                                                                            <a className='column-add' href='/' onClick={(e: React.MouseEvent) => onShowTaskAddOptionsClick(e, id)}>
                                                                                <BsPlus style={{ fontSize: '1.5em' }} />
                                                                            </a>
                                                                            <a className='column-menu' href='/' onClick={(e: React.MouseEvent) => onShowColumnOptionsClick(e, id)}>
                                                                                <BsThreeDots />
                                                                            </a>

                                                                            {
                                                                                (currentColumnOption === id) &&
                                                                                <DropDownMenu title={'Column Options'}>
                                                                                    <a className='dropdown-item' href='/' onClick={(e: React.MouseEvent) => onShowColumnEditClick(e, id)}>Edit column</a>
                                                                                    <a className='dropdown-item' href='/' onClick={(e: React.MouseEvent) => onDeleteColumnClick(e, id)}>Delete column</a>
                                                                                </DropDownMenu>
                                                                            }
                                                                        </div>

                                                                        {(currentTaskAdd === id) &&
                                                                            <TaskAdd id={id} onAddTaskClick={onAddTaskClick} hideShowAddTask={() => setCurrentTaskAdd('')} />
                                                                        }

                                                                        {(currentColumnEdit === id) &&
                                                                            <ColumnEdit id={id} name={column.name} onEditColumnClick={onEditColumnClick} hideShowEditColumn={() => setCurrentColumnEdit('')} />
                                                                        }

                                                                        <Droppable droppableId={id} type='task'>
                                                                            {(provided, snapshot) => {
                                                                                return (
                                                                                    <>
                                                                                        <div
                                                                                            className='column-canvas'
                                                                                            ref={provided.innerRef}
                                                                                            {...provided.droppableProps}
                                                                                            style={{
                                                                                                backgroundColor: snapshot.isDraggingOver ? '#f8f8f8' : '',
                                                                                                border: snapshot.isDraggingOver ? '1px dashed #d7d8de' : '',
                                                                                                padding: snapshot.isDraggingOver ? '5px' : '',
                                                                                                marginBottom: snapshot.isDraggingOver ? '10px' : '',
                                                                                                marginRight: snapshot.isDraggingOver ? '8px' : ''
                                                                                            }}
                                                                                        >
                                                                                            {column.items.map((item, index) => {
                                                                                                return (
                                                                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                                                        {(provided, snapshot) => {
                                                                                                            return (
                                                                                                                <>
                                                                                                                    {(currentTaskOption === item.id) &&
                                                                                                                        <DropDownMenu title={'Task Options'}>
                                                                                                                            <a className='dropdown-item' href='/' onClick={(e: React.MouseEvent) => onShowTaskEditOptionsClick(e, item.id)}>Edit task</a>
                                                                                                                            <a className='dropdown-item' href='/' onClick={(e: React.MouseEvent) => onDeleteTaskClick(e, id, item.id)}>Delete task</a>
                                                                                                                        </DropDownMenu>
                                                                                                                    }

                                                                                                                    <div
                                                                                                                        className={`project-task p-2 mt-2 box-shadow ${currentTaskFocus === item.id && 'project-task-focus'} ${currentTaskEdit === item.id && 'hidden'}`}
                                                                                                                        ref={provided.innerRef}
                                                                                                                        {...provided.draggableProps}
                                                                                                                        {...provided.dragHandleProps}
                                                                                                                        style={{
                                                                                                                            ...provided.draggableProps.style,
                                                                                                                            opacity: snapshot.isDragging ? '0.55' : '1'
                                                                                                                        }}

                                                                                                                        onClick={(e: React.MouseEvent) => onFocusTaskClick(e, item.id)}
                                                                                                                        onMouseDown={(e: React.MouseEvent) => onFocusTaskClick(e, item.id)}
                                                                                                                    >
                                                                                                                        <div>
                                                                                                                            <BsCardText className='task-icon' />

                                                                                                                            <a className='task-menu' href='/' onClick={(e: React.MouseEvent) => onShowTaskOptionsClick(e, item.id)}>
                                                                                                                                <BsThreeDots />
                                                                                                                            </a>

                                                                                                                            {(React.isValidElement(item.content)) ? (
                                                                                                                                <div className='task-body'>
                                                                                                                                    {item.content}
                                                                                                                                </div>
                                                                                                                            ) : (
                                                                                                                                <div className='task-body' dangerouslySetInnerHTML={{ __html: item.content.toString() }}>

                                                                                                                                </div>
                                                                                                                            )}
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    {(currentTaskEdit === item.id) &&
                                                                                                                        <div
                                                                                                                            className={`project-task project-task-edit p-2 mt-2 box-shadow ${currentTaskFocus === item.id && 'project-task-focus'}`}
                                                                                                                            onClick={(e: React.MouseEvent) => onFocusTaskClick(e, item.id)}
                                                                                                                        >
                                                                                                                            <TaskEdit id={id} taskId={item.id} content={getInnerHTML(item.content)} onEditTaskClick={onEditTaskClick} hideShowEditTask={() => setCurrentTaskEdit('')} />
                                                                                                                        </div>
                                                                                                                    }
                                                                                                                </>
                                                                                                            )
                                                                                                        }}
                                                                                                    </Draggable>
                                                                                                )
                                                                                            })}
                                                                                            {provided.placeholder}
                                                                                        </div>
                                                                                    </>
                                                                                )
                                                                            }}
                                                                        </Droppable>
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )
                                    }}
                                </Droppable>

                                <div className='project-column project-column-add mr-3'>
                                    <div ref={addColumnsRef}>
                                        <button onClick={() => setShowAddColumns(true)}>
                                            <BsPlus style={{ fontSize: '1.5em' }} /> Add Column
                                        </button>
                                    </div>

                                    {(showAddColumns) &&
                                        <ColumnAdd onAddColumnClick={onAddColumnClick} hideShowAddColumn={() => setShowAddColumns(false)} />
                                    }
                                </div>
                            </DragDropContext>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Project
