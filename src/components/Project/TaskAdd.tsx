import React, { useRef } from 'react'

const TaskAdd: React.FC<{ id: string, onAddTaskClick: (id: string, task: string) => void, hideShowAddTask: () => void }> = (props) => {
    const taskRef = useRef<HTMLTextAreaElement>(null)

    return (
        <section className='mt-3'>
            <div className='card box-shadow'>
                <div className='card-header'>
                    <strong>Add Task</strong>
                </div>
                <div className='card-body'>
                    <form className='form' onSubmit={(e: React.FormEvent) => { e.preventDefault() }}>
                        <div className='form-group'>
                            <label htmlFor='task'>Task</label>
                            <textarea ref={taskRef} id='task' name='task' className='form-control' required autoFocus />
                        </div>

                        <div className='form-group'>
                            <input type='button' value='Save' className='btn btn-sm btn-success mr-3' onClick={() => props.onAddTaskClick(props.id, taskRef.current!.value)} />
                            <input type='button' value='Cancel' className='btn btn-sm btn-secondary' onClick={props.hideShowAddTask} />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default TaskAdd