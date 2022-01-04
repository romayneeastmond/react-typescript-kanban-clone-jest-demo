import React, { useRef } from 'react'

const TaskEdit: React.FC<{ id: string, taskId: string, content: string, onEditTaskClick: (id: string, taskId: string, task: string) => void, hideShowEditTask: () => void }> = (props) => {
    const taskEditRef = useRef<HTMLTextAreaElement>(null)

    return (
        <form className='form' onSubmit={(e: React.FormEvent) => { e.preventDefault() }}>
            <div className='form-group'>
                <label htmlFor='task'><strong>Edit Task</strong></label>
                <textarea ref={taskEditRef} defaultValue={props.content} id='task' name='task' className='form-control' required autoFocus />
            </div>

            <div className='form-group'>
                <input type='button' value='Update' className='btn btn-sm btn-success mr-3' onClick={() => props.onEditTaskClick(props.id, props.taskId, taskEditRef.current!.value)} />
                <input type='button' value='Cancel' className='btn btn-sm btn-secondary' onClick={props.hideShowEditTask} />
            </div>
        </form>
    )
}

export default TaskEdit