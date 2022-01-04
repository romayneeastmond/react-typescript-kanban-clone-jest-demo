import React, { useRef } from 'react'

const ColumnEdit: React.FC<{ id: string, name: string, onEditColumnClick: (id: string, name: string) => void, hideShowEditColumn: () => void }> = (props) => {
    const columnEditRef = useRef<HTMLInputElement>(null)

    return (
        <section className='task-add mb-3 mt-3'>
            <div className='card box-shadow'>
                <div className='card-header'>
                    <strong>Edit Column</strong>
                </div>
                <div className='card-body'>
                    <form className='form' onSubmit={(e: React.FormEvent) => { e.preventDefault() }}>
                        <div className='form-group'>
                            <label htmlFor='columnNameEdit'>Column Name</label>
                            <input ref={columnEditRef} defaultValue={props.name} type='text' id='columnNameEdit' name='columnNameEdit' className='form-control' required autoFocus />
                        </div>

                        <div className='form-group'>
                            <input type='button' value='Update' className='btn btn-sm btn-success mr-3' onClick={() => props.onEditColumnClick(props.id, columnEditRef.current!.value)} />
                            <input type='button' value='Cancel' className='btn btn-sm btn-secondary' onClick={props.hideShowEditColumn} />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ColumnEdit